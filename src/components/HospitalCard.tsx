import { MapPin, Phone } from 'lucide-react';

export interface Hospital {
  id: string;
  name: string;
  state: string;
  city: string;
  phone: string;
  lat: number;
  lng: number;
  inventory: string[];
  alerts: string;
  distance?: number; // Calculated distance in km
}

interface HospitalCardProps {
  hospital: Hospital;
}

export function HospitalCard({ hospital }: HospitalCardProps) {
  const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lng}`;
  const phoneUrl = `tel:${hospital.phone}`;

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 mb-4 border-l-8 border-red-600">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-1">{hospital.name}</h3>
        <p className="text-gray-600 text-sm flex items-center mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          {hospital.city} - {hospital.state}
          {hospital.distance !== undefined && (
            <span className="ml-2 font-bold text-red-600">
              ({hospital.distance.toFixed(1)} km)
            </span>
          )}
        </p>
        {hospital.alerts && (
          <div className="bg-yellow-50 p-3 rounded border border-yellow-200 text-yellow-800 text-sm font-medium">
            <strong>Aviso:</strong> {hospital.alerts}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <a
          href={phoneUrl}
          className="flex items-center justify-center w-full py-4 bg-red-100 hover:bg-red-200 text-red-800 font-bold rounded-lg text-lg transition-colors"
        >
          <Phone className="w-6 h-6 mr-2" />
          LIGAR PARA CONFIRMAR
        </a>
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-lg text-xl shadow-md transition-colors"
        >
          <MapPin className="w-7 h-7 mr-2" />
          ABRIR MAPA
        </a>
      </div>
    </div>
  );
}
