import { useState } from "react";
import { DocumentProvider } from "../../context/DocumentContext";
import DocumentForm from "../../ui/components/documents/DocumentForm";
import DocumentsList from "../../ui/components/documents/DocumentsList";
import DocumentSort from "../../ui/components/documents/DocumentSort";
import Notification from "../../ui/components/Notification"; // ajusta la ruta si es distinta

import { useDocumentContext } from "../../context/DocumentContext";

function HomeContent() {
  const { addDocument, notification, setNotification } = useDocumentContext();
  const [showForm, setShowForm] = useState(false);

  const handleAddDocument = (doc: any) => {
    addDocument(doc);
    setShowForm(false);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <Notification count={notification ? 1 : 0} onClose={() => setNotification(null)} />
      <div className="flex flex-col items-center justify-between mb-4 w-full">
        <h1 className="text-3xl font-bold">Documents</h1>
        <DocumentSort />
      </div>

      <div
        className={`
          transition-all duration-500 ease-in-out overflow-hidden
          ${showForm ? 'opacity-100 scale-100' : 'max-h-0 opacity-0 scale-y-75'}
        `}
      >
        <DocumentForm handleSubmit={handleAddDocument} />
      </div>

      <DocumentsList onAddNewDocument={() => setShowForm(true)} />
    </div>
  );
}

export default function Home() {
  return (
    <DocumentProvider>
      <HomeContent />
    </DocumentProvider>
  );
}
