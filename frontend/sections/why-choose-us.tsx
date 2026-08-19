"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Award, Cpu, Flame, Users, Sparkles, GraduationCap } from "lucide-react";

export function WhyChooseUsSection() {
  const points = [
    {
      icon: <Award className="w-5 h-5 text-primary" />,
      title: "Industry Ready Programs",
      description: "Curriculum designed to track current market demands and 21st-century workplace skills.",
    },
    {
      icon: <Cpu className="w-5 h-5 text-secondary" />,
      title: "Talent-as-a-Service",
      description: "Taps into the domain knowledge of engineering students to create Talent-as-a-Service solutions for corporate clients.",
    },
    {
      icon: <Flame className="w-5 h-5 text-accent" />,
      title: "Practical Learning",
      description: "Focus on build-based education, replacing textbooks with code repositories and business plans.",
    },
    {
      icon: <Users className="w-5 h-5 text-emerald-500" />,
      title: "Expert Mentors",
      description: "Direct guidance from startup CTOs, product managers, and industry researchers.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-yellow-500" />,
      title: "Innovation Centered",
      description: "Encouraging a startup mindset with incubation access and structured ideation support.",
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-rose-500" />,
      title: "Real World Experience",
      description: "Earn experience credentials through verified paid internships and corporate tech gigs.",
    },
  ];

  return (
    <section className="py-24 bg-bg-light relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute right-[-100px] top-[10%] w-[350px] h-[350px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute left-[-100px] bottom-[10%] w-[350px] h-[350px] rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading and Core Messaging */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded-full w-fit">
              Our Differentiators
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-dark tracking-tight leading-tight">
              Unlocking the True Potential of Indian Talent
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed font-normal">
              Traditional education teaches the theory. We provide the ecosystem to execute — combining structured skill-building with hands-on, project-based experience.
            </p>

            {/* List of benefits */}
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-dark">Hands-On, Experience-First Learning</h4>
                  <p className="text-xs text-slate-500">Skills built through real projects and experienceships, not passive lectures.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-dark">Campus-First Focus</h4>
                  <p className="text-xs text-slate-500">Bringing corporate access and networks directly to engineering college campuses.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {points.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 flex flex-col gap-4 group"
              >
                {/* Icon Container */}
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-slate-100 shadow-sm">
                  {point.icon}
                </div>
                
                {/* Content */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-sm font-bold text-dark group-hover:text-primary transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
