import documents from "../../assets/documents.json";
import { Document } from "../../domain/document";

export async function fetchDocuments(): Promise<Document[]> {
  // Simulamos un fetch asíncrono
  return new Promise(resolve => setTimeout(() => resolve(documents as Document[]), 200));
}
