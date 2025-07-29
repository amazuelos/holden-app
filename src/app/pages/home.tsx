// src/app/pages/home.tsx
import React from "react";
import { DocumentProvider } from "../../context/DocumentContext";
import DocumentsList from "../../ui/components/documents/DocumentsList";
import DocumentSort from "../../ui/components/documents/DocumentSort";

export default function Home() {
  return (
    <DocumentProvider>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Documents</h1>
          <DocumentSort />
        </div>
        <DocumentsList />
      </div>
    </DocumentProvider>
  );
}