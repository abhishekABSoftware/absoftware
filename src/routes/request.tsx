import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";

import { submitServiceRequest } from "@/lib/serviceRequest.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/request")({
  head: () => ({
    meta: [
      { title: "Request a Service | AB Software" },
      {
        name: "description",
        content:
          "Tell us about your project — websites, custom software, AI apps or maintenance. We reply within one business day.",
      },
      { property: "og:title", content: "Request a Service | AB Software" },
      {
        property: "og:description",
        content:
          "Tell us about your project — websites, custom software, AI apps or maintenance. We reply within one business day.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RequestPage,
});

const CATEGORIES = [
  "Website Development",
  "Custom Software",
  "AI Application",
  "UI / UX Design",
  "Cloud & DevOps",
  "Maintenance & Support",
  "Other",
];

const BUDGETS = [
  "Under ₹10,000",
  "₹10,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹5,00,000",
  "₹5,00,000+",
  "Not sure yet",
];

type FormState = {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  city: string;
  serviceCategory: string;
  serviceRequired: string;
  budget: string;
  preferredDeliveryDate: string;
  projectDescription: string;
  preferredContactMethod: "email" | "phone" | "whatsapp";
  website: string;
};

const INITIAL: FormState = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  city: "",
  serviceCategory: "",
  serviceRequired: "",
  budget: "",
  preferredDeliveryDate: "",
  projectDescription: "",
  preferredContactMethod: "email",
  website: "",
};

function RequestPage() {
  const submit = useServerFn(submitServiceRequest);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (form.phone.trim().length < 6) e.phone = "Valid phone required";
    if (!form.serviceCategory) e.serviceCategory = "Pick a category";
    if (!form.serviceRequired.trim()) e.serviceRequired = "Required";
    if (form.projectDescription.trim().length < 10)
      e.projectDescription = "At least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (submitting || submitted) return;
    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setSubmitting(true);
    try {
      await submit({ data: form });
      setSubmitted(true);
      toast.success("Request submitted successfully.");
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen grid place-items-center px-4 py-16">
        <div className="max-w-lg w-full glass rounded-2xl p-8 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-brand-cyan" />
          <h1 className="mt-4 text-2xl font-semibold">Thank you!</h1>
          <p className="mt-2 text-muted-foreground">
            Your request has been submitted successfully. We will contact you soon.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/">
              <Button variant="outline">Back to home</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-12 sm:py-16">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Request a Service
        </h1>
        <p className="mt-2 text-muted-foreground">
          Tell us about your project. We reply within one business day.
        </p>

        <form onSubmit={onSubmit} className="mt-8 glass rounded-2xl p-6 sm:p-8 space-y-6">
          {/* Honeypot */}
          <div className="hidden" aria-hidden="true">
            <label>
              Website
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => update("website", e.target.value)}
              />
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full Name *" error={errors.fullName}>
              <Input
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                maxLength={200}
                required
              />
            </Field>
            <Field label="Company Name">
              <Input
                value={form.companyName}
                onChange={(e) => update("companyName", e.target.value)}
                maxLength={200}
              />
            </Field>
            <Field label="Email *" error={errors.email}>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                maxLength={320}
                required
              />
            </Field>
            <Field label="Phone *" error={errors.phone}>
              <Input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                maxLength={40}
                required
              />
            </Field>
            <Field label="City">
              <Input
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                maxLength={120}
              />
            </Field>
            <Field label="Preferred Delivery Date">
              <Input
                type="date"
                value={form.preferredDeliveryDate}
                onChange={(e) => update("preferredDeliveryDate", e.target.value)}
              />
            </Field>
            <Field label="Service Category *" error={errors.serviceCategory}>
              <Select
                value={form.serviceCategory}
                onValueChange={(v) => update("serviceCategory", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Budget">
              <Select value={form.budget} onValueChange={(v) => update("budget", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {BUDGETS.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Field label="Service Required *" error={errors.serviceRequired}>
            <Input
              value={form.serviceRequired}
              onChange={(e) => update("serviceRequired", e.target.value)}
              maxLength={200}
              placeholder="e.g. Marketing website with CMS"
              required
            />
          </Field>

          <Field label="Project Description *" error={errors.projectDescription}>
            <Textarea
              value={form.projectDescription}
              onChange={(e) => update("projectDescription", e.target.value)}
              maxLength={5000}
              rows={6}
              placeholder="Goals, scope, references, timeline…"
              required
            />
          </Field>

          <Field label="Preferred Contact Method *">
            <div className="flex flex-wrap gap-2">
              {(["email", "phone", "whatsapp"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => update("preferredContactMethod", m)}
                  className={`px-4 py-2 rounded-md border text-sm capitalize transition-colors ${
                    form.preferredContactMethod === m
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-white/10 hover:bg-white/5"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </Field>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={submitting || submitted}
              className="w-full sm:w-auto"
              size="lg"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting…
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}