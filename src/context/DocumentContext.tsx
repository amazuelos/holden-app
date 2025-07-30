import { loadDocuments } from "../app/useCases/fetchDocuments";
import { createDocumentSocket } from "../infrastructure/websocket/documentSocket";
import { Document } from "../domain/document";
import { createContext, useContext, useEffect, useState, useMemo, useRef } from "react";

interface DocumentContextType {
  documents: Document[];
  sortedDocuments: Document[];
  addDocument: (doc: Document) => void;
  sortBy: "name" | "version" | "createdAt";
  setSortBy: (s: "name" | "version" | "createdAt") => void;
  isColumnView: boolean;
  setIsColumnView: (b: boolean) => void;
  notification: string | null;
  setNotification: (msg: string | null) => void;
}

export const DocumentContext = createContext<DocumentContextType | null>(null);

export const DocumentProvider = ({ children }: { children: React.ReactNode }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [sortBy, setSortBy] = useState<"name" | "version" | "createdAt">("createdAt");
  const [isColumnView, setIsColumnView] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // UseRef to track which document IDs have been notified to avoid duplicates
  const notifiedDocs = useRef<Set<string>>(new Set());

  const addDocument = (doc: Document) => {
    setDocuments((prev) => [...prev, doc]);
  };

  useEffect(() => {
    loadDocuments()
      .then(setDocuments)
      .catch(console.error);

    const socket = createDocumentSocket((notificationData) => {
      setNotification(`A new document "${notificationData.DocumentTitle}" has been added by another user.`);
      setTimeout(() => setNotification(null), 3000);
    });

    return () => socket.close();
  }, []);

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
        notification,
        setNotification,
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