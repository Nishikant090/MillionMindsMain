"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Brain, Award, ShieldCheck, Briefcase } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-24 flex items-center justify-center bg-bg-light overflow-hidden"
    >
      {/* Animated Background Blobs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-gradient-to-tr from-primary/10 to-accent/15 blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-gradient-to-tr from-secondary/10 to-primary/10 blur-3xl animate-pulse-slow-reverse pointer-events-none" />

      {/* Floating Particle/Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Subheading & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left gap-6 max-w-2xl">
            {/* Tag / Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/25 text-xs font-semibold uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Next-Gen Career Ecosystem
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-dark leading-[1.1]"
            >
              Empowering Students Through{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                AI, Innovation
              </span>{" "}
              & Career Opportunities
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-slate-600 leading-relaxed font-normal"
            >
              Bridge the gap between academic education and corporate success. Experience an all-in-one platform built for hands-on learning, incubation cohorts, verified internships, and modern placements.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mt-2 w-full sm:w-auto"
            >
              <Link href="#services">
                <Button variant="primary" size="lg" className="gap-2 group">
                  Explore Services
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </motion.div>

            {/* Hero Trust Badges / Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200/80 w-full mt-4"
            >
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-dark">50K+</h4>
                <p className="text-xs text-slate-500 font-medium">Students Upskilled</p>
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-dark">100+</h4>
                <p className="text-xs text-slate-500 font-medium">Partner Colleges</p>
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-dark">500+</h4>
                <p className="text-xs text-slate-500 font-medium">Hiring Corporations</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Premium Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative w-full flex justify-center"
          >
            {/* Dashboard Container Card */}
            <div className="relative w-full max-w-[460px] aspect-[4/3] rounded-2xl glass border border-white/60 shadow-2xl shadow-primary/10 p-5 flex flex-col justify-between overflow-hidden group">
              {/* Internal glowing blob */}
              <div className="absolute -left-12 -top-12 w-32 h-32 rounded-full bg-secondary/15 blur-2xl group-hover:scale-150 transition-all duration-700" />
              
              {/* Header of Mockup */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/50">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-400" />
                  <div className="w-3.5 h-3.5 rounded-full bg-yellow-400" />
                  <div className="w-3.5 h-3.5 rounded-full bg-green-400" />
                </div>
                <div className="px-3 py-1 rounded bg-slate-100 text-[10px] font-bold text-slate-500">
                  STUDENT PORTAL
                </div>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-2 gap-4 my-4 flex-1">
                {/* Micro Card 1: AI Score */}
                <div className="p-3.5 rounded-xl bg-white/80 border border-slate-100 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">AI Career Fit</span>
                    <Brain className="w-4 h-4 text-primary animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-800">98%</h3>
                    <p className="text-[9px] text-green-500 font-medium">Software Engineer</p>
                  </div>
                </div>

                {/* Micro Card 2: Applications */}
                <div className="p-3.5 rounded-xl bg-white/80 border border-slate-100 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">Internships</span>
                    <Briefcase className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-800">4 Active</h3>
                    <p className="text-[9px] text-slate-500 font-medium">2 Under Review</p>
                  </div>
                </div>

                {/* Micro Card 3: Hackathons */}
                <div className="p-3.5 rounded-xl bg-white/80 border border-slate-100 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">Hackathons</span>
                    <Award className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-800">1st Place</h3>
                    <p className="text-[9px] text-secondary font-medium">Smart India Hack</p>
                  </div>
                </div>

                {/* Micro Card 4: Verified Status */}
                <div className="p-3.5 rounded-xl bg-white/80 border border-slate-100 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">Resume AI</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-emerald-600">8.9/10</h3>
                    <p className="text-[9px] text-slate-500 font-medium">ATS Score Verified</p>
                  </div>
                </div>
              </div>

              {/* Status Alert Footer */}
              <div className="p-3 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-600">PLACEMENT ASSISTANCE ACTIVE</span>
                </div>
                <span className="text-[9px] font-black text-primary hover:underline cursor-pointer flex items-center gap-0.5">
                  VIEW INVITATIONS
                  <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>

            {/* Decorative background elements behind mockup */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-accent/20 blur-2xl pointer-events-none" />
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-primary/20 blur-2xl pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
