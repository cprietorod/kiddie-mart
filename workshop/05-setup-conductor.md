summary: Crear un Makefile como task runner para simplificar comandos del proyecto
id: setup-conductor
categories: AI, Developer Tools
environments: Web
status: Draft
feedback link: https://github.com/cprietorod/kiddie-mart/issues
authors: Carlos Prieto

# Reto 5: Setup Conductor (Task Runner)

## Introducción
Duration: 0:02

Un **conductor** o **task runner** es una herramienta que simplifica la ejecución de comandos frecuentes en un proyecto. En lugar de recordar `npm run dev -- -p 9002` o `npx next lint`, simplemente escribes `make dev` o `make lint`.

En este reto, usarás Gemini CLI para crear un `Makefile` que sirva como conductor del proyecto.

### Lo que aprenderás

- Qué es un Makefile y por qué es útil como task runner
- Cómo pedir a Gemini CLI que genere herramientas de productividad
- Cómo personalizar e iterar sobre archivos de configuración

### Lo que necesitas

- Gemini CLI configurado (Retos 1-2)
- Familiaridad básica con la terminal

## ¿Por qué un Makefile?
Duration: 0:02

Los `Makefile` son una forma estándar y universal de definir tareas en proyectos de software. Sus ventajas:

- 📋 **Autodocumentados** — `make help` muestra todos los comandos disponibles
- 🔧 **Universales** — `make` viene preinstalado en macOS y Linux
- 🏃 **Rápidos** — no requieren instalar dependencias adicionales
- 📦 **Composables** — puedes combinar varios comandos en un solo target

### ¿El proyecto ya tiene scripts?

Sí, en `package.json`:

```json
{
  "scripts": {
    "dev": "next dev -p 9002",
    "build": "next build && node fix-sw.js",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  }
}
```

El Makefile será una capa encima de estos scripts que los hace más accesibles y agrega funcionalidad extra.

## Generar el Makefile con Gemini CLI
Duration: 0:07

Pide a Gemini CLI que cree el Makefile:

```bash
gemini "Crea un Makefile para este proyecto Next.js con los siguientes targets:

- make help       → Mostrar todos los targets disponibles con descripciones
- make install    → npm install
- make dev        → npm run dev (servidor de desarrollo en puerto 9002)
- make build      → npm run build
- make lint       → npm run lint
- make typecheck  → npm run typecheck
- make clean      → Eliminar .next y node_modules
- make setup      → Hacer install + verificar que Node.js es >= 18

Cada target debe tener un comentario con ## para que 'make help' funcione.
El Makefile debe usar .PHONY para todos los targets.
Incluye un banner colorido en make help con el nombre del proyecto."
```

### Resultado esperado

Un archivo `Makefile` en la raíz del proyecto con todos los targets definidos.

Positive
: Si ya existe un Makefile (del paso de preparación del workshop), Gemini lo detectará y te preguntará si quieres reemplazarlo o actualizarlo. Dile que lo reemplace con la versión mejorada.

## Probar los targets
Duration: 0:05

Prueba cada target para verificar que funciona:

```bash
# Ver todos los comandos disponibles
make help

# Instalar dependencias (si aún no lo has hecho)
make install

# Verificar tipos
make typecheck

# Ejecutar linter
make lint
```

### Verificar help output

El output de `make help` debería verse algo así:

```
🛒 Kiddie Mart - Available Commands
======================================
  build          Build the project for production
  clean          Remove build artifacts and node_modules  
  dev            Start development server on port 9002
  help           Show available targets
  install        Install project dependencies
  lint           Run linter
  setup          Full project setup (install + verify)
  typecheck      Run TypeScript type checking
```

## Agregar targets avanzados
Duration: 0:05

Ahora pide a Gemini CLI que agregue targets más avanzados:

```bash
gemini "Agrega estos targets adicionales al Makefile existente:

- make dev-open    → Ejecutar dev y abrir el navegador automáticamente
- make check-all   → Ejecutar lint + typecheck juntos
- make reset-db    → Borrar datos de IndexedDB (info de cómo hacerlo)
- make i18n-check  → Verificar que los archivos de traducción tienen las 
                     mismas keys (comparar messages/en.json y messages/es.json)

Mantén el formato existente con comentarios ## y .PHONY"
```

Positive
: Nota cómo puedes iterar sobre el Makefile pidiendo targets adicionales sin tener que regenerar todo. Gemini entiende el archivo existente y agrega sin romper.

## ¡Felicitaciones!
Duration: 0:00

🎉 ¡Has completado el Reto 5!

### Lo que aprendiste
- Cómo crear herramientas de productividad con AI
- Qué es un Makefile y cómo usarlo como task runner
- Cómo iterar y agregar funcionalidad a archivos existentes

### Lo que creaste
- `Makefile` con targets para todas las tareas comunes del proyecto

### Siguiente paso
Continúa con el **Reto 6: Instalar el Proyecto** para poner la app en marcha.
