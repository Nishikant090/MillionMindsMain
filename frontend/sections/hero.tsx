"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Brain, Handshake, GraduationCap } from "lucide-react";
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
              Knowledge X-Change · A Millionminds Initiative
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-dark leading-[1.1]"
            >
              Bridging{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                The Gap
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg md:text-xl font-bold text-dark uppercase tracking-wide -mt-2"
            >
              A platform to impart employability skills training
            </motion.p>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-slate-600 leading-relaxed font-normal"
            >
              To promote holistic development of students&rsquo; skill sets in various Emerging Technology Domains, and enhance their &ldquo;Employability Quotient&rdquo; by providing conceptual learning with hands-on experience through real-world work — for real-world success.
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
          </div>

          {/* Right Column: Ecosystem Modules Snapshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative w-full flex justify-center"
          >
            {/* Snapshot Card */}
            <div className="relative w-full max-w-[460px] rounded-2xl glass border border-white/60 shadow-2xl shadow-primary/10 p-5 flex flex-col gap-4 overflow-hidden group">
              {/* Internal glowing blob */}
              <div className="absolute -left-12 -top-12 w-32 h-32 rounded-full bg-secondary/15 blur-2xl group-hover:scale-150 transition-all duration-700" />

              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/50">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-400" />
                  <div className="w-3.5 h-3.5 rounded-full bg-yellow-400" />
                  <div className="w-3.5 h-3.5 rounded-full bg-green-400" />
                </div>
                <div className="px-3 py-1 rounded bg-slate-100 text-[10px] font-bold text-slate-500">
                  ECOSYSTEM MODULES
                </div>
              </div>

              {/* Real, live module list */}
              <div className="flex flex-col gap-3">
                <div className="p-3.5 rounded-xl bg-white/80 border border-slate-100 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Brain className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-slate-700">AI Boot Camp</span>
                  </div>
                  <span className="text-[9px] font-black text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/80 border border-slate-100 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-4 h-4 text-secondary" />
                    <span className="text-xs font-bold text-slate-700">AI Literacy Mission @ Campus</span>
                  </div>
                  <span className="text-[9px] font-black text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/80 border border-slate-100 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Handshake className="w-4 h-4 text-accent" />
                    <span className="text-xs font-bold text-slate-700">ELEVATE: TechFests@Campus</span>
                  </div>
                  <span className="text-[9px] font-black text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE
                  </span>
                </div>
              </div>

              {/* Footer link */}
              <Link href="#services" className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                <span className="text-[10px] font-bold text-slate-600">See all ecosystem modules</span>
                <span className="text-[9px] font-black text-primary flex items-center gap-0.5">
                  VIEW ALL
                  <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </Link>
            </div>

            {/* Decorative background elements behind card */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-accent/20 blur-2xl pointer-events-none" />
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-primary/20 blur-2xl pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
