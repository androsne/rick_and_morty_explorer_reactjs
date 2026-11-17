import type { Episode } from "../types/rickAndMorty";

interface EpisodeCardProps {
  episode: Episode;
  onOpenDetails: (episode: Episode) => void;
}

const EpisodeCard = ({ episode, onOpenDetails }: EpisodeCardProps) => {
  return (
    <article className="episode_card">
      <button
        type="button"
        className="card_open_button"
        aria-label={`View details for ${episode.name}`}
        onClick={() => onOpenDetails(episode)}
      />

      <div className="episode_top">
        <span className="episode_code">{episode.episode}</span>

        <span className="episode_id">#{episode.id}</span>
      </div>

      <h2 className="episode_name">{episode.name}</h2>

      <div className="episode_details">
        <p>
          <span>Air date</span>
          <strong>{episode.air_date}</strong>
        </p>

        <p>
          <span>Characters</span>
          <strong>{episode.characters.length}</strong>
        </p>
      </div>
    </article>
  );
};

export default EpisodeCard;
