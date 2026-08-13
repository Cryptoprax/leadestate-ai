import { countries as globalCountries, currencies, fallbackTimezones, languages } from "@/features/location/data/catalogs";

export type CountryOption = { code: string; name: string; currency: string; flag: string };
export const countries: readonly CountryOption[] = globalCountries;
export { currencies, fallbackTimezones, languages };
