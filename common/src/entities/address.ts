export interface Address {
  name?: String;
  note: String;
  nomenclature: String;
  coordinates: {
    longitude: String;
    latitude: String;
  };
}
