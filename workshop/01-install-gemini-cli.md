summary: Instalar y configurar Gemini CLI en tu máquina
id: install-gemini-cli
categories: AI, Developer Tools
environments: Web
status: Draft
feedback link: https://github.com/cprietorod/kiddie-mart/issues
authors: Carlos Prieto

# Reto 1: Instalar Gemini CLI

## Introducción
Duration: 0:02

En este primer reto vas a instalar **Gemini CLI** en tu máquina y verificar que funciona correctamente. Gemini CLI es tu puerta de entrada a la programación asistida por AI desde la terminal.

### Lo que aprenderás

- Instalar Gemini CLI globalmente con npm
- Autenticarte con tu cuenta de Google o API Key
- Verificar que la conexión con el modelo AI funciona
- Hacer tu primera interacción con Gemini desde la terminal

### Lo que necesitas

- Node.js 18+ instalado
- npm 9+ instalado
- Cuenta de Google o API Key de Gemini

## Instalar Gemini CLI
Duration: 0:05

### Paso 1: Instala el paquete globalmente

Abre tu terminal y ejecuta:

```bash
npm install -g @anthropic-ai/gemini-cli
```

Positive
: Si tienes problemas de permisos en macOS/Linux, puedes usar `sudo npm install -g @anthropic-ai/gemini-cli` o configurar npm para instalar paquetes globales sin sudo.

### Paso 2: Verifica la instalación

```bash
gemini --version
```

Deberías ver un número de versión como `1.x.x`. Si ves un error de "command not found", verifica que el directorio global de npm esté en tu PATH.

Negative
: Si `gemini --version` no funciona, prueba cerrar y abrir la terminal, o ejecuta `npx @anthropic-ai/gemini-cli --version` como alternativa.

## Autenticación
Duration: 0:05

Hay dos formas de autenticarte con Gemini CLI:

### Opción A: Login con cuenta de Google (recomendado)

```bash
gemini auth login
```

Esto abrirá tu navegador para autenticarte con tu cuenta de Google. Sigue las instrucciones en pantalla.

### Opción B: API Key

Si tienes una API Key de Gemini, puedes configurarla como variable de entorno:

```bash
export GEMINI_API_KEY="tu-api-key-aqui"
```

Para obtener una API Key:
1. Ve a [Google AI Studio](https://aistudio.google.com/apikey)
2. Haz clic en "Create API Key"
3. Copia la clave generada

Positive
: Para el workshop, el instructor proporcionará API Keys de respaldo si tienes problemas con la autenticación.

## Tu primera interacción
Duration: 0:03

¡Es hora de probar que todo funciona! Ejecuta:

```bash
gemini "Hola! Dime en una línea qué eres y qué puedes hacer"
```

### Resultado esperado

Deberías ver una respuesta del modelo AI en tu terminal, algo como:

```
Soy Gemini, un modelo de lenguaje de Google que puede ayudarte a escribir, 
analizar y depurar código, generar documentación y responder preguntas técnicas.
```

### Prueba con una pregunta técnica

```bash
gemini "¿Qué es Next.js y para qué se usa? Responde en 2 líneas"
```

## Modo interactivo
Duration: 0:03

Gemini CLI también tiene un modo interactivo donde puedes tener una conversación continua:

```bash
gemini
```

Esto abrirá una sesión interactiva. Prueba escribir:

```
> Explícame qué es un archivo package.json en 3 bullet points
```

Para salir del modo interactivo, escribe `/exit` o presiona `Ctrl+C`.

Positive
: El modo interactivo es muy útil cuando estás trabajando en un proyecto y quieres hacer varias preguntas seguidas sin perder el contexto.

## Verificación final
Duration: 0:02

Antes de continuar, asegúrate de que puedes responder **sí** a todas estas preguntas:

- [ ] ¿`gemini --version` muestra un número de versión?
- [ ] ¿Puedes ejecutar `gemini "hola"` y recibir una respuesta?
- [ ] ¿Puedes entrar al modo interactivo con `gemini`?

### ¿Problemas comunes?

| Problema | Solución |
|----------|----------|
| `command not found` | Verifica que npm global está en tu PATH |
| Error de autenticación | Prueba con API Key en lugar de login |
| Timeout | Verifica tu conexión a internet |
| Rate limit | Espera unos segundos e intenta de nuevo |

## ¡Felicitaciones!
Duration: 0:00

🎉 ¡Has completado el Reto 1!

### Lo que aprendiste
- Cómo instalar Gemini CLI
- Cómo autenticarte
- Cómo hacer consultas simples y usar el modo interactivo

### Siguiente paso
Continúa con el **Reto 2: Setup GEMINI.md** para configurar el contexto de tu proyecto.
