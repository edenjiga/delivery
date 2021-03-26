export interface Address {
  name: string;
  note: string;
  nomenclature: string;
  coordinates: Coordinate;
}

export interface Coordinate {
  latitude: string;
  longitude: string;
}
