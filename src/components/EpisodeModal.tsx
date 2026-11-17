import { useDialog } from "../hooks/useDialog";

import type { Episode } from "../types/rickAndMorty";

interface EpisodeModalProps {
  episode: Episode | null;
  onClose: () => void;
}

const EpisodeModal = ({ episode, onClose }: EpisodeModalProps) => {
  const dialogRef = useDialog(episode !== null);

  return (
    <dialog
      ref={dialogRef}
      className="card_modal"
      aria-labelledby="episode_modal_title"
      onClose={onClose}
    >
      <button
        type="button"
        className="modal_close"
        aria-label="Close episode details"
        onClick={() => dialogRef.current?.close()}
      >
        &times;
      </button>

      {episode && (
        <div className="modal_content">
          <span className="episode_code">{episode.episode}</span>

          <h2 id="episode_modal_title" className="modal_name">
            {episode.name}
          </h2>

          <div className="modal_details">
            <p>
              <strong>Air date:</strong> {episode.air_date}
            </p>

            <p>
              <strong>Characters:</strong> {episode.characters.length}
            </p>

            <p>
              <strong>Episode ID:</strong> {episode.id}
            </p>
          </div>
        </div>
      )}
    </dialog>
  );
};

export default EpisodeModal;
