export const fontFamilies = {
  sans: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
  mono: "var(--font-geist-mono), monospace",
} as const;

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const typography = {
  display: {
    fontSize: "clamp(3rem, 7vw, 5.5rem)",
    lineHeight: "0.96",
    letterSpacing: "-0.045em",
    fontWeight: fontWeights.semibold,
  },
  heading1: {
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
    lineHeight: "1.05",
    letterSpacing: "-0.04em",
    fontWeight: fontWeights.semibold,
  },
  heading2: {
    fontSize: "clamp(1.875rem, 4vw, 3rem)",
    lineHeight: "1.1",
    letterSpacing: "-0.035em",
    fontWeight: fontWeights.semibold,
  },
  heading3: {
    fontSize: "1.25rem",
    lineHeight: "1.4",
    letterSpacing: "-0.015em",
    fontWeight: fontWeights.semibold,
  },
  bodyLarge: {
    fontSize: "1.125rem",
    lineHeight: "1.75",
    letterSpacing: "-0.01em",
    fontWeight: fontWeights.regular,
  },
  body: {
    fontSize: "1rem",
    lineHeight: "1.625",
    letterSpacing: "0",
    fontWeight: fontWeights.regular,
  },
  label: {
    fontSize: "0.875rem",
    lineHeight: "1.25",
    letterSpacing: "0",
    fontWeight: fontWeights.medium,
  },
  overline: {
    fontSize: "0.75rem",
    lineHeight: "1",
    letterSpacing: "0.2em",
    fontWeight: fontWeights.semibold,
  },
} as const;

export type TypographyStyle = keyof typeof typography;
