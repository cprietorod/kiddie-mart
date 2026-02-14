summary: Crear documentación de onboarding para nuevos desarrolladores
id: onboarding-docs
categories: AI, Developer Tools, Documentation
environments: Web
status: Draft
feedback link: https://github.com/cprietorod/kiddie-mart/issues
authors: Carlos Prieto

# Reto 4: Crear la Documentación de Onboarding

## Introducción
Duration: 0:02

La documentación de onboarding es crucial para que nuevos desarrolladores puedan contribuir rápidamente a un proyecto. En este reto, usarás Gemini CLI para generar una guía completa que explique la arquitectura, patrones de diseño y flujos principales de Kiddie Mart.

### Lo que aprenderás

- Cómo usar Gemini CLI para documentar arquitectura de software
- Cómo hacer que AI comprenda y explique patrones de diseño existentes
- Cómo generar documentación técnica detallada a partir de código fuente

### Lo que necesitas

- Gemini CLI con `GEMINI.md` configurado (Retos 1-2)
- Entendimiento básico de React (Context API, hooks)

## Analizar la arquitectura primero
Duration: 0:05

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

Positive
: Gemini CLI puede leer múltiples archivos y darte un panorama completo de la arquitectura. Esto es mucho más rápido que leer todo el código manualmente.

### Resultado esperado

Deberías obtener un análisis que describe:
- `KiddieMartContext` como el estado central de la app
- `KiddieMartProvider` como el proveedor que envuelve la app
- Hooks como `useKiddieMart` para acceder al estado
- `indexedDbService` como capa de persistencia

## Generar la documentación de Onboarding
Duration: 0:10

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

## Revisar y completar
Duration: 0:05

Revisa el archivo generado:

```bash
cat docs/ONBOARDING.md
```

### Verifica la calidad

- [ ] ¿Los comandos de instalación son correctos?
- [ ] ¿La descripción de la arquitectura refleja el código real?
- [ ] ¿Los nombres de archivos y carpetas son correctos?
- [ ] ¿Los ejemplos de código son funcionales?

### Pide mejoras si es necesario

```bash
gemini "En el docs/ONBOARDING.md, necesito que la sección de Arquitectura 
incluya un diagrama mermaid que muestre la relación entre:
- App Layout → KiddieMartProvider → Componentes hijos
- KiddieMartContext → indexedDbService → IndexedDB
Actualiza esa sección."
```

Negative
: No confíes ciegamente en la documentación generada. Siempre verifica que los nombres de archivos, rutas y comandos sean correctos revisando el código fuente real.

## Probar la documentación
Duration: 0:03

La mejor forma de validar documentación de onboarding es seguirla paso a paso como si fueras un desarrollador nuevo:

```bash
gemini "Lee el docs/ONBOARDING.md que creamos y verifica que:
1. Todos los archivos mencionados realmente existen en el proyecto
2. Los comandos listados son correctos según package.json
3. Los nombres de componentes y funciones coinciden con el código
Dime si encuentras alguna inconsistencia."
```

Positive
: ¡Usar Gemini CLI para verificar documentación que fue generada por Gemini CLI! Esta es una técnica útil de validación cruzada.

## ¡Felicitaciones!
Duration: 0:00

🎉 ¡Has completado el Reto 4!

### Lo que aprendiste
- Cómo generar documentación de arquitectura detallada
- Cómo hacer que AI analice patrones de diseño en código
- Cómo validar documentación generada

### Lo que creaste
- `docs/ONBOARDING.md` — guía completa de onboarding

### Siguiente paso
Continúa con el **Reto 5: Setup Conductor** para crear un sistema de tareas para el proyecto.
