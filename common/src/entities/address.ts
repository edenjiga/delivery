export interface Address {
  name?: String;
  note: String;
  nomenclature: String;
  coordinates: Coordinate;
}

export interface Coordinate {
  latitude: string;
  longitude: string;
}
