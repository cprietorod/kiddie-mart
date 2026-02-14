summary: Diagnosticar y corregir un bug en la carga de estado desde IndexedDB
id: fix-load-state-bug
categories: AI, Developer Tools, Debugging
environments: Web
status: Draft
feedback link: https://github.com/cprietorod/kiddie-mart/issues
authors: Carlos Prieto

# Reto 7: Resolver Bug en Load State

## Introducción
Duration: 0:02

¡Es hora de hacer debugging con AI! En este reto, usarás Gemini CLI para encontrar y corregir un bug real en la carga del estado de la aplicación.

### El problema

Al abrir la app por primera vez, **los productos no se cargan correctamente**. A veces la lista aparece vacía y los productos predeterminados no se muestran.

### Lo que aprenderás

- Cómo describir bugs de forma precisa a Gemini CLI
- Cómo usar AI para analizar lógica de estado y encontrar errores
- Flujo de debugging: describir síntoma → localizar archivo → encontrar causa → aplicar fix → verificar

### Lo que necesitas

- La app corriendo en modo desarrollo
- Gemini CLI configurado con `GEMINI.md`

## Reproducir el bug
Duration: 0:03

Primero, vamos a confirmar el bug:

1. Abre la app en **http://localhost:9002**
2. Entra como **Staff**
3. Observa la lista de productos

El comportamiento esperado es ver una lista de productos con iconos, nombres y precios. Pero podrías ver:
- Una lista vacía
- Un mensaje de "no hay productos"

### Limpiar IndexedDB para reproducir

Si la app ya tiene datos en caché, limpia IndexedDB para reproducir el bug de primera carga:

1. Abre DevTools (`F12` o `Cmd+Opt+I`)
2. Ve a **Application** → **IndexedDB**
3. Borra la base de datos `KiddieMartDB`
4. Recarga la página

Negative
: El bug está relacionado con la carga inicial de datos. Si los datos ya están en IndexedDB de una sesión anterior, el bug podría no ser visible inmediatamente.

## Pedir ayuda a Gemini CLI
Duration: 0:05

Ahora, pídele a Gemini CLI que analice el problema:

```bash
gemini "Hay un bug en la aplicación: cuando se abre por primera vez 
(sin datos en IndexedDB), los productos no se cargan y la lista 
aparece vacía. 

El problema está en la carga del estado inicial. Revisa:
1. src/context/KiddieMartContext.tsx - la función loadData
2. src/lib/indexedDbService.ts - la función getAllProducts

Busca problemas en cómo se manejan los valores de retorno de 
las funciones de IndexedDB, especialmente cuando la DB está vacía."
```

### Lo que Gemini debería encontrar

Gemini CLI analizará el código y debería identificar que hay un problema con cómo se maneja el valor de retorno de `getAllProducts()`. Específicamente:

- `getAllProducts()` retorna un array vacío `[]` cuando no hay productos
- Pero en `loadData`, el resultado se transforma de una manera que impide que el seeding (carga de datos iniciales) funcione correctamente

Positive
: Observa cómo un prompt con contexto específico (nombre de archivo, nombre de función, síntoma) produce un diagnóstico mucho más preciso que simplemente decir "la app no funciona".

## Entender la causa raíz
Duration: 0:03

Pide a Gemini que te explique la causa raíz en detalle:

```bash
gemini "Explícame en detalle la causa raíz del bug en loadData. 
¿Qué línea exacta causa el problema y por qué? 
Muéstrame el flujo de datos paso a paso."
```

### La causa raíz

El bug es sutil. En la función `loadData()`:

1. `getAllProducts()` retorna `[]` (array vacío) cuando la DB está vacía
2. Pero el código usa `|| undefined` que convierte `[]` a `undefined` (porque `[]` es truthy, esto en realidad no cambia `[]`... ¿o sí?)
3. El array vacío `[]` es **truthy** en JavaScript, así que `[] || undefined` sigue siendo `[]`
4. **Pero espera** — el problema real es que `?.length` con optional chaining cambia la lógica de seeding

El código debería verificar `dbProducts.length === 0` directamente, no usar optional chaining que permite que `undefined` pase silenciosamente.

## Aplicar el fix
Duration: 0:05

Pide a Gemini que aplique la corrección:

```bash
gemini "Corrige el bug en la función loadData de 
src/context/KiddieMartContext.tsx. 
El fix debe:
1. Manejar correctamente el caso cuando getAllProducts retorna un array vacío
2. Asegurar que el seeding de productos iniciales funcione
3. No cambiar el comportamiento cuando ya hay productos en la DB"
```

### Verificar el fix

Después de que Gemini aplique el cambio:

1. Abre DevTools → **Application** → **IndexedDB**
2. Borra `KiddieMartDB`
3. Recarga la página
4. Los productos deberían aparecer correctamente 🎉

## Reflexión
Duration: 0:02

### ¿Qué aprendimos sobre debugging con AI?

1. **Describir el síntoma claramente** — "productos no cargan" es mejor que "no funciona"
2. **Dar pistas sobre dónde buscar** — indicar archivos y funciones específicas
3. **Pedir explicación de la causa raíz** — no solo el fix, sino el "por qué"
4. **Verificar siempre** — aplicar el fix y probar que resuelve el problema

### Técnicas de prompting para debugging

| Técnica | Ejemplo |
|---------|---------|
| Describir síntoma | "Los productos no se cargan al inicio" |
| Localizar código | "Revisa loadData en KiddieMartContext.tsx" |
| Dar contexto técnico | "Usa IndexedDB, la DB empieza vacía" |
| Pedir paso a paso | "Muéstrame el flujo de datos" |

## ¡Felicitaciones!
Duration: 0:00

🎉 ¡Has completado el Reto 7!

### Lo que aprendiste
- Cómo hacer debugging efectivo con Gemini CLI
- Cómo escribir prompts de debugging precisos
- La importancia de reproducir, diagnosticar y verificar

### Lo que corregiste
- Bug en `loadData()` que impedía la carga de productos iniciales

### Siguiente paso
Continúa con el **Reto 8: Resolver Problema de Margin** — otro bug visual espera tu diagnóstico.
