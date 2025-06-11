
import React from 'react';
import { X, MapPin, Clock, DollarSign } from 'lucide-react';
import { ParkingLot, ParkingStatus } from '@/types/parking';
import CapacityChart from './CapacityChart';

interface ParkingModalProps {
  lot: ParkingLot;
  onClose: () => void;
}

const ParkingModal = ({ lot, onClose }: ParkingModalProps) => {
  const getStatusText = (status: ParkingStatus) => {
    switch (status) {
      case ParkingStatus.AVAILABLE:
        return 'Available';
      case ParkingStatus.LIMITED:
        return 'Limited';
      case ParkingStatus.FULL:
        return 'Full';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: ParkingStatus) => {
    switch (status) {
      case ParkingStatus.AVAILABLE:
        return 'text-green-600 bg-green-100';
      case ParkingStatus.LIMITED:
        return 'text-yellow-600 bg-yellow-100';
      case ParkingStatus.FULL:
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const occupancyRate = ((lot.totalSpaces - lot.availableSpaces) / lot.totalSpaces) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-t-3xl shadow-2xl animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <h2 className="text-xl font-bold text-gray-900">{lot.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(lot.status)}`}>
              {getStatusText(lot.status)}
            </span>
            <div className="text-right">
              <span className="text-2xl font-bold text-gray-900">{lot.availableSpaces}</span>
              <span className="text-gray-500 ml-1">/ {lot.totalSpaces} spots</span>
            </div>
          </div>

          {/* Capacity Chart */}
          <CapacityChart occupancyRate={occupancyRate} />

          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-xs text-gray-500">Distance</p>
                <p className="text-sm font-medium text-gray-900">{lot.distance}m away</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-xs text-gray-500">Price</p>
                <p className="text-sm font-medium text-gray-900">${lot.pricePerHour}/hour</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors active:scale-95 transform">
              Navigate to Parking
            </button>
            <button className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors active:scale-95 transform">
              Reserve Spot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingModal;
