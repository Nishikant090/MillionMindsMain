import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  glow?: boolean;
  hoverLift?: boolean;
  gradientBorder?: boolean;
  children: React.ReactNode;
}

export function Card({
  glass = true,
  glow = false,
  hoverLift = true,
  gradientBorder = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl p-6 transition-all duration-300 overflow-hidden",
        // Card Background types
        {
          "glass shadow-sm shadow-slate-100": glass,
          "bg-white border border-slate-100 shadow-sm": !glass,
        },
        // Hover interactions
        {
          "hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/50": hoverLift,
        },
        // Gradient Border (via absolute background and padding overlay)
        gradientBorder && "before:absolute before:inset-0 before:p-[1px] before:bg-gradient-to-tr before:from-primary/30 before:via-secondary/20 before:to-accent/30 before:rounded-2xl before:-z-10 bg-clip-padding",
        className
      )}
      {...props}
    >
      {/* Glow highlight */}
      {glow && (
        <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent blur-3xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
