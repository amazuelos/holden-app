import React from "react";

interface Contributor {
  Name: string;
}

interface DocumentCardProps {
  Title: string;
  Version: string;
  Contributors: Contributor[];
  Attachments: string[];
  isColumnView?: boolean; // prop opcional, default false
}

export default function DocumentCard({
  Title,
  Version,
  Contributors,
  Attachments,
  isColumnView = false,
}: DocumentCardProps) {
  return (
    <div
      className={`border w-full px-6 py-8 bg-white rounded flex ${
        isColumnView ? "flex-col" : "flex-row justify-between"
      }`}
    >
      <div className="flex flex-col flex-1 min-w-0 mb-4 md:mb-0">
        <h2 className="font-semibold">{Title}</h2>
        <p>Versión: {Version}</p>
      </div>

      <div className="flex flex-col flex-1 min-w-0 mb-4 md:mb-0">
        {Contributors.map((c, index) => (
          <p key={index}>{c.Name}</p>
        ))}
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        {Attachments.map((attachment, index) => (
          <p key={index}>{attachment}</p>
        ))}
      </div>
    </div>
  );
}