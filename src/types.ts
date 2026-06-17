export interface FuelPrices {
  Gasoline: number;
  GasolineAdit: number;
  Ethanol: number;
  Diesel: number;
  DieselS10: number;
}

export type FuelType = 'Gasoline' | 'GasolineAdit' | 'Ethanol' | 'Diesel' | 'DieselS10';

export type GasStationService = 'store' | 'car-wash' | 'ev-charging' | 'restaurant';

export interface Comment {
  id: string;
  userName: string;
  userAvatarUrl: string;
  text: string;
  timestamp: string;
}

export interface GasStation {
  id: string;
  name: string;
  address: string;
  distance: number; // in km
  status: 'OPEN' | 'CLOSED';
  closeTime: string; // e.g. "23:00"
  logoUrl: string;
  coverUrl: string;
  prices: FuelPrices;
  updatedAt: string; // relative string for UI representation
  updatedTimestamp: number; // raw date timestamp
  verified: boolean;
  services: GasStationService[];
  latitude: number; // 0-100 coordinate on local map canvas
  longitude: number; // 0-100 coordinate on local map canvas
  region: string;
  comments?: Comment[];
}

export interface HistoryItem {
  id: string;
  stationId: string;
  stationName: string;
  fuelType: string;
  oldPrice: number;
  newPrice: number;
  timestamp: string;
  userName: string;
  userPoints: number;
  photoUrl?: string;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  points: number;
  contributionsCount: number;
  tier: string;
  savedStations: string[]; // stationIds
}

// Logo Utilities to resolve broken or un-hotlinkable URLs
export const LOGO_FALLBACKS = {
  PETROBRAS: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3du7te5rknLKGGc_Hk4pneiMqTvfn1RI4g7mTraf6AZocH66o6KOQtEOyhBC9mbBhRYjmPARkvArXfwDKHNYtCLQ9EJ6jRBbNjKFHoU0kk8AetfRw037lmPxDv_pxk0kDpX2avMuORb0LZkRZMPM3ebZrVMxA2uXnYuI3dmIxoCHwZwnTfTT222HLulvwcKTO5dcQ9SPlPsInVZW043lgwYnf3y3ztjN-v0_aKpNLyxgAYpl9Q64whZfvpz_RFFSFX-hAlAjTeRU',
  SHELL: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA20pa4rAkgokyFHY1D0znTA74DXQDDvoH6qaammAHiQZQH3qNXX0CoAnqG8PmB_KMwaMy1tJLo5wlnAx96HU-svYTENn59Uhr3qxmhlQwYU5m0riFmLot1-ijJBwOwFzaNZ0c-WwMPcEpF-_ugF5KwmN3AebCnmRkzU9OyM4LBYbIllW0o-d9JoNfdD-_WQsbkDI_0bcRknf8wdaa_7B3uUSkztBjCfwVtsyS63aoIC5VLby7gRx8Ld1QumcDU44F4ttUTwiekCIE',
  IPIRANGA: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCKULliDtXoBB-jPMB9wUKik18KaHXLnYYLO1Bg9hHx8EM6N3Q1sNM-ezYhePmHnS1_hOHML25uy7LcOlwMMz5EQagAmPf4FKMwBkC_-eEZffeLZX8MGp5zorjuO3Wdnil8j5FbYVj2lmDmkJpjWKHhFTM1EkAKqya-lyDYiCORIGP4JnieORGUSP_mTALIjfljmKny8wNyEyYtJz1ioDBo-1Xn99LMtjRwoQX8MLz8OgKCX-DlGGy-NrwHwHcznEU1KSqbilRIOE',
  DEFAULT: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2YlAUZa1WSLjEN4-Ki4M-JzduGM7rrGTs8o_K6OLZXTV7RJCxy1Ucl6BFxGoP84nlQmhmSROk7PCX3ExdeqBpmV8P_S2xw2kdfNq03yAQwY5ZM4NsfHCd7UiWudTi-1IxUF94G4oEEmV0Sncb6H31dpzOda-SZO31ZsW71nC13XZQX78BFlfcVXtDe7GyQtxPxQE5UVljTY5sqnglhvyJ9Uzu5i9VqsB_cgIsbpSr-5BCrvvuLMdLKO9l0qcDhPFSg8eCW6lc9-8'
};

export function getBrandLogoFallback(name: string): string {
  const upper = (name || '').toUpperCase();
  if (upper.includes('BR') || upper.includes('PETROBRAS') || upper.includes('PETROBRÁS') || upper.includes('LIDER') || upper.includes('LÍDER')) {
    return LOGO_FALLBACKS.PETROBRAS;
  }
  if (upper.includes('SHELL') || upper.includes('CANTÃO') || upper.includes('CANTAO')) {
    return LOGO_FALLBACKS.SHELL;
  }
  if (upper.includes('IPIRANGA')) {
    return LOGO_FALLBACKS.IPIRANGA;
  }
  return LOGO_FALLBACKS.DEFAULT;
}

export function getSanitizedLogoUrl(logoUrl: string, name: string): string {
  if (!logoUrl) return getBrandLogoFallback(name);

  const trimmed = logoUrl.trim();
  
  // Convert Google Drive view URLs to standard preview/direct URL format
  const driveMatch = trimmed.match(/(?:drive\.google\.com\/file\/d\/|drive\.google\.com\/open\?id=)([a-zA-Z0-9_-]+)/);
  if (driveMatch) {
    return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
  }

  // Google Maps urls are not raw images
  if (trimmed.includes('google.com/maps/place') || trimmed.includes('maps/place') || !trimmed.startsWith('http')) {
    return getBrandLogoFallback(name);
  }

  // Instagram URLs might expire, they can also fail. If so, onError will catch it
  return trimmed;
}
