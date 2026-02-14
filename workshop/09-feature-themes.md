summary: Implementar un sistema de temas visuales con selector en el header
id: feature-themes
categories: AI, Developer Tools, Frontend
environments: Web
status: Draft
feedback link: https://github.com/cprietorod/kiddie-mart/issues
authors: Carlos Prieto

# Reto 9: Nueva Feature — Soporte de Temas

## Introducción
Duration: 0:03

¡Bienvenido al primer reto de features! Aquí implementarás un sistema de temas que permita cambiar la apariencia visual de Kiddie Mart. La app ya tiene variables CSS para modo claro y oscuro, pero no hay forma de cambiar entre ellos desde la UI.

### Lo que construirás

- Un **selector de temas** en el header de la app
- Al menos **3 temas**: Default (pastel), Dark Mode, y "Candy" (colores saturados)
- **Persistencia** del tema seleccionado en `localStorage`
- **Transiciones suaves** al cambiar de tema

### Lo que aprenderás

- Cómo pedir a Gemini CLI que implemente features complejas
- Cómo integrar nueva funcionalidad con código existente
- Estrategias de prompting para features multi-archivo

### Lo que necesitas

- App corriendo sin bugs (Retos 7-8 completados)
- Familiaridad básica con CSS Variables y Tailwind

## Analizar el sistema actual de estilos
Duration: 0:05

Antes de implementar, entiende el sistema de estilos actual:

```bash
gemini "Analiza el sistema de estilos de la app:
1. Revisa src/app/globals.css y explica las variables CSS definidas
2. ¿Ya existe soporte de dark mode? ¿Cómo funciona?
3. ¿Qué componente renderiza el header? (revisa AppHeader.tsx)
4. ¿Hay algún mecanismo de theming en el KiddieMartContext?

Dame un resumen de lo que ya existe y qué necesitaríamos agregar 
para soportar múltiples temas."
```

### Lo que descubrirás

- `globals.css` ya tiene variables CSS para `:root` (light) y `.dark` (dark)
- Las variables usan formato HSL (`210 15% 35%`)
- No hay un toggle de tema en la UI
- El contexto no maneja tema actualmente

Positive
: Gemini CLI analiza múltiples archivos a la vez para darte un panorama completo. Esto te ahorra minutos de lectura manual de código.

## Implementar el sistema de temas
Duration: 0:10

Ahora, pide la implementación completa:

```bash
gemini "Quiero agregar soporte de temas a Kiddie Mart. 

CONTEXTO TÉCNICO:
- globals.css ya tiene variables CSS para light (:root) y dark (.dark)
- Las variables usan formato HSL sin la función hsl()
- La app usa Tailwind CSS
- El header está en src/components/kiddie-mart/AppHeader.tsx
- El estado global está en src/context/KiddieMartContext.tsx

REQUERIMIENTOS:
1. Crear un componente ThemeSelector que tenga al menos 3 temas:
   - 'default': El tema pastel actual (lo que hay en :root)
   - 'dark': Modo oscuro (lo que hay en .dark)
   - 'candy': Tema con colores más vivos y saturados 
     (rosas, morados, verdes brillantes - estilo caramelo)

2. Agregar el ThemeSelector al AppHeader.tsx con un icono de paleta o sol/luna

3. Crear un hook useTheme o agregar al contexto existente:
   - Estado del tema actual
   - Función para cambiar tema
   - Persistir en localStorage
   - Leer tema guardado al cargar

4. En globals.css, agregar las variables CSS para el tema 'candy':
   - primary: rosa fuerte
   - secondary: morado brillante  
   - accent: verde lima
   - background: rosa muy claro
   - Mantener la misma estructura de variables que los temas existentes

5. Agregar transición suave al cambiar de tema:
   - transition en body para background-color y color

IMPORTANTE: No modifiques la estructura existente de variables CSS, 
solo agrega nuevas clases de tema."
```

## Revisar los cambios
Duration: 0:05

Gemini habrá modificado/creado varios archivos. Revisa cada uno:

```bash
gemini "Muéstrame un resumen de todos los archivos que modificaste 
o creaste para la feature de temas. Para cada archivo, dime 
qué cambió y por qué."
```

### Archivos que deberían haberse modificado/creado

| Archivo | Cambio |
|---------|--------|
| `src/app/globals.css` | Nuevo tema `.candy` con variables CSS |
| `src/components/kiddie-mart/AppHeader.tsx` | ThemeSelector agregado |
| Nuevo componente `ThemeSelector` | Selector con iconos/botones |
| `src/context/KiddieMartContext.tsx` o hook nuevo | Estado del tema |

## Probar los temas
Duration: 0:05

Con la app corriendo, prueba cada tema:

1. **Default** — Colores pastel suaves (menta, lavanda, amarillo)
2. **Dark** — Fondo oscuro con colores atenuados
3. **Candy** — Colores vivos y saturados

### Verificar

- [ ] Selector de tema visible en el header
- [ ] Al cambiar tema, los colores cambian suavemente
- [ ] El tema se mantiene después de recargar la página (`localStorage`)
- [ ] Todos los componentes respetan el tema (header, productos, carrito, modales)
- [ ] El texto es legible en todos los temas

### ¿Problemas?

Si algún componente no respeta el tema:

```bash
gemini "El componente ShoppingCart.tsx no cambia de colores cuando 
cambio el tema. Parece que tiene colores hardcodeados en lugar de 
usar las variables CSS. ¿Puedes revisarlo y corregirlo?"
```

Negative
: Es común que al implementar temas, algunos componentes tengan colores hardcodeados (como `bg-white` en lugar de `bg-background`). Si esto pasa, pide a Gemini que los corrija.

## Mejora opcional: Tema personalizado
Duration: 0:03

Si te sobra tiempo, pide un feature extra:

```bash
gemini "Agrega la opción de que el usuario pueda elegir un 
color primario personalizado para crear su propio tema.
Agrega un color picker al ThemeSelector que permita 
seleccionar un color y genere las variables CSS derivadas 
automáticamente."
```

## ¡Felicitaciones!
Duration: 0:00

🎉 ¡Has completado el Reto 9!

### Lo que aprendiste
- Cómo implementar features complejas multi-archivo con Gemini CLI
- Cómo funciona el theming con CSS Variables
- Cómo integrar nueva funcionalidad con código existente

### Lo que construiste
- Sistema de temas completo con 3+ temas
- Selector visual en el header
- Persistencia del tema seleccionado

### Siguiente paso
Continúa con el **Reto 10: Upload de Productos con AI** — ¡vamos a usar Gemini Vision!
