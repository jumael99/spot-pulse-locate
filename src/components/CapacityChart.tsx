
import React from 'react';

interface CapacityChartProps {
  occupancyRate: number;
}

const CapacityChart = ({ occupancyRate }: CapacityChartProps) => {
  const getColorClass = (rate: number) => {
    if (rate < 50) return 'from-green-400 to-green-600';
    if (rate < 80) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Occupancy</span>
        <span className="text-sm font-bold text-gray-900">{Math.round(occupancyRate)}%</span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${getColorClass(occupancyRate)} transition-all duration-1000 ease-out rounded-full`}
          style={{ width: `${occupancyRate}%` }}
        />
      </div>

      {/* Visual Capacity Grid */}
      <div className="grid grid-cols-10 gap-1 p-4 bg-gray-50 rounded-lg">
        {Array.from({ length: 20 }, (_, index) => {
          const isOccupied = index < (occupancyRate / 100) * 20;
          return (
            <div
              key={index}
              className={`w-4 h-6 rounded-sm transition-colors duration-300 ${
                isOccupied 
                  ? 'bg-gray-800' 
                  : 'bg-green-400 shadow-sm'
              }`}
            />
          );
        })}
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded"></div>
          <span>Available</span>
        </span>
        <span className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-gray-800 rounded"></div>
          <span>Occupied</span>
        </span>
      </div>
    </div>
  );
};

export default CapacityChart;
