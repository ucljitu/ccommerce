import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import { contactConfig, getWhatsAppUrl } from "@/lib/contact-config";

export const metadata: Metadata = {
  title: "Contact C Commerce | Sales and Support",
  description:
    "Contact C Commerce for online store support, pricing questions, technical assistance and business inquiries.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact C Commerce",
    description:
      "Send a message or contact the C Commerce support team for help with your online store.",
  },
};

const details = [
  contactConfig.supportPhone
    ? {
        icon: Phone,
        label: "General Contact",
        value: contactConfig.supportPhone,
        href: `tel:${contactConfig.supportPhone.replace(/[^\d+]/g, "")}`,
        color: "bg-blue-50 text-blue-600",
      }
    : null,
  contactConfig.supportEmail
    ? {
        icon: Mail,
        label: "Support Email",
        value: contactConfig.supportEmail,
        href: `mailto:${contactConfig.supportEmail}`,
        color: "bg-purple-50 text-purple-600",
      }
    : null,
  contactConfig.officeAddress
    ? {
        icon: MapPin,
        label: "Office Address",
        value: contactConfig.officeAddress,
        href: null,
        color: "bg-emerald-50 text-emerald-600",
      }
    : null,
  contactConfig.supportHours
    ? {
        icon: Clock,
        label: "Support Hours",
        value: contactConfig.supportHours,
        href: null,
        color: "bg-amber-50 text-amber-600",
      }
    : null,
].filter((item) => item !== null);

export default function ContactPage() {
  const whatsappUrl = getWhatsAppUrl();
  return (
    <div className="pt-16">
      <header className="border-b border-blue-100 bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-14 text-center sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
          Contact Us
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          We&apos;re Here to Help
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Have a question about C Commerce? Send us a message or contact our
          support team.
        </p>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(300px,2fr)]">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <ContactForm />
          </section>
          <aside className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Get in Touch</h2>
              <p className="mt-2 leading-7 text-slate-500">
                Choose the contact method that works best for you.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {details.map((item) => {
                const content = (
                  <>
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.color}`}
                    >
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {item.label}
                      </p>
                      <p className="mt-1 break-words font-semibold text-slate-900">
                        {item.value}
                      </p>
                    </div>
                  </>
                );
                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex min-h-20 items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 hover:border-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={item.label}
                    className="flex min-h-20 items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    {content}
                  </div>
                );
              })}
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">WhatsApp Support</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Send us a message on WhatsApp for assistance.
                  </p>
                </div>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with C Commerce Support on WhatsApp"
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <h2 className="font-bold text-slate-900">Support Availability</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {contactConfig.availabilityText}
              </p>
            </div>
          </aside>
        </div>

        <section className="mt-12 rounded-3xl bg-slate-50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">
            Looking for a Quick Answer?
          </h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {[
              ["Visit Help Center", "/help"],
              ["View Pricing", "/pricing"],
              ["Set Delivery Charges", "/help/delivery/set-delivery-charges"],
              [
                "Connect a Custom Domain",
                "/help/store-settings/connect-custom-domain",
              ],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
