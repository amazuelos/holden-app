import { fetchDocuments } from "../services/documentsApi";
import { Document } from "../../domain/document";

export async function loadDocuments(): Promise<Document[]> {
  const docs: Document[] = await fetchDocuments();
  return docs;
}
