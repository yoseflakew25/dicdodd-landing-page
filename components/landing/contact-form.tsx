"use client";

import { useState, type FormEvent } from "react";
import { Send, Mail, Phone, MapPin, CheckCircle, Loader2, Clock, ArrowUpRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Dire Dawa, Kebele 03 Area, Ethiopia",
    detail: "Addis Ababa & Dire Dawa offices",
    href: "https://maps.google.com/?q=Dire+Dawa+Ethiopia",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "dicdodd@gmail.com",
    detail: "We reply within 1–2 business days",
    href: "mailto:dicdodd@gmail.com",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+251 915005166",
    detail: "Mr. Demissie Afework, Executive Director",
    href: "tel:+251915005166",
  },
];

const EXTRA_CONTACTS = [
  { label: "demessafworke12@gmail.com", href: "mailto:demessafworke12@gmail.com" },
  { label: "+251 975047055", href: "tel:+251975047055" },
  { label: "+251 911435422", href: "tel:+251911435422" },
];

const SUBJECT_OPTIONS = [
  "Select a topic...",
  "General Inquiry",
  "Partnership",
  "Donation",
  "Volunteer",
  "Program Information",
  "Feedback",
  "Other",
];

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Please enter your name";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!data.email.trim()) {
    errors.email = "Please enter your email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.subject.trim()) {
    errors.subject = "Please select a topic";
  }

  if (!data.message.trim()) {
    errors.message = "Please enter your message";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
}

export function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched.has(field)) {
      const newErrors = validate({ ...form, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => new Set(prev).add(field));
    const newErrors = validate(form);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    setTouched(new Set(["name", "email", "subject", "message"]));
    if (Object.keys(validation).length > 0) return;
    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
  };

  const inputClass = (field: keyof FormData) =>
    cn(
      "w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 dark:bg-white/5",
      errors[field] && touched.has(field)
        ? "border-destructive/40 focus:border-destructive focus:ring-destructive/20"
        : "border-border/70 hover:border-primary/40 focus:border-primary/50 focus:ring-primary/20"
    );

  /* ---- Success state ---- */
  if (status === "success") {
    return (
      <section id="contact" className="relative overflow-hidden border-b border-border/50 py-20 scroll-mt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:40px_40px]"
        />
        <div className="container relative mx-auto px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="mx-auto max-w-lg text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 shadow-inner">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Message sent successfully!
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Thank you for reaching out. Our team will review your inquiry
                and get back to you as soon as possible.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-6 border-primary/30 text-primary hover:bg-primary/5 hover:text-primary"
                onClick={() => {
                  setStatus("idle");
                  setForm({ name: "", email: "", subject: "", message: "" });
                  setErrors({});
                  setTouched(new Set());
                }}
              >
                Send another message
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    );
  }

  /* ---- Main form ---- */
  return (
    <section id="contact" className="relative overflow-hidden border-b border-border/50 bg-background py-20 scroll-mt-16">
      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:40px_40px]"
      />

      {/* Gradient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/2 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px]"
      />

      <div className="container relative mx-auto px-6 lg:px-8">
        {/* Heading */}
        <FadeIn direction="up">
          <div className="mb-14 max-w-2xl">
            <Badge
              variant="outline"
              className="mb-4 w-fit border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary"
            >
              Get in Touch
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Let&apos;s work together
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Have a question, want to partner with us, or interested in supporting our mission?
              Fill out the form below and our team will get back to you.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          {/* ---- Left: Contact info ---- */}
          <FadeIn direction="left" className="lg:col-span-2">
            <div className="space-y-3">
              {CONTACT_INFO.map(({ icon: Icon, label, value, detail, href }) => (
                <a
                  key={label}
                  href={href}
                  target={
                    href.startsWith("http") && !href.startsWith("mailto") && !href.startsWith("tel")
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    href.startsWith("http") && !href.startsWith("mailto") && !href.startsWith("tel")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-white/70 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md dark:bg-white/[0.04]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
                      {value}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground/70">{detail}</p>
                  </div>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/30 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}

              {/* Extra contacts */}
              <div className="rounded-2xl border border-dashed border-primary/20 bg-primary/[0.02] p-5">
                <p className="text-xs font-medium text-foreground/80">Also reach us at:</p>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5">
                  {EXTRA_CONTACTS.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="inline-flex items-center gap-1 text-xs text-primary transition-colors hover:text-primary/70"
                    >
                      {href.startsWith("tel") ? <Phone className="h-3 w-3" /> : <Mail className="h-3 w-3" />}
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ---- Right: Form ---- */}
          <FadeIn direction="right" className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-border/60 bg-white/80 p-6 shadow-sm backdrop-blur-xl transition-shadow duration-300 hover:shadow-md dark:bg-white/[0.04] lg:p-8"
            >
              {/* Name + Email */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium text-foreground/80">
                    Full name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    className={inputClass("name")}
                    aria-invalid={!!errors.name && touched.has("name")}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && touched.has("name") && (
                    <p id="name-error" className="mt-1.5 flex items-center gap-1 text-xs text-destructive">
                      <span className="inline-block h-1 w-1 rounded-full bg-destructive" />
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-foreground/80">
                    Email address <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    className={inputClass("email")}
                    aria-invalid={!!errors.email && touched.has("email")}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && touched.has("email") && (
                    <p id="email-error" className="mt-1.5 flex items-center gap-1 text-xs text-destructive">
                      <span className="inline-block h-1 w-1 rounded-full bg-destructive" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="mt-5">
                <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-medium text-foreground/80">
                  Subject <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <select
                    id="contact-subject"
                    value={form.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    onBlur={() => handleBlur("subject")}
                    className={cn(inputClass("subject"), "appearance-none")}
                    aria-invalid={!!errors.subject && touched.has("subject")}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                  >
                    {SUBJECT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt === "Select a topic..." ? "" : opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
                </div>
                {errors.subject && touched.has("subject") && (
                  <p id="subject-error" className="mt-1.5 flex items-center gap-1 text-xs text-destructive">
                    <span className="inline-block h-1 w-1 rounded-full bg-destructive" />
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="mt-5">
                <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium text-foreground/80">
                  Message <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="Tell us how we can help you..."
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  className={cn(inputClass("message"), "resize-y min-h-[120px]")}
                  aria-invalid={!!errors.message && touched.has("message")}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && touched.has("message") && (
                  <p id="message-error" className="mt-1.5 flex items-center gap-1 text-xs text-destructive">
                    <span className="inline-block h-1 w-1 rounded-full bg-destructive" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit row */}
              <div className="mt-6 flex flex-col-reverse items-start justify-between gap-4 border-t border-border/50 pt-6 sm:flex-row sm:items-center">
                <Badge variant="outline" className="border-primary/30 bg-primary/5 text-[10px] text-primary">
                  <Clock className="mr-1 h-3 w-3" />
                  We respond within 1–2 business days
                </Badge>
                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "sending"}
                  className="group w-full gap-2 shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 sm:w-auto"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>

              {/* Error banner */}
              {status === "error" && (
                <div className="mt-4 animate-fade-up rounded-xl border border-destructive/20 bg-destructive/5 px-5 py-4">
                  <p className="text-xs text-destructive">
                    Something went wrong. Please try again or email us directly at{" "}
                    <a
                      href="mailto:dicdodd@gmail.com"
                      className="font-medium underline underline-offset-4 transition-colors hover:text-destructive/80"
                    >
                      dicdodd@gmail.com
                    </a>
                  </p>
                </div>
              )}
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
