import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, CheckCircle2, LayoutDashboard, Brain, Briefcase, GraduationCap, BookOpen, Rocket, Trophy, Building, BarChart3 } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

const EXTERNAL_HOMEPAGE_URL = "https://million-main.vercel.app/";

// Static mapping for service-1 to service-9 metadata
const servicesMap: Record<
  string,
  {
    title: string;
    description: string;
    icon: React.ReactNode;
    features: string[];
  }
> = {
  "service-1": {
    title: "AI Boot Camp",
    description: "Join an immersive boot camp experience focused on future-ready AI, innovation, and career growth.",
    icon: <Brain className="w-8 h-8 text-primary" />,
    features: [
      "Immersive AI Learning Tracks",
      "Hands-On Innovation Workshops",
      "Career-Ready Skill Building",
    ],
  },
  "service-2": {
    title: "Aspire - Jobs & Internships",
    description: "Aspire — Jobs & Internships Platform for Students and Companies.",
    icon: <Briefcase className="w-8 h-8 text-secondary" />,
    features: [
      "1-Click Verified Applications Integration",
      "Earn-While-You-Learn Experienceship Projects",
      "Structured Industry Experience Certificates",
    ],
  },
  "service-3": {
    title: "Campus TaaS Platform",
    description: "Connect with vetted, agile student teams trained to handle technical pipelines and operational use cases.",
    icon: <GraduationCap className="w-8 h-8 text-accent" />,
    features: [
      "Learn & Earn Outsourcing Framework",
      "Technical Pipelines & Delivery Metrics",
      "Real-Life Operational Use Cases",
    ],
  },
  "service-4": {
    title: "AI Boot Camps",
    description: "Hands-on, live in-campus programs across tech, industry-application, and generalist tracks.",
    icon: <BookOpen className="w-8 h-8 text-emerald-500" />,
    features: [
      "Strategic Partnership with Domain Knowledge Experts",
      "Industry Application-Based Bespoke Programs",
      "Essential GenAI Tool Toolkits for Productivity",
    ],
  },
  "service-5": {
    title: "AI Studio",
    description: "Build, test, and deploy GenAI applications and custom LLM models in a collaborative, low-code sandbox environment.",
    icon: <Rocket className="w-8 h-8 text-rose-500" />,
    features: [
      "Collaborative GenAI Sandboxes & Playgrounds",
      "No-Code & Low-Code Application Prototyping",
      "Custom Model Deployments & API Integrations",
    ],
  },
  "service-6": {
    title: "Hackathon Platform",
    description: "Host or join competitive sprint events, assemble multi-disciplinary builder teams, and submit project designs.",
    icon: <Trophy className="w-8 h-8 text-yellow-500" />,
    features: [
      "Developer Team Builder Matchmaking System",
      "Live Sprint Submissions & Sandbox Evaluator",
      "Jury Grading Matrix & Cash Prize Allocator",
    ],
  },
  "service-7": {
    title: "Student Dashboard",
    description: "Analyze coursework grades, active internship applications, test outcomes, and project timelines.",
    icon: <LayoutDashboard className="w-8 h-8 text-sky-500" />,
    features: [
      "Centralized Activity & Assignment Logs",
      "Skill Profile Matrix with Shareable Badges",
      "Personalized Corporate Job Match Analytics",
    ],
  },
  "service-8": {
    title: "Company Portal",
    description: "Allow recruiting corporations to post job requirements, review candidate profiles, and schedule panel interviews.",
    icon: <Building className="w-8 h-8 text-violet-500" />,
    features: [
      "Job/Internship Posting Builder",
      "Candidate ATS Filtering & Pipeline Board",
      "Integrated Live Interview Scheduler",
    ],
  },
  "service-9": {
    title: "Analytics Dashboard",
    description: "Provide campus administrators and institutional heads detailed metric logs on average package yields, student skill rankings, and recruiter trends.",
    icon: <BarChart3 className="w-8 h-8 text-cyan-500" />,
    features: [
      "Average CTC & Employment Rate Graphics",
      "Curriculum Coding Proficiency Metrics",
      "Annual Placement Success Summarizer",
    ],
  },
};

// Required for Next.js static export: tells the build which service IDs to pre-render.
export async function generateStaticParams() {
  return [
    { serviceId: "service-1" },
    { serviceId: "service-2" },
    { serviceId: "service-3" },
    { serviceId: "service-4" },
    { serviceId: "service-5" },
    { serviceId: "service-6" },
    { serviceId: "service-7" },
    { serviceId: "service-8" },
    { serviceId: "service-9" },
  ];
}

interface PageProps {
  params: Promise<{
    serviceId: string;
  }>;
}

export default async function ServicePlaceholderPage({ params }: PageProps) {
  const { serviceId } = await params;

  if (serviceId === "service-1") {
    redirect(EXTERNAL_HOMEPAGE_URL);
  }

  const service = servicesMap[serviceId] || {
    title: "Ecosystem Application Placeholder",
    description: "This service route is mapped and ready for replacement with your standalone application module.",
    icon: <LayoutDashboard className="w-8 h-8 text-primary" />,
    features: [
      "Route successfully bound to /services/" + serviceId,
      "Responsive template ready for codebase separation",
      "SEO parameters and API connection layouts integrated",
    ],
  };

  return (
    <div className="min-h-screen bg-bg-light flex flex-col justify-between overflow-x-hidden relative">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <header className="py-5 border-b border-slate-200/50 bg-white/70 backdrop-blur-md relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-1.5">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 py-16 px-6 relative z-10 flex items-center justify-center">
        <div className="max-w-3xl w-full">
          <div className="glass rounded-3xl p-8 md:p-12 border border-white/60 shadow-xl flex flex-col gap-8">
            
            {/* Header Content */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-5 pb-6 border-b border-slate-200/50">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center">
                {service.icon}
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-extrabold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded w-fit">
                  {serviceId.toUpperCase()} PLACEHOLDER
                </span>
                <h1 className="text-2xl md:text-3xl font-extrabold text-dark tracking-tight">
                  {service.title}
                </h1>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-6">
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                {service.description}
              </p>
              
              {/* Features List */}
              <div className="flex flex-col gap-4">
                <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-400">
                  Planned Platform Modules
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-600 font-medium leading-tight">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Development Notice */}
            <div className="p-5 rounded-2xl bg-slate-100/60 border border-slate-200/40 flex flex-col gap-2">
              <h4 className="text-xs font-extrabold text-dark uppercase tracking-wider">
                Developer Integration Instructions
              </h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                This page represents a dynamic route in <code className="bg-slate-200/50 px-1 py-0.5 rounded text-[10px]">app/services/[serviceId]/page.tsx</code>. You can easily plug your modular dashboard or external repository project directly onto this sub-path.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-4 pt-2">
              <Link href={EXTERNAL_HOMEPAGE_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="md">
                  Explore Homepage
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" size="md" className="gap-1">
                  <ArrowLeft className="w-4 h-4" />
                  Return Home
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="py-6 text-center border-t border-slate-200/40 relative z-10 bg-white/20">
        <p className="text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Million Minds AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
