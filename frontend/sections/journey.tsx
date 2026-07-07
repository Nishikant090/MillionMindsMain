"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Code, Users, Briefcase, Award } from "lucide-react";

export function JourneySection() {
  const steps = [
    {
      icon: <BookOpen className="w-5 h-5 text-white" />,
      title: "Learn",
      subtitle: "Acquire Tech Skills",
      description: "Dive into tailored coding pathways, machine learning frameworks, and business strategy guides designed by leading practitioners.",
      color: "bg-primary shadow-primary/30",
    },
    {
      icon: <Code className="w-5 h-5 text-white" />,
      title: "Build",
      subtitle: "Develop Prototypes",
      description: "Push repository updates, solve competitive assessments, and build practical products in our sandbox environments.",
      color: "bg-secondary shadow-secondary/30",
    },
    {
      icon: <Users className="w-5 h-5 text-white" />,
      title: "Collaborate",
      subtitle: "Participate in Cohorts",
      description: "Team up in multi-disciplinary groups, join intensive hackathons, and pitch your startup concepts in the incubation center.",
      color: "bg-accent shadow-accent/30",
    },
    {
      icon: <Briefcase className="w-5 h-5 text-white" />,
      title: "Intern",
      subtitle: "Hands-on Experienceships",
      description: "Work with real startups and tech firms through active, paid internships that count as verified industry credentials.",
      color: "bg-emerald-500 shadow-emerald-500/30",
    },
    {
      icon: <Award className="w-5 h-5 text-white" />,
      title: "Get Placed",
      subtitle: "Launch Your Career",
      description: "Coordinate with our placement portal to schedule technical interviews and secure job offers at global corporate partners.",
      color: "bg-rose-500 shadow-rose-500/30",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Radial Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-slate-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
            Student Roadmap
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-dark tracking-tight">
            The Student Journey to Success
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Follow our structured path designed to transform academic potential into verified, industry-ready expertise.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Track Line */}
          <div className="absolute left-8 md:left-1/2 top-2 bottom-2 w-[3px] bg-slate-100 md:-translate-x-1/2" />
          
          {/* Timeline Nodes */}
          <div className="flex flex-col gap-12 md:gap-16">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={step.title}
                  className={`flex flex-col md:flex-row relative items-start md:items-center ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Indicator Circle */}
                  <div className="absolute left-8 md:left-1/2 w-8 h-8 rounded-full border-[3px] border-white flex items-center justify-center -translate-x-1/2 z-20 shadow-md bg-slate-100">
                    <div className={`w-3.5 h-3.5 rounded-full ${step.color.split(" ")[0]}`} />
                  </div>

                  {/* Left Spacer (Desktop Only) */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content Card (Stays right of bullet on mobile, alternates on desktop) */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
                    className="w-full pl-16 md:pl-0 md:w-1/2 md:px-12"
                  >
                    <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-150 shadow-sm relative group hover:bg-white transition-all duration-300">
                      
                      {/* Step Badge / Icon Header */}
                      <div className="flex items-center gap-3.5 mb-4">
                        <div className={`w-10 h-10 rounded-xl ${step.color} flex items-center justify-center shadow-md`}>
                          {step.icon}
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-black text-primary tracking-wider">
                            STEP 0{index + 1}
                          </span>
                          <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      {/* Subtitle & Description */}
                      <h4 className="text-xs font-bold text-slate-700 mb-2">
                        {step.subtitle}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-normal">
                        {step.description}
                      </p>

                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
