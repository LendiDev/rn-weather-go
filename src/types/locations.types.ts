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
