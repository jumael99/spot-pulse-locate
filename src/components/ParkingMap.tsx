
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
        <div className="relative w-full h-full bg-gray-100 rounded-t-3xl overflow-hidden">
          {/* Map Background with Roads and Landmarks */}
          <div className="absolute inset-0 bg-gray-100">
            {/* Major Roads */}
            <div className="absolute top-0 left-0 w-full h-full">
              {/* Horizontal Streets */}
              <div className="absolute top-1/4 left-0 w-full h-1 bg-gray-300 shadow-sm"></div>
              <div className="absolute top-2/4 left-0 w-full h-2 bg-gray-400 shadow-md"></div>
              <div className="absolute top-3/4 left-0 w-full h-1 bg-gray-300 shadow-sm"></div>
              
              {/* Vertical Streets */}
              <div className="absolute top-0 left-1/4 w-1 h-full bg-gray-300 shadow-sm"></div>
              <div className="absolute top-0 left-2/4 w-2 h-full bg-gray-400 shadow-md"></div>
              <div className="absolute top-0 left-3/4 w-1 h-full bg-gray-300 shadow-sm"></div>
              
              {/* Highway/Main Road */}
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/2 left-0 w-full h-3 bg-yellow-400 opacity-80 transform -rotate-12 shadow-lg"></div>
                <div className="absolute top-1/2 left-0 w-full h-1 bg-yellow-200 transform -rotate-12"></div>
              </div>
            </div>
            
            {/* City Blocks */}
            <div className="absolute inset-0">
              {/* Building Blocks */}
              <div className="absolute top-10 left-10 w-20 h-16 bg-gray-200 rounded shadow-sm border border-gray-300"></div>
              <div className="absolute top-10 right-20 w-24 h-20 bg-gray-200 rounded shadow-sm border border-gray-300"></div>
              <div className="absolute bottom-20 left-20 w-18 h-14 bg-gray-200 rounded shadow-sm border border-gray-300"></div>
              <div className="absolute bottom-16 right-16 w-22 h-18 bg-gray-200 rounded shadow-sm border border-gray-300"></div>
              
              {/* Parks/Green Spaces */}
              <div className="absolute top-32 left-1/3 w-16 h-16 bg-green-200 rounded-lg shadow-sm border border-green-300 opacity-70">
                <div className="absolute inset-2 bg-green-300 rounded opacity-50"></div>
              </div>
              <div className="absolute bottom-32 right-1/3 w-20 h-12 bg-green-200 rounded-lg shadow-sm border border-green-300 opacity-70">
                <div className="absolute inset-2 bg-green-300 rounded opacity-50"></div>
              </div>
              
              {/* Water Body */}
              <div className="absolute top-1/4 right-10 w-24 h-32 bg-blue-200 rounded-2xl shadow-sm border border-blue-300 opacity-60">
                <div className="absolute inset-2 bg-blue-300 rounded-xl opacity-50"></div>
              </div>
              
              {/* Commercial Areas */}
              <div className="absolute bottom-1/4 left-1/4 w-32 h-24 bg-orange-100 rounded shadow-sm border border-orange-200 opacity-70">
                <div className="absolute inset-4 grid grid-cols-3 gap-1">
                  <div className="bg-orange-200 rounded-sm"></div>
                  <div className="bg-orange-200 rounded-sm"></div>
                  <div className="bg-orange-200 rounded-sm"></div>
                  <div className="bg-orange-200 rounded-sm"></div>
                  <div className="bg-orange-200 rounded-sm"></div>
                  <div className="bg-orange-200 rounded-sm"></div>
                </div>
              </div>
            </div>
            
            {/* Street Names */}
            <div className="absolute inset-0 text-xs text-gray-600 font-medium">
              <div className="absolute top-1/4 left-4 transform -rotate-90 bg-white px-1 rounded shadow-sm">Main St</div>
              <div className="absolute top-1/2 left-4 transform -rotate-90 bg-white px-1 rounded shadow-sm">Oak Ave</div>
              <div className="absolute top-3/4 left-4 transform -rotate-90 bg-white px-1 rounded shadow-sm">Pine St</div>
              <div className="absolute top-2 left-1/4 bg-white px-1 rounded shadow-sm">1st Ave</div>
              <div className="absolute top-2 left-2/4 bg-white px-1 rounded shadow-sm">Broadway</div>
              <div className="absolute top-2 left-3/4 bg-white px-1 rounded shadow-sm">3rd Ave</div>
            </div>
            
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
          </div>

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
