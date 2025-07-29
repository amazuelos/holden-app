import { Document } from "../../domain/document";

const WS_URL = "ws://localhost:4000";

export function connectDocumentSocket(onNewDocument: (doc: Document) => void) {
  const socket = new WebSocket(WS_URL);

  socket.onopen = () => console.log("WebSocket connected");

  socket.onmessage = event => {
    const data = JSON.parse(event.data);
    if (data.type === "new_document") {
      onNewDocument(data.payload);
    }
  };

  socket.onerror = error => console.error("WebSocket error", error);

  socket.onclose = () => console.log("WebSocket closed");

  return socket;
}