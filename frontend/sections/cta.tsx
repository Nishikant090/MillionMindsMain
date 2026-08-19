"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { AuthModal } from "@/components/auth/auth-modal";

export function CTASection() {
  const { user } = useAuth();
  const [showSignup, setShowSignup] = useState(false);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Glow backdrop behind CTA card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-gradient-to-tr from-primary/10 via-secondary/10 to-accent/10 blur-3xl pointer-events-none" />

        {/* Gradient Container Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-12 md:p-16 bg-gradient-to-br from-dark via-indigo-950 to-dark text-white border border-slate-800 shadow-2xl overflow-hidden flex flex-col items-center text-center gap-6 group"
        >
          {/* Internal glowing blobs */}
          <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-primary/20 blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
          <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-secondary/25 blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

          {/* Sparkles icon */}
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center mb-2 shadow-lg shadow-black/10">
            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-2xl leading-[1.1]">
            {user ? `Welcome back, ${user.name.split(" ")[0]}!` : "Ready to Transform Your Career?"}
          </h2>

          {/* Subheading */}
          <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed font-normal">
            {user
              ? "You're part of the ecosystem. Explore the services below to pick up where you left off."
              : "Whether you are a student looking for experienceships, an institution aiming to streamline placements, or a corporate recruiter looking for vetted talent."}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 w-full sm:w-auto">
            <Link href="#services">
              <Button variant="accent" size="lg" className="gap-2 group">
                Explore Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            {user ? (
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-5 py-3.5">
                <CheckCircle2 className="w-4 h-4" />
                Account active
              </div>
            ) : (
              <Button
                variant="glass"
                size="lg"
                className="text-white border-white/20 hover:bg-white/10"
                onClick={() => setShowSignup(true)}
              >
                Join Ecosystem Now
              </Button>
            )}
          </div>
        </motion.div>
      </div>

      {showSignup && <AuthModal mode="signup" onClose={() => setShowSignup(false)} />}
    </section>
  );
}
