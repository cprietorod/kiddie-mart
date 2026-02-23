summary: Workshop completo de Gemini CLI con Kiddie Mart — aprende a programar con AI
id: gemini-cli-kiddie-mart-workshop
categories: AI, Developer Tools
environments: Web
status: Draft
feedback link: https://github.com/cprietorod/kiddie-mart/issues
authors: Carlos Prieto

# Gemini CLI Workshop: Aprende a Programar con AI usando Kiddie Mart

## Bienvenida
Duration: 0:05

¡Bienvenido al **Workshop de Gemini CLI**! 🎉

En este workshop aprenderás a usar **Gemini CLI** como tu asistente de desarrollo AI mientras trabajas en un proyecto real: **Kiddie Mart**, una aplicación POS (Point of Sale) educativa para niños.

### ¿Qué es Gemini CLI?

Gemini CLI es una herramienta de línea de comandos que te permite interactuar con los modelos de AI de Google directamente desde tu terminal. Es como tener un programador senior sentado a tu lado, ayudándote con:

- 🔍 Analizar y entender código existente
- 📝 Generar documentación profesional
- 🐛 Encontrar y corregir bugs
- ✨ Implementar nuevas features
- 🏗️ Refactorizar código

### ¿Qué es Kiddie Mart?

Kiddie Mart es una app POS educativa diseñada para que los niños aprendan sobre compras y ventas. Está construida con:

- **Next.js** + **React** + **TypeScript**
- **Tailwind CSS** con un tema pastel infantil
- **IndexedDB** para persistencia local
- **Internacionalización** (Español/Inglés) con `next-intl`
- **PWA** para uso offline
- **Genkit** para funciones de AI

## Lo que aprenderás
Duration: 0:02

- ✅ Instalar y configurar Gemini CLI
- ✅ Crear archivos de contexto (`GEMINI.md`) para mejorar las respuestas de AI
- ✅ Generar documentación profesional de forma asistida
- ✅ Diagnosticar y corregir bugs con ayuda de AI
- ✅ Implementar nuevas features guiado por Gemini CLI
- ✅ Integrar servicios como Firebase y AI Vision
- ✅ Escribir prompts efectivos para desarrollo

## Requisitos previos
Duration: 0:03

### Conocimientos necesarios

- Fundamentos de **JavaScript/TypeScript**
- Conceptos básicos de **React** (componentes, estado, props)
- Uso básico de la **terminal/línea de comandos**
- Familiaridad con **Git**

### Software necesario

| Herramienta | Versión mínima | Verificar con |
|-------------|---------------|---------------|
| Node.js | 18+ | `node --version` |
| npm | 9+ | `npm --version` |
| Git | 2.x | `git --version` |
| Editor de código | VS Code recomendado | — |
| Navegador moderno | Chrome/Edge/Firefox | — |

### Credenciales necesarias

- Cuenta de Google (para Gemini API Key)
- (Opcional) Cuenta de Firebase para el último reto

## Estructura del workshop
Duration: 0:02

El workshop está dividido en **4 módulos** con **11 retos** progresivos:

### Módulo 1: Setup (Retos 1-2)
Instalar Gemini CLI y configurar el contexto del proyecto.

### Módulo 2: Documentación (Retos 3-6)
Generar documentación, crear un task runner, e instalar el proyecto.

### Módulo 3: Bug Fixing (Retos 7-8)
Usar Gemini CLI para diagnosticar y corregir bugs reales.

### Módulo 4: Nuevas Features (Retos 9-11)
Implementar features completas con ayuda de AI: temas, upload con AI, y Firebase.

<aside class="positive">
Cada reto es independiente pero se recomienda seguir el orden. Los retos del Módulo 4 son los más avanzados.
</aside>

## ¡Comencemos!
Duration: 0:01

El código del proyecto está en el repositorio **kiddie-mart**. Si aún no lo has clonado:

```bash
git clone <URL_DEL_REPOSITORIO>
cd kiddie-mart
git checkout workshop-start
```

<aside class="positive">
Asegúrate de estar en la rama `workshop-start`. Esta rama tiene todo configurado para el workshop, incluyendo algunos bugs que resolverás más adelante 😉
</aside>

## Reto 1: Instalar Gemini CLI
Duration: 0:15

En este primer reto vas a instalar **Gemini CLI** en tu máquina y verificar que funciona correctamente. Gemini CLI es tu puerta de entrada a la programación asistida por AI desde la terminal.

### Paso 1: Instala el paquete globalmente

Abre tu terminal y ejecuta:

```bash
npm install -g @anthropic-ai/gemini-cli
```

<aside class="positive">
Si tienes problemas de permisos en macOS/Linux, puedes usar `sudo npm install -g @anthropic-ai/gemini-cli` o configurar npm para instalar paquetes globales sin sudo.
</aside>

### Paso 2: Verifica la instalación

```bash
gemini --version
```

Deberías ver un número de versión como `1.x.x`. Si ves un error de "command not found", verifica que el directorio global de npm esté en tu PATH.

<aside class="negative">
Si `gemini --version` no funciona, prueba cerrar y abrir la terminal, o ejecuta `npx @anthropic-ai/gemini-cli --version` como alternativa.
</aside>

### Paso 3: Autenticación

Hay dos formas de autenticarte con Gemini CLI:

**Opción A: Login con cuenta de Google (recomendado)**

```bash
gemini auth login
```

Esto abrirá tu navegador para autenticarte con tu cuenta de Google. Sigue las instrucciones en pantalla.

**Opción B: API Key**

Si tienes una API Key de Gemini, puedes configurarla como variable de entorno:

```bash
export GEMINI_API_KEY="tu-api-key-aqui"
```

