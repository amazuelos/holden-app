interface DocumentNotification {
  Timestamp: string;
  UserID: string;
  UserName: string;
  DocumentID: string;
  DocumentTitle: string;
}

type Callback = (msg: DocumentNotification) => void;

export function createDocumentSocket(onMessage: Callback) {
  const interval = setInterval(() => {
    const fakeNotification: DocumentNotification = {
      Timestamp: new Date().toISOString(),
      UserID: "mock-user-id",
      UserName: "Mock User",
      DocumentID: "mock-doc-id",
      DocumentTitle: "Documento falso " + Math.floor(Math.random() * 100),
    };
    onMessage(fakeNotification);
  }, 5000);

  return {
    close() {
      clearInterval(interval);
    }
  };
}