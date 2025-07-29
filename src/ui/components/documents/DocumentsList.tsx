import DocumentCard from "./DocumentCard";
import { useDocumentContext } from "../../../context/DocumentContext";

export default function DocumentsList() {
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
    </div>
  );
}
