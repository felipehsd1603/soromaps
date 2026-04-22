import { useState, useMemo } from 'react';
import { DisclaimerModal } from './components/DisclaimerModal';
import { TriageFilter } from './components/TriageFilter';
import { HospitalCard, type Hospital } from './components/HospitalCard';
import { calculateDistance } from './utils/haversine';
import { MapPin, Navigation } from 'lucide-react';

// Import our mock data directly as this is a serverless/edge/PWA approach
import hospitalsDataRaw from './data/hospitals.json';
const hospitalsData = hospitalsDataRaw as Hospital[];

function App() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const handleGetLocation = () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocalização não é suportada pelo seu navegador.");
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoadingLocation(false);
      },
      (error) => {
        console.error("Erro de geolocalização:", error);
        setLocationError("Não foi possível obter sua localização. Por favor, permita o acesso à localização.");
        setIsLoadingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const filteredAndSortedHospitals = useMemo(() => {
    let filtered = hospitalsData;

    // 1. Filter by inventory if a filter is selected
    if (selectedFilter) {
      filtered = filtered.filter(h => h.inventory.includes(selectedFilter));
    }

    // 2. If user location is available, calculate distances and sort
    if (userLocation) {
      const withDistance = filtered.map(h => ({
        ...h,
        distance: calculateDistance(userLocation.lat, userLocation.lng, h.lat, h.lng)
      }));

      return withDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    return filtered;
  }, [selectedFilter, userLocation]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <DisclaimerModal />

      <header className="bg-red-700 text-white p-4 shadow-md sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center justify-center">
          <MapPin className="w-8 h-8 mr-2" />
          <h1 className="text-3xl font-black tracking-tight">SoroMaps</h1>
        </div>
      </header>

      <main className="flex-1 w-full max-w-2xl mx-auto p-4 flex flex-col">
        <TriageFilter
          selectedFilter={selectedFilter}
          onFilterSelect={(filter) => setSelectedFilter(selectedFilter === filter ? null : filter)}
        />

        <div className="mb-8">
          <button
            onClick={handleGetLocation}
            disabled={isLoadingLocation}
            className={`
              w-full py-6 rounded-xl text-white font-black text-xl flex items-center justify-center shadow-lg transition-all
              ${isLoadingLocation ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 active:scale-95'}
            `}
          >
            <Navigation className={`w-8 h-8 mr-3 ${isLoadingLocation ? 'animate-pulse' : ''}`} />
            {isLoadingLocation ? 'BUSCANDO LOCALIZAÇÃO...' : 'ACHAR PONTO DE SOCORRO PRÓXIMO'}
          </button>

          {locationError && (
            <p className="mt-3 text-red-600 text-center font-bold">{locationError}</p>
          )}
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
            Hospitais Encontrados ({filteredAndSortedHospitals.length})
          </h2>

          {filteredAndSortedHospitals.length > 0 ? (
            <div className="space-y-4">
              {filteredAndSortedHospitals.map(hospital => (
                <HospitalCard key={hospital.id} hospital={hospital} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <p className="text-gray-600 text-lg">
                Nenhum hospital encontrado com os filtros atuais.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
