summary: Migrar el almacenamiento de IndexedDB a Firebase Firestore
id: feature-firebase
categories: AI, Developer Tools, Firebase, Cloud
environments: Web
status: Draft
feedback link: https://github.com/cprietorod/kiddie-mart/issues
authors: Carlos Prieto

# Reto 11: Nueva Feature — Guardar Datos en Firebase

## Introducción
Duration: 0:03

En el último reto del workshop, vas a migrar el almacenamiento de datos de **IndexedDB** (local) a **Firebase Firestore** (cloud). Esto permite que los datos se compartan entre dispositivos y se persistan en la nube.

### Lo que construirás

- Configuración de **Firebase** en el proyecto
- Servicio de **Firestore** que replique las funciones de IndexedDB
- **Migración** del contexto para usar el nuevo servicio
- **Fallback** a IndexedDB cuando Firebase no esté disponible

### Lo que aprenderás

- Cómo migrar entre servicios de almacenamiento con AI
- Cómo mantener retrocompatibilidad con fallback
- Cómo refactorizar servicios completos con Gemini CLI
- Configuración de Firebase para apps web

### Lo que necesitas

- App corriendo con features anteriores
- Cuenta de Firebase (gratuita)
- Familiaridad básica con bases de datos NoSQL

## Crear proyecto en Firebase
Duration: 0:05

### Paso 1: Crear proyecto

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Haz clic en **"Crear un proyecto"**
3. Nombre: `kiddie-mart-workshop` (o similar)
4. Desactiva Google Analytics (no es necesario para el workshop)
5. Haz clic en **Crear**

### Paso 2: Crear app web

1. En el proyecto, haz clic en el ícono **Web** (`</>`)
2. Nombre de la app: `kiddie-mart`
3. **No** actives Firebase Hosting por ahora
4. Copia la configuración de Firebase que te muestra

### Paso 3: Crear base de datos Firestore

1. En el menú lateral, ve a **Firestore Database**
2. Haz clic en **Crear base de datos**
3. Selecciona **modo de prueba** (permite lectura/escritura sin autenticación)
4. Elige la ubicación más cercana

Negative
: El modo de prueba es solo para el workshop. En producción, siempre configura reglas de seguridad adecuadas en Firestore.

## Configurar Firebase en el proyecto
Duration: 0:05

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

### Configurar .env.local

Agrega tus credenciales de Firebase al archivo `.env.local`:

```bash
gemini "Dame el template de variables de entorno que necesito agregar 
a .env.local para Firebase, con comentarios explicando cada una"
```

Copia el template y reemplaza con tus valores reales del paso anterior.

## Analizar el servicio actual de IndexedDB
Duration: 0:03

Antes de crear el servicio de Firestore, entiende el servicio actual:

```bash
gemini "Analiza src/lib/indexedDbService.ts y dame:
1. Lista de todas las funciones exportadas
2. Para cada función: parámetros, retorno, y qué hace
3. Qué colecciones/stores maneja
4. El esquema de datos (qué campos tiene cada entidad)

Necesito esta información para crear un servicio equivalente en Firestore."
```

### Funciones a migrar

Gemini debería identificar funciones como:
- `openDB()` — Inicializar la base de datos
- `getAllProducts()` / `addProductDB()` / `updateProductDB()` / `deleteProductDB()`
- `getAllSalesHistory()` / `addSaleRecordDB()`
- `getAllAccounts()` / `addAccountDB()` / `updateAccountDB()`
- `bulkAddProductsDB()` / `bulkAddSalesHistoryDB()`

## Crear el servicio de Firestore
Duration: 0:10

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

## Revisar la implementación
Duration: 0:05

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

### Diagrama esperado

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

## Probar la integración
Duration: 0:07

### Prueba 1: Con Firebase configurado

1. Asegúrate de que `.env.local` tiene las credenciales de Firebase
2. Reinicia el servidor de desarrollo (`make dev`)
3. Entra como **Admin** y agrega un producto
4. Ve a **Firebase Console** → **Firestore** → colección `products`
5. Verifica que el producto aparece en Firestore 🎉

### Prueba 2: Sin Firebase (fallback)

1. Renombra `.env.local` a `.env.local.bak` temporalmente
2. Reinicia el servidor
3. La app debería funcionar normalmente usando IndexedDB
4. Renombra de vuelta `.env.local.bak` a `.env.local`

### Verificar

- [ ] Productos se guardan en Firestore
- [ ] Ventas se registran en Firestore
- [ ] Cuentas de wallet se guardan en Firestore
- [ ] Sin Firebase, la app usa IndexedDB como antes
- [ ] No hay errores en la consola

Positive
: ¡Si las pruebas pasan, has migrado exitosamente toda la capa de datos a la nube con retrocompatibilidad completa!

### ¿Problemas?

```bash
gemini "La app se conecta a Firestore pero recibe un error de permisos. 
Las reglas de Firestore están en modo de prueba. ¿Qué puede estar mal?"
```

## ¡Felicitaciones!
Duration: 0:00

🎉 **¡Has completado todos los retos del workshop!** 🎉

### Lo que aprendiste en este reto
- Cómo migrar servicios de datos completos con AI
- Cómo implementar el patrón de fallback
- Cómo configurar Firebase Firestore
- Cómo mantener retrocompatibilidad

### Lo que construiste
- `firebase.ts` — Configuración de Firebase
- `firestoreService.ts` — Servicio de datos en la nube
- `storageService.ts` — Switch inteligente entre local y cloud
- Migración completa del `KiddieMartContext`

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

### Recursos adicionales

- [Documentación de Gemini CLI](https://ai.google.dev/gemini-api/docs)
- [Firebase Firestore Docs](https://firebase.google.com/docs/firestore)
- [Genkit Documentation](https://firebase.google.com/docs/genkit)
- [Next.js Documentation](https://nextjs.org/docs)

### ¡Gracias por participar! 🙏
