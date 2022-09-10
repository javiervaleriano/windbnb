// API
export interface RealState {
  city: string;
  country: string;
  superHost: boolean;
  title: string;
  rating: number;
  maxGuests: number;
  type: string;
  beds: number;
  photo: string;
}

// PROPS
export interface HeaderProps {
  data: RealState[];
  selectedCity: string;
  qtyGuests: number;
  setSelectedCity(city: string): void;
  setSearchGuests(qty: number): void;
  applySearch(): void;
}

export interface LocationOptionProps {
  city: string;
  setSelectedCity(city: string): void;
}

export interface RealStateItemProps {
  beds: number;
  photo: string;
  rating: number;
  superHost: boolean;
  title: string;
  type: string;
}

// STATE
export interface SearchSelected<T, U> {
  location: T;
  guests: U;
}