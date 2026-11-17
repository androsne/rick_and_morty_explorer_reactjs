import LocationCard from "../components/LocationCard";
import Pagination from "../components/Pagination";

import { getLocations } from "../services/api";
import { usePaginatedData } from "../hooks/usePaginatedData";

import type { Location } from "../types/rickAndMorty";

interface LocationsPageProps {
  onOpenDetails: (location: Location) => void;
}

const LocationsPage = ({ onOpenDetails }: LocationsPageProps) => {
  // LOCATIONS & PAGINATION
  const {
    data: locations,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
  } = usePaginatedData<Location>(getLocations);

  return (
    <>
      {/* LOCATION RESULTS */}
      <section aria-label="Location results" aria-busy={loading}>
        {loading ? (
          <p>Loading locations...</p>
        ) : error ? (
          <p role="alert">{error}</p>
        ) : locations.length === 0 ? (
          <p>No locations found.</p>
        ) : (
          <div className="location_grid">
            {locations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
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

export default LocationsPage;
