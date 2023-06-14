export interface HereLocationSuggestions {
  suggestions: Suggestion[];
}

export interface Suggestion {
  label: string;
  language: string;
  countryCode: string;
  locationId: string;
  address: Address;
  matchLevel: string;
}

export interface Address {
  country: string;
  state: string;
  county: string;
  city?: string;
  postalCode?: string;
  district?: string;
  street?: string;
}

export interface HereLocationGeocode {
  response: Response;
}

export interface Response {
  metaInfo: MetaInfo;
  view: View[];
}

export interface MetaInfo {
  timestamp: string;
}

export interface View {
  result: Result[];
  viewId: number;
}

export interface Result {
  relevance: number;
  matchLevel: string;
  location: LocationDetails;
}

export interface LocationDetails {
  locationId: string;
  locationType: string;
  displayPosition: DisplayPosition;
  mapView: MapView;
  address: Address;
}

export interface DisplayPosition {
  latitude: number;
  longitude: number;
}

export interface MapView {
  topLeft: DisplayPosition;
  bottomRight: DisplayPosition;
}
