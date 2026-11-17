
import { useEffect, useState } from "react";

import type { ApiInfo } from "../types/rickAndMorty";

interface PaginatedResponse<T> {
  info: ApiInfo;
  results: T[];
}

type FetchFunction<T> = (
  page: number,
  signal?: AbortSignal,
) => Promise<PaginatedResponse<T>>;

export const usePaginatedData = <T,>(
  fetchFunction: FetchFunction<T>,
) => {
  // DATA
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // FETCH DATA
  useEffect(() => {
    const controller = new AbortController();

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchFunction(
          currentPage,
          controller.signal,
        );

        if (!controller.signal.aborted) {
          setData(response.results);
          setTotalPages(response.info.pages);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setData([]);
          setTotalPages(0);

          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => controller.abort();
  }, [currentPage, fetchFunction]);

  return {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
  };
};
