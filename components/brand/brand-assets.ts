export const brandAssets = {
  master: "/assets/brand/logo-master.png",
  dark: "/assets/brand/logo-dark.png",
  light: "/assets/brand/logo-light.png",
  white: "/assets/brand/logo-white.png",
  black: "/assets/brand/logo-black.png",
  icon: "/assets/brand/logo-icon.png",
  wordmarkDark: "/assets/brand/wordmark-dark.png",
  wordmarkLight: "/assets/brand/wordmark-light.png",
  wordmarkWhite: "/assets/brand/wordmark-white.png",
  wordmarkBlack: "/assets/brand/wordmark-black.png",
} as const;

export type BrandVariant = "auto" | "dark" | "light" | "white" | "black";

export const brandImageClass = {
  sm: "h-6 w-auto",
  md: "h-8 w-auto",
  lg: "h-11 w-auto",
  xl: "h-16 w-auto",
} as const;

