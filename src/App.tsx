import { useEffect, useState } from "react";
import { useFavourites } from "./hooks/useFavourites";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CharacterModal from "./components/CharacterModal";
import EpisodeModal from "./components/EpisodeModal";
import LocationsPage from "./pages/LocationsPage";
import LocationModal from "./components/LocationModal";

import CharactersPage from "./pages/CharactersPage";
import EpisodesPage from "./pages/EpisodesPage";
import FavouritesPage from "./pages/FavouritesPage";

import type { Character, Episode, Location } from "./types/rickAndMorty";
import type { Section } from "./types/navigation";

const sectionContent: Record<Section, { title: string; description: string }> =
  {
    characters: {
      title: "Characters",
      description: "Explore the bizarre characters of Rick and Morty.",
    },
    episodes: {
      title: "Episodes",
      description: "Discover episodes from across the multiverse.",
    },
    locations: {
      title: "Locations",
      description: "Explore the strange locations of Rick and Morty.",
    },
    favourites: {
      title: "Favourites",
      description: "Your favourite characters from across the multiverse.",
    },
  };

const getSectionFromHash = (): Section => {
  const section = window.location.hash.slice(1);

  if (
    section === "characters" ||
    section === "episodes" ||
    section === "locations" ||
    section === "favourites"
  ) {
    return section;
  }

  return "characters";
};

function App() {
  // NAVIGATION
  const [activeSection, setActiveSection] =
    useState<Section>(getSectionFromHash);

  // FAVOURITES
  const { favouriteIds, toggleFavourite, isFavourite } = useFavourites();

  // SELECTED CHARACTER
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );

  // SELECTED EPISODE
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

  // SELECTED LOCATION
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  // NAVIGATION EFFECT
  useEffect(() => {
    const handleHashChange = () => {
      setActiveSection(getSectionFromHash());
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleNavigate = (section: Section) => {
    setActiveSection(section);
  };

  const { title, description } = sectionContent[activeSection];

  return (
    <div className="app">
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      <main className="main">
        {activeSection === "characters" ? (
          <CharactersPage
            isFavourite={isFavourite}
            onToggleFavourite={toggleFavourite}
            onOpenDetails={setSelectedCharacter}
          />
        ) : (
          <>
            <div className="content_header centered">
              <div className="content_intro">
                <h1 id="section_title">{title}</h1>
                <p id="section_description">{description}</p>
              </div>
            </div>

            {activeSection === "favourites" ? (
              <FavouritesPage
                favouriteIds={favouriteIds}
                isFavourite={isFavourite}
                onToggleFavourite={toggleFavourite}
                onOpenDetails={setSelectedCharacter}
              />
            ) : activeSection === "episodes" ? (
              <EpisodesPage onOpenDetails={setSelectedEpisode} />
            ) : activeSection === "locations" ? (
              <LocationsPage onOpenDetails={setSelectedLocation} />
            ) : null}
          </>
        )}
      </main>

      <Footer />

      <CharacterModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      />

      <EpisodeModal
        episode={selectedEpisode}
        onClose={() => setSelectedEpisode(null)}
      />

      <LocationModal
        location={selectedLocation}
        onClose={() => setSelectedLocation(null)}
      />
    </div>
  );
}

export default App;
