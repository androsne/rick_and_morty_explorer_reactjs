import { useDialog } from "../hooks/useDialog";

import type { Character } from "../types/rickAndMorty";

interface CharacterModalProps {
  character: Character | null;
  onClose: () => void;
}

const CharacterModal = ({ character, onClose }: CharacterModalProps) => {
  const dialogRef = useDialog(character !== null);
  return (
    <dialog
      ref={dialogRef}
      className="card_modal"
      aria-labelledby="modal_title"
      onClose={onClose}
    >
      <button
        type="button"
        className="modal_close"
        aria-label="Close details"
        onClick={() => dialogRef.current?.close()}
      >
        &times;
      </button>

      {character && (
        <div className="modal_content">
          <img
            src={character.image}
            alt={character.name}
            className="modal_image"
          />

          <h2 id="modal_title" className="modal_name">
            {character.name}
          </h2>

          <div className="character_status">
            <span
              className={`status_dot ${character.status.toLowerCase()}`}
              aria-hidden="true"
            />
            <span>{character.status}</span>
          </div>

          <div className="modal_details">
            <p>
              <strong>Species:</strong> {character.species}
            </p>

            <p>
              <strong>Gender:</strong> {character.gender}
            </p>

            {character.type && (
              <p>
                <strong>Type:</strong> {character.type}
              </p>
            )}

            <p>
              <strong>Character ID:</strong> {character.id}
            </p>
          </div>
        </div>
      )}
    </dialog>
  );
};

export default CharacterModal;
