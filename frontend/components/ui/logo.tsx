import React from "react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className = "", iconOnly = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none cursor-pointer ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Millionminds"
        className={iconOnly ? "h-9 w-auto object-contain" : "h-10 w-auto object-contain"}
      />
      {!iconOnly && (
        <>
          <div className="w-px h-6 bg-current opacity-20" />
          <span className="px-2.5 py-1 rounded-md bg-primary text-white text-[11px] font-extrabold uppercase tracking-wider whitespace-nowrap">
            Knowledge X-Change
          </span>
        </>
      )}
    </div>
  );
}
