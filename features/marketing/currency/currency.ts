export const marketingCurrencies = {
  USD: { locale: "en-US", rateFromUsd: 1, countries: ["US"] },
  CAD: { locale: "en-CA", rateFromUsd: 1.36, countries: ["CA"] },
  GBP: { locale: "en-GB", rateFromUsd: 0.79, countries: ["GB"] },
  EUR: { locale: "en-IE", rateFromUsd: 0.92, countries: ["AT", "BE", "CY", "DE", "EE", "ES", "FI", "FR", "GR", "HR", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PT", "SI", "SK"] },
  AED: { locale: "en-AE", rateFromUsd: 3.6725, countries: ["AE"] },
  INR: { locale: "en-IN", rateFromUsd: 83.5, countries: ["IN"] },
  SGD: { locale: "en-SG", rateFromUsd: 1.35, countries: ["SG"] },
  THB: { locale: "th-TH", rateFromUsd: 35.8, countries: ["TH"] },
  AUD: { locale: "en-AU", rateFromUsd: 1.52, countries: ["AU"] },
  JPY: { locale: "ja-JP", rateFromUsd: 149.5, countries: ["JP"] },
} as const;

export type MarketingCurrency = keyof typeof marketingCurrencies;
export const defaultMarketingCurrency: MarketingCurrency = "USD";
export const supportedMarketingCurrencies = Object.keys(marketingCurrencies) as MarketingCurrency[];

const timezoneCurrency: Readonly<Record<string, MarketingCurrency>> = {
  "Asia/Calcutta": "INR", "Asia/Kolkata": "INR", "Asia/Dubai": "AED",
  "Asia/Singapore": "SGD", "Asia/Bangkok": "THB", "Asia/Tokyo": "JPY",
  "Australia/Sydney": "AUD", "Australia/Melbourne": "AUD", "Australia/Perth": "AUD",
  "Europe/London": "GBP",
};

export function currencyForCountry(country?: string | null): MarketingCurrency {
  const code = country?.toUpperCase();
  if (!code) return defaultMarketingCurrency;
  return supportedMarketingCurrencies.find(currency => marketingCurrencies[currency].countries.includes(code as never)) ?? defaultMarketingCurrency;
}

export function detectMarketingCurrency(locales: readonly string[], timezone?: string): MarketingCurrency {
  for (const locale of locales) {
    try {
      const region = new Intl.Locale(locale).region;
      if (region) {
        const currency = currencyForCountry(region);
        if (currency !== defaultMarketingCurrency || region === "US") return currency;
      }
    } catch { /* Ignore malformed browser locales and retain the safe fallback. */ }
  }
  return timezoneCurrency[timezone ?? ""] ?? defaultMarketingCurrency;
}

export function convertUsd(value: number, currency: MarketingCurrency): number {
  return value * marketingCurrencies[currency].rateFromUsd;
}

export function convertToUsd(value: number, currency: MarketingCurrency): number {
  return value / marketingCurrencies[currency].rateFromUsd;
}

export function formatMarketingCurrency(valueUsd: number, currency: MarketingCurrency, compact = false): string {
  const metadata = marketingCurrencies[currency];
  return new Intl.NumberFormat(metadata.locale, {
    style: "currency",
    currency,
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : 0,
  }).format(convertUsd(valueUsd, currency));
}
