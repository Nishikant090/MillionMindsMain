"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Lightbulb, Rocket, Users, Target, BookOpen, Layers } from "lucide-react";

export function AboutSection() {
  const pillars = [
    {
      icon: <Rocket className="w-6 h-6 text-primary" />,
      title: "Entrepreneurship",
      description: "Cultivating business minds from early stage ideation to structured GTM plans and funding assistance.",
    },
    {
      icon: <Target className="w-6 h-6 text-secondary" />,
      title: "Skill Development",
      description: "Mastering in-demand 21st-century technologies, ensuring students are transition-ready on day one.",
    },
    {
      icon: <Users className="w-6 h-6 text-accent" />,
      title: "Industry Collaboration",
      description: "Direct linkages with corporations, offering dialogues, projects, and experienced mentorship.",
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
      title: "Innovation",
      description: "Providing sandbox environments and prototyping labs to test disruptive technical solutions.",
    },
    {
      icon: <BookOpen className="w-6 h-6 text-emerald-500" />,
      title: "Hands-on Learning",
      description: "Embracing the HOL-E concept (Hands-On Learning & Experienceship) over passive lectures.",
    },
    {
      icon: <Layers className="w-6 h-6 text-rose-500" />,
      title: "Startup Ecosystem",
      description: "Connecting students to the startup world, offering paid gigs, experienceships, and hiring networks.",
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
            Bridging the Gap Between Academia & the Corporate Ecosystem
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-500 text-base leading-relaxed"
          >
            Inspired by the vision of Million Minds, we are an AI-powered incubator and talent enablement center. We operate with a core belief: true education happens through experiences. Our platform guides engineering candidates and business strategists to learn, build, and deploy.
          </motion.p>
        </div>

        {/* Pillars Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
