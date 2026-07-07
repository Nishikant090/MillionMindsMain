import React from "react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className = "", iconOnly = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 font-semibold text-xl tracking-tight select-none cursor-pointer ${className}`}>
      {/* Icon with modern futuristic gradient border & glow */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary via-secondary to-accent shadow-lg shadow-primary/20 overflow-hidden group">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-white/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Neural connection icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5.5 h-5.5 text-white"
        >
          <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
          <path d="M12 9V3M12 15v6M9 12H3M15 12h6" />
          <path d="M17 7l-3.5 3.5M7 17l3.5-3.5M7 7l3.5 3.5M17 17l-3.5-3.5" />
          <circle cx="12" cy="3" r="1.5" fill="currentColor" />
          <circle cx="12" cy="21" r="1.5" fill="currentColor" />
          <circle cx="3" cy="12" r="1.5" fill="currentColor" />
          <circle cx="21" cy="12" r="1.5" fill="currentColor" />
        </svg>
      </div>
      
      {/* Text branding */}
      {!iconOnly && (
        <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-dark to-slate-700 bg-clip-text text-transparent flex items-center">
          Million
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Minds
          </span>
          <span className="text-[9px] uppercase font-black tracking-widest bg-primary/10 text-primary px-1.5 py-0.5 rounded-md ml-1.5 border border-primary/20">
            AI
          </span>
        </span>
      )}
    </div>
  );
}
