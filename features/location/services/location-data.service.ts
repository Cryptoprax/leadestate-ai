import { cities, countries, currencies, fallbackTimezones, languages, states } from "../data/catalogs";

export class LocationDataService {
  countries() { return countries; }
  states(countryCode: string) { return states.filter((state) => state.countryCode === countryCode); }
  cities(countryCode: string, stateCode: string) { return cities.filter((city) => city.countryCode === countryCode && city.stateCode === stateCode); }
  currencies() { return currencies; }
  languages() { return languages; }
  timezones() { return fallbackTimezones; }
  country(code: string) { return countries.find((country) => country.code === code); }
}

export const locationData = new LocationDataService();
