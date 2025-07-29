import { useEffect } from "react";
import { fetchDocuments } from "../../infrastructure/api/documentApi";
import { useDocuments } from "../../context/DocumentContext";

export function useFetchDocuments() {
  const { setDocuments } = useDocuments();

  useEffect(() => {
    fetchDocuments()
      .then(setDocuments)
      .catch(console.error);
  }, []);
}