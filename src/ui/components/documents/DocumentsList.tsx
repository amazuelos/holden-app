import React from "react";
import { useDocumentContext } from "../../../context/DocumentContext";

export default function DocumentsList() {
  const { documents } = useDocumentContext();

  if (documents.length === 0) return <p>No hay documentos para mostrar</p>;

  return (
    <ul>
      {documents.map((doc) => (
        <li key={doc.ID} className="border p-2 mb-2">
          <h2 className="font-semibold">{doc.Title}</h2>
          <p>Versión: {doc.Version}</p>
          <p>Creado: {new Date(doc.CreatedAt).toLocaleDateString()}</p>
          <p>Contribuyentes: {doc.Contributors.map(c => c.Name).join(", ")}</p>
        </li>
      ))}
    </ul>
  );
}
