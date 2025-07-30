type Callback = (msg: DocumentNotification) => void;

export function createDocumentSocket(onMessage: Callback) {
  // Simula notificaciones cada 5 segundos
  const interval = setInterval(() => {
    const fakeNotification: DocumentNotification = {
      Timestamp: new Date().toISOString(),
      UserID: "mock-user-id",
      UserName: "Mock User",
      DocumentID: "mock-doc-id",
      DocumentTitle: "Documento falso " + Math.floor(Math.random() * 100),
    };
    onMessage(fakeNotification);
  }, 10000);

  return {
    close() {
      clearInterval(interval);
    },
  };
}
