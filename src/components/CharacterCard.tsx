import type { Character } from "../types/rickAndMorty";

interface CharacterCardProps {
  character: Character;
  isFavourite: boolean;
  onToggleFavourite: (id: number) => void;
  onOpenDetails: (character: Character) => void;
}

const CharacterCard = ({
  character,
  isFavourite,
  onToggleFavourite,
  onOpenDetails,
}: CharacterCardProps) => {
  const statusClass = character.status.toLowerCase();

  return (
    <article className="character_card">
      <button
        type="button"
        className="card_open_button"
        aria-label={`View details for ${character.name}`}
        onClick={() => onOpenDetails(character)}
      />

      <img
        src={character.image}
        alt={character.name}
        className="character_image"
      />

      <div className="character_info">
        <h2 className="character_name">{character.name}</h2>

        <div className="character_status">
          <span
            className={`status_dot ${statusClass}`}
            aria-hidden="true"
          />
          <span>{character.status}</span>
        </div>

        <div className="character_bottom">
          <span className="character_gender">
            {character.gender}
          </span>

          <button
            type="button"
            className={`favourite_button ${
              isFavourite ? "is_favourite" : ""
            }`}
            aria-label={
              isFavourite
                ? `Remove ${character.name} from favourites`
                : `Add ${character.name} to favourites`
            }
            aria-pressed={isFavourite}
            onClick={() => onToggleFavourite(character.id)}
          >
            <img
              src={`${import.meta.env.BASE_URL}img/icon_rick_button.svg`}
              alt=""
              className="favourite_icon"
            />
          </button>
        </div>
      </div>
    </article>
  );
};

export default CharacterCard;
