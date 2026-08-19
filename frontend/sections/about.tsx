"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Rocket, Lightbulb, GraduationCap, BookOpen } from "lucide-react";

export function AboutSection() {
  const pillars = [
    {
      icon: <Rocket className="w-6 h-6 text-primary" />,
      title: "Entrepreneurship Development",
      description: "Learn to conceptualize, strategize, and execute business ideas with guidance on prototyping, market solutions, and funding.",
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-secondary" />,
      title: "Innovation and Incubation Platforms",
      description: "Access resources for ideation, innovation, and incubation, fostering a startup-friendly ecosystem on campuses.",
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-accent" />,
      title: "21st Century Skill Enhancement",
      description: "Build employability through technological and life skills essential for success in modern workplaces.",
    },
    {
      icon: <BookOpen className="w-6 h-6 text-emerald-500" />,
      title: "Hands-on Learning (HOL-E)",
      description: "Experience real-world scenarios through practical learning and industry experienceships for better career readiness.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
  };

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full"
          >
            Who We Are
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-extrabold text-dark tracking-tight"
          >
            Empowering Engineers with Future-Ready Skills
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-500 text-base leading-relaxed"
          >
            Millionminds is the overarching umbrella brand under which all initiatives and programmes in the edutech space are managed — namely the &ldquo;Entrepreneurship Education Programme&rdquo; and &ldquo;21st Century Skill Development Programme,&rdquo; focused primarily on engineering college students. Our skill development solutions enhance employability by enabling students to acquire both technological skills and life skills, while tapping into the domain knowledge of bright young minds to create Talent-as-a-Service solutions for corporate clients.
          </motion.p>
        </div>

        {/* Pillars Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pillars.map((pillar) => (
            <motion.div key={pillar.title} variants={itemVariants}>
              <Card
                glass={false}
                glow={true}
                hoverLift={true}
                className="h-full border border-slate-100 bg-slate-50/50 hover:bg-white p-8 flex flex-col items-start gap-5 relative group"
              >
                {/* Icon wrapper */}
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md shadow-slate-100/50 group-hover:scale-110 transition-transform duration-300">
                  {pillar.icon}
                </div>
                
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
