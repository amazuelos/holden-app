import React from "react";
import { useDocumentContext } from "../../../context/DocumentContext";

export default function DocumentSort() {
  const { sortKey, setSortKey, isColumnView, setIsColumnView } = useDocumentContext();

  return (
    <div className="flex gap-4 items-center">
      <select
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value as "name" | "version" | "created")}
        className="p-2 rounded border"
      >
        <option value="name">Name</option>
        <option value="version">Version</option>
        <option value="created">Date</option>
      </select>

      <button
        onClick={() => setIsColumnView((prev) => !prev)}
        className="p-2 border rounded"
      >
        {isColumnView ? "Vista Grid" : "Vista Lista"}
      </button>
    </div>
  );
}