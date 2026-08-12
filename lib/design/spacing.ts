export const spacing = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
} as const;

export const layoutSpacing = {
  pageGutter: {
    mobile: spacing[5],
    tablet: spacing[6],
    desktop: spacing[8],
  },
  section: {
    compact: spacing[16],
    default: spacing[24],
    spacious: spacing[32],
  },
  contentGap: {
    compact: spacing[4],
    default: spacing[6],
    relaxed: spacing[8],
  },
} as const;

export type SpacingToken = keyof typeof spacing;
