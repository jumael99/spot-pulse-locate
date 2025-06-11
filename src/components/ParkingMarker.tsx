
import React from 'react';
import { ParkingLot, ParkingStatus } from '@/types/parking';

interface ParkingMarkerProps {
  lot: ParkingLot;
  onClick: (lot: ParkingLot) => void;
  position: { left: string; top: string };
}

const ParkingMarker = ({ lot, onClick, position }: ParkingMarkerProps) => {
  const getStatusColor = (status: ParkingStatus) => {
    switch (status) {
      case ParkingStatus.AVAILABLE:
        return 'bg-green-500 shadow-green-200';
      case ParkingStatus.LIMITED:
        return 'bg-yellow-500 shadow-yellow-200';
      case ParkingStatus.FULL:
        return 'bg-red-500 shadow-red-200';
      default:
        return 'bg-gray-500 shadow-gray-200';
    }
  };

  const getCapacityPercentage = () => {
    return ((lot.totalSpaces - lot.availableSpaces) / lot.totalSpaces) * 100;
  };

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
      style={position}
      onClick={() => onClick(lot)}
    >
      {/* Pulse Animation Ring */}
      <div className={`absolute inset-0 rounded-full ${getStatusColor(lot.status)} opacity-30 animate-ping`}></div>
      
      {/* Main Marker */}
      <div className={`relative w-12 h-12 rounded-full ${getStatusColor(lot.status)} border-3 border-white shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95`}>
        <div className="text-white text-xs font-bold">
          {lot.availableSpaces}
        </div>
      </div>

      {/* Capacity Ring */}
      <div className="absolute inset-0 w-12 h-12">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="2"
            strokeDasharray={`${getCapacityPercentage() * 0.88} 88`}
            className="transition-all duration-500"
          />
        </svg>
      </div>

      {/* Label */}
      <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 bg-white rounded px-2 py-1 shadow-md whitespace-nowrap">
        <span className="text-xs font-medium text-gray-900">{lot.name}</span>
      </div>
    </div>
  );
};

export default ParkingMarker;