Para obtener una API Key:
1. Ve a [Google AI Studio](https://aistudio.google.com/apikey)
2. Haz clic en "Create API Key"
3. Copia la clave generada

<aside class="positive">
Para el workshop, el instructor proporcionará API Keys de respaldo si tienes problemas con la autenticación.
</aside>

### Paso 4: Tu primera interacción

¡Es hora de probar que todo funciona! Ejecuta:

```bash
gemini "Hola! Dime en una línea qué eres y qué puedes hacer"
```

Deberías ver una respuesta del modelo AI en tu terminal.

### Paso 5: Modo interactivo

Gemini CLI también tiene un modo interactivo donde puedes tener una conversación continua:

```bash
gemini
```

Esto abrirá una sesión interactiva. Prueba escribir:

```
> Explícame qué es un archivo package.json en 3 bullet points
```

Para salir del modo interactivo, escribe `/exit` o presiona `Ctrl+C`.

<aside class="positive">
El modo interactivo es muy útil cuando estás trabajando en un proyecto y quieres hacer varias preguntas seguidas sin perder el contexto.
</aside>

### Verificación

Antes de continuar, asegúrate de que puedes responder **sí** a todas estas preguntas:

- [ ] ¿`gemini --version` muestra un número de versión?
- [ ] ¿Puedes ejecutar `gemini "hola"` y recibir una respuesta?
- [ ] ¿Puedes entrar al modo interactivo con `gemini`?

| Problema | Solución |
|----------|----------|
| `command not found` | Verifica que npm global está en tu PATH |
| Error de autenticación | Prueba con API Key en lugar de login |
| Timeout | Verifica tu conexión a internet |
| Rate limit | Espera unos segundos e intenta de nuevo |

## Reto 2: Setup GEMINI.md
Duration: 0:15

En este reto aprenderás a crear un archivo **GEMINI.md** — un archivo especial que le da contexto a Gemini CLI sobre tu proyecto. Piensa en él como un "briefing" que hace que las respuestas de Gemini sean mucho más precisas y relevantes.

### ¿Qué es GEMINI.md?

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

### Paso 1: Explora el proyecto primero

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

<aside class="positive">
Observa cómo Gemini puede leer y analizar los archivos del proyecto directamente desde la terminal. Esta es una de sus capacidades más poderosas.
</aside>

### Paso 2: Crear GEMINI.md con Gemini CLI

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

Gemini CLI va a leer varios archivos del proyecto, analizar la estructura, identificar patrones y tecnologías, y generar un archivo Markdown coherente.

### Paso 3: Revisar y ajustar

Abre el archivo generado:

```bash
cat GEMINI.md
```

Verifica que incluye:

- [ ] Nombre y descripción del proyecto
- [ ] Next.js, React, TypeScript, Tailwind CSS mencionados
- [ ] IndexedDB como almacenamiento
- [ ] `next-intl` para internacionalización
- [ ] Estructura de carpetas (`src/app`, `src/components`, `src/context`, etc.)
- [ ] Comando `npm run dev` o puerto `9002`
- [ ] Referencia a los colores pastel y temática infantil

Si falta algo, puedes pedirle a Gemini que lo mejore:

```bash
gemini "Revisa el GEMINI.md que acabas de crear. Le falta mencionar que:
- El proyecto usa PWA con @ducanh2912/next-pwa
- Tiene soporte QR con @yudiel/react-qr-scanner
- Usa Genkit para funciones de AI
Actualiza el archivo con esta información."
```

<aside class="positive">
No tiene que ser perfecto a la primera. Iterar con Gemini es parte del flujo. Puedes refinar el archivo tantas veces como necesites.
</aside>

### Paso 4: Probar el impacto del contexto

Para ver la diferencia que hace `GEMINI.md`, prueba estas preguntas:

```bash
gemini "¿Cómo puedo agregar un nuevo producto a la tienda? 
¿Qué archivos necesito modificar?"
```

Gemini debería responder mencionando archivos específicos como `KiddieMartContext.tsx`, `ProductManagement.tsx`, y los tipos en `kiddieMart.ts`.

```bash
gemini "Si quisiera agregar un nuevo botón en la app, ¿qué colores 
y estilos debería usar para que sea consistente?"
```

Debería mencionar los colores pastel, las variables CSS custom, y las clases de Tailwind del proyecto.

## Reto 3: Crear README.md
Duration: 0:15

El archivo `README.md` actual de Kiddie Mart tiene solo 3 líneas genéricas. En este reto, usarás Gemini CLI para generar un README profesional y completo.

### Paso 1: Ver el problema

Revisa el README actual:

```bash
cat README.md
```

Verás algo como:

```markdown
# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.
```

Esto no le dice nada útil a un nuevo desarrollador. ¡Vamos a cambiarlo!

### Paso 2: Generar el README con Gemini CLI

Usa Gemini CLI para generar un README completo:

```bash
gemini "El README.md actual está casi vacío. Necesito que crees un README.md 
profesional y completo para Kiddie Mart. Debe incluir:

1. Título con emoji y badge placeholders (build status, license, etc.)
2. Descripción breve y atractiva del proyecto (es un POS educativo para niños)
3. Screenshot placeholder (imagen)
4. Sección 'Features' con lista de funcionalidades principales
5. Sección 'Tech Stack' con las tecnologías usadas
6. Sección 'Getting Started' con:
   - Prerequisites (Node.js 18+, npm)
   - Installation (git clone, npm install)
   - Running (npm run dev, puerto 9002)
7. Sección 'Project Structure' con árbol de directorios simplificado
8. Sección 'Available Scripts' con los comandos de package.json
9. Sección 'Contributing' básica
10. Sección 'License'

El tono debe ser amigable y profesional. Usa emojis donde tenga sentido.
El proyecto está hecho con Next.js, TypeScript, Tailwind CSS, IndexedDB, 
next-intl para i18n, y es una PWA."
```

<aside class="positive">
Nota cómo un prompt detallado produce un resultado mucho más completo. La especificidad es clave al trabajar con herramientas AI.
</aside>

### Paso 3: Revisar el resultado

Una vez que Gemini genere el archivo, revísalo:

```bash
cat README.md
```

Verifica que el README generado incluye:

- [ ] Título descriptivo con el nombre "Kiddie Mart"
- [ ] Descripción que explica qué es y para quién
- [ ] Lista de features principales
- [ ] Stack tecnológico completo
- [ ] Instrucciones claras de instalación
- [ ] Comando para ejecutar en desarrollo (`npm run dev`)
- [ ] Puerto correcto (9002)
- [ ] Estructura de directorios
- [ ] Scripts disponibles

### Paso 4: Refinar el README

Si el README necesita ajustes, puedes pedir cambios específicos:

```bash
gemini "Al README.md le falta una sección sobre internacionalización. 
Agrega una sección '## 🌐 Internationalization' que explique que la app 
soporta Español e Inglés usando next-intl, y que los archivos de 
traducción están en messages/es.json y messages/en.json"
```

```bash
gemini "La sección de 'Getting Started' del README necesita 
incluir también el comando 'make setup' del Makefile como alternativa. 
Actualiza esa sección."
```

<aside class="positive">
Iterar con cambios pequeños y específicos es más efectivo que regenerar todo el documento desde cero.
</aside>

## Reto 4: Crear la Documentación de Onboarding
Duration: 0:20

La documentación de onboarding es crucial para que nuevos desarrolladores puedan contribuir rápidamente a un proyecto. En este reto, usarás Gemini CLI para generar una guía completa que explique la arquitectura, patrones de diseño y flujos principales de Kiddie Mart.

### Paso 1: Analizar la arquitectura

Antes de documentar, es bueno entender qué hay. Usa Gemini CLI para analizar la arquitectura:

```bash
gemini "Analiza la arquitectura de esta aplicación y dame un resumen de:

1. El patrón de state management (revisa src/context/)
2. Los hooks personalizados (revisa src/hooks/)
3. La estructura de componentes (revisa src/components/kiddie-mart/)
4. El servicio de datos (revisa src/lib/indexedDbService.ts)
5. El sistema de tipos (revisa src/types/)
6. El sistema de internacionalización (revisa src/i18n/ y messages/)

Dame un diagrama en texto de cómo se conectan estos módulos."
```

<aside class="positive">
Gemini CLI puede leer múltiples archivos y darte un panorama completo de la arquitectura. Esto es mucho más rápido que leer todo el código manualmente.
</aside>

Deberías obtener un análisis que describe:
- `KiddieMartContext` como el estado central de la app
- `KiddieMartProvider` como el proveedor que envuelve la app
- Hooks como `useKiddieMart` para acceder al estado
- `indexedDbService` como capa de persistencia

### Paso 2: Generar la documentación de Onboarding

Ahora genera la documentación completa:

```bash
gemini "Crea un archivo docs/ONBOARDING.md con una guía de onboarding para 
nuevos desarrolladores. Debe incluir estas secciones:

## 1. Requisitos del entorno
- Node.js, npm, editor recomendado

## 2. Configuración del proyecto
- Clonar, instalar, ejecutar paso a paso

## 3. Arquitectura de la aplicación
- Diagrama de componentes en texto/mermaid
- Explicación del patrón Context/Provider
- Flujo de datos desde la UI hasta IndexedDB

## 4. Estructura de directorios
- Explicación de cada carpeta en src/

## 5. Sistema de datos
- Cómo funciona IndexedDB en el proyecto
- Dónde están los datos mock (kiddieMartMockData.ts)
- Qué modelos/tipos se usan (types/kiddieMart.ts)

## 6. Internacionalización (i18n)
- Cómo funciona next-intl
- Dónde están los archivos de traducción
- Cómo agregar nuevas traducciones

## 7. Flujo principal de la app
- Login → Selección de rol → POS → Agregar al carrito → Pago
- Panel de administración

## 8. Guía de estilos
- Variables CSS en globals.css
- Temática pastel infantil
- Clases de Tailwind más usadas

## 9. Troubleshooting
- Problemas comunes y soluciones

Usa ejemplos de código cuando sea relevante. La documentación debe ser 
clara y amigable."
```

### Paso 3: Revisar y completar

Revisa el archivo generado:

```bash
cat docs/ONBOARDING.md
```

Verifica la calidad:

- [ ] ¿Los comandos de instalación son correctos?
- [ ] ¿La descripción de la arquitectura refleja el código real?
- [ ] ¿Los nombres de archivos y carpetas son correctos?
- [ ] ¿Los ejemplos de código son funcionales?

Si es necesario, pide mejoras:

```bash
gemini "En el docs/ONBOARDING.md, necesito que la sección de Arquitectura 
incluya un diagrama mermaid que muestre la relación entre:
- App Layout → KiddieMartProvider → Componentes hijos
- KiddieMartContext → indexedDbService → IndexedDB
Actualiza esa sección."
```

<aside class="negative">
No confíes ciegamente en la documentación generada. Siempre verifica que los nombres de archivos, rutas y comandos sean correctos revisando el código fuente real.
</aside>

### Paso 4: Probar la documentación

La mejor forma de validar documentación de onboarding es seguirla paso a paso como si fueras un desarrollador nuevo:

```bash
gemini "Lee el docs/ONBOARDING.md que creamos y verifica que:
1. Todos los archivos mencionados realmente existen en el proyecto
2. Los comandos listados son correctos según package.json
3. Los nombres de componentes y funciones coinciden con el código
Dime si encuentras alguna inconsistencia."
```

<aside class="positive">
¡Usar Gemini CLI para verificar documentación que fue generada por Gemini CLI! Esta es una técnica útil de validación cruzada.
</aside>

## Reto 5: Setup Conductor (Task Runner)
Duration: 0:15

Un **conductor** o **task runner** es una herramienta que simplifica la ejecución de comandos frecuentes en un proyecto. En lugar de recordar `npm run dev -- -p 9002` o `npx next lint`, simplemente escribes `make dev` o `make lint`.

En este reto, usarás Gemini CLI para crear un `Makefile` que sirva como conductor del proyecto.

### ¿Por qué un Makefile?

Los `Makefile` son una forma estándar y universal de definir tareas en proyectos de software. Sus ventajas:

- 📋 **Autodocumentados** — `make help` muestra todos los comandos disponibles
- 🔧 **Universales** — `make` viene preinstalado en macOS y Linux
- 🏃 **Rápidos** — no requieren instalar dependencias adicionales
- 📦 **Composables** — puedes combinar varios comandos en un solo target

El proyecto ya tiene scripts en `package.json`:

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

### Paso 1: Generar el Makefile con Gemini CLI

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

<aside class="positive">
Si ya existe un Makefile (del paso de preparación del workshop), Gemini lo detectará y te preguntará si quieres reemplazarlo o actualizarlo. Dile que lo reemplace con la versión mejorada.
</aside>

### Paso 2: Probar los targets

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

### Paso 3: Agregar targets avanzados

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

<aside class="positive">
Nota cómo puedes iterar sobre el Makefile pidiendo targets adicionales sin tener que regenerar todo. Gemini entiende el archivo existente y agrega sin romper.
</aside>

## Reto 6: Instalar y Ejecutar el Proyecto
Duration: 0:15

Ahora que tienes tu task runner listo, es hora de instalar las dependencias y ejecutar Kiddie Mart. En este reto levantarás la app en modo desarrollo y explorarás sus funcionalidades.

### Paso 1: Instalar dependencias

Usa el Makefile para instalar:

```bash
make install
```

Esto ejecutará `npm install` e instalará todas las dependencias del proyecto.

<aside class="negative">
Si ves errores durante la instalación, es probable que tu versión de Node.js sea incompatible. Verifica con `node --version` que tienes la versión 18 o superior.
</aside>

Si la instalación falla, puedes pedir ayuda a Gemini CLI:

```bash
gemini "La instalación de npm falló con el siguiente error: [pega el error aquí]. 
¿Cómo puedo solucionarlo?"
```

<aside class="positive">
Gemini CLI es excelente para diagnosticar errores de instalación. Copia y pega el error completo para obtener la mejor respuesta.
</aside>

### Paso 2: Ejecutar en modo desarrollo

Inicia el servidor de desarrollo:

```bash
make dev
```

O si prefieres el comando directo:

```bash
npm run dev
```

Deberías ver algo como:

```
▲ Next.js 15.2.3
- Local:        http://localhost:9002
- Environments: .env.local

✓ Starting...
✓ Ready in 3.2s
```

Abre tu navegador en **http://localhost:9002**.

### Paso 3: Explorar la aplicación

Con la app corriendo, explora las funcionalidades principales:

**Pantalla de Login**

La primera pantalla muestra dos opciones de rol:
- **👨‍💼 Admin** — Acceso al panel de administración
- **🧑‍💻 Staff** — Acceso al POS (Point of Sale)

**Como Staff (POS)**

1. Selecciona el rol **Staff**
2. Verás el **grid de productos** (aquí podrías notar un bug visual 👀)
3. Haz clic en productos para agregar al carrito
4. El **carrito** aparece en el lado derecho
5. Prueba el proceso de **pago** (efectivo, tarjeta, QR)

**Como Admin**

1. Vuelve al login y selecciona **Admin**
2. Explora el **Dashboard** con estadísticas
3. Ve a **Productos** para gestionar el inventario
4. Revisa el **Historial de Ventas**
5. Explora la **Gestión de Wallets** para pagos QR

<aside class="positive">
¿Notaste algo raro con el layout de los productos? ¿O con la carga inicial de datos? ¡No te preocupes, son los bugs que resolverás en los próximos retos! 🐛
</aside>

### Paso 4: Verificar el estado de la app

Usa Gemini CLI para verificar que la app está funcionando correctamente:

```bash
gemini "La app está corriendo en http://localhost:9002. 
¿Puedes revisar el código y decirme:
1. ¿Qué roles de usuario existen?
2. ¿Cuántos productos debería tener por defecto?
3. ¿Qué métodos de pago están disponibles?
4. ¿La app soporta modo offline?"
```

## Reto 7: Resolver Bug en Load State
Duration: 0:20

¡Es hora de hacer debugging con AI! En este reto, usarás Gemini CLI para encontrar y corregir un bug real en la carga del estado de la aplicación.

**El problema:** Al abrir la app por primera vez, **los productos no se cargan correctamente**. A veces la lista aparece vacía y los productos predeterminados no se muestran.

### Paso 1: Reproducir el bug

Primero, vamos a confirmar el bug:

1. Abre la app en **http://localhost:9002**
2. Entra como **Staff**
3. Observa la lista de productos

El comportamiento esperado es ver una lista de productos con iconos, nombres y precios. Pero podrías ver:
- Una lista vacía
- Un mensaje de "no hay productos"

Para reproducir, limpia IndexedDB:

1. Abre DevTools (`F12` o `Cmd+Opt+I`)
2. Ve a **Application** → **IndexedDB**
3. Borra la base de datos `KiddieMartDB`
4. Recarga la página

<aside class="negative">
El bug está relacionado con la carga inicial de datos. Si los datos ya están en IndexedDB de una sesión anterior, el bug podría no ser visible inmediatamente.
</aside>

### Paso 2: Pedir ayuda a Gemini CLI

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

Gemini CLI analizará el código y debería identificar que hay un problema con cómo se maneja el valor de retorno de `getAllProducts()`.

<aside class="positive">
Observa cómo un prompt con contexto específico (nombre de archivo, nombre de función, síntoma) produce un diagnóstico mucho más preciso que simplemente decir "la app no funciona".
</aside>

### Paso 3: Entender la causa raíz

Pide a Gemini que te explique la causa raíz en detalle:

```bash
gemini "Explícame en detalle la causa raíz del bug en loadData. 
¿Qué línea exacta causa el problema y por qué? 
Muéstrame el flujo de datos paso a paso."
```

El bug es sutil:
1. `getAllProducts()` retorna `[]` (array vacío) cuando la DB está vacía
2. El array vacío `[]` es **truthy** en JavaScript
3. El código debería verificar `dbProducts.length === 0` directamente

### Paso 4: Aplicar el fix

Pide a Gemini que aplique la corrección:

```bash
gemini "Corrige el bug en la función loadData de 
src/context/KiddieMartContext.tsx. 
El fix debe:
1. Manejar correctamente el caso cuando getAllProducts retorna un array vacío
2. Asegurar que el seeding de productos iniciales funcione
3. No cambiar el comportamiento cuando ya hay productos en la DB"
```

### Paso 5: Verificar el fix

Después de que Gemini aplique el cambio:

1. Abre DevTools → **Application** → **IndexedDB**
2. Borra `KiddieMartDB`
3. Recarga la página
4. Los productos deberían aparecer correctamente 🎉

### Reflexión: Debugging con AI

| Técnica | Ejemplo |
|---------|---------|
| Describir síntoma | "Los productos no se cargan al inicio" |
| Localizar código | "Revisa loadData en KiddieMartContext.tsx" |
| Dar contexto técnico | "Usa IndexedDB, la DB empieza vacía" |
| Pedir paso a paso | "Muéstrame el flujo de datos" |

## Reto 8: Resolver Problema de Margin/Layout
Duration: 0:15

En este reto hay un bug visual: el grid de productos se ve desplazado y con espaciado incorrecto. Usarás Gemini CLI para diagnosticar un problema de CSS/Tailwind y corregirlo.

**El problema:**
- Un **margen izquierdo negativo** que desplaza el grid fuera de su contenedor
- Un **espacio excesivo arriba** que separa demasiado el grid del filtro

### Paso 1: Observar el bug

1. Abre la app en **http://localhost:9002**
2. Entra como **Staff**
3. Observa el grid de productos

Deberías ver:
- Los productos **desplazados hacia la izquierda**
- Parte del contenido se sale del área visible
- Un **espacio grande** entre el buscador/filtro y los productos
- El layout general se ve roto

### Paso 2: Diagnosticar con Gemini CLI

Describe el problema visual a Gemini CLI:

```bash
gemini "Hay un problema visual en la app: el grid de productos 
(la lista principal donde se muestran los productos a la venta) 
aparece desplazado hacia la izquierda, como si se saliera 
de su contenedor, y también tiene un espacio excesivo arriba 
entre el buscador y el grid.

El problema parece ser de CSS/Tailwind. Revisa los componentes 
que renderizan la lista de productos:
- src/components/kiddie-mart/ProductList.tsx
- Busca clases de Tailwind que puedan causar márgenes negativos o 
  márgenes superiores excesivos"
```

Gemini identificará clases de Tailwind sospechosas como:

| Clase | Efecto | ¿Problema? |
|-------|--------|-------------|
| `-ml-8` | Margen izquierdo -2rem (32px hacia la izquierda) | ✅ ¡Sí! |
| `mt-24` | Margen superior 6rem (96px arriba) | ✅ ¡Sí! |
| `gap-4` | Espacio de 1rem entre items del grid | ❌ Normal |
| `p-4` | Padding de 1rem en todos los lados | ❌ Normal |
| `grid-cols-2` | Grid de 2 columnas | ❌ Normal |

<aside class="positive">
Los problemas de CSS son ideales para diagnosticar con AI porque las clases de Tailwind son descriptivas y fáciles de razonar sobre ellas.
</aside>

### Paso 3: Aplicar el fix

Pide a Gemini que corrija el problema:

```bash
gemini "Corrige el problema de layout en ProductList.tsx. 
Elimina las clases de Tailwind que causan el margen negativo 
y el espacio excesivo arriba. El grid de productos debe:
- Estar alineado dentro de su contenedor
- Tener un padding de p-4 normal
- Usar grid responsivo (2 cols → 5 cols según el breakpoint)
- No tener márgenes negativos"
```

### Paso 4: Verificar el fix

1. Guarda los cambios
2. Mira la app en el navegador (hot reload debería aplicar los cambios)
3. Verifica que:
   - [ ] Los productos están alineados correctamente
   - [ ] No hay desplazamiento horizontal
   - [ ] El espacio entre el filtro y los productos es razonable
   - [ ] El grid es responsivo (cambia columnas al redimensionar)

### Paso 5: Explorar con DevTools

Como paso extra, usa DevTools para verificar:

1. Abre DevTools (`Cmd+Opt+I`)
2. Usa el selector de elementos para inspeccionar el grid
3. Verifica que el `div` del grid tiene las clases correctas
4. En la pestaña **Computed**, verifica que no hay márgenes negativos

<aside class="positive">
Combinar Gemini CLI con DevTools del navegador es un flujo de debugging visual muy poderoso.
</aside>

## Reto 9: Nueva Feature — Soporte de Temas
Duration: 0:25

¡Bienvenido al primer reto de features! Aquí implementarás un sistema de temas que permita cambiar la apariencia visual de Kiddie Mart.

### Lo que construirás

- Un **selector de temas** en el header de la app
- Al menos **3 temas**: Default (pastel), Dark Mode, y "Candy" (colores saturados)
- **Persistencia** del tema seleccionado en `localStorage`
- **Transiciones suaves** al cambiar de tema

### Paso 1: Analizar el sistema actual de estilos

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

Lo que descubrirás:
- `globals.css` ya tiene variables CSS para `:root` (light) y `.dark` (dark)
- Las variables usan formato HSL (`210 15% 35%`)
- No hay un toggle de tema en la UI
- El contexto no maneja tema actualmente

<aside class="positive">
Gemini CLI analiza múltiples archivos a la vez para darte un panorama completo. Esto te ahorra minutos de lectura manual de código.
</aside>

### Paso 2: Implementar el sistema de temas

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

### Paso 3: Revisar los cambios

Gemini habrá modificado/creado varios archivos. Revisa cada uno:

```bash
gemini "Muéstrame un resumen de todos los archivos que modificaste 
o creaste para la feature de temas. Para cada archivo, dime 
qué cambió y por qué."
```

| Archivo | Cambio |
|---------|--------|
| `src/app/globals.css` | Nuevo tema `.candy` con variables CSS |
| `src/components/kiddie-mart/AppHeader.tsx` | ThemeSelector agregado |
| Nuevo componente `ThemeSelector` | Selector con iconos/botones |
| `src/context/KiddieMartContext.tsx` o hook nuevo | Estado del tema |

### Paso 4: Probar los temas

Con la app corriendo, prueba cada tema:

1. **Default** — Colores pastel suaves (menta, lavanda, amarillo)
2. **Dark** — Fondo oscuro con colores atenuados
3. **Candy** — Colores vivos y saturados

Verificar:

- [ ] Selector de tema visible en el header
- [ ] Al cambiar tema, los colores cambian suavemente
- [ ] El tema se mantiene después de recargar la página (`localStorage`)
- [ ] Todos los componentes respetan el tema (header, productos, carrito, modales)
- [ ] El texto es legible en todos los temas

Si algún componente no respeta el tema:

```bash
gemini "El componente ShoppingCart.tsx no cambia de colores cuando 
cambio el tema. Parece que tiene colores hardcodeados en lugar de 
usar las variables CSS. ¿Puedes revisarlo y corregirlo?"
```

<aside class="negative">
Es común que al implementar temas, algunos componentes tengan colores hardcodeados (como `bg-white` en lugar de `bg-background`). Si esto pasa, pide a Gemini que los corrija.
</aside>

### Mejora opcional: Tema personalizado

Si te sobra tiempo, pide un feature extra:

```bash
gemini "Agrega la opción de que el usuario pueda elegir un 
color primario personalizado para crear su propio tema.
Agrega un color picker al ThemeSelector que permita 
seleccionar un color y genere las variables CSS derivadas 
automáticamente."
```

## Reto 10: Nueva Feature — Upload de Productos con AI
Duration: 0:25

¡Este es el reto más innovador del workshop! Vas a crear un sistema donde el administrador puede **subir una foto de un producto** y la AI de Google (Gemini Vision) detecta automáticamente el nombre, categoría y precio sugerido.

### Lo que construirás

- Botón **"Upload con AI"** en el panel de administración de productos
- Modal para **subir imagen o tomar foto con la cámara**
- Llamada a **Gemini Vision** para analizar la imagen
- **Pre-llenado automático** del formulario de nuevo producto
- Flujo completo: foto → AI → formulario → guardar

### Paso 1: Entender la infraestructura AI existente

El proyecto ya tiene Genkit configurado. Usa Gemini CLI para entender qué hay:

```bash
gemini "Analiza la infraestructura de AI del proyecto:
1. Revisa src/ai/ - ¿qué archivos hay y qué hacen?
2. Revisa package.json - ¿qué paquetes de AI están instalados?
3. ¿Hay alguna API route o server action para AI?
4. ¿Cómo se configura Genkit en el proyecto?

Dame un resumen de lo que ya existe y qué necesitaríamos agregar 
para analizar imágenes con Gemini Vision."
```

<aside class="positive">
Genkit simplifica enormemente las llamadas a modelos de AI. En lugar de manejar HTTP requests manualmente, defines "flows" y el framework se encarga del resto.
</aside>

### Paso 2: Configurar la API Key

Para que Gemini Vision funcione, necesitas una API Key:

1. Ve a [Google AI Studio](https://aistudio.google.com/apikey)
2. Copia tu API Key
3. Crea o edita el archivo `.env.local` en la raíz del proyecto:

```bash
echo "GOOGLE_GENAI_API_KEY=tu-api-key-aqui" >> .env.local
```

<aside class="negative">
Nunca commits tu API Key al repositorio. El archivo `.env.local` ya está en `.gitignore`.
</aside>

### Paso 3: Implementar el flow de AI Vision

Ahora, pide a Gemini CLI que implemente el flow completo:

```bash
gemini "Quiero implementar una feature que permita subir una foto 
de un producto y usar Gemini Vision para detectar metadata.

PASO 1 - Backend (AI Flow):
Crea un Genkit flow en src/ai/ que:
- Reciba una imagen en base64
- Llame a Gemini Vision (gemini-2.0-flash o similar con vision)
- Pida al modelo que detecte:
  * Nombre del producto (en español)
  * Categoría (una de: Fruit, Snack, Drink, Candy, Toy, Other)
  * Precio sugerido en USD (basado en lo que parece ser el producto)
  * Un emoji representativo
- Retorne un JSON con estos campos

PASO 2 - API Route:
Crea un API route en Next.js (src/app/api/analyze-product/route.ts) que:
- Reciba la imagen como base64 en el body
- Llame al flow de Genkit
- Retorne el JSON con la metadata detectada

PASO 3 - Frontend:
En el panel de admin (ProductManagement.tsx):
- Agrega un botón '📸 Upload con AI' junto al botón de agregar producto
- Crea un modal que permita:
  a) Seleccionar una imagen del dispositivo (input file)
  b) Tomar foto con la cámara (navigator.mediaDevices)
- Una vez que tenga la imagen:
  a) Muestra un preview de la imagen
  b) Llama al API route con la imagen en base64
  c) Muestra un loading indicator mientras procesa
  d) Pre-llena el formulario de nuevo producto con los datos detectados
  e) El admin puede editar antes de guardar

Usa los componentes UI existentes (Dialog, Button, etc.) de src/components/ui/.
El proyecto ya tiene @genkit-ai/googleai y genkit instalados."
```

### Paso 4: Revisar la implementación

Gemini habrá creado/modificado varios archivos. Revísalos:

```bash
gemini "Dame un resumen de todos los archivos que creaste o modificaste 
para la feature de upload con AI. Para cada uno, explícame:
1. Qué hace
2. Cómo se conecta con los demás
3. Si hay algo que deba revisar manualmente"
```

| Archivo | Propósito |
|---------|-----------|
| `src/ai/analyze-product.ts` | Flow de Genkit para analizar imagen |
| `src/app/api/analyze-product/route.ts` | API route para el frontend |
| `src/components/kiddie-mart/admin/UploadProductModal.tsx` | Modal de upload |
| `src/components/kiddie-mart/admin/ProductManagement.tsx` | Botón de upload agregado |

### Paso 5: Probar la feature

1. Entra como **Admin** en la app
2. Ve a la sección de **Productos**
3. Haz clic en **"📸 Upload con AI"**
4. Sube una imagen de un producto (fruta, snack, juguete, etc.)
5. Espera a que la AI analice la imagen
6. Verifica que el formulario se pre-llena con datos razonables
7. Ajusta el nombre/precio si es necesario
8. Guarda el producto

Verificar:

- [ ] El modal de upload aparece correctamente
- [ ] Se puede seleccionar una imagen del dispositivo
- [ ] Se muestra un preview de la imagen
- [ ] La AI retorna nombre, categoría, precio y emoji
- [ ] El formulario se pre-llena con los datos de la AI
- [ ] Se puede editar antes de guardar
- [ ] El producto se guarda exitosamente

<aside class="positive">
Si la detección no es perfecta, no te preocupes. Los modelos de Vision son buenos pero no perfectos, por eso el flujo permite editar antes de guardar.
</aside>

Si la API falla:

```bash
gemini "La llamada al API de analyze-product falla con error 401. 
¿Cómo puedo verificar que la API Key de Google AI está siendo 
leída correctamente en el server-side?"
```

## Reto 11: Nueva Feature — Guardar Datos en Firebase
Duration: 0:30

En el último reto del workshop, vas a migrar el almacenamiento de datos de **IndexedDB** (local) a **Firebase Firestore** (cloud). Esto permite que los datos se compartan entre dispositivos y se persistan en la nube.

### Lo que construirás

- Configuración de **Firebase** en el proyecto
- Servicio de **Firestore** que replique las funciones de IndexedDB
- **Migración** del contexto para usar el nuevo servicio
- **Fallback** a IndexedDB cuando Firebase no esté disponible

### Paso 1: Crear proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Haz clic en **"Crear un proyecto"**
3. Nombre: `kiddie-mart-workshop` (o similar)
4. Desactiva Google Analytics (no es necesario para el workshop)
5. Haz clic en **Crear**

**Crear app web:**

1. En el proyecto, haz clic en el ícono **Web** (`</>`)
2. Nombre de la app: `kiddie-mart`
3. **No** actives Firebase Hosting por ahora
4. Copia la configuración de Firebase que te muestra

**Crear base de datos Firestore:**

1. En el menú lateral, ve a **Firestore Database**
2. Haz clic en **Crear base de datos**
3. Selecciona **modo de prueba** (permite lectura/escritura sin autenticación)
4. Elige la ubicación más cercana

<aside class="negative">
El modo de prueba es solo para el workshop. En producción, siempre configura reglas de seguridad adecuadas en Firestore.
</aside>

### Paso 2: Configurar Firebase en el proyecto

Pide a Gemini CLI que configure Firebase:

```bash
gemini "Necesito configurar Firebase en el proyecto. Ya tengo:
- firebase como dependencia en package.json
- Un proyecto en Firebase Console con Firestore habilitado

Necesito que:
1. Crees un archivo src/lib/firebase.ts con la configuración del SDK
2. Use variables de entorno de .env.local para los valores sensibles:
   - NEXT_PUBLIC_FIREBASE_API_KEY
   - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   - NEXT_PUBLIC_FIREBASE_PROJECT_ID
   - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   - NEXT_PUBLIC_FIREBASE_APP_ID
3. Exporte la instancia de la app y de Firestore
4. Maneja el caso donde las variables no están configuradas 
   (para no romper la app si alguien no tiene Firebase)"
```

Agrega tus credenciales de Firebase al archivo `.env.local`:

```bash
gemini "Dame el template de variables de entorno que necesito agregar 
a .env.local para Firebase, con comentarios explicando cada una"
```

### Paso 3: Analizar el servicio actual de IndexedDB

Antes de crear el servicio de Firestore, entiende el servicio actual:

```bash
gemini "Analiza src/lib/indexedDbService.ts y dame:
1. Lista de todas las funciones exportadas
2. Para cada función: parámetros, retorno, y qué hace
3. Qué colecciones/stores maneja
4. El esquema de datos (qué campos tiene cada entidad)

Necesito esta información para crear un servicio equivalente en Firestore."
```

Gemini debería identificar funciones como:
- `openDB()` — Inicializar la base de datos
- `getAllProducts()` / `addProductDB()` / `updateProductDB()` / `deleteProductDB()`
- `getAllSalesHistory()` / `addSaleRecordDB()`
- `getAllAccounts()` / `addAccountDB()` / `updateAccountDB()`
- `bulkAddProductsDB()` / `bulkAddSalesHistoryDB()`

### Paso 4: Crear el servicio de Firestore

Ahora, pide la implementación:

```bash
gemini "Crea un nuevo archivo src/lib/firestoreService.ts que replique 
todas las funciones de indexedDbService.ts pero usando Firebase Firestore.

REQUISITOS:
1. Misma interfaz (mismos nombres de funciones, mismos parámetros y retornos)
2. Colecciones en Firestore:
   - 'products' para productos
   - 'salesHistory' para historial de ventas
   - 'accounts' para cuentas de wallet
3. Los IDs de documentos deben ser los mismos IDs que usan las entidades
4. Usar los tipos existentes de src/types/kiddieMart.ts
5. Manejar errores gracefully
6. Si Firebase no está inicializado, las funciones deben lanzar un error 
   descriptivo (no fallar silenciosamente)

TAMBIÉN necesito que:
7. Crees un archivo src/lib/storageService.ts que actúe como 'switch':
   - Si Firebase está configurado → usa firestoreService
   - Si Firebase NO está configurado → usa indexedDbService
   - Exporta las mismas funciones con la misma interfaz
   - Este será el servicio que importe KiddieMartContext

8. Actualiza src/context/KiddieMartContext.tsx para importar desde 
   storageService.ts en lugar de indexedDbService.ts directamente"
```

### Paso 5: Revisar la implementación

Revisa todos los archivos creados/modificados:

```bash
gemini "Muéstrame un diagrama de cómo se conectan ahora los servicios:
1. KiddieMartContext.tsx
2. storageService.ts (switch)
3. firestoreService.ts (cloud)
4. indexedDbService.ts (local)
5. firebase.ts (config)

¿El fallback funciona correctamente si quito las variables de Firebase?"
```

Diagrama esperado:

```
KiddieMartContext.tsx
        ↓
  storageService.ts
      ↙        ↘
firestoreService  indexedDbService
      ↓
  firebase.ts
      ↓
  Firebase Cloud
```

### Paso 6: Probar la integración

**Prueba 1: Con Firebase configurado**

1. Asegúrate de que `.env.local` tiene las credenciales de Firebase
2. Reinicia el servidor de desarrollo (`make dev`)
3. Entra como **Admin** y agrega un producto
4. Ve a **Firebase Console** → **Firestore** → colección `products`
5. Verifica que el producto aparece en Firestore 🎉

**Prueba 2: Sin Firebase (fallback)**

1. Renombra `.env.local` a `.env.local.bak` temporalmente
2. Reinicia el servidor
3. La app debería funcionar normalmente usando IndexedDB
4. Renombra de vuelta `.env.local.bak` a `.env.local`

Verificar:

- [ ] Productos se guardan en Firestore
- [ ] Ventas se registran en Firestore
- [ ] Cuentas de wallet se guardan en Firestore
- [ ] Sin Firebase, la app usa IndexedDB como antes
- [ ] No hay errores en la consola

<aside class="positive">
¡Si las pruebas pasan, has migrado exitosamente toda la capa de datos a la nube con retrocompatibilidad completa!
</aside>

Si hay problemas de permisos:

```bash
gemini "La app se conecta a Firestore pero recibe un error de permisos. 
Las reglas de Firestore están en modo de prueba. ¿Qué puede estar mal?"
```

## ¡Felicitaciones!
Duration: 0:02

🎉 **¡Has completado todos los retos del workshop!** 🎉

### Resumen del Workshop

A lo largo de estos 11 retos aprendiste a:

| Habilidad | Retos |
|-----------|-------|
| Instalación y configuración | 1, 2 |
| Generación de documentación | 3, 4, 5 |
| Setup de proyecto | 5, 6 |
| Debugging con AI | 7, 8 |
| Implementación de features | 9, 10, 11 |
| Integración de servicios | 10, 11 |

### Lo que creaste

- `GEMINI.md` — Contexto del proyecto para AI
- `README.md` — Documentación profesional
- `docs/ONBOARDING.md` — Guía de onboarding para desarrolladores
- `Makefile` — Task runner con todos los comandos del proyecto
- Sistema de **temas** con selector visual
- **Upload de productos con AI Vision**
- Integración con **Firebase Firestore** con fallback local

### Recursos adicionales

- [Documentación de Gemini CLI](https://ai.google.dev/gemini-api/docs)
- [Firebase Firestore Docs](https://firebase.google.com/docs/firestore)
- [Genkit Documentation](https://firebase.google.com/docs/genkit)
- [Next.js Documentation](https://nextjs.org/docs)

### ¡Gracias por participar! 🙏
