import React from "react";
import { DocumentProvider } from "./context/DocumentContext";
import { Home } from "./ui/pages/Home";

export default function App() {
  return (
    <DocumentProvider>
      <Home />
    </DocumentProvider>
  );
}