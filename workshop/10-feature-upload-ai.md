summary: Crear un sistema de upload de productos con detección de metadata por AI
id: feature-upload-ai
categories: AI, Developer Tools, Machine Learning
environments: Web
status: Draft
feedback link: https://github.com/cprietorod/kiddie-mart/issues
authors: Carlos Prieto

# Reto 10: Nueva Feature — Upload de Productos con AI

## Introducción
Duration: 0:03

¡Este es el reto más innovador del workshop! Vas a crear un sistema donde el administrador puede **subir una foto de un producto** y la AI de Google (Gemini Vision) detecta automáticamente el nombre, categoría y precio sugerido.

### Lo que construirás

- Botón **"Upload con AI"** en el panel de administración de productos
- Modal para **subir imagen o tomar foto con la cámara**
- Llamada a **Gemini Vision** para analizar la imagen
- **Pre-llenado automático** del formulario de nuevo producto
- Flujo completo: foto → AI → formulario → guardar

### Lo que aprenderás

- Cómo integrar AI Vision en una app Next.js
- Cómo usar Genkit para llamar a modelos de AI
- Cómo manejar upload de imágenes en el browser
- Prompting para vision/multimodal AI

### Lo que necesitas

- App corriendo sin bugs
- API Key de Google AI (Gemini API)
- Conocimiento básico de APIs REST

## Entender la infraestructura AI existente
Duration: 0:05

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

### Lo que descubrirás

- El proyecto usa `genkit` y `@genkit-ai/googleai`
- Hay configuración base en `src/ai/`
- Se necesita configurar la API Key de Google AI
- Genkit maneja las llamadas al modelo de Gemini

Positive
: Genkit simplifica enormemente las llamadas a modelos de AI. En lugar de manejar HTTP requests manualmente, defines "flows" y el framework se encarga del resto.

## Configurar la API Key
Duration: 0:03

Para que Gemini Vision funcione, necesitas una API Key:

1. Ve a [Google AI Studio](https://aistudio.google.com/apikey)
2. Copia tu API Key
3. Crea o edita el archivo `.env.local` en la raíz del proyecto:

```bash
echo "GOOGLE_GENAI_API_KEY=tu-api-key-aqui" >> .env.local
```

Negative
: Nunca commits tu API Key al repositorio. El archivo `.env.local` ya está en `.gitignore`.

### Verificar con Gemini CLI

```bash
gemini "Revisa el archivo .env.local y verifica que la variable 
GOOGLE_GENAI_API_KEY está configurada. No me muestres el valor, 
solo confirma que existe."
```

## Implementar el flow de AI Vision
Duration: 0:10

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

## Revisar la implementación
Duration: 0:05

Gemini habrá creado/modificado varios archivos. Revísalos:

```bash
gemini "Dame un resumen de todos los archivos que creaste o modificaste 
para la feature de upload con AI. Para cada uno, explícame:
1. Qué hace
2. Cómo se conecta con los demás
3. Si hay algo que deba revisar manualmente"
```

### Archivos esperados

| Archivo | Propósito |
|---------|-----------|
| `src/ai/analyze-product.ts` | Flow de Genkit para analizar imagen |
| `src/app/api/analyze-product/route.ts` | API route para el frontend |
| `src/components/kiddie-mart/admin/UploadProductModal.tsx` | Modal de upload |
| `src/components/kiddie-mart/admin/ProductManagement.tsx` | Botón de upload agregado |

## Probar la feature
Duration: 0:07

### Prueba con una imagen de producto

1. Entra como **Admin** en la app
2. Ve a la sección de **Productos**
3. Haz clic en **"📸 Upload con AI"**
4. Sube una imagen de un producto (fruta, snack, juguete, etc.)
5. Espera a que la AI analice la imagen
6. Verifica que el formulario se pre-llena con datos razonables
7. Ajusta el nombre/precio si es necesario
8. Guarda el producto

### Verificar resultados

- [ ] El modal de upload aparece correctamente
- [ ] Se puede seleccionar una imagen del dispositivo
- [ ] Se muestra un preview de la imagen
- [ ] La AI retorna nombre, categoría, precio y emoji
- [ ] El formulario se pre-llena con los datos de la AI
- [ ] Se puede editar antes de guardar
- [ ] El producto se guarda exitosamente

Positive
: Si la detección no es perfecta, no te preocupes. Los modelos de Vision son buenos pero no perfectos, por eso el flujo permite editar antes de guardar.

### ¿Errores?

Si la API falla:

```bash
gemini "La llamada al API de analyze-product falla con error 401. 
¿Cómo puedo verificar que la API Key de Google AI está siendo 
leída correctamente en el server-side?"
```

## ¡Felicitaciones!
Duration: 0:00

🎉 ¡Has completado el Reto 10!

### Lo que aprendiste
- Cómo integrar Gemini Vision en una app Next.js
- Cómo crear flows con Genkit
- Cómo manejar upload de imágenes y llamadas a AI desde el frontend

### Lo que construiste
- Flow de AI Vision para análisis de productos
- API route para conectar frontend y backend
- Modal de upload con preview y pre-llenado de formulario

### Siguiente paso
¡Último reto! Continúa con el **Reto 11: Guardar Datos en Firebase** para migrar a la nube.
