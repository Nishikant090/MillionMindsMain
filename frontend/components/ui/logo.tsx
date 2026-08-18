import React from "react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className = "", iconOnly = false }: LogoProps) {
  return (
    <div className={`flex items-center select-none cursor-pointer ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Million Minds"
        className={iconOnly ? "h-9 w-auto object-contain" : "h-10 w-auto object-contain"}
      />
    </div>
  );
}
