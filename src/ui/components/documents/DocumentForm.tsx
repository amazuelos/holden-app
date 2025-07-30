import React, { useState } from "react";
import { useDocumentContext } from "../../../context/DocumentContext";
import { v4 as uuidv4 } from "uuid";

export default function DocumentForm() {
  const { addDocument } = useDocumentContext();

  const [title, setTitle] = useState("");
  const [contributors, setContributors] = useState<string[]>([""]);
  const [attachments, setAttachments] = useState<string[]>([""]);
  const [version, setVersion] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: string[] = [];

    if (!title.trim()) newErrors.push("Title is required.");
    if (!version.trim()) newErrors.push("Version is required.");
    if (contributors.filter((c) => c.trim() !== "").length === 0)
      newErrors.push("At least one contributor is required.");
    if (attachments.filter((a) => a.trim() !== "").length === 0)
      newErrors.push("At least one attachment is required.");

    setErrors(newErrors);
    if (newErrors.length > 0) return;

    const newDocument = {
      ID: uuidv4(),
      Title: title.trim(),
      Contributors: contributors
        .filter((c) => c.trim() !== "")
        .map((c) => ({ Name: c.trim() })),  // <-- aquí mapeamos a objeto con Name
      Attachments: attachments.filter((a) => a.trim() !== ""),
      Version: version.trim(),
      CreatedAt: new Date().toISOString(),
      UpdatedAt: new Date().toISOString(),
    };

    addDocument(newDocument);

    setTitle("");
    setContributors([""]);
    setAttachments([""]);
    setVersion("");
    setErrors([]);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 border rounded">
      <h2 className="text-xl font-semibold">Create New Document</h2>

      {errors.length > 0 && (
        <ul className="text-red-500 text-sm list-disc ml-4">
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Version"
        value={version}
        onChange={(e) => setVersion(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <div>
        <label className="block font-medium mb-1">Contributors</label>
        {contributors.map((c, index) => (
          <input
            key={index}
            type="text"
            value={c}
            onChange={(e) => {
              const updated = [...contributors];
              updated[index] = e.target.value;
              setContributors(updated);
            }}
            className="w-full mb-1 border p-2 rounded"
          />
        ))}
        <button
          type="button"
          onClick={() => setContributors([...contributors, ""])}
          className="text-blue-600 text-sm"
        >
          + Add Contributor
        </button>
      </div>

      <div>
        <label className="block font-medium mb-1">Attachments</label>
        {attachments.map((a, index) => (
          <input
            key={index}
            type="text"
            value={a}
            onChange={(e) => {
              const updated = [...attachments];
              updated[index] = e.target.value;
              setAttachments(updated);
            }}
            className="w-full mb-1 border p-2 rounded"
          />
        ))}
        <button
          type="button"
          onClick={() => setAttachments([...attachments, ""])}
          className="text-blue-600 text-sm"
        >
          + Add Attachment
        </button>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Create Document
      </button>
    </form>
  );
}
