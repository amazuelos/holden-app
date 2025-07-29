import React, { useState } from "react";
import { useDocumentContext } from "../../../context/DocumentContext";
import DocumentCard from "./DocumentCard";

export default function DocumentsList() {
  const { documents } = useDocumentContext();
  const [isColumnView, setIsColumnView] = useState(true); // control de vista

  if (documents.length === 0) return <p>No hay documentos para mostrar</p>;

  return (
    <div className={`grid ${
      isColumnView ? "grid-cols-3 gap-4" : "grid-rows-1 gap-4"
      }`}>
      {/* Aquí podrías añadir el botón/icono que cambia isColumnView */}

      {documents.map((doc) => (
        <DocumentCard
          key={doc.ID}
          Title={doc.Title}
          Version={doc.Version}
          Contributors={doc.Contributors}
          Attachments={doc.Attachments}
          isColumnView={isColumnView}
        />
      ))}
      <button className="border w-full px-6 py-8 bg-gray-200 text-blue-400 rounded">
        + Add document
      </button>
    </div>
  );
}
