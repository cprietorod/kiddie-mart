summary: Crear el archivo GEMINI.md para dar contexto del proyecto a Gemini CLI
id: setup-gemini-md
categories: AI, Developer Tools
environments: Web
status: Draft
feedback link: https://github.com/cprietorod/kiddie-mart/issues
authors: Carlos Prieto

# Reto 2: Setup GEMINI.md

## Introducción
Duration: 0:02

En este reto aprenderás a crear un archivo **GEMINI.md** — un archivo especial que le da contexto a Gemini CLI sobre tu proyecto. Piensa en él como un "briefing" que hace que las respuestas de Gemini sean mucho más precisas y relevantes.

### Lo que aprenderás

- Qué es `GEMINI.md` y por qué es importante
- Cómo hacer que Gemini CLI analice un proyecto existente
- Cómo crear un archivo de contexto efectivo
- La diferencia que hace tener un buen contexto vs. no tenerlo

### Lo que necesitas

- Gemini CLI instalado (Reto 1)
- El repositorio `kiddie-mart` clonado y en la rama `workshop-start`

## ¿Qué es GEMINI.md?
Duration: 0:03

`GEMINI.md` es un archivo Markdown que se coloca en la raíz de tu proyecto. Cuando Gemini CLI se ejecuta dentro de un directorio que tiene este archivo, lo lee automáticamente para entender:

- **Qué hace el proyecto** — para dar respuestas alineadas con el propósito
- **Qué tecnologías usa** — para sugerir código compatible
- **Cuál es la estructura** — para saber dónde están los archivos relevantes
- **Qué convenciones sigue** — para mantener consistencia en el código
- **Cómo se ejecuta** — para dar instrucciones precisas

### Sin contexto vs. Con contexto

**Sin `GEMINI.md`**, si le pides a Gemini: _"Agrega un botón al header"_, tendrá que adivinar:
- ¿React? ¿Vue? ¿Angular?
- ¿Tailwind? ¿CSS Modules? ¿styled-components?
- ¿Dónde está el header?

**Con `GEMINI.md`**, Gemini ya sabe que usas React con Tailwind CSS y que el header está en `src/components/kiddie-mart/AppHeader.tsx`.

## Explora el proyecto primero
Duration: 0:03

Antes de pedirle a Gemini que cree el archivo, vamos a entender qué hay en el proyecto. Navega al directorio del proyecto:

```bash
cd kiddie-mart
```

Usa Gemini CLI para explorar:

```bash
gemini "Analiza la estructura de este proyecto. Dime:
1. Qué framework usa
2. Cuáles son los directorios principales en src/
3. Qué dependencias importantes tiene en package.json
4. Qué archivos de configuración existen en la raíz"
```

Positive
: Observa cómo Gemini puede leer y analizar los archivos del proyecto directamente desde la terminal. Esta es una de sus capacidades más poderosas.

## Crear GEMINI.md con Gemini CLI
Duration: 0:07

Ahora, pídele a Gemini que cree el archivo:

```bash
gemini "Analiza este proyecto completo y crea un archivo GEMINI.md en la raíz 
que incluya:

1. Descripción del proyecto (Kiddie Mart - POS educativo para niños)
2. Stack tecnológico completo
3. Estructura del proyecto (directorios principales y su propósito)
4. Cómo ejecutar el proyecto en desarrollo
5. Convenciones de código del proyecto
6. Estilo visual y temática (revisar globals.css y docs/blueprint.md)
7. Patrones de diseño usados (Context/Provider, hooks, etc.)
8. Archivos importantes que un desarrollador nuevo debe conocer

El archivo debe ser conciso pero completo, orientado a que una AI 
pueda entender rápidamente el proyecto."
```

### ¿Qué está pasando?

Gemini CLI va a:
1. Leer varios archivos del proyecto (`package.json`, `tsconfig.json`, archivos de `src/`, etc.)
2. Analizar la estructura de directorios
3. Identificar patrones y tecnologías
4. Generar un archivo Markdown coherente con toda la información

## Revisar y ajustar
Duration: 0:05

Abre el archivo generado:

```bash
cat GEMINI.md
```

### Verifica que incluye

- [ ] Nombre y descripción del proyecto
- [ ] Next.js, React, TypeScript, Tailwind CSS mencionados
- [ ] IndexedDB como almacenamiento
- [ ] `next-intl` para internacionalización
- [ ] Estructura de carpetas (`src/app`, `src/components`, `src/context`, etc.)
- [ ] Comando `npm run dev` o puerto `9002`
- [ ] Referencia a los colores pastel y temática infantil

### Ajustar si es necesario

Si falta algo, puedes pedirle a Gemini que lo mejore:

```bash
gemini "Revisa el GEMINI.md que acabas de crear. Le falta mencionar que:
- El proyecto usa PWA con @ducanh2912/next-pwa
- Tiene soporte QR con @yudiel/react-qr-scanner
- Usa Genkit para funciones de AI
Actualiza el archivo con esta información."
```

Positive
: No tiene que ser perfecto a la primera. Iterar con Gemini es parte del flujo. Puedes refinar el archivo tantas veces como necesites.

## Probar el impacto del contexto
Duration: 0:03

Para ver la diferencia que hace `GEMINI.md`, prueba estas dos preguntas:

### Pregunta específica del proyecto

```bash
gemini "¿Cómo puedo agregar un nuevo producto a la tienda? 
¿Qué archivos necesito modificar?"
```

Gemini debería responder mencionando archivos específicos como `KiddieMartContext.tsx`, `ProductManagement.tsx`, y los tipos en `kiddieMart.ts`.

### Pregunta sobre estilo

```bash
gemini "Si quisiera agregar un nuevo botón en la app, ¿qué colores 
y estilos debería usar para que sea consistente?"
```

Debería mencionar los colores pastel, las variables CSS custom, y las clases de Tailwind del proyecto.

## ¡Felicitaciones!
Duration: 0:00

🎉 ¡Has completado el Reto 2!

### Lo que aprendiste
- Qué es `GEMINI.md` y por qué mejora la calidad de las respuestas
- Cómo hacer que Gemini analice un proyecto y genere contexto
- Cómo iterar y refinar la documentación de contexto

### Lo que creaste
- `GEMINI.md` en la raíz del proyecto

### Siguiente paso
Continúa con el **Reto 3: Crear README.md** para generar documentación profesional del proyecto.
