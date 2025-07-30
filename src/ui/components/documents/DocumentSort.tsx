import React from "react";
import { useDocumentContext } from "../../../context/DocumentContext";
import { FaTh, FaList } from "react-icons/fa";

export default function DocumentSort() {
  const {
    sortBy,
    setSortBy,
    isColumnView,
    setIsColumnView,
  } = useDocumentContext();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as "name" | "version" | "createdAt");
  };

  return (
    <div className="flex items-center justify-between mb-4 w-full">
      <div className="flex items-center space-x-2">
        <p className="text-blue-400">Sort by: </p>
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="p-2 border rounded"
        >
          <option value="createdAt">Created At</option>
          <option value="name">Title</option>
          <option value="version">Version</option>
        </select>
      </div>
      <div className="flex items-center space-x-2 ml-4">
        <FaList
          onClick={() => setIsColumnView(false)}
          className={`cursor-pointer ${!isColumnView ? "text-blue-500" : ""}`}
        />
        <FaTh
          onClick={() => setIsColumnView(true)}
          className={`cursor-pointer ${isColumnView ? "text-blue-500" : ""}`}
        />
      </div>
    </div>
  );
}