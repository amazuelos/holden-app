import DocumentCard from "./DocumentCard";
import { useDocumentContext } from "../../../context/DocumentContext";

type Props = {
  onAddNewDocument: () => void;
};

export default function DocumentsList({ onAddNewDocument }: Props) {
  const { documents, isColumnView } = useDocumentContext();

  return (
    <div className={`grid gap-4 ${isColumnView ? "grid-cols-1" : "grid-cols-3"}`}>
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
      <button 
        onClick={onAddNewDocument}
        className="border w-full px-6 py-8 bg-white text-blue-400 rounded flex items-center justify-center">
        + Add New Document
      </button>
    </div>
  );
}
