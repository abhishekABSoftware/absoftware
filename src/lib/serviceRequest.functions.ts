import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const submissionSchema = z.object({
  fullName: z.string().trim().min(1).max(200),
  companyName: z.string().trim().max(200).optional().or(z.literal("")),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().min(3).max(40),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  serviceCategory: z.string().trim().min(1).max(100),
  serviceRequired: z.string().trim().min(1).max(200),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  preferredDeliveryDate: z.string().trim().max(40).optional().or(z.literal("")),
  projectDescription: z.string().trim().min(10).max(5000),
  preferredContactMethod: z.enum(["email", "phone", "whatsapp"]),
  website: z.string().max(0).optional().or(z.literal("")), // honeypot
});

export const submitServiceRequest = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => submissionSchema.parse(raw))
  .handler(async ({ data }) => {
    if (data.website && data.website.length > 0) {
      // Silently accept but do nothing (spam bot)
      return { ok: true };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const row = {
      full_name: data.fullName,
      company_name: data.companyName || null,
      email: data.email,
      phone: data.phone,
      city: data.city || null,
      service_category: data.serviceCategory,
      service_required: data.serviceRequired,
      budget: data.budget || null,
      preferred_delivery_date: data.preferredDeliveryDate || null,
      project_description: data.projectDescription,
      preferred_contact_method: data.preferredContactMethod,
      status: "New" as const,
    };

    const { data: inserted, error } = await supabaseAdmin
      .from("service_requests")
      .insert(row)
      .select("id, created_at")
      .single();

    if (error) {
      console.error("service_requests insert error", error);
      throw new Error("Could not save your request. Please try again.");
    }

    // Formspree notification (non-blocking-ish; failure logged but doesn't fail submission)
    const endpoint = process.env.FORMSPREE_ENDPOINT;
    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            _subject: `New Service Request from ${data.fullName}`,
            request_id: inserted.id,
            submitted_at: inserted.created_at,
            full_name: data.fullName,
            company_name: data.companyName || "-",
            email: data.email,
            phone: data.phone,
            city: data.city || "-",
            service_category: data.serviceCategory,
            service_required: data.serviceRequired,
            budget: data.budget || "-",
            preferred_delivery_date: data.preferredDeliveryDate || "-",
            project_description: data.projectDescription,
            preferred_contact_method: data.preferredContactMethod,
          }),
        });
      } catch (e) {
        console.error("Formspree notification failed", e);
      }
    }

    // Web3Forms email notification to abhishek.ck.dev@gmail.com
    const web3Key = process.env.WEB3FORMS_ACCESS_KEY;
    if (web3Key) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: web3Key,
            subject: `New Service Request from ${data.fullName}`,
            from_name: "ABVertex Solutions Website",
            replyto: data.email,
            "Client Name": data.fullName,
            "Company Name": data.companyName || "-",
            Email: data.email,
            "Phone / WhatsApp": data.phone,
            City: data.city || "-",
            "Service Needed": data.serviceCategory,
            "Service Required": data.serviceRequired,
            Budget: data.budget || "-",
            "Preferred Delivery Date": data.preferredDeliveryDate || "-",
            "Preferred Contact Method": data.preferredContactMethod,
            "Project Details": data.projectDescription,
            "Request ID": inserted.id,
          }),
        });
        if (!res.ok) {
          console.error(`Web3Forms failed [${res.status}]: ${await res.text()}`);
        }
      } catch (e) {
        console.error("Web3Forms notification failed", e);
      }
    } else {
      console.warn("WEB3FORMS_ACCESS_KEY not set - email notification skipped");
    }

    return { ok: true, id: inserted.id };
  });