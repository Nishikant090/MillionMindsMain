"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { BrainCircuit, Rocket, Compass, Milestone, GraduationCap, Laptop, Sparkles, ClipboardCheck } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <BrainCircuit className="w-6 h-6 text-white" />,
      title: "AI Learning",
      description: "Tailored pathing powered by neural algorithms to adapt coding, design, and analytics lessons to your pace.",
      gradient: "from-blue-600 to-indigo-600 shadow-blue-500/20",
    },
    {
      icon: <Rocket className="w-6 h-6 text-white" />,
      title: "Startup Support",
      description: "Mentorship and incubation support to take a raw idea through ideation, prototyping, and structured business planning.",
      gradient: "from-violet-600 to-purple-600 shadow-purple-500/20",
    },
    {
      icon: <Compass className="w-6 h-6 text-white" />,
      title: "Internship Opportunities",
      description: "Access verified paid internships and experienceships with global brands and active tech startups.",
      gradient: "from-cyan-600 to-teal-500 shadow-cyan-500/20",
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      title: "Placement Assistance",
      description: "Dedicated assistance connecting you to corporate recruiters looking for active candidates.",
      gradient: "from-emerald-600 to-teal-600 shadow-emerald-500/20",
    },
    {
      icon: <Laptop className="w-6 h-6 text-white" />,
      title: "Industry Mentorship",
      description: "Weekly interactive sessions and project guidance directly from founders and software architects.",
      gradient: "from-rose-600 to-pink-600 shadow-rose-500/20",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-white" />,
      title: "Innovation Labs",
      description: "Sandbox developer environments to test and prototype disruptive technical solutions.",
      gradient: "from-amber-600 to-orange-500 shadow-orange-500/20",
    },
    {
      icon: <Milestone className="w-6 h-6 text-white" />,
      title: "Career Guidance",
      description: "Personalized consultations and counseling sessions helping you identify and align your dream role.",
      gradient: "from-sky-600 to-blue-500 shadow-sky-500/20",
    },
    {
      icon: <ClipboardCheck className="w-6 h-6 text-white" />,
      title: "Skill Assessment",
      description: "Take benchmark exams and code challenges to earn a shareable digital credential for your profile.",
      gradient: "from-fuchsia-600 to-pink-500 shadow-fuchsia-500/20",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 80 } },
  };

  return (
    <section id="features" className="py-24 bg-bg-light relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-1/3 w-80 h-80 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-1/3 w-80 h-80 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded-full">
            Our Offerings
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-dark tracking-tight">
            Comprehensive Capabilities for Career Growth
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Designed to empower, educate, and equip. Uncover unique modules that guide students from academic learning to placement success in an automated, highly-responsive ecosystem.
          </p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants} className="group">
              <Card
                glass={true}
                glow={true}
                hoverLift={true}
                className="h-full flex flex-col items-start gap-6 p-6 border border-white/60 bg-white/40 hover:bg-white transition-all duration-300 relative"
              >
                {/* Icon Circle with Custom Gradient Shadow */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feature.gradient} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}
                >
                  {feature.icon}
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-dark group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>

                {/* Subtile border hover glow */}
                <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-tr from-transparent to-transparent group-hover:from-primary/10 group-hover:to-secondary/15 transition-all duration-300 pointer-events-none -z-10" />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
