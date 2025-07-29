import React from "react";
import { useDocuments } from "../../context/DocumentContext";

export function DocumentList() {
  const { documents } = useDocuments();

  if (documents.length === 0) return <p>No documents</p>;

  return (
    <ul className="space-y-4">
      {documents.map(doc => (
        <li key={doc.id} className="border rounded p-4 bg-white shadow">
          <h3 className="font-bold text-lg">{doc.name} (v{doc.version})</h3>
          <p>Contributors: {doc.contributors.join(", ")}</p>
          <p>Created: {new Date(doc.createdAt).toLocaleString()}</p>
          <p>Attachments: {doc.attachments.length}</p>
        </li>
      ))}
    </ul>
  );
}