import React from "react";
import { useDocumentContext } from "../../../context/DocumentContext";
import { MdViewList, MdGridView } from "react-icons/md";

export default function DocumentSort() {
  const { sortKey, setSortKey, isColumnView, setIsColumnView } = useDocumentContext();

  return (
    <div className="flex gap-4 justify-between w-full">
      <div className="flex textitems-center gap-2">
        <span className="text-lg font-semibold">Sort by:</span>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as "name" | "version" | "created")}
          className="p-2 rounded border"
        >
          <option value="name">Name</option>
          <option value="version">Version</option>
          <option value="created">Date</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setIsColumnView(true)}
          className={`p-2 border rounded text-xl ${
            !isColumnView ? "text-black" : "text-white bg-black hover:bg-gray-200"
          }`}
          aria-label="List view"
          title="List view"
        >
          <MdViewList />
        </button>

        <button
          onClick={() => setIsColumnView(false)}
          className={`p-2 border rounded text-xl ${
            isColumnView ? "text-black" : "text-white bg-black hover:bg-gray-200"
          }`}
          aria-label="Grid view"
          title="Grid view"
        >
          <MdGridView />
        </button>
      </div>
      
    </div>
  );
}