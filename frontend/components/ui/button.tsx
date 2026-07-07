import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 active:scale-95 cursor-pointer disabled:opacity-50 disabled:pointer-events-none select-none",
        
        // Sizes
        {
          "px-3.5 py-1.5 text-xs font-semibold": size === "sm",
          "px-5 py-2.5 text-sm": size === "md",
          "px-7 py-3.5 text-base font-semibold": size === "lg",
        },
        
        // Variants
        {
          // Primary: Royal Blue Gradient with shadow
          "bg-gradient-to-r from-primary to-blue-600 text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5":
            variant === "primary",
            
          // Secondary: Purple Gradient with shadow
          "bg-gradient-to-r from-secondary to-purple-600 text-white shadow-md shadow-secondary/20 hover:shadow-lg hover:shadow-secondary/30 hover:-translate-y-0.5":
            variant === "secondary",
            
          // Accent: Cyan/Teal Gradient with shadow
          "bg-gradient-to-r from-accent to-cyan-500 text-white shadow-md shadow-accent/20 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5":
            variant === "accent",
            
          // Outline: Gradient border style or clean dark outline
          "border border-slate-200 bg-white text-dark hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-0.5":
            variant === "outline",
            
          // Ghost: Soft transparent background on hover
          "text-slate-600 hover:text-dark hover:bg-slate-100":
            variant === "ghost",
            
          // Glass: Translucent white overlay
          "glass text-slate-800 border border-white/50 shadow-sm hover:bg-white/80 hover:shadow hover:-translate-y-0.5":
            variant === "glass",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
