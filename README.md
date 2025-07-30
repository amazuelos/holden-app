# Proyecto Document Manager - Frontend React

Este proyecto es una aplicación React que permite visualizar y gestionar documentos de un cliente, con soporte para notificaciones en tiempo real mediante WebSocket.

---

## Estructura del Proyecto

```
./src
├── App.tsx
├── main.tsx
├── index.css
├── assets
│   └── documents.json
├── context
│   └── DocumentContext.tsx
├── app
│   ├── pages
│   │   └── home.tsx
│   ├── useCases
│   │   └── fetchDocuments.ts
│   └── services
│       └── documentsApi.ts
├── domain
│   └── document.ts
├── infrastructure
│   ├── websocket
│   │   └── documentSocket.ts
│   └── api
│       └── documentApi.ts
├── ui
│   ├── components
│   │   ├── Notification.tsx
│   │   └── documents
│   │       ├── DocumentSort.tsx
│   │       ├── DocumentForm.tsx
│   │       ├── DocumentCard.tsx
│   │       └── DocumentsList.tsx
```

---

## Descripción General

* **Visualización de documentos**: La app muestra una lista o vista en grid con los documentos recientes.
* **Notificaciones en tiempo real**: Usa WebSocket para recibir alertas cuando otros usuarios crean documentos nuevos.
* **Creación de documentos**: Permite crear documentos en memoria en el frontend (no hay API para crear).
* **Ordenación**: Se pueden ordenar los documentos por nombre, versión o fecha de creación.

---

## Componentes Clave

### `src/context/DocumentContext.tsx`

* Define el contexto global que mantiene la lista de documentos, la ordenación, el modo de vista y la notificación.
* Integra el WebSocket para escuchar notificaciones de documentos nuevos.
* Evita notificar varias veces para el mismo documento usando un Set en `useRef`.
* Exporta el hook `useDocumentContext` para usar este contexto fácilmente en componentes.

### `src/infrastructure/websocket/documentSocket.ts`

* Manejador para abrir conexión WebSocket con el servidor.
* Escucha mensajes JSON que informan sobre documentos nuevos.
* Método `close()` para cerrar la conexión.

### `src/ui/components/Notification.tsx`

* Componente que muestra una notificación con un icono de campana y el número de documentos nuevos.
* La notificación desaparece automáticamente a los 3 segundos.
* Está centrada y con estilo sencillo, sin botón de cierre manual.

### `src/app/pages/home.tsx`

* Componente principal de la página Home.
* Usa el `DocumentProvider` para envolver toda la UI.
* Muestra:

  * El título y componente de ordenación (`DocumentSort`).
  * Formulario para crear documentos (`DocumentForm`).
  * Lista de documentos (`DocumentsList`).
  * Notificación que aparece al recibir alertas de documentos nuevos.

---

## Instalación y Ejecución

1. Clona el repositorio.
2. Instala dependencias:

```bash
npm install
```

3. Inicia la aplicación React:

```bash
npm run dev
```

4. Para el servidor WebSocket y API de pruebas, usa el servidor de pruebas proporcionado en el directorio `server` (según indicaciones del reto).



## Notas Técnicas y Consideraciones

* No se utiliza backend para creación de documentos, todo se maneja en memoria en el frontend.
* La conexión WebSocket solo escucha notificaciones, no crea documentos.
* Se evita mostrar notificaciones duplicadas para un mismo documento mediante control en contexto.
* Uso de TypeScript para tipos estrictos y seguridad.
* UI estilizada con Tailwind CSS.
* Sin uso de frameworks adicionales para websockets (socket.io, etc.).
* Uso de React Hooks para manejo de estado y efectos.
* Código modular y organizado para facilitar mantenimiento y escalabilidad.
* Incluye pruebas básicas (pueden ampliarse).

---

## Futuras Mejoras (Opcionales)

* Soporte offline.
* Notificaciones más avanzadas tipo "toast".
* Mostrar fechas en formato relativo ("hace 2 días").
* Integrar creación real de documentos con backend si estuviera disponible.
* Mejorar tests y añadir pruebas end-to-end.

---