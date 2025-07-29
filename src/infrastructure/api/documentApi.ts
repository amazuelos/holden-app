import { Document } from "../../domain/document";

const BASE_URL = "http://localhost:4000";

export async function fetchDocuments(): Promise<Document[]> {
  const res = await fetch(`${BASE_URL}/documents`);
  if (!res.ok) throw new Error("Failed to fetch documents");
  return res.json();
}