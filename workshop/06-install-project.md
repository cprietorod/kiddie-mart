summary: Instalar dependencias y ejecutar Kiddie Mart en modo desarrollo
id: install-project
categories: AI, Developer Tools
environments: Web
status: Draft
feedback link: https://github.com/cprietorod/kiddie-mart/issues
authors: Carlos Prieto

# Reto 6: Instalar y Ejecutar el Proyecto

## Introducción
Duration: 0:01

Ahora que tienes tu task runner listo, es hora de instalar las dependencias y ejecutar Kiddie Mart. En este reto levantarás la app en modo desarrollo y explorarás sus funcionalidades.

### Lo que aprenderás

- Cómo instalar y ejecutar un proyecto Next.js
- Cómo explorar una app funcionando para entenderla mejor
- Cómo usar Gemini CLI para resolver problemas de instalación

### Lo que necesitas

- Makefile creado (Reto 5)
- Node.js 18+ y npm instalados

## Instalar dependencias
Duration: 0:05

Usa el Makefile para instalar:

```bash
make install
```

Esto ejecutará `npm install` e instalará todas las dependencias del proyecto.

Negative
: Si ves errores durante la instalación, es probable que tu versión de Node.js sea incompatible. Verifica con `node --version` que tienes la versión 18 o superior.

### ¿Problemas con la instalación?

Si la instalación falla, puedes pedir ayuda a Gemini CLI:

```bash
gemini "La instalación de npm falló con el siguiente error: [pega el error aquí]. 
¿Cómo puedo solucionarlo?"
```

Positive
: Gemini CLI es excelente para diagnosticar errores de instalación. Copia y pega el error completo para obtener la mejor respuesta.

## Ejecutar en modo desarrollo
Duration: 0:03

Inicia el servidor de desarrollo:

```bash
make dev
```

O si prefieres el comando directo:

```bash
npm run dev
```

### Resultado esperado

Deberías ver algo como:

```
▲ Next.js 15.2.3
- Local:        http://localhost:9002
- Environments: .env.local

✓ Starting...
✓ Ready in 3.2s
```

Abre tu navegador en **http://localhost:9002**.

## Explorar la aplicación
Duration: 0:07

Con la app corriendo, explora las funcionalidades principales:

### Pantalla de Login

La primera pantalla muestra dos opciones de rol:
- **👨‍💼 Admin** — Acceso al panel de administración
- **🧑‍💻 Staff** — Acceso al POS (Point of Sale)

### Como Staff (POS)

1. Selecciona el rol **Staff**
2. Verás el **grid de productos** (aquí podrías notar un bug visual 👀)
3. Haz clic en productos para agregar al carrito
4. El **carrito** aparece en el lado derecho
5. Prueba el proceso de **pago** (efectivo, tarjeta, QR)

### Como Admin

1. Vuelve al login y selecciona **Admin**
2. Explora el **Dashboard** con estadísticas
3. Ve a **Productos** para gestionar el inventario
4. Revisa el **Historial de Ventas**
5. Explora la **Gestión de Wallets** para pagos QR

Positive
: ¿Notaste algo raro con el layout de los productos? ¿O con la carga inicial de datos? ¡No te preocupes, son los bugs que resolverás en los próximos retos! 🐛

## Verificar el estado de la app
Duration: 0:02

Usa Gemini CLI para verificar que la app está funcionando correctamente:

```bash
gemini "La app está corriendo en http://localhost:9002. 
¿Puedes revisar el código y decirme:
1. ¿Qué roles de usuario existen?
2. ¿Cuántos productos debería tener por defecto?
3. ¿Qué métodos de pago están disponibles?
4. ¿La app soporta modo offline?"
```

## ¡Felicitaciones!
Duration: 0:00

🎉 ¡Has completado el Reto 6!

### Lo que aprendiste
- Cómo instalar y ejecutar un proyecto Next.js
- Las funcionalidades principales de Kiddie Mart
- Cómo usar Gemini CLI para resolver problemas de instalación

### Lo que observaste
- La app tiene algunos **bugs visuales** que resolverás en los retos 7 y 8

### Siguiente paso
Continúa con el **Reto 7: Resolver Bug en Load State** — ¡es hora de usar Gemini CLI para debugging!
