import React, { useState } from 'react';

type DocumentFormProps = {
  handleSubmit: (newDoc: {
    id: string;
    name: string;
    version: number;
    contributors: string[];
    attachments: string[];
    createdAt: string;
  }) => void;
};

export default function DocumentForm({ handleSubmit }: DocumentFormProps) {
  const [name, setName] = useState('');
  const [version, setVersion] = useState(1);
  const [contributors, setContributors] = useState('');
  const [attachments, setAttachments] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Name is required');
      return;
    }

    const newDoc = {
      id: crypto.randomUUID(),
      name: name.trim(),
      version,
      contributors: contributors
        .split(',')
        .map(c => c.trim())
        .filter(Boolean),
      attachments: attachments
        .split(',')
        .map(a => a.trim())
        .filter(Boolean),
      createdAt: new Date().toISOString(),
    };

    handleSubmit(newDoc);

    // Reset fields
    setName('');
    setVersion(1);
    setContributors('');
    setAttachments('');
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mb-4 space-y-2 transition-all duration-500 ease-out translate-y-0 opacity-100"
    >
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
      <button
        className="bg-blue-500 hover:bg-blue-600 transition text-white p-2 rounded"
        type="submit"
      >
        Create Document
      </button>
    </form>
  );
}