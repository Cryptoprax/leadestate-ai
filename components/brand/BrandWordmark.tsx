import Image from "next/image";
import { brandAssets, brandImageClass, type BrandVariant } from "./brand-assets";

const sources = {
  dark: brandAssets.wordmarkDark,
  light: brandAssets.wordmarkLight,
  white: brandAssets.wordmarkWhite,
  black: brandAssets.wordmarkBlack,
} as const;

export function BrandWordmark({
  variant = "auto",
  size = "md",
  className = "",
}: {
  readonly variant?: BrandVariant;
  readonly size?: keyof typeof brandImageClass;
  readonly className?: string;
}) {
  const imageClass = `${brandImageClass[size]} max-w-full object-contain ${className}`;
  if (variant !== "auto") {
    return <Image src={sources[variant]} alt="VAYON" width={964} height={458} className={imageClass} />;
  }
  return (
    <span className="inline-flex shrink-0 items-center" aria-label="VAYON">
      <Image src={sources.dark} alt="" width={964} height={458} className={`vayon-brand-for-dark ${imageClass}`} />
      <Image src={sources.light} alt="" width={964} height={458} className={`vayon-brand-for-light ${imageClass}`} />
    </span>
  );
}

