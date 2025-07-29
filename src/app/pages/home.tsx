// src/app/pages/home.tsx
import React from "react";
import { DocumentProvider } from "../../context/DocumentContext";
import DocumentsList from "../../ui/components/documents/DocumentsList";

export default function Home() {
  return (
    <DocumentProvider>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Documents</h1>
        <DocumentsList />
      </div>
    </DocumentProvider>
  );
}
