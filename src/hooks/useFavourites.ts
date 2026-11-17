import { useEffect, useState } from "react";

const STORAGE_KEY = "rickAndMortyFavourites";

const getSavedFavourites = (): number[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (id): id is number => typeof id === "number" && Number.isInteger(id),
    );
  } catch {
    return [];
  }
};

export const useFavourites = () => {
  const [favouriteIds, setFavouriteIds] =
    useState<number[]>(getSavedFavourites);

  // SAVE FAVOURITES
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favouriteIds));
    } catch {
      // Storage may be unavailable.
    }
  }, [favouriteIds]);

  // ADD OR REMOVE FAVOURITE
  const toggleFavourite = (id: number) => {
    setFavouriteIds((previous) =>
      previous.includes(id)
        ? previous.filter((favouriteId) => favouriteId !== id)
        : [...previous, id],
    );
  };

  // CHECK IF CHARACTER IS A FAVOURITE
  const isFavourite = (id: number): boolean => {
    return favouriteIds.includes(id);
  };

  return {
    favouriteIds,
    toggleFavourite,
    isFavourite,
  };
};
