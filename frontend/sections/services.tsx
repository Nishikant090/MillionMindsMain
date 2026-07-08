"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Brain,
  Briefcase,
  GraduationCap,
  BookOpen,
  Rocket,
  Trophy,
  LayoutDashboard,
  Building,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      id: "service-1",
      icon: <Brain className="w-6 h-6 text-primary" />,
      title: "AI Career Assistant",
      description: "Get real-time resume reviews, placement alignment matching, and mock technical interviews powered by LLMs.",
    },
    {
      id: "service-2",
      icon: <Briefcase className="w-6 h-6 text-secondary" />,
      title: "Internship Portal",
      description: "Find verified experienceships and paid internships with startup builders and corporate giants.",
    },
    {
      id: "service-3",
      icon: <GraduationCap className="w-6 h-6 text-accent" />,
      title: "Placement Management",
      description: "Optimize your corporate campus hiring, coordinate recruitment drives, and track incoming offers.",
    },
    {
      id: "service-4",
      icon: <BookOpen className="w-6 h-6 text-emerald-500" />,
      title: "AI Boot Camps",
      description: "Hands-on, live in-campus programs across tech, industry-application, and generalist tracks.",
      link: "https://million-main.vercel.app/",
    },
    {
      id: "service-5",
      icon: <Rocket className="w-6 h-6 text-rose-500" />,
      title: "AI Studio",
      description: "Build, test, and deploy GenAI applications and custom LLM models in a collaborative, low-code sandbox environment.",
    },
    {
      id: "service-6",
      icon: <Trophy className="w-6 h-6 text-yellow-500" />,
      title: "Hackathon Platform",
      description: "Form teams, build working prototypes, and compete in nationwide innovation challenges.",
    },
    {
      id: "service-7",
      icon: <LayoutDashboard className="w-6 h-6 text-sky-500" />,
      title: "Student Dashboard",
      description: "Track your coursework metrics, skill scores, active applications, and upcoming events.",
    },
    {
      id: "service-8",
      icon: <Building className="w-6 h-6 text-violet-500" />,
      title: "Company Portal",
      description: "Post internship requirements, review candidate profiles, and schedule panel interviews.",
    },
    {
      id: "service-9",
      icon: <BarChart3 className="w-6 h-6 text-cyan-500" />,
      title: "Analytics Dashboard",
      description: "Access institutional metrics on placement rates, average package distributions, and skill logs.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
  };

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute left-1/4 top-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute right-1/4 bottom-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
            Ecosystem Modules
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-dark tracking-tight">
            Ecosystem Services Grid
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Click on any module to enter its dedicated web application. Our platforms are designed to connect seamlessly for institutional, student, and recruiter coordination.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <Link href={service.link || `/services/${service.id}`} className="block h-full" target={service.link ? "_blank" : undefined}>
                <Card
                  glass={false}
                  glow={true}
                  hoverLift={true}
                  className="h-full border border-slate-150 bg-slate-50/50 hover:bg-white p-8 flex flex-col justify-between items-start gap-8 relative group cursor-pointer hover:border-primary/20 transition-all duration-300"
                >
                  <div className="flex flex-col gap-5 items-start">
                    {/* Icon container */}
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md shadow-slate-100 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-normal">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Redirection indicator */}
                  <div className="flex items-center gap-1.5 text-xs font-bold text-primary opacity-80 group-hover:opacity-100 mt-2">
                    Enter Platform
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
