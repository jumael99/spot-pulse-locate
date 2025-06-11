
import React, { useState } from 'react';
import { Navigation, Car } from 'lucide-react';
import { ParkingLot, ParkingStatus } from '@/types/parking';

interface NearestSpotsFABProps {
  lots: ParkingLot[];
  userLocation: { lat: number; lng: number };
}

const NearestSpotsFAB = ({ lots, userLocation }: NearestSpotsFABProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get nearest available lots
  const nearestLots = lots
    .filter(lot => lot.status !== ParkingStatus.FULL)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3);

  const getStatusColor = (status: ParkingStatus) => {
    switch (status) {
      case ParkingStatus.AVAILABLE:
        return 'bg-green-500';
      case ParkingStatus.LIMITED:
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Expanded List */}
      {isExpanded && (
        <div className="mb-4 space-y-2 animate-fade-in">
          {nearestLots.map((lot) => (
            <div
              key={lot.id}
              className="bg-white rounded-lg shadow-lg p-3 min-w-[200px] hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(lot.status)}`}></div>
                  <span className="text-sm font-medium text-gray-900">{lot.name}</span>
                </div>
                <span className="text-xs text-gray-500">{lot.distance}m</span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs text-gray-600">{lot.availableSpaces} spots</span>
                <span className="text-xs text-gray-600">${lot.pricePerHour}/hr</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-all duration-200 hover:shadow-xl active:scale-95 relative overflow-hidden"
      >
        {/* Pulse Animation */}
        <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20"></div>
        
        {/* Icon */}
        <div className="relative">
          {isExpanded ? (
            <Car className="h-6 w-6 text-white" />
          ) : (
            <Navigation className="h-6 w-6 text-white" />
          )}
        </div>

        {/* Badge */}
        {nearestLots.length > 0 && !isExpanded && (
          <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {nearestLots.length}
          </div>
        )}
      </button>
    </div>
  );
};

export default NearestSpotsFAB;
