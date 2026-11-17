import { useEffect, useState } from "react";

import CharacterCard from "../components/CharacterCard";
import Pagination from "../components/Pagination";
import { getCharacters } from "../services/api";

import type { Character } from "../types/rickAndMorty";

const speciesOptions = [
  "Alien",
  "Animal",
  "Cronenberg",
  "Disease",
  "Human",
  "Humanoid",
  "Mythological Creature",
  "Poopybutthole",
  "Robot",
  "unknown",
];

interface CharactersPageProps {
  isFavourite: (id: number) => boolean;
  onToggleFavourite: (id: number) => void;
  onOpenDetails: (character: Character) => void;
}

const CharactersPage = ({
  isFavourite,
  onToggleFavourite,
  onOpenDetails,
}: CharactersPageProps) => {
  // CHARACTER DATA
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // SEARCH & FILTERS
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // DEBOUNCE SEARCH
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [search]);

  // FETCH CHARACTERS
  useEffect(() => {
    const controller = new AbortController();

    const loadCharacters = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getCharacters(
          {
            name: debouncedSearch,
            status,
            species,
            gender,
            page: currentPage,
          },
          controller.signal,
        );

        if (!controller.signal.aborted) {
          setCharacters(data.results);
          setTotalPages(data.info.pages);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setCharacters([]);
          setTotalPages(0);

          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadCharacters();

    return () => controller.abort();
  }, [debouncedSearch, status, species, gender, currentPage]);

  // RESET FILTERS
  const handleResetFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setStatus("");
    setSpecies("");
    setGender("");
    setCurrentPage(1);
  };

  return (
    <>
      {/* CONTENT HEADER */}
      <div className="content_header">
        <div className="content_intro">
          <h1 id="section_title">Characters</h1>

          <p id="section_description">
            Explore the bizarre characters of Rick and Morty.
          </p>

          <div className="search_container">
            <input
              id="search_input"
              type="search"
              aria-label="Search characters"
              placeholder="Search characters"
              autoComplete="off"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <section className="filters" aria-label="Character filters">
        <select
          value={status}
          aria-label="Filter by status"
          onChange={(event) => {
            setStatus(event.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All statuses</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <select
          value={species}
          aria-label="Filter by species"
          onChange={(event) => {
            setSpecies(event.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All species</option>

          {speciesOptions.map((option) => (
            <option key={option} value={option}>
              {option === "unknown" ? "Unknown" : option}
            </option>
          ))}
        </select>

        <select
          value={gender}
          aria-label="Filter by gender"
          onChange={(event) => {
            setGender(event.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All genders</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>

        <button
          id="reset_filters"
          className="reset_button"
          type="button"
          onClick={handleResetFilters}
        >
          <img
            src={`${import.meta.env.BASE_URL}img/icon_portal.png`}
            alt=""
            className="reset_icon"
          />
          <span>Reset Filters</span>
        </button>
      </section>

      {/* CHARACTER RESULTS */}
      <section aria-label="Character results" aria-busy={loading}>
        {loading ? (
          <p>Loading characters...</p>
        ) : error ? (
          <p role="alert">{error}</p>
        ) : characters.length === 0 ? (
          <p>No characters found. Try different filters.</p>
        ) : (
          <div className="character_grid">
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                isFavourite={isFavourite(character.id)}
                onToggleFavourite={onToggleFavourite}
                onOpenDetails={onOpenDetails}
              />
            ))}
          </div>
        )}
      </section>

      {/* PAGINATION */}
      {!loading && !error && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
};

export default CharactersPage;
