import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import {
  Zap, Rocket, Code2, GraduationCap, FileText, PartyPopper, Cloud,
  Building2, Workflow, Database, Send, MessageCircle, Instagram, Linkedin,
  Check, Sparkles, ArrowRight, Timer, Star, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const WHATSAPP = "919999999999"; // placeholder brand number

function LandingPage() {
  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <TechStrip />
      <Calculator />
      <Services />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <StickyWhatsApp />
      <ExitPopup />
    </div>
  );
}

/* ---------- NAV ---------- */
function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="mx-auto mt-4 max-w-6xl px-4">
        <div className="glass flex items-center justify-between px-5 py-3">
          <a href="#top" className="flex items-center gap-2 font-[Space_Grotesk] font-bold tracking-tight">
            <span className="inline-block h-6 w-6 rounded-md" style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-glow)" }} />
            <span>AB_SOFTWARE<span className="text-gradient">__</span></span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#services" className="hover:text-foreground transition">Services</a>
            <a href="#calculator" className="hover:text-foreground transition">Pricing</a>
            <a href="#portfolio" className="hover:text-foreground transition">Work</a>
            <a href="#faq" className="hover:text-foreground transition">FAQ</a>
            <a href="#contact" className="hover:text-foreground transition">Contact</a>
          </nav>
          <a href="#calculator">
            <Button className="btn-glow rounded-full h-9 px-4 text-xs">Get Quote</Button>
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="relative mx-auto max-w-6xl px-4 text-center">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 text-xs md:text-sm animate-float">
          <Zap className="h-4 w-4 text-[color:var(--brand-cyan)]" />
          <span className="text-muted-foreground">Fast</span>
          <span className="text-foreground font-semibold">24–48h Delivery</span>
          <span className="text-muted-foreground">available for college deadlines</span>
        </div>

        <h1 className="mt-8 font-[Space_Grotesk] text-4xl md:text-7xl font-bold leading-[1.05] tracking-tight">
          WE CODE YOUR IDEAS <br className="hidden md:block" />
          INTO <span className="text-gradient">REALITY</span>
        </h1>

        <p className="mt-6 mx-auto max-w-2xl text-base md:text-lg text-muted-foreground">
          Custom Websites, Mini Projects, Full-Stack Apps, Event Sites & Plagiarism-Free
          Reports for college students and business clients.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="#calculator">
            <Button size="lg" className="btn-glow rounded-full h-12 px-6">
              Get Instant Quote <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <a href="#portfolio">
            <Button size="lg" variant="outline" className="rounded-full h-12 px-6 border-white/20 bg-white/5 hover:bg-white/10">
              View Sample Work
            </Button>
          </a>
          <a href="#contact">
            <Button size="lg" variant="ghost" className="rounded-full h-12 px-6 text-muted-foreground hover:text-foreground">
              Request Proposal
            </Button>
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { k: "500+", v: "Projects Shipped" },
            { k: "24h", v: "Express Delivery" },
            { k: "4.9★", v: "Avg. Rating" },
            { k: "100%", v: "Plagiarism Free" },
          ].map((s) => (
            <div key={s.v} className="glass px-4 py-5">
              <div className="text-2xl md:text-3xl font-bold text-gradient">{s.k}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- TECH STRIP ---------- */
function TechStrip() {
  const tech = ["HTML5", "CSS3", "JavaScript", "React", "PHP", "MySQL", "Python", "GitHub", "AWS", "Azure", "GCP"];
  return (
    <section className="py-10 border-y border-white/5">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
          Built with a modern stack
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {tech.map((t) => (
            <Badge
              key={t}
              variant="outline"
              className="border-white/10 bg-white/5 text-foreground/80 hover:border-[color:var(--brand-cyan)]/50 hover:text-foreground transition rounded-full px-3 py-1"
            >
              {t}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CALCULATOR ---------- */
const SERVICE_PRICES: Record<string, [number, number]> = {
  "Custom Website": [4000, 15000],
  "College Project": [1500, 6000],
  "Event / Farewell Site": [2500, 8000],
  "Documentation / Report": [800, 3500],
  "Business SaaS / Automation": [15000, 80000],
};

const SPEED_MULTIPLIER: Record<string, number> = {
  "Standard (5–7 Days)": 1,
  "Express (48 Hours)": 1.5,
  "Super Express (24 Hours)": 2,
};

function Calculator() {
  const [service, setService] = useState("Custom Website");
  const [speed, setSpeed] = useState("Standard (5–7 Days)");
  const [isClient, setIsClient] = useState(false);

  const [min, max] = useMemo(() => {
    const [a, b] = SERVICE_PRICES[service];
    const m = SPEED_MULTIPLIER[speed];
    const mul = isClient ? m * 1.4 : m;
    return [Math.round(a * mul), Math.round(b * mul)];
  }, [service, speed, isClient]);

  const waLink = useMemo(() => {
    const msg = encodeURIComponent(
      `Hi AB_SOFTWARE__! I'd like a ${isClient ? "Client Proposal" : "Student Quote"}.\n` +
      `• Service: ${service}\n• Delivery: ${speed}\n• Estimated Range: ₹${min.toLocaleString()} – ₹${max.toLocaleString()}`
    );
    return `https://wa.me/${WHATSAPP}?text=${msg}`;
  }, [service, speed, min, max, isClient]);

  return (
    <section id="calculator" className="py-24">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader
          kicker="Instant Estimate"
          title="Pricing & Quote Calculator"
          sub="Pick your service and delivery speed. Get a live estimate — no forms, no wait."
        />

        <div className="mt-12 glass p-6 md:p-10 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-30" style={{ background: "var(--gradient-brand)" }} />

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className={!isClient ? "text-foreground font-semibold" : "text-muted-foreground text-sm"}>
              Student Quote
            </span>
            <Switch checked={isClient} onCheckedChange={setIsClient} />
            <span className={isClient ? "text-foreground font-semibold" : "text-muted-foreground text-sm"}>
              Client Proposal
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Service Type</Label>
              <Select value={service} onValueChange={setService}>
                <SelectTrigger className="mt-2 h-12 bg-white/5 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(SERVICE_PRICES).map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Delivery Speed</Label>
              <Select value={speed} onValueChange={setSpeed}>
                <SelectTrigger className="mt-2 h-12 bg-white/5 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(SPEED_MULTIPLIER).map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Estimated Price Range</p>
            <div className="mt-3 font-[Space_Grotesk] text-4xl md:text-6xl font-bold">
              <span className="text-gradient">
                ₹{min.toLocaleString()} – ₹{max.toLocaleString()}
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Final quote confirmed after scope discussion. 50% advance to lock the slot.
            </p>

            <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-8">
              <Button size="lg" className="btn-glow rounded-full h-12 px-8">
                <MessageCircle className="mr-2 h-4 w-4" /> Order via WhatsApp
              </Button>
            </a>
          </div>
        </div>

        {/* Countdown for express slots */}
        <CountdownStrip />
      </div>
    </section>
  );
}

function CountdownStrip() {
  const [remaining, setRemaining] = useState(3 * 3600 + 42 * 60);
  useEffect(() => {
    const t = setInterval(() => setRemaining((r) => (r > 0 ? r - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = String(Math.floor(remaining / 3600)).padStart(2, "0");
  const m = String(Math.floor((remaining % 3600) / 60)).padStart(2, "0");
  const s = String(remaining % 60).padStart(2, "0");
  return (
    <div className="mt-6 glass px-5 py-4 flex flex-wrap items-center justify-center gap-3 text-sm">
      <Timer className="h-4 w-4 text-[color:var(--brand-cyan)]" />
      <span className="text-muted-foreground">Only 3 express slots left this week — closing in</span>
      <span className="font-mono font-bold text-foreground tracking-widest">
        {h}:{m}:{s}
      </span>
    </div>
  );
}

/* ---------- SERVICES ---------- */
function Services() {
  const student = [
    { icon: Code2, title: "Custom Website Development", desc: "Personal, event & niche sites tailored to your brief." },
    { icon: GraduationCap, title: "College & Mini Projects", desc: "Working code with viva walkthrough and setup guide." },
    { icon: FileText, title: "Reports & Documentation", desc: "IEEE-format, plagiarism-free, ready to submit." },
    { icon: PartyPopper, title: "Farewell & Event Sites", desc: "RSVP, gallery, memories — shipped in 48 hours." },
    { icon: Cloud, title: "Deployment & Hosting", desc: "Vercel, Netlify, custom domains and SSL configured." },
  ];
  const client = [
    { icon: Building2, title: "Enterprise Web Apps", desc: "Scalable dashboards with auth, RBAC and analytics." },
    { icon: Rocket, title: "SaaS Development", desc: "MVP to production — subscriptions, billing, admin." },
    { icon: Database, title: "CRM / ERP Customization", desc: "Extend or build tailored business systems." },
    { icon: Workflow, title: "Automation Tools", desc: "Bots, workflows, integrations that save hours." },
    { icon: Cloud, title: "Cloud Deployment", desc: "AWS, Azure and GCP with CI/CD and monitoring." },
  ];

  return (
    <section id="services" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          kicker="Services"
          title="Everything you need to ship"
          sub="Two focused tracks — one for students, one for businesses."
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <ServiceColumn label="For Students" items={student} />
          <ServiceColumn label="For Businesses" items={client} />
        </div>
      </div>
    </section>
  );
}

function ServiceColumn({ label, items }: { label: string; items: { icon: any; title: string; desc: string }[] }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="glass group p-5 relative transition-all hover:-translate-y-1"
            style={{}}
          >
            <div className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ boxShadow: "var(--shadow-glow)" }} />
            <div className="relative">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ background: "var(--gradient-brand)" }}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- PORTFOLIO ---------- */
function Portfolio() {
  const items = {
    farewell: [
      { title: "Farewell 2K25 — CSE Batch", tag: "Farewell Site" },
      { title: "Seniors' Send-off — MBA", tag: "Memory Wall" },
      { title: "Class of '25 Yearbook", tag: "Interactive" },
    ],
    fest: [
      { title: "TECHFEST '25 Landing", tag: "College Fest" },
      { title: "CultuRex Sports Meet", tag: "Registration" },
      { title: "Hackathon Convergence", tag: "Live Timer" },
    ],
    php: [
      { title: "Hospital Management System", tag: "PHP + MySQL" },
      { title: "Library E-Portal", tag: "PHP + MySQL" },
      { title: "Online Voting System", tag: "PHP + MySQL" },
    ],
    docs: [
      { title: "IEEE Format Report — AI Chatbot", tag: "Documentation" },
      { title: "Blockchain Voting — Synopsis", tag: "Synopsis" },
      { title: "Mini Project Report Template", tag: "Template" },
    ],
    biz: [
      { title: "FitTrack — SaaS Dashboard", tag: "Case Study" },
      { title: "GoLogix — Fleet CRM", tag: "Case Study" },
      { title: "Brewly — Cafe Ordering", tag: "Case Study" },
    ],
  } as const;

  const tabs: { key: keyof typeof items; label: string }[] = [
    { key: "farewell", label: "Farewell 2K25" },
    { key: "fest", label: "Fest Landing" },
    { key: "php", label: "PHP / MySQL" },
    { key: "docs", label: "Documentation" },
    { key: "biz", label: "Business" },
  ];

  return (
    <section id="portfolio" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader kicker="Portfolio" title="Sample work & case studies" sub="Filter by category to see the format that matches your need." />
        <div className="mt-10">
          <Tabs defaultValue="farewell">
            <TabsList className="flex flex-wrap gap-2 h-auto bg-transparent p-0 justify-center">
              {tabs.map((t) => (
                <TabsTrigger
                  key={t.key}
                  value={t.key}
                  className="rounded-full glass data-[state=active]:text-white data-[state=active]:border-transparent px-4 py-2 text-sm"
                  style={{}}
                >
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map((t) => (
              <TabsContent key={t.key} value={t.key} className="mt-8">
                <div className="grid md:grid-cols-3 gap-5">
                  {items[t.key].map((it, i) => (
                    <div key={it.title} className="glass overflow-hidden group">
                      <div
                        className="aspect-video relative overflow-hidden"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.62 0.24 260 / 0.4), oklch(0.85 0.18 210 / 0.4))",
                        }}
                      >
                        <div className="absolute inset-0 grid-bg opacity-30" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Sparkles className="h-10 w-10 text-white/70 group-hover:scale-110 transition" />
                        </div>
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-black/50 backdrop-blur border-white/10 text-white text-xs">
                            #{String(i + 1).padStart(2, "0")}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-muted-foreground">{it.tag}</div>
                        <h3 className="mt-1 font-semibold">{it.title}</h3>
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" className="btn-glow rounded-full h-8 px-4 text-xs">Live Demo</Button>
                          <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("I want something similar to: " + it.title)}`} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline" className="rounded-full h-8 px-4 text-xs border-white/20 bg-white/5">
                              Request Similar
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS ---------- */
function Testimonials() {
  const list = [
    { name: "Aditi R.", role: "CSE Final Year", quote: "Got my mini project + report in 48 hours. Viva walkthrough was clutch — passed with distinction." },
    { name: "Rahul M.", role: "Event Head, TECHFEST", quote: "Landing page + registration flow shipped in 2 days. Reduced our manual work by 80%." },
    { name: "Priya S.", role: "Founder, GoLogix", quote: "They built our fleet CRM MVP in 3 weeks. Clean code, great communication, honest pricing." },
    { name: "Kabir V.", role: "MBA Batch of 25", quote: "Our farewell site went viral in college. Beautiful design and every classmate got a memory card." },
  ];
  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader kicker="Loved by" title="Students & Clients" sub="Real reviews from projects delivered this year." />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {list.map((t) => (
            <div key={t.name} className="glass p-5">
              <div className="flex gap-1 text-[color:var(--brand-cyan)]">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-3 text-sm text-foreground/90 leading-relaxed">"{t.quote}"</p>
              <div className="mt-4 border-t border-white/10 pt-3">
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const faqs = [
    { q: "Do you explain the code for my viva?", a: "Yes — every college project ships with a walkthrough call, inline comments, and short notes so you can defend it confidently." },
    { q: "Can I request revisions?", a: "Absolutely. Free minor revisions are included within scope. Bigger changes are quoted transparently before we start." },
    { q: "How do payments work?", a: "50% advance to lock your slot, 50% on delivery/demo. UPI, bank transfer, and international transfers are all supported." },
    { q: "Do you handle business contracts?", a: "Yes — for client engagements we sign NDAs and formal SOWs. Enterprise invoicing and GST bills available." },
    { q: "What if I need 24-hour delivery?", a: "Super Express slots are limited each week. Ping us on WhatsApp with the brief and we'll confirm feasibility instantly." },
    { q: "Is the report actually plagiarism-free?", a: "Every report is written from scratch and passes Turnitin. We share the similarity report with your final delivery." },
  ];
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeader kicker="FAQ" title="Answered before you ask" />
        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={String(i)} className="glass px-5 border-0">
              <AccordionTrigger className="text-left hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */
function Contact() {
  const [form, setForm] = useState({
    name: "", org: "", type: "Custom Website", deadline: "", budget: "", whatsapp: "", notes: "",
  });
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `New Inquiry — AB_SOFTWARE__\n\n` +
      `Name: ${form.name}\nOrg/College: ${form.org}\nProject: ${form.type}\n` +
      `Deadline: ${form.deadline}\nBudget: ${form.budget}\nWhatsApp: ${form.whatsapp}\n\nNotes: ${form.notes}`
    );
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader kicker="Contact" title="Tell us about your project" sub="Fill it out or ping us directly — replies within 30 minutes on WhatsApp." />
        <div className="mt-12 grid lg:grid-cols-5 gap-6">
          <form onSubmit={submit} className="glass p-6 md:p-8 lg:col-span-3 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Your name" v={form.name} onChange={(v) => set("name", v)} required />
              <Field label="College / Company" v={form.org} onChange={(v) => set("org", v)} />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Project type</Label>
              <Select value={form.type} onValueChange={(v) => set("type", v)}>
                <SelectTrigger className="mt-2 h-11 bg-white/5 border-white/10"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.keys(SERVICE_PRICES).map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Field label="Deadline" v={form.deadline} onChange={(v) => set("deadline", v)} placeholder="e.g. 5 days" />
              <Field label="Budget (₹)" v={form.budget} onChange={(v) => set("budget", v)} placeholder="e.g. 5000" />
              <Field label="WhatsApp" v={form.whatsapp} onChange={(v) => set("whatsapp", v)} placeholder="+91…" required />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Notes</Label>
              <Textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={4} className="mt-2 bg-white/5 border-white/10" placeholder="Anything we should know…" />
            </div>
            <Button type="submit" size="lg" className="btn-glow rounded-full h-12 px-6 w-full md:w-auto">
              <Send className="mr-2 h-4 w-4" /> Send Inquiry via WhatsApp
            </Button>
          </form>

          <div className="glass p-6 md:p-8 lg:col-span-2 space-y-4">
            <h3 className="font-[Space_Grotesk] text-xl font-bold">Direct channels</h3>
            <p className="text-sm text-muted-foreground">The fastest way to reach us — pick your platform.</p>
            <div className="space-y-2 pt-2">
              <SocialRow icon={MessageCircle} label="WhatsApp" hint="Fastest, live replies" href={`https://wa.me/${WHATSAPP}`} />
              <SocialRow icon={Send} label="Telegram" hint="@ab_software" href="https://t.me/ab_software" />
              <SocialRow icon={Instagram} label="Instagram" hint="@ab_software__" href="https://instagram.com" />
              <SocialRow icon={Linkedin} label="LinkedIn" hint="AB_SOFTWARE__" href="https://linkedin.com" />
            </div>
            <div className="mt-4 border-t border-white/10 pt-4 text-xs text-muted-foreground space-y-2">
              <div className="flex items-center gap-2"><Check className="h-3 w-3 text-[color:var(--brand-cyan)]" /> NDA & formal contracts on request</div>
              <div className="flex items-center gap-2"><Check className="h-3 w-3 text-[color:var(--brand-cyan)]" /> GST invoices for businesses</div>
              <div className="flex items-center gap-2"><Check className="h-3 w-3 text-[color:var(--brand-cyan)]" /> 30-min avg. reply time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, v, onChange, placeholder, required }: { label: string; v: string; onChange: (v: string) => void; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      <Input value={v} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required}
        className="mt-2 h-11 bg-white/5 border-white/10" />
    </div>
  );
}

function SocialRow({ icon: Icon, label, hint, href }: { icon: any; label: string; hint: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-lg px-3 py-3 bg-white/5 border border-white/10 hover:border-[color:var(--brand-cyan)]/50 hover:bg-white/10 transition">
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-md" style={{ background: "var(--gradient-brand)" }}>
        <Icon className="h-4 w-4 text-white" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-xs text-muted-foreground">{hint}</div>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground" />
    </a>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="border-t border-white/10 mt-12">
      <div className="mx-auto max-w-6xl px-4 py-10 text-center text-sm text-muted-foreground">
        <div className="font-[Space_Grotesk] font-bold text-foreground">
          AB_SOFTWARE<span className="text-gradient">__</span>
        </div>
        <p className="mt-2">Built for Students & Businesses, By Developers.</p>
        <p className="mt-4 text-xs">© {new Date().getFullYear()} AB_SOFTWARE__ · All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ---------- STICKY WHATSAPP ---------- */
function StickyWhatsApp() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full pl-2 pr-4 py-2 btn-glow animate-pulse-glow"
      aria-label="Chat on WhatsApp"
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
        <MessageCircle className="h-5 w-5 text-white" />
      </span>
      <span className="hidden sm:inline text-sm font-semibold text-white">Chat now</span>
    </a>
  );
}

/* ---------- EXIT INTENT ---------- */
function ExitPopup() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const handler = (e: MouseEvent) => {
      if (e.clientY < 10 && !dismissed) {
        setOpen(true);
        setDismissed(true);
      }
    };
    document.addEventListener("mouseleave", handler);
    return () => document.removeEventListener("mouseleave", handler);
  }, [dismissed]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setOpen(false)}>
      <div className="glass max-w-md w-full p-8 relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-3 right-3 text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)} aria-label="Close">
          <X className="h-5 w-5" />
        </button>
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "var(--gradient-brand)" }}>
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <h3 className="mt-4 font-[Space_Grotesk] text-2xl font-bold">Wait — grab this before you go</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Get our <span className="text-foreground font-semibold">free IEEE report template</span> + a
          <span className="text-gradient font-semibold"> 10% discount</span> on your first order.
        </p>
        <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Send me the free IEEE template + 10% discount code!")}`}
          target="_blank" rel="noopener noreferrer">
          <Button className="btn-glow rounded-full h-11 px-5 mt-6 w-full">
            Claim on WhatsApp <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </a>
      </div>
    </div>
  );
}

/* ---------- SHARED ---------- */
function SectionHeader({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="text-xs uppercase tracking-[0.25em] text-[color:var(--brand-cyan)] font-semibold">{kicker}</div>
      <h2 className="mt-3 font-[Space_Grotesk] text-3xl md:text-5xl font-bold tracking-tight">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}