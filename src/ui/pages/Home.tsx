import React from "react";
import { DocumentList } from "../components/DocumentList";
import { useFetchDocuments } from "../../app/useCases/fetchDocuments";

export function Home() {
  useFetchDocuments();

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Documents</h1>
      <DocumentList />
    </main>
  );
}