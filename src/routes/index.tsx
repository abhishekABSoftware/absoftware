import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Code2, Palette, Cloud, Wrench, Globe, ArrowRight, Github, Linkedin,
  Instagram, Mail, Phone, MapPin, Menu, X, ArrowUp, Sun, Moon,
  Search, ClipboardList, PenTool, Terminal, TestTube2, Rocket, LifeBuoy,
  Zap, ShieldCheck, Smartphone, Sparkles, Server, GitBranch, Target, Eye, Heart,
  PartyPopper, Cake, Gift, Camera, QrCode, Users, CalendarHeart, Baby, Home as HomeIcon, GraduationCap, CalendarDays, Mic2, ScrollText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/ab-software-logo.png.asset.json";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const CONTACT = {
  phone: "+91 9739193141",
  phoneHref: "tel:+919739193141",
  email: "abhishek.ck.dev@gmail.com",
  linkedin: "https://linkedin.com/in/abhishek-ck0000",
  instagram: "https://instagram.com/ab_software__",
  instagramHandle: "@ab_software__",
  location: "Bengaluru, Karnataka, India",
  github: "https://github.com/",
};

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "technologies", label: "Technologies" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];

function LandingPage() {
  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <EventServices />
        <Portfolio />
        <Technologies />
        <WhyChooseUs />
        <Process />
        <Trust />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
    </div>
  );
}

/* ---------- SCROLL PROGRESS ---------- */
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setP(Math.min(1, Math.max(0, scrolled)) * 100);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div
      className="fixed top-0 left-0 z-[60] h-[3px]"
      style={{ width: `${p}%`, background: "var(--gradient-brand)" }}
      aria-hidden
    />
  );
}

