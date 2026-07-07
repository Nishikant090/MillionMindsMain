"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { School, Users2, Building2, Briefcase } from "lucide-react";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

function Counter({ value, suffix = "", duration = 1.5 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };
    window.requestAnimationFrame(step);
  }, [inView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function StatisticsSection() {
  const stats = [
    {
      icon: <School className="w-6 h-6 text-primary" />,
      value: 100,
      suffix: "+",
      label: "Partner Colleges",
      description: "Nurturing institutions nationwide",
    },
    {
      icon: <Users2 className="w-6 h-6 text-secondary" />,
      value: 50,
      suffix: "K+",
      label: "Active Students",
      description: "Acquiring 21st-century tech skills",
    },
    {
      icon: <Building2 className="w-6 h-6 text-accent" />,
      value: 500,
      suffix: "+",
      label: "Hiring Companies",
      description: "Recruiting directly from our ecosystem",
    },
    {
      icon: <Briefcase className="w-6 h-6 text-emerald-500" />,
      value: 1000,
      suffix: "+",
      label: "Internships",
      description: "Providing hands-on experienceships",
    },
  ];

  return (
    <section className="py-20 bg-dark text-white relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm relative group hover:border-slate-700/60 transition-all duration-300"
            >
              {/* Circular Icon Wrapper */}
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>

              {/* Number */}
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                <Counter value={stat.value} suffix={stat.suffix} />
              </h3>

              {/* Label */}
              <p className="text-sm font-bold text-slate-200 mt-2">
                {stat.label}
              </p>

              {/* Description */}
              <p className="text-xs text-slate-400 mt-1 font-medium">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
