import Image from "next/image";
import { brandAssets, brandImageClass, type BrandVariant } from "./brand-assets";

export function BrandLogo({
  variant = "auto",
  size = "md",
  className = "",
  priority = false,
}: {
  readonly variant?: BrandVariant;
  readonly size?: keyof typeof brandImageClass;
  readonly className?: string;
  readonly priority?: boolean;
}) {
  const imageClass = `${brandImageClass[size]} max-w-full object-contain ${className}`;
  if (variant !== "auto") {
    return <Image src={brandAssets[variant]} alt="VAYON" width={1397} height={458} className={imageClass} priority={priority} />;
  }
  return (
    <span className="inline-flex shrink-0 items-center" aria-label="VAYON">
      <Image src={brandAssets.dark} alt="" width={1397} height={458} className={`vayon-brand-for-dark ${imageClass}`} priority={priority} />
      <Image src={brandAssets.light} alt="" width={1397} height={458} className={`vayon-brand-for-light ${imageClass}`} priority={priority} />
    </span>
  );
}

