
import React, { useState, useEffect } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { ParkingLot, ParkingStatus } from '@/types/parking';
import ParkingMarker from './ParkingMarker';
import ParkingModal from './ParkingModal';
import NearestSpotsFAB from './NearestSpotsFAB';
import { useParkingData } from '@/hooks/useParkingData';

const ParkingMap = () => {
  const [selectedLot, setSelectedLot] = useState<ParkingLot | null>(null);
  const [userLocation, setUserLocation] = useState({ lat: 37.7749, lng: -122.4194 });
  const { parkingLots, isLoading } = useParkingData();

  useEffect(() => {
    // Simulate getting user location
    navigator.geolocation?.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        console.log('Location access denied, using default location');
      }
    );
  }, []);

  const handleMarkerClick = (lot: ParkingLot) => {
    setSelectedLot(lot);
  };

  const getStatusColor = (status: ParkingStatus) => {
    switch (status) {
      case ParkingStatus.AVAILABLE:
        return 'bg-green-500';
      case ParkingStatus.LIMITED:
        return 'bg-yellow-500';
      case ParkingStatus.FULL:
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-100 via-white to-green-50">
      {/* Map Container */}
      <div className="absolute inset-0 pt-20">
        <div className="relative w-full h-full bg-gradient-to-br from-blue-200/30 to-green-200/30 rounded-t-3xl overflow-hidden">
          {/* User Location Indicator */}
          <div 
            className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: '50%',
              top: '40%',
            }}
          >
            <div className="relative">
              <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              <div className="absolute inset-0 w-4 h-4 bg-blue-600/30 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Parking Lot Markers */}
          {parkingLots.map((lot, index) => (
            <ParkingMarker
              key={lot.id}
              lot={lot}
              onClick={handleMarkerClick}
              position={{
                left: `${20 + (index % 4) * 20}%`,
                top: `${30 + Math.floor(index / 4) * 25}%`,
              }}
            />
          ))}

          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-30 space-y-2">
            <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Navigation className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-40">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-gray-700">Loading parking data...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-24 left-4 z-30 bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Availability</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Limited</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Full</span>
          </div>
        </div>
      </div>

      {/* Nearest Spots FAB */}
      <NearestSpotsFAB lots={parkingLots} userLocation={userLocation} />

      {/* Parking Modal */}
      {selectedLot && (
        <ParkingModal
          lot={selectedLot}
          onClose={() => setSelectedLot(null)}
        />
      )}
    </div>
  );
};

export default ParkingMap;
