import { useEffect, useState } from "react";
import CharacterCard from "../components/CharacterCard";
import { getCharactersByIds } from "../services/api";
import type { Character } from "../types/rickAndMorty";

interface FavouritesPageProps {
  favouriteIds: number[];
  isFavourite: (id: number) => boolean;
  onToggleFavourite: (id: number) => void;
  onOpenDetails: (character: Character) => void;
}

const FavouritesPage = ({
  favouriteIds,
  isFavourite,
  onToggleFavourite,
  onOpenDetails,
}: FavouritesPageProps) => {
  // FAVOURITE CHARACTERS
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(favouriteIds.length > 0);
  const [error, setError] = useState<string | null>(null);

  // FETCH FAVOURITES
  useEffect(() => {
    const controller = new AbortController();

    if (favouriteIds.length === 0) {
      return () => controller.abort();
    }

    const loadFavourites = async () => {
      try {
        const data = await getCharactersByIds(favouriteIds, controller.signal);

        if (!controller.signal.aborted) {
          setCharacters(data);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadFavourites();

    return () => controller.abort();
  }, [favouriteIds]);

  if (favouriteIds.length === 0) {
    return (
      <section aria-label="Favourite characters">
        <p>You haven't added any favourites yet.</p>
      </section>
    );
  }

  if (loading) {
    return <p>Loading favourites...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  const visibleCharacters = characters.filter((character) =>
    favouriteIds.includes(character.id),
  );

  return (
    <section aria-label="Favourite characters">
      <div className="character_grid">
        {visibleCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            isFavourite={isFavourite(character.id)}
            onToggleFavourite={onToggleFavourite}
            onOpenDetails={onOpenDetails}
          />
        ))}
      </div>
    </section>
  );
};

export default FavouritesPage;
