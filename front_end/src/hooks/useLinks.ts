import { useState, useCallback } from "react";
import { ShortenedLink } from "@/types/link";

// Configure your FastAPI backend URL here
const API_BASE_URL = "http://localhost:8000";

export function useLinks() {
  const [links, setLinks] = useState<ShortenedLink[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLinks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/links`);
      if (!response.ok) throw new Error("Erro ao buscar links");
      const data = await response.json();
      setLinks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const shortenLink = useCallback(async (url: string): Promise<string | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) throw new Error("Erro ao encurtar link");
      const data = await response.json();
      return data.shortened_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { links, isLoading, error, fetchLinks, shortenLink };
}
