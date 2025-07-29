import React, { createContext, useContext, useState, ReactNode } from "react";
import { Document } from "../domain/document";

interface DocumentContextValue {
  documents: Document[];
  addDocument: (doc: Document) => void;
  setDocuments: (docs: Document[]) => void;
  sortBy: (key: "name" | "version" | "createdAt") => void;
}

const DocumentContext = createContext<DocumentContextValue | undefined>(undefined);

export function DocumentProvider({ children }: { children: ReactNode }) {
  const [documents, setDocumentsState] = useState<Document[]>([]);
  const [sortKey, setSortKey] = useState<"name" | "version" | "createdAt">("createdAt");

  function sortBy(key: "name" | "version" | "createdAt") {
    setSortKey(key);
    setDocumentsState(prev => {
      const sorted = [...prev].sort((a, b) => {
        if (key === "name") return a.name.localeCompare(b.name);
        if (key === "version") return b.version - a.version;
        if (key === "createdAt") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return 0;
      });
      return sorted;
    });
  }

  function setDocuments(docs: Document[]) {
    setDocumentsState(docs);
  }

  function addDocument(doc: Document) {
    setDocumentsState(prev => [doc, ...prev]);
  }

  return (
    <DocumentContext.Provider value={{ documents, addDocument, setDocuments, sortBy }}>
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocuments() {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error("useDocuments must be used within a DocumentProvider");
  }
  return context;
}