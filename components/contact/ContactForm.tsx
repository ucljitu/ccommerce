"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, RotateCcw, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  inquiryTypes,
  validateContactForm,
  type ContactErrors,
  type ContactField,
  type ContactFormData,
} from "@/lib/contact-validation";
import { getWhatsAppUrl } from "@/lib/contact-config";

const emptyForm = (): ContactFormData => ({
  fullName: "",
  mobile: "",
  email: "",
  inquiryType: "",
  subject: "",
  message: "",
  website: "",
  startedAt: Date.now(),
});

function FieldError({
  field,
  errors,
}: {
  field: ContactField;
  errors: ContactErrors;
}) {
  if (!errors[field]) return null;
  return (
    <p id={`${field}-error`} className="text-sm text-red-600">
      {errors[field]}
    </p>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(emptyForm);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [serverMessage, setServerMessage] = useState("");
  const [reference, setReference] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);
  const whatsappUrl = getWhatsAppUrl();

  const update = (field: keyof ContactFormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (field in errors) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
    if (state === "error") setState("idle");
  };

  const focusStatus = () =>
    window.requestAnimationFrame(() => statusRef.current?.focus());

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === "sending") return;
    const validation = validateContactForm(form);
    setErrors(validation);
    if (Object.keys(validation).length) {
      document.getElementById(Object.keys(validation)[0])?.focus();
      return;
    }

    setState("sending");
    setServerMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as {
        message?: string;
        referenceNumber?: string;
        errors?: ContactErrors;
      };
      if (!response.ok) {
        if (result.errors) setErrors(result.errors);
        setServerMessage(result.message || "We could not send your message.");
        setState("error");
        focusStatus();
        return;
      }
      setReference(result.referenceNumber || "");
      setState("success");
      focusStatus();
    } catch {
      setServerMessage(
        "Please try again. You can also contact us by WhatsApp or email.",
      );
      setState("error");
      focusStatus();
    }
  };

  if (state === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        aria-live="polite"
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-7 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      >
        <CheckCircle2 className="h-11 w-11 text-emerald-600" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-bold text-slate-900">
          Your Message Has Been Sent
        </h2>
        <p className="mt-3 leading-7 text-slate-600">
          Thank you for contacting C Commerce. Our support team will review your
          message and contact you using the details provided.
        </p>
        {reference && (
          <p className="mt-4 rounded-xl bg-white px-4 py-3 text-sm text-slate-600">
            Reference: <strong className="text-slate-900">{reference}</strong>
          </p>
        )}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            onClick={() => {
              setForm(emptyForm());
              setErrors({});
              setReference("");
              setState("idle");
            }}
            className="min-h-11 bg-blue-600 text-white hover:bg-blue-700"
          >
            <RotateCcw className="h-4 w-4" />
            Send Another Message
          </Button>
          <Button asChild variant="outline" className="min-h-11 bg-white">
            <Link href="/help">Visit Help Center</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Send Us a Message</h2>
        <p className="mt-2 text-sm text-slate-500">
          Fields marked with * are required. Provide a mobile number or an email
          address.
        </p>
      </div>

      {state === "error" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          <div className="flex gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            <div>
              <p className="font-semibold text-red-900">
                We could not send your message.
              </p>
              <p className="mt-1 text-sm text-red-700">{serverMessage}</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setState("idle")}
              className="text-sm font-semibold text-red-800 underline"
            >
              Try Again
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-red-800 underline"
            >
              Contact on WhatsApp
            </a>
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="fullName">Full Name *</Label>
        <Input
          id="fullName"
          name="fullName"
          autoComplete="name"
          placeholder="Enter your full name"
          value={form.fullName}
          onChange={(event) => update("fullName", event.target.value)}
          maxLength={100}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          className="min-h-11"
        />
        <FieldError field="fullName" errors={errors} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="mobile">Mobile Number</Label>
          <Input
            id="mobile"
            name="mobile"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="01XXXXXXXXX"
            value={form.mobile}
            onChange={(event) => update("mobile", event.target.value)}
            maxLength={30}
            aria-invalid={Boolean(errors.mobile)}
            aria-describedby={
              errors.mobile ? "mobile-error" : "contact-method-help"
            }
            className="min-h-11"
          />
          <FieldError field="mobile" errors={errors} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            maxLength={254}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={
              errors.email ? "email-error" : "contact-method-help"
            }
            className="min-h-11"
          />
          <FieldError field="email" errors={errors} />
        </div>
      </div>
      <p id="contact-method-help" className="text-xs text-slate-500">
        At least one contact method is required.
      </p>

      <div className="space-y-1.5">
        <Label htmlFor="inquiryType">Inquiry Type *</Label>
        <select
          id="inquiryType"
          name="inquiryType"
          value={form.inquiryType}
          onChange={(event) => update("inquiryType", event.target.value)}
          aria-invalid={Boolean(errors.inquiryType)}
          aria-describedby={
            errors.inquiryType ? "inquiryType-error" : undefined
          }
          className="min-h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/25"
        >
          <option value="">Select an inquiry type</option>
          {inquiryTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <FieldError field="inquiryType" errors={errors} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="subject">Subject *</Label>
        <Input
          id="subject"
          name="subject"
          placeholder="Enter a short subject"
          value={form.subject}
          onChange={(event) => update("subject", event.target.value)}
          maxLength={150}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className="min-h-11"
        />
        <FieldError field="subject" errors={errors} />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-end justify-between gap-3">
          <Label htmlFor="message">Message *</Label>
          <span className="text-xs text-slate-400">
            {form.message.length}/3000
          </span>
        </div>
        <Textarea
          id="message"
          name="message"
          placeholder="Describe how we can help"
          rows={7}
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          maxLength={3000}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="resize-y"
        />
        <FieldError field="message" errors={errors} />
      </div>

      <div hidden aria-hidden="true">
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>

      <p className="text-xs leading-5 text-slate-500">
        By submitting this form, you agree that C Commerce may use your contact
        information to respond to your inquiry. Read our{" "}
        <Link
          href="/privacy"
          className="font-medium text-blue-700 underline-offset-2 hover:underline"
        >
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link
          href="/terms"
          className="font-medium text-blue-700 underline-offset-2 hover:underline"
        >
          Terms and Conditions
        </Link>
        .
      </p>
      <Button
        type="submit"
        size="lg"
        disabled={state === "sending"}
        className="min-h-12 w-full bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state === "sending" ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin motion-reduce:animate-none" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Send Message
          </>
        )}
      </Button>
      <div className="sr-only" aria-live="polite">
        {state === "sending" ? "Sending your message." : ""}
      </div>
    </form>
  );
}
