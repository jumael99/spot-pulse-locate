
import React from 'react';
import { MapPin } from 'lucide-react';

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 rounded-lg p-2">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">ParkFinder</h1>
              <p className="text-xs text-gray-600">Real-time parking availability</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Last updated</p>
            <p className="text-sm font-medium text-gray-900">2 min ago</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
