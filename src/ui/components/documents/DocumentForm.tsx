import React, { useState } from 'react';
import { useDocumentContext } from '../../../context/DocumentContext';

export default function DocumentForm() {
  const { addDocument } = useDocumentContext();
  const [name, setName] = useState('');
  const [version, setVersion] = useState(1);
  const [contributors, setContributors] = useState('');
  const [attachments, setAttachments] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    const newDoc = {
      id: crypto.randomUUID(),
      name,
      version,
      contributors: contributors
        ? contributors.split(',').map(c => c.trim()).filter(Boolean)
        : [],
      attachments: attachments
        ? attachments.split(',').map(a => a.trim()).filter(Boolean)
        : [],
      createdAt: new Date().toISOString()
    };

    // Reset form fields after submission
    addDocument(newDoc);
    setName('');
    setVersion(1);
    setContributors('');
    setAttachments('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
      <input
        className="border p-2 w-full"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        type="number"
        placeholder="Version"
        value={version}
        onChange={e => setVersion(Number(e.target.value))}
      />
      <input
        className="border p-2 w-full"
        placeholder="Contributors (comma separated)"
        value={contributors}
        onChange={e => setContributors(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Attachments (comma separated)"
        value={attachments}
        onChange={e => setAttachments(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2 rounded" type="submit">
        Create Document
      </button>
    </form>
  );
}