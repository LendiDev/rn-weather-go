export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location {
  id: string;
  displayName: string;
  additionalInfo: string;
  coordinates: Coordinates;
}
