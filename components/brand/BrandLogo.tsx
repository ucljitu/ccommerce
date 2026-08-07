import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant?: "full" | "icon";
  className?: string;
  priority?: boolean;
};

export default function BrandLogo({
  variant = "full",
  className,
  priority = false,
}: BrandLogoProps) {
  if (variant === "icon") {
    return (
      <Image
        src="/brand/c-commerce-icon.png"
        alt="C Commerce"
        width={293}
        height={291}
        priority={priority}
        className={cn("h-auto w-auto object-contain", className)}
      />
    );
  }

  return (
    <Image
      src="/brand/c-commerce-logo.png"
      alt="C Commerce"
      width={1009}
      height={279}
      priority={priority}
      className={cn("h-auto w-auto object-contain", className)}
    />
  );
}

