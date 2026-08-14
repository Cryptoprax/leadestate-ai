import Image from "next/image";
import { brandAssets } from "./brand-assets";

const sizes = { sm: 24, md: 36, lg: 48, xl: 64 } as const;

export function BrandIcon({
  size = "md",
  className = "",
  priority = false,
}: {
  readonly size?: keyof typeof sizes;
  readonly className?: string;
  readonly priority?: boolean;
}) {
  const pixels = sizes[size];
  return <Image src={brandAssets.icon} alt="VAYON" width={pixels} height={pixels} className={`shrink-0 object-contain ${className}`} priority={priority} />;
}

