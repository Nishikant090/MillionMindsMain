import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/sections/hero";
import { AboutSection } from "@/sections/about";
import { FeaturesSection } from "@/sections/features";
import { StatisticsSection } from "@/sections/statistics";
import { ServicesSection } from "@/sections/services";
import { WhyChooseUsSection } from "@/sections/why-choose-us";
import { JourneySection } from "@/sections/journey";
import { TestimonialsSection } from "@/sections/testimonials";
import { PartnersSection } from "@/sections/partners";
import { CTASection } from "@/sections/cta";

export default function Home() {
  return (
    <>
      {/* Dynamic scrolling Navbar */}
      <Navbar />

      {/* Main content grid */}
      <main className="flex-1 flex flex-col">
        {/* Hero Banner */}
        <HeroSection />

        {/* Brand Mission & Values */}
        <AboutSection />

        {/* Capabilities grid */}
        <FeaturesSection />

        {/* Metric counts */}
        <StatisticsSection />

        {/* Services mapping */}
        <ServicesSection />

        {/* Differentiators */}
        <WhyChooseUsSection />

        {/* Vertical timeline student road */}
        <JourneySection />

        {/* Feedback block */}
        <TestimonialsSection />

        {/* Partner marquee */}
        <PartnersSection />

        {/* Closing action */}
        <CTASection />
      </main>

      {/* Brand footer */}
      <Footer />
    </>
  );
}
