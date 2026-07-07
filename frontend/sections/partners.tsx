"use client";

import React from "react";
import { Cpu, Cloud, Globe, Code2, Zap, Orbit, Layers, CircleDot } from "lucide-react";

export function PartnersSection() {
  const brandLogos = [
    { name: "Apex Global", icon: <Cpu className="w-5 h-5" /> },
    { name: "CloudBase", icon: <Cloud className="w-5 h-5" /> },
    { name: "InnoCorp", icon: <Layers className="w-5 h-5" /> },
    { name: "SmartTech", icon: <Code2 className="w-5 h-5" /> },
    { name: "NeoSystems", icon: <Zap className="w-5 h-5" /> },
    { name: "EduVerse", icon: <Orbit className="w-5 h-5" /> },
    { name: "FinSolutions", icon: <CircleDot className="w-5 h-5" /> },
    { name: "WebFlow Inc", icon: <Globe className="w-5 h-5" /> },
  ];

  // Duplicate the logos array to achieve a seamless scrolling effect
  const marqueeItems = [...brandLogos, ...brandLogos, ...brandLogos];

  return (
    <section id="partners" className="py-16 bg-white border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-8 text-center">
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
          Trusted by Top Academic Institutions & 500+ Hiring Partners
        </p>
      </div>

      {/* Infinite scrolling marquee wrapper */}
      <div className="relative w-full flex items-center overflow-hidden">
        {/* Left and Right blur shadows for seamless look */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Marquee list */}
        <div className="animate-marquee flex gap-12 items-center py-4">
          {marqueeItems.map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-sm text-slate-400 hover:text-primary transition-all duration-300 select-none cursor-pointer"
            >
              <div className="text-slate-500 hover:text-primary transition-colors">
                {brand.icon}
              </div>
              <span className="text-xs font-bold tracking-tight text-slate-600">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
