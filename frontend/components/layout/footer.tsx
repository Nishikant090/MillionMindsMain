"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Mail, Phone, MapPin, ArrowRight, Check, Loader2 } from "lucide-react";
import { subscribeToNewsletter } from "@/lib/api";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setErrorMessage("");
    try {
      await subscribeToNewsletter(email);
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    { name: "AI Boot Camp", href: "/services/service-1" },
    { name: "Aspire – Talent Connect Platform", href: "/services/service-2" },
    { name: "Campus TaaS", href: "/services/service-3" },
    { name: "AI Literacy Mission @ Campus", href: "/services/service-10" },
    { name: "ELEVATE: TechFests@Campus", href: "/services/service-11" },
  ];

  const socials = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      href: "https://www.linkedin.com/in/sanjoy-chakrabarty-51a8a79",
      name: "LinkedIn",
    },
  ];

  return (
    <footer id="contact" className="bg-dark text-slate-400 pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <Logo className="text-white" />
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering the next generation of builders, innovators, and leaders through AI-driven skill development, experiential learning, and career enablement.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-800/50 hover:bg-primary border border-slate-700/50 hover:border-primary text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-base mb-6 tracking-wide uppercase text-xs">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors duration-200 text-sm flex items-center group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all mr-0 group-hover:mr-2 text-primary" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white font-semibold text-base mb-6 tracking-wide uppercase text-xs">
              Core Ecosystem
            </h4>
            <ul className="flex flex-col gap-3.5">
              {services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors duration-200 text-sm flex items-center group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all mr-0 group-hover:mr-2 text-primary" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="flex flex-col gap-6">
            <div>
              <h4 className="text-white font-semibold text-base mb-6 tracking-wide uppercase text-xs">
                Stay Updated
              </h4>
              <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                Subscribe to our newsletter to receive updates on incubation cohorts, internships, and skill workshops.
              </p>
              {status === "success" ? (
                <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                  <Check className="w-4 h-4 shrink-0" />
                  Subscribed! Check your inbox for updates.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-1.5">
                  <div className="relative flex items-center">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      disabled={status === "loading"}
                      className="w-full bg-slate-800/40 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors pr-10 disabled:opacity-60"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="absolute right-2 top-2 p-1.5 rounded-lg bg-primary hover:bg-blue-600 text-white transition-colors cursor-pointer disabled:opacity-60"
                      aria-label="Subscribe"
                    >
                      {status === "loading" ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {status === "error" && (
                    <p className="text-xs text-red-400">{errorMessage}</p>
                  )}
                </form>
              )}
            </div>
            
            <div className="flex flex-col gap-3 border-t border-slate-800/60 pt-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:sanjoy.millionminds@gmail.com" className="hover:text-white transition-colors">sanjoy.millionminds@gmail.com</a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+919820409663" className="hover:text-white transition-colors">+91 98204 09663</a>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>D 6001, Indiabulls Golf City, Savrolli, Khalapur - 410202, Raigad, Maharashtra</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Footer */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} Millionminds. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <Link href="#privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
