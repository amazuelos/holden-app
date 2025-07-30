import { loadDocuments } from "../app/useCases/fetchDocuments";
import { createDocumentSocket } from "../infrastructure/websocket/documentSocket";
import { Document } from "../domain/document";
import { createContext, useContext, useEffect, useState, useMemo } from "react";

interface DocumentContextType {
  documents: Document[];
  sortedDocuments: Document[];
  addDocument: (doc: Document) => void;
  sortBy: "name" | "version" | "createdAt";
  setSortBy: (s: "name" | "version" | "createdAt") => void;
  isColumnView: boolean;
  setIsColumnView: (b: boolean) => void;
}

export const DocumentContext = createContext<DocumentContextType | null>(null);

export const DocumentProvider = ({ children }: { children: React.ReactNode }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [sortBy, setSortBy] = useState<"name" | "version" | "createdAt">("createdAt");
  const [isColumnView, setIsColumnView] = useState(false);

  const addDocument = (doc: Document) => {
    setDocuments((prev) => [...prev, doc]);
  };

  useEffect(() => {
    loadDocuments()
      .then(setDocuments)
      .catch(console.error);

    const socket = createDocumentSocket((notification) => {
      console.log("New document created by other user", notification);
    });

    return () => socket.close();
  }, []);

  // Aquí es donde ordenamos la lista según el sortBy y documentos actualizados
  const sortedDocuments = useMemo(() => {
    return [...documents].sort((a, b) => {
      if (sortBy === "name") return a.Title.localeCompare(b.Title);
      if (sortBy === "version") return a.Version.localeCompare(b.Version);
      if (sortBy === "createdAt") return new Date(a.CreatedAt).getTime() - new Date(b.CreatedAt).getTime();
      return 0;
    });
  }, [documents, sortBy]);

  return (
    <DocumentContext.Provider
      value={{
        documents,
        sortedDocuments,
        addDocument,
        sortBy,
        setSortBy,
        isColumnView,
        setIsColumnView,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export function useDocumentContext() {
  const ctx = useContext(DocumentContext);
  if (!ctx) throw new Error("Must be used within DocumentProvider");
  return ctx;
}
