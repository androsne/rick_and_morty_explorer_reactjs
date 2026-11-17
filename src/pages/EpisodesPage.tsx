import EpisodeCard from "../components/EpisodeCard";
import Pagination from "../components/Pagination";

import { getEpisodes } from "../services/api";
import { usePaginatedData } from "../hooks/usePaginatedData";

import type { Episode } from "../types/rickAndMorty";

interface EpisodesPageProps {
  onOpenDetails: (episode: Episode) => void;
}

const EpisodesPage = ({ onOpenDetails }: EpisodesPageProps) => {
  // EPISODES & PAGINATION
  const {
    data: episodes,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
  } = usePaginatedData<Episode>(getEpisodes);

  return (
    <>
      {/* EPISODE RESULTS */}
      <section aria-label="Episode results" aria-busy={loading}>
        {loading ? (
          <p>Loading episodes...</p>
        ) : error ? (
          <p role="alert">{error}</p>
        ) : episodes.length === 0 ? (
          <p>No episodes found.</p>
        ) : (
          <div className="episode_grid">
            {episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                episode={episode}
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

export default EpisodesPage;
