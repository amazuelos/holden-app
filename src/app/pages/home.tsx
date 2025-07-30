import { useState } from "react";
import { DocumentProvider } from "../../context/DocumentContext";
import DocumentForm from "../../ui/components/documents/DocumentForm";
import DocumentsList from "../../ui/components/documents/DocumentsList";
import DocumentSort from "../../ui/components/documents/DocumentSort";
  
export default function Home() {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <DocumentProvider>
      <div className="p-4">
        <div className="flex flex-col items-center justify-between mb-4 w-full">
          <h1 className="text-3xl font-bold">Documents</h1>
          <DocumentSort />
        </div>
        <div
          className={`
            transition-all duration-500 ease-in-out overflow-hidden
            ${showCreateForm ? 'max-h-[500px] opacity-100 scale-100' : 'max-h-0 opacity-0 scale-y-75'}
          `}
        >
          <DocumentForm />
        </div>
        <DocumentsList onAddNewDocument={() => setShowCreateForm(true)} />
      </div>
    </DocumentProvider>
  );
}