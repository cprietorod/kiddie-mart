summary: Visión general del workshop de Gemini CLI con Kiddie Mart
id: gemini-cli-kiddie-mart-overview
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

Positive
: Cada reto es independiente pero se recomienda seguir el orden. Los retos del Módulo 4 son los más avanzados.

## ¡Comencemos!
Duration: 0:01

El código del proyecto está en el repositorio **kiddie-mart**. Si aún no lo has clonado:

```bash
git clone <URL_DEL_REPOSITORIO>
cd kiddie-mart
git checkout workshop-start
```

Positive
: Asegúrate de estar en la rama `workshop-start`. Esta rama tiene todo configurado para el workshop, incluyendo algunos bugs que resolverás más adelante 😉

¡Dirígete al **Reto 1: Instalar Gemini CLI** para comenzar!
