import { useDialog } from "../hooks/useDialog";

import type { Location } from "../types/rickAndMorty";

interface LocationModalProps {
  location: Location | null;
  onClose: () => void;
}

const LocationModal = ({ location, onClose }: LocationModalProps) => {
  const dialogRef = useDialog(location !== null);

  return (
    <dialog
      ref={dialogRef}
      className="card_modal"
      aria-labelledby="location_modal_title"
      onClose={onClose}
    >
      <button
        type="button"
        className="modal_close"
        aria-label="Close location details"
        onClick={() => dialogRef.current?.close()}
      >
        &times;
      </button>

      {location && (
        <div className="modal_content">
          <span className="location_type">{location.type || "Unknown"}</span>

          <h2 id="location_modal_title" className="modal_name">
            {location.name}
          </h2>

          <div className="modal_details">
            <p>
              <strong>Type:</strong> {location.type || "Unknown"}
            </p>

            <p>
              <strong>Dimension:</strong> {location.dimension || "Unknown"}
            </p>

            <p>
              <strong>Residents:</strong> {location.residents.length}
            </p>

            <p>
              <strong>Location ID:</strong> {location.id}
            </p>
          </div>
        </div>
      )}
    </dialog>
  );
};

export default LocationModal;
