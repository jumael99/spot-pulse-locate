
export enum ParkingStatus {
  AVAILABLE = 'available',
  LIMITED = 'limited',
  FULL = 'full',
  UNKNOWN = 'unknown'
}

export interface ParkingLot {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  totalSpaces: number;
  availableSpaces: number;
  status: ParkingStatus;
  pricePerHour: number;
  distance: number;
}

export interface ParkingData {
  timestamp: Date;
  lots: ParkingLot[];
}
