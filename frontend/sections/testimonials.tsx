"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Rohan Sharma",
      role: "Software Engineering Student",
      source: "L.D. College of Engineering",
      quote: "Million Minds AI helped me transition from simple coding exercises to building fullstack prototypes. The experienceship program landed me a paid React developer internship, and I was placed before graduation!",
      rating: 5,
      avatarColor: "bg-blue-500",
    },
    {
      name: "Dr. Anjali Patil",
      role: "Head of Training & Placement",
      source: "COEP Technological University",
      quote: "Integrating our student portal with the placement assistant simplified recruitment. The dashboard analytics gave our staff clear insight into coding benchmarks, enhancing our college's average salary package.",
      rating: 5,
      avatarColor: "bg-purple-500",
    },
    {
      name: "Siddharth Verma",
      role: "Incubation Cohort Lead",
      source: "Venture Labs India",
      quote: "The startup support system here is exceptional. We built our product MVP inside the sandbox, received legal incorporation mentoring, and successfully pitched our idea to initial angel networks.",
      rating: 5,
      avatarColor: "bg-cyan-500",
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-bg-light relative overflow-hidden">
      {/* Decorative backgrounds */}
      <div className="absolute right-0 top-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-80 h-80 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded-full">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-dark tracking-tight">
            Hear from Our Ecosystem Partners
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            See how Million Minds AI has impacted students, college campus administrators, and recruiting networks alike.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card
                glass={true}
                glow={true}
                hoverLift={true}
                className="h-full border border-white/60 bg-white/40 hover:bg-white p-8 flex flex-col justify-between relative group"
              >
                {/* Quote Icon watermark */}
                <Quote className="absolute right-6 top-6 w-12 h-12 text-slate-100 group-hover:text-primary/10 transition-colors pointer-events-none -z-10" />

                <div className="flex flex-col gap-6">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Quote content */}
                  <p className="text-slate-600 text-sm leading-relaxed italic font-normal">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-200/50">
                  {/* Custom Avatar */}
                  <div className={`w-11 h-11 rounded-full ${t.avatarColor} text-white flex items-center justify-center font-bold text-sm shadow-md`}>
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-dark">{t.name}</h4>
                    <p className="text-[11px] text-slate-500 font-semibold">{t.role}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{t.source}</p>
                  </div>
                </div>

              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