/* ---------- NAV ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("light");
    setDark(!root.classList.contains("light"));
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/70 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="grid place-items-center h-8 w-8 rounded-lg text-white" style={{ background: "var(--gradient-brand)" }}>
            <Code2 className="h-4 w-4" />
          </span>
          <span>AB<span className="text-gradient">Software</span></span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {n.label}
              {active === n.id && (
                <span className="block h-[2px] mt-1 rounded-full" style={{ background: "var(--gradient-brand)" }} />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="hidden sm:grid place-items-center h-9 w-9 rounded-md border border-white/10 hover:bg-white/5"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a href="/request" className="hidden sm:inline-flex">
            <Button className="btn-glow rounded-full">Request a Service</Button>
          </a>
          <button
            className="lg:hidden grid place-items-center h-9 w-9 rounded-md border border-white/10"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-4 py-3 flex flex-col">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className={`py-3 text-base ${active === n.id ? "text-foreground" : "text-muted-foreground"}`}
              >
                {n.label}
              </a>
            ))}
            <a href="/request" onClick={() => setOpen(false)} className="mt-2">
              <Button className="btn-glow rounded-full w-full">Request a Service</Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
      {/* floating blobs */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-30 animate-float" style={{ background: "var(--brand-blue)" }} aria-hidden />
      <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full blur-3xl opacity-20 animate-float" style={{ background: "var(--brand-cyan)" }} aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs sm:text-sm mb-8">
          <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--brand-cyan)" }} />
          <span className="text-muted-foreground">A growing software startup — building in the open</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] max-w-4xl mx-auto" style={{ fontFamily: "'Space Grotesk', Inter, sans-serif" }}>
          Building <span className="text-gradient">Modern Software</span><br className="hidden sm:block" /> Solutions for Businesses
        </h1>

        <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          AB Software develops secure, scalable, and modern software solutions — websites, AI applications,
          business software, and custom development tailored to client needs.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/request">
            <Button size="lg" className="btn-glow rounded-full h-12 px-7 text-base">
              Request a Service <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <a href="#portfolio">
            <Button size="lg" variant="outline" className="rounded-full h-12 px-7 text-base border-white/15 bg-white/5 hover:bg-white/10">
              View Our Work
            </Button>
          </a>
        </div>

        {/* mock code card */}
        <div className="mt-16 max-w-3xl mx-auto glass p-1 rounded-2xl animate-float">
          <div className="rounded-xl bg-black/40 p-4 sm:p-6 text-left font-mono text-xs sm:text-sm">
            <div className="flex gap-1.5 mb-4">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-green-500/70" />
            </div>
            <pre className="text-muted-foreground overflow-x-auto"><code>{`const abSoftware = {
  focus: ["Web", "AI", "Custom Software"],
  values: ["Quality", "Security", "Scalability"],
  build: () => "Modern solutions, tailored to you.",
};`}</code></pre>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- ABOUT ---------- */
function About() {
  const values = [
    { icon: Target, title: "Mission", body: "Build modern, secure, and scalable software that helps businesses grow — without unnecessary complexity." },
    { icon: Eye, title: "Vision", body: "Become a trusted software partner known for clean engineering, honest communication, and long-term client value." },
    { icon: Heart, title: "Values", body: "Craftsmanship, transparency, security-first thinking, and a genuine focus on client outcomes." },
  ];
  const reasons = [
    "Modern tech stack and clean architecture",
    "Direct communication with the founder",
    "Security and performance as defaults",
    "Honest scope, honest timelines",
  ];
  return (
    <section id="about" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow="About" title="A growing software startup" subtitle="AB Software is an early-stage software startup focused on building quality digital solutions for businesses and creators." />

        <div className="grid md:grid-cols-3 gap-5 mt-14">
          {values.map((v) => (
            <div key={v.title} className="glass p-6 rounded-2xl hover:-translate-y-1 transition-transform">
              <div className="h-11 w-11 rounded-xl grid place-items-center mb-4" style={{ background: "var(--gradient-brand)" }}>
                <v.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <div className="glass p-6 sm:p-8 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">Why choose AB Software</h3>
            <ul className="space-y-3">
              {reasons.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-0.5 h-5 w-5 rounded-full grid place-items-center shrink-0" style={{ background: "var(--gradient-brand)" }}>
                    <ShieldCheck className="h-3 w-3 text-white" />
                  </span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full grid place-items-center text-white font-bold text-lg" style={{ background: "var(--gradient-brand)" }}>AC</div>
              <div>
                <h3 className="text-lg font-semibold">Abhishek C K</h3>
                <p className="text-xs text-muted-foreground">Founder — AB Software</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Developer and founder building AB Software from the ground up. Focused on writing clean code,
              shipping reliable software, and working directly with clients to understand what they actually need.
            </p>
            <div className="mt-5 flex gap-2">
              <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="h-9 w-9 grid place-items-center rounded-md border border-white/10 hover:bg-white/5"><Linkedin className="h-4 w-4" /></a>
              <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="h-9 w-9 grid place-items-center rounded-md border border-white/10 hover:bg-white/5"><Instagram className="h-4 w-4" /></a>
              <a href={`mailto:${CONTACT.email}`} className="h-9 w-9 grid place-items-center rounded-md border border-white/10 hover:bg-white/5"><Mail className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- SERVICES ---------- */
function Services() {
  const items = [
    { icon: Globe, title: "Website Development", body: "Modern, responsive websites built with performance, SEO, and clean design in mind." },
    { icon: Code2, title: "Custom Software Development", body: "Tailored software built around your workflow — from internal tools to full-stack applications." },
    { icon: Palette, title: "UI/UX Design", body: "Clean, modern interfaces designed to feel intuitive and look premium across devices." },
    { icon: Cloud, title: "Cloud Solutions", body: "Deploy, scale, and manage applications on modern cloud infrastructure." },
    { icon: Wrench, title: "Software Maintenance", body: "Ongoing support, updates, and improvements to keep your software healthy and secure." },
  ];
  return (
    <section id="services" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow="Services" title="What we build" subtitle="A focused set of services delivered end-to-end." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {items.map((s) => (
            <div key={s.title} className="group glass p-6 rounded-2xl hover:-translate-y-1 transition-all relative overflow-hidden">
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity" style={{ background: "var(--brand-blue)" }} />
              <div className="h-12 w-12 rounded-xl grid place-items-center mb-5" style={{ background: "var(--gradient-brand)" }}>
                <s.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              <a href="#contact" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PORTFOLIO ---------- */
function Portfolio() {
  const projects = [
    {
      title: "Student Complaint System",
      body: "A web-based platform for students to submit complaints and for administrators to track and resolve them.",
      stack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    },
    {
      title: "AI Chatbot",
      body: "An AI-powered chatbot application exploring conversational interfaces and modern language models.",
      stack: ["Python", "AI/ML", "JavaScript"],
    },
    {
      title: "Farewell Website",
      body: "A themed event website built for a college farewell — memories, gallery, and event details.",
      stack: ["React", "TypeScript", "CSS"],
    },
  ];
  return (
    <section id="portfolio" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow="Portfolio" title="Real projects we've built" subtitle="A small, honest showcase — more coming as we ship." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {projects.map((p) => (
            <article key={p.title} className="glass rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform flex flex-col">
              <div className="aspect-video relative overflow-hidden bg-black/40 border-b border-white/5">
                <div className="absolute inset-0 grid place-items-center text-xs text-muted-foreground">
                  <div className="text-center">
                    <div className="h-10 w-10 rounded-full mx-auto mb-2 grid place-items-center" style={{ background: "var(--gradient-brand)" }}>
                      <Code2 className="h-4 w-4 text-white" />
                    </div>
                    Screenshot coming soon
                  </div>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{p.body}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span key={t} className="text-[11px] px-2 py-1 rounded-full border border-white/10 bg-white/5 text-muted-foreground">{t}</span>
                  ))}
                </div>
                <div className="mt-5 flex gap-2">
                  <button disabled className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-md border border-white/10 bg-white/5 text-muted-foreground cursor-not-allowed">
                    <Github className="h-3.5 w-3.5" /> GitHub — soon
                  </button>
                  <button disabled className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-md border border-white/10 bg-white/5 text-muted-foreground cursor-not-allowed">
                    <ArrowRight className="h-3.5 w-3.5" /> Live demo — soon
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- TECHNOLOGIES ---------- */
function Technologies() {
  const tech = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Node.js", "Python", "PHP", "MySQL", "MongoDB", "Git", "GitHub", "AWS"];
  return (
    <section id="technologies" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow="Tech Stack" title="Technologies we work with" subtitle="The tools we reach for when building modern software." />
        <div className="mt-14 flex flex-wrap justify-center gap-3">
          {tech.map((t) => (
            <div key={t} className="glass px-5 py-3 rounded-xl text-sm font-medium hover:-translate-y-1 transition-transform">
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- WHY CHOOSE US ---------- */
function WhyChooseUs() {
  const items = [
    { icon: Zap, title: "Fast Development", body: "Focused iterations and quick turnaround without cutting corners." },
    { icon: Code2, title: "Clean Code", body: "Readable, maintainable code you can hand off to any developer." },
    { icon: Smartphone, title: "Responsive Design", body: "Every interface built mobile-first and tested across devices." },
    { icon: ShieldCheck, title: "Secure Applications", body: "Security-conscious defaults — auth, validation, and safe data handling." },
    { icon: Sparkles, title: "Modern Technologies", body: "A current stack chosen for performance and long-term stability." },
    { icon: LifeBuoy, title: "Reliable Support", body: "Direct communication and honest updates throughout the build." },
  ];
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow="Why AB Software" title="Built to be dependable" subtitle="The principles we bring to every project." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {items.map((i) => (
            <div key={i.title} className="glass p-6 rounded-2xl hover:-translate-y-1 transition-transform">
              <div className="h-11 w-11 rounded-xl grid place-items-center mb-4 border border-white/10 bg-white/5">
                <i.icon className="h-5 w-5" style={{ color: "var(--brand-cyan)" }} />
              </div>
              <h3 className="text-base font-semibold">{i.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{i.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PROCESS ---------- */
function Process() {
  const steps = [
    { icon: Search, title: "Discovery", body: "Understand your goals, users, and constraints." },
    { icon: ClipboardList, title: "Planning", body: "Scope, timeline, and architecture agreed up front." },
    { icon: PenTool, title: "UI/UX Design", body: "Clean, functional interfaces reviewed together." },
    { icon: Terminal, title: "Development", body: "Iterative builds with regular updates." },
    { icon: TestTube2, title: "Testing", body: "Manual and automated checks before launch." },
    { icon: Rocket, title: "Deployment", body: "Smooth release on modern infrastructure." },
    { icon: LifeBuoy, title: "Support", body: "Ongoing maintenance and improvements." },
  ];
  return (
    <section id="process" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow="Process" title="How we work" subtitle="A transparent, step-by-step workflow." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {steps.map((s, i) => (
            <div key={s.title} className="glass p-6 rounded-2xl relative">
              <span className="absolute top-4 right-4 text-xs text-muted-foreground font-mono">0{i + 1}</span>
              <div className="h-11 w-11 rounded-xl grid place-items-center mb-4" style={{ background: "var(--gradient-brand)" }}>
                <s.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-base font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- TRUST (real signals only) ---------- */
function Trust() {
  const items = [
    { icon: Github, title: "GitHub", body: "Follow our open work and contributions.", href: CONTACT.github, cta: "Visit GitHub" },
    { icon: Server, title: "Live Projects", body: "Real projects, listed in the Portfolio section above.", href: "#portfolio", cta: "See portfolio" },
    { icon: GitBranch, title: "Development Workflow", body: "Git-based workflow, code review, and clear release process.", href: "#process", cta: "See process" },
  ];
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow="Transparency" title="Signals you can actually verify" subtitle="No fake logos, no invented statistics — just real links to real work." />
        <div className="grid md:grid-cols-3 gap-5 mt-14">
          {items.map((i) => (
            <a key={i.title} href={i.href} target={i.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="glass p-6 rounded-2xl hover:-translate-y-1 transition-transform block">
              <div className="h-11 w-11 rounded-xl grid place-items-center mb-4 border border-white/10 bg-white/5">
                <i.icon className="h-5 w-5" style={{ color: "var(--brand-cyan)" }} />
              </div>
              <h3 className="text-base font-semibold">{i.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{i.body}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium">{i.cta} <ArrowRight className="h-3 w-3" /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */
function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow="Contact" title="Let's build something" subtitle="Reach out directly — we usually reply within a day." />

        <div className="grid md:grid-cols-2 gap-5 mt-14 max-w-4xl mx-auto">
          <a href={CONTACT.phoneHref} className="glass p-6 rounded-2xl hover:-translate-y-1 transition-transform flex items-start gap-4">
            <div className="h-11 w-11 shrink-0 rounded-xl grid place-items-center" style={{ background: "var(--gradient-brand)" }}><Phone className="h-5 w-5 text-white" /></div>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground">Phone</div>
              <div className="font-medium truncate">{CONTACT.phone}</div>
            </div>
          </a>
          <a href={`mailto:${CONTACT.email}`} className="glass p-6 rounded-2xl hover:-translate-y-1 transition-transform flex items-start gap-4">
            <div className="h-11 w-11 shrink-0 rounded-xl grid place-items-center" style={{ background: "var(--gradient-brand)" }}><Mail className="h-5 w-5 text-white" /></div>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground">Email</div>
              <div className="font-medium truncate">{CONTACT.email}</div>
            </div>
          </a>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="glass p-6 rounded-2xl hover:-translate-y-1 transition-transform flex items-start gap-4">
            <div className="h-11 w-11 shrink-0 rounded-xl grid place-items-center" style={{ background: "var(--gradient-brand)" }}><Linkedin className="h-5 w-5 text-white" /></div>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground">LinkedIn</div>
              <div className="font-medium truncate">abhishek-ck0000</div>
            </div>
          </a>
          <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="glass p-6 rounded-2xl hover:-translate-y-1 transition-transform flex items-start gap-4">
            <div className="h-11 w-11 shrink-0 rounded-xl grid place-items-center" style={{ background: "var(--gradient-brand)" }}><Instagram className="h-5 w-5 text-white" /></div>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground">Instagram</div>
              <div className="font-medium truncate">{CONTACT.instagramHandle}</div>
            </div>
          </a>
          <div className="glass p-6 rounded-2xl md:col-span-2 flex items-start gap-4">
            <div className="h-11 w-11 shrink-0 rounded-xl grid place-items-center" style={{ background: "var(--gradient-brand)" }}><MapPin className="h-5 w-5 text-white" /></div>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground">Location</div>
              <div className="font-medium">{CONTACT.location}</div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a href={`mailto:${CONTACT.email}`}>
            <Button size="lg" className="btn-glow rounded-full h-12 px-7">
              Start a project <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="border-t border-white/10 pt-16 pb-8 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <a href="#home" className="flex items-center gap-2 font-bold text-lg">
              <span className="grid place-items-center h-8 w-8 rounded-lg text-white" style={{ background: "var(--gradient-brand)" }}>
                <Code2 className="h-4 w-4" />
              </span>
              <span>AB<span className="text-gradient">Software</span></span>
            </a>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">
              Building modern software solutions for businesses — websites, custom software, AI applications, and more.
            </p>
            <div className="mt-5 flex gap-2">
              <a href={CONTACT.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="h-9 w-9 grid place-items-center rounded-md border border-white/10 hover:bg-white/5"><Github className="h-4 w-4" /></a>
              <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="h-9 w-9 grid place-items-center rounded-md border border-white/10 hover:bg-white/5"><Linkedin className="h-4 w-4" /></a>
              <a href={CONTACT.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="h-9 w-9 grid place-items-center rounded-md border border-white/10 hover:bg-white/5"><Instagram className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-foreground">About</a></li>
              <li><a href="#services" className="hover:text-foreground">Services</a></li>
              <li><a href="#portfolio" className="hover:text-foreground">Portfolio</a></li>
              <li><a href="#process" className="hover:text-foreground">Process</a></li>
              <li><a href="#contact" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href={CONTACT.phoneHref} className="hover:text-foreground">{CONTACT.phone}</a></li>
              <li><a href={`mailto:${CONTACT.email}`} className="hover:text-foreground break-all">{CONTACT.email}</a></li>
              <li>{CONTACT.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} AB Software. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- SCROLL TO TOP ---------- */
function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 h-11 w-11 rounded-full grid place-items-center text-white shadow-lg animate-pulse-glow"
      style={{ background: "var(--gradient-brand)" }}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

/* ---------- SHARED ---------- */
function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-gradient mb-3">{eyebrow}</div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', Inter, sans-serif" }}>
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
