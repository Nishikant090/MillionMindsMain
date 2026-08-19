"use client";

import React, { useEffect, useState } from "react";
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
  Sparkles,
  Handshake,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { getServices, type Service } from "@/lib/api";

const ICONS: Record<string, React.ReactNode> = {
  brain: <Brain className="w-6 h-6 text-primary" />,
  briefcase: <Briefcase className="w-6 h-6 text-secondary" />,
  "graduation-cap": <GraduationCap className="w-6 h-6 text-accent" />,
  "book-open": <BookOpen className="w-6 h-6 text-emerald-500" />,
  rocket: <Rocket className="w-6 h-6 text-rose-500" />,
  trophy: <Trophy className="w-6 h-6 text-yellow-500" />,
  "layout-dashboard": <LayoutDashboard className="w-6 h-6 text-sky-500" />,
  building: <Building className="w-6 h-6 text-violet-500" />,
  "bar-chart-3": <BarChart3 className="w-6 h-6 text-cyan-500" />,
  sparkles: <Sparkles className="w-6 h-6 text-fuchsia-500" />,
  handshake: <Handshake className="w-6 h-6 text-orange-500" />,
};

// Rendered instantly on load (and used if the API is unreachable) so the
// grid never shows a blank/loading state — swapped for the live list once
// the backend responds, so edits there show up without a frontend redeploy.
const FALLBACK_SERVICES: Service[] = [
  { id: "service-1", icon: "brain", name: "AI Boot Camp", description: "Join an immersive learning experience focused on AI, innovation, and career-ready skills.", link: "https://million-main.vercel.app/", status: "active" },
  { id: "service-2", icon: "briefcase", name: "Aspire - Jobs & Internships", description: "Aspire — Jobs & Internships Platform for Students and Companies.", link: "https://aspire-frontend.onrender.com", status: "active" },
  { id: "service-3", icon: "graduation-cap", name: "Campus TaaS Platform", description: "Connect with vetted, agile student teams trained to handle technical pipelines and operational use cases.", link: "https://aria-campus-taas.onrender.com/", status: "active" },
  { id: "service-10", icon: "sparkles", name: "AI Literacy Mission @ Campus", description: "A free, mentor-led 70-hour programme training students in practical GenAI skills — MasterClass, self-practice, and a capstone project.", link: "https://ai-literacy-mission-campus.vercel.app", status: "active" },
  { id: "service-11", icon: "handshake", name: "ELEVATE: TechFests@Campus", description: "Connects campus hackathons, ideathons, and tech fests with startups and corporates as sponsors, mentors, and collaborators.", link: "https://elevate-tech-fests-campus.vercel.app", status: "active" },
  { id: "service-4", icon: "book-open", name: "AI Boot Camps", description: "Hands-on, live in-campus programs across tech, industry-application, and generalist tracks.", link: "https://million-main.vercel.app/", status: "active" },
  { id: "service-5", icon: "rocket", name: "AI Studio", description: "Build, test, and deploy GenAI applications and custom LLM models in a collaborative, low-code sandbox environment.", link: null, status: "coming_soon" },
  { id: "service-6", icon: "trophy", name: "Hackathon Platform", description: "Form teams, build working prototypes, and compete in nationwide innovation challenges.", link: null, status: "coming_soon" },
  { id: "service-7", icon: "layout-dashboard", name: "Student Dashboard", description: "Track your coursework metrics, skill scores, active applications, and upcoming events.", link: null, status: "coming_soon" },
  { id: "service-8", icon: "building", name: "Company Portal", description: "Post internship requirements, review candidate profiles, and schedule panel interviews.", link: null, status: "coming_soon" },
  { id: "service-9", icon: "bar-chart-3", name: "Analytics Dashboard", description: "Access institutional metrics on placement rates, average package distributions, and skill logs.", link: null, status: "coming_soon" },
];

export function ServicesSection() {
  const [services, setServices] = useState<Service[]>(FALLBACK_SERVICES);

  useEffect(() => {
    let cancelled = false;
    getServices()
      .then((live) => {
        if (!cancelled && live.length > 0) setServices(live);
      })
      .catch(() => {
        // Keep the fallback list already on screen — backend may be cold-starting.
      });
    return () => {
      cancelled = true;
    };
  }, []);

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
          {services.map((service) => {
            const comingSoon = service.status === "coming_soon";
            return (
              <motion.div key={service.id} variants={itemVariants}>
                <Link
                  href={service.link || `/services/${service.id}`}
                  className="block h-full"
                  target={service.link ? "_blank" : undefined}
                  rel={service.link ? "noopener noreferrer" : undefined}
                >
                  <Card
                    glass={false}
                    glow={true}
                    hoverLift={true}
                    className="h-full border border-slate-150 bg-slate-50/50 hover:bg-white p-8 flex flex-col justify-between items-start gap-8 relative group cursor-pointer hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="flex flex-col gap-5 items-start w-full">
                      <div className="flex items-center justify-between w-full">
                        {/* Icon container */}
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md shadow-slate-100 group-hover:scale-110 transition-transform duration-300">
                          {ICONS[service.icon] ?? <Sparkles className="w-6 h-6 text-primary" />}
                        </div>
                        {comingSoon && (
                          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                            <Clock className="w-3 h-3" />
                            Coming Soon
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors duration-300">
                          {service.name}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-normal">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Redirection indicator */}
                    {!comingSoon && (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-primary opacity-80 group-hover:opacity-100 mt-2">
                        Enter Platform
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    )}
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
