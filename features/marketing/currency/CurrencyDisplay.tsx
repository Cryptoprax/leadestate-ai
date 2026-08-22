"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { convertToUsd, convertUsd, defaultMarketingCurrency, detectMarketingCurrency, formatMarketingCurrency, type MarketingCurrency } from "./currency";

type CurrencyContextValue = {
  currency: MarketingCurrency;
  setCurrency: (currency: MarketingCurrency) => void;
  format: (valueUsd: number, compact?: boolean) => string;
  toLocal: (valueUsd: number) => number;
  toUsd: (localValue: number) => number;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function MarketingCurrencyProvider({ children }: { readonly children: ReactNode }) {
  const [currency, setCurrency] = useState<MarketingCurrency>(defaultMarketingCurrency);
  useEffect(() => {
    const locales = navigator.languages?.length ? navigator.languages : [navigator.language];
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const frame = requestAnimationFrame(() => setCurrency(detectMarketingCurrency(locales, timezone)));
    return () => cancelAnimationFrame(frame);
  }, []);
  const value = useMemo<CurrencyContextValue>(() => ({
    currency,
    setCurrency,
    format: (amount, compact) => formatMarketingCurrency(amount, currency, compact),
    toLocal: amount => convertUsd(amount, currency),
    toUsd: amount => convertToUsd(amount, currency),
  }), [currency]);
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useMarketingCurrency(): CurrencyContextValue {
  return useContext(CurrencyContext) ?? {
    currency: defaultMarketingCurrency,
    setCurrency: () => undefined,
    format: (amount, compact) => formatMarketingCurrency(amount, defaultMarketingCurrency, compact),
    toLocal: amount => amount,
    toUsd: amount => amount,
  };
}

export function CurrencyDisplay({ valueUsd, compact = false }: { readonly valueUsd: number; readonly compact?: boolean }) {
  const { format } = useMarketingCurrency();
  return <>{format(valueUsd, compact)}</>;
}
