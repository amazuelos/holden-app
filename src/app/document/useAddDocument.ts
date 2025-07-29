import { useDocuments } from "../../context/DocumentContext";
import { Document } from "../../domain/document";

export function useAddDocument() {
  const { addDocument } = useDocuments();

  function add(doc: Document) {
    addDocument(doc);
  }

  return { add };
}