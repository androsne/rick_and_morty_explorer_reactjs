import type { Location } from "../types/rickAndMorty";

interface LocationCardProps {
  location: Location;
  onOpenDetails: (location: Location) => void;
}

const LocationCard = ({ location, onOpenDetails }: LocationCardProps) => {
  return (
    <article className="location_card">
      <button
        type="button"
        className="card_open_button"
        aria-label={`View details for ${location.name}`}
        onClick={() => onOpenDetails(location)}
      />

      <div className="location_top">
        <span className="location_type">{location.type || "Unknown"}</span>

        <span className="location_id">#{location.id}</span>
      </div>

      <h2 className="location_name">{location.name}</h2>

      <div className="location_details">
        <p>
          <span>Dimension</span>
          <strong>{location.dimension || "Unknown"}</strong>
        </p>

        <p>
          <span>Residents</span>
          <strong>{location.residents.length}</strong>
        </p>
      </div>
    </article>
  );
};

export default LocationCard;
