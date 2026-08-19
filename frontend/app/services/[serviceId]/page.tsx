import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, CheckCircle2, LayoutDashboard, Brain, Briefcase, GraduationCap, Bot, Award, TrendingUp, RefreshCw, ShieldCheck, BarChart3, Lightbulb, FlaskConical } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

const EXTERNAL_HOMEPAGE_URL = "https://million-main.vercel.app/";

// Services that are live external apps: a direct hit on /services/<id> redirects
// straight there instead of showing the placeholder template below.
const EXTERNAL_REDIRECTS: Record<string, string> = {
  "service-1": EXTERNAL_HOMEPAGE_URL,
  "service-10": "https://ai-literacy-mission-campus.vercel.app",
  "service-11": "https://elevate-tech-fests-campus.vercel.app",
};

// Static mapping for not-yet-live service metadata. Descriptions sourced
// directly from Millionminds' own service notes.
const servicesMap: Record<
  string,
  {
    title: string;
    description: string;
    icon: React.ReactNode;
    features: string[];
  }
> = {
  "service-2": {
    title: "Aspire – Talent Connect Platform",
    description: "Structured job openings sourced from startup founders, aligned with college placement cells — an added pipeline of opportunities during campus drives.",
    icon: <Briefcase className="w-8 h-8 text-secondary" />,
    features: [
      "Job openings sourced directly from startup founders",
      "Aligned with T&P cells at partner colleges",
      "Unique learning & professional growth opportunities",
    ],
  },
  "service-3": {
    title: "Campus TaaS",
    description: "B2B consultancy where student tech teams (CSE-IT/MCA) help startups and SMBs adopt AI solutions to enhance productivity, charged on project specs.",
    icon: <GraduationCap className="w-8 h-8 text-accent" />,
    features: [
      "Outsourced AI adaptation service for StartUp & SMB clients",
      "Delivered by CSE-IT/MCA students skilled in AI & GenAI tools",
      "Tech + Operational student team enables client AI adoption",
    ],
  },
  "service-4": {
    title: "My AI Buddy!",
    description: "\"Do it yourself, with your student buddy by your side.\" Student mentors help SMBs and startups develop their own AI tools and web solutions, hands-on.",
    icon: <Bot className="w-8 h-8 text-emerald-500" />,
    features: [
      "Students with AI tool expertise act as process enablers",
      "Charged to clients on project specs, like a consultancy",
      "Focused on solving day-to-day productivity problems",
    ],
  },
  "service-5": {
    title: "AI Master Class",
    description: "\"Every generation has its edge. This one's is AI.\" Regular upskilling sessions on cutting-edge, application-oriented, future-focused AI skills.",
    icon: <Award className="w-8 h-8 text-rose-500" />,
    features: [
      "Bouquet of sessions for continuous relevance",
      "Application-oriented, not just theory",
      "Aimed at both students and working professionals",
    ],
  },
  "service-6": {
    title: "ARIA: Digital Marketing for NBFCs",
    description: "A dedicated platform where student talent from Management, Finance, MCA, and courses like BMM/BMS/BBA/BBI deliver AI-enabled digital marketing services for NBFCs, in a unique learn-and-earn mode.",
    icon: <TrendingUp className="w-8 h-8 text-yellow-500" />,
    features: [
      "Student teams benchmarked at professional service-firm quality",
      "Cost-advantage, value-for-money service delivery",
      "Learn-and-earn model for participating students",
    ],
  },
  "service-7": {
    title: "FUSION: Alumni & Campus Reconnect",
    description: "Focused learning programmes for alumni navigating a working world where skills go stale fast — short-term upskilling courses and structured re-skilling for mid-career pivots.",
    icon: <RefreshCw className="w-8 h-8 text-sky-500" />,
    features: [
      "Built with industry professionals and academics",
      "Short-burst learning formats for working professionals",
      "Cross-functional and multi-domain learning tracks",
    ],
  },
  "service-8": {
    title: "AEGIS: Faculty Knowledge Programme",
    description: "Exchange of thoughts and views between college faculty and AI tech teams to imbibe the latest technology advances, including day-long on-campus workshops.",
    icon: <ShieldCheck className="w-8 h-8 text-violet-500" />,
    features: [
      "Content is technology- or domain-focused, per campus",
      "Collaborative knowledge exchange, not one-way lectures",
      "Keeps faculty current with fast-moving AI tooling",
    ],
  },
  "service-9": {
    title: "Campus Analytics",
    description: "A competitive benchmarking service comparing and reporting campus performance on quantifiable metrics, against defined peer groups or best-in-class institutions.",
    icon: <BarChart3 className="w-8 h-8 text-cyan-500" />,
    features: [
      "Benchmarks at market level or against a chosen parity set",
      "Quantifiable, metric-driven comparisons",
      "Helps institutions identify where to improve",
    ],
  },
  "service-12": {
    title: "ALLIANT: Innovation & Incubation",
    description: "Students pitch innovative ideas — big or small — to a jury of real startup founders for mentorship and perspective, with a path from idea to campus-based incubation.",
    icon: <Lightbulb className="w-8 h-8 text-amber-500" />,
    features: [
      "Direct mentorship from real startup-founder practitioners",
      "Guidance for high-potential ideas on next steps",
      "Incubation support to turn ideas into campus startups",
    ],
  },
  "service-13": {
    title: "ACORN: R&D as a Service",
    description: "A marketplace bridging startups seeking domain expertise and R&D infrastructure with academic institutions — campuses commit student and faculty teams with clear time commitments.",
    icon: <FlaskConical className="w-8 h-8 text-teal-500" />,
    features: [
      "Taps into the talent base across partner campuses",
      "Campus commits team + faculty + infrastructure access",
      "Structured around clear deliverables and timelines",
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
    { serviceId: "service-10" },
    { serviceId: "service-11" },
    { serviceId: "service-12" },
    { serviceId: "service-13" },
  ];
}

interface PageProps {
  params: Promise<{
    serviceId: string;
  }>;
}

export default async function ServicePlaceholderPage({ params }: PageProps) {
  const { serviceId } = await params;

  if (EXTERNAL_REDIRECTS[serviceId]) {
    redirect(EXTERNAL_REDIRECTS[serviceId]);
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
          &copy; {new Date().getFullYear()} Millionminds. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
