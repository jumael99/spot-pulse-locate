
import React from 'react';
import ParkingMap from '@/components/ParkingMap';
import Header from '@/components/Header';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      <Header />
      <main className="relative h-screen">
        <ParkingMap />
      </main>
    </div>
  );
};

export default Index;
