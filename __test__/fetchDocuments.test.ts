import { describe, it, expect } from "vitest";
import { loadDocuments } from "../src/app/useCases/fetchDocuments";
import type { Document } from "../src/domain/document";

describe("loadDocuments", () => {
  it("should load an array of documents", async () => {
    const docs: Document[] = await loadDocuments();

    expect(Array.isArray(docs)).toBe(true);
    expect(docs.length).toBeGreaterThan(0);

    // Chequeamos estructura básica del primer documento
    const doc = docs[0];
    expect(doc).toHaveProperty("Title");
    expect(doc).toHaveProperty("Contributors");
    expect(doc).toHaveProperty("Version");
    expect(doc).toHaveProperty("Attachments");
  });
});