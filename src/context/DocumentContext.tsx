import { loadDocuments } from "../app/useCases/fetchDocuments";
import { createDocumentSocket } from "../infrastructure/websocket/documentSocket";
import { Document } from "../domain/document";
import { createContext, useContext, useEffect, useState } from "react";

interface DocumentContextType {
  documents: Document[];
  addDocument: (doc: Document) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
}

export const DocumentContext = createContext<DocumentContextType | null>(null);

export const DocumentProvider = ({ children }: { children: React.ReactNode }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [sortBy, setSortBy] = useState<"name" | "version" | "createdAt">("createdAt");

  const addDocument = (doc: Document) => {
    setDocuments(prev => [...prev, doc]);
  };

  useEffect(() => {
    loadDocuments().then(setDocuments).catch(console.error);

    const socket = createDocumentSocket((notification) => {
      // Puedes usar DocumentID y DocumentTitle si quieres notificar.
      console.log("New document created by other user", notification);
      // No se agrega automáticamente el documento completo aquí (a no ser que se vuelva a pedir por ID).
    });

    return () => socket.close();
  }, []);

  return (
    <DocumentContext.Provider value={{ documents, addDocument, sortBy, setSortBy }}>
      {children}
    </DocumentContext.Provider>
  );
};

export function useDocumentContext() {
  const ctx = useContext(DocumentContext);
  if (!ctx) throw new Error("Must be used within DocumentProvider");
  return ctx;
}