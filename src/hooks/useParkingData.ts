
import { useState, useEffect } from 'react';
import { ParkingLot, ParkingStatus } from '@/types/parking';

// Mock parking data generator
const generateMockParkingData = (): ParkingLot[] => {
  const lots: ParkingLot[] = [
    {
      id: '1',
      name: 'Downtown Plaza',
      latitude: 37.7849,
      longitude: -122.4094,
      totalSpaces: 120,
      availableSpaces: 45,
      status: ParkingStatus.AVAILABLE,
      pricePerHour: 3.50,
      distance: 150,
    },
    {
      id: '2',
      name: 'City Center',
      latitude: 37.7749,
      longitude: -122.4194,
      totalSpaces: 80,
      availableSpaces: 12,
      status: ParkingStatus.LIMITED,
      pricePerHour: 4.00,
      distance: 200,
    },
    {
      id: '3',
      name: 'Main Street',
      latitude: 37.7649,
      longitude: -122.4294,
      totalSpaces: 150,
      availableSpaces: 0,
      status: ParkingStatus.FULL,
      pricePerHour: 2.75,
      distance: 320,
    },
    {
      id: '4',
      name: 'Metro Hub',
      latitude: 37.7549,
      longitude: -122.4394,
      totalSpaces: 200,
      availableSpaces: 78,
      status: ParkingStatus.AVAILABLE,
      pricePerHour: 3.25,
      distance: 180,
    },
    {
      id: '5',
      name: 'Business District',
      latitude: 37.7949,
      longitude: -122.3994,
      totalSpaces: 95,
      availableSpaces: 23,
      status: ParkingStatus.LIMITED,
      pricePerHour: 5.00,
      distance: 280,
    },
    {
      id: '6',
      name: 'Shopping Center',
      latitude: 37.7449,
      longitude: -122.4494,
      totalSpaces: 300,
      availableSpaces: 156,
      status: ParkingStatus.AVAILABLE,
      pricePerHour: 2.00,
      distance: 450,
    },
  ];

  return lots;
};

export const useParkingData = () => {
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchParkingData = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const data = generateMockParkingData();
      setParkingLots(data);
      setIsLoading(false);
    };

    fetchParkingData();

    // Set up real-time updates
    const interval = setInterval(() => {
      setParkingLots(current => 
        current.map(lot => {
          // Randomly update available spaces
          const change = Math.floor(Math.random() * 5) - 2;
          const newAvailable = Math.max(0, Math.min(lot.totalSpaces, lot.availableSpaces + change));
          
          let newStatus = ParkingStatus.AVAILABLE;
          if (newAvailable === 0) {
            newStatus = ParkingStatus.FULL;
          } else if (newAvailable / lot.totalSpaces < 0.3) {
            newStatus = ParkingStatus.LIMITED;
          }

          return {
            ...lot,
            availableSpaces: newAvailable,
            status: newStatus,
          };
        })
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return { parkingLots, isLoading };
};
