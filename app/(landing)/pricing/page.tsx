import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, CreditCard, Info, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PricingCards from "@/components/pricing/PricingCards";
import PricingComparison from "@/components/pricing/PricingComparison";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import FinalCTA from "@/components/landing/FinalCTA";

const title = "C Commerce Pricing | Online Store Plans in Bangladesh";
const description = "Compare C Commerce plans for online stores, products, orders, payments, delivery, reports and staff access.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: "C Commerce Pricing Plans",
    description: "Choose a simple online store plan for your business in Bangladesh.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "C Commerce Pricing Plans",
    description: "Choose a simple online store plan for your business in Bangladesh.",
  },
};

export default function PricingPage() {
  return (
    <>
      <section className="gradient-hero pb-14 pt-28 text-center sm:pb-16 sm:pt-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Badge className="border-0 bg-blue-100 text-blue-700">Pricing Plans</Badge>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Simple Pricing for Every Business</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Start with the plan that fits your business and choose a larger plan when you need more features.
          </p>
          <p className="mt-4 text-sm font-medium text-slate-500">All prices are in BDT · 14-day trial · Payment information is not requested</p>
        </div>
      </section>

      <section aria-labelledby="plans-title" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 id="plans-title" className="text-3xl font-bold text-slate-900 sm:text-4xl">Choose Your Plan</h2>
            <p className="mt-4 text-lg text-slate-600">Every plan includes the tools needed to create and manage an online store.</p>
          </div>
          <PricingCards />
        </div>
      </section>

      <section aria-labelledby="trial-title" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 p-7 sm:p-9">
            <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
              <div>
                <Badge variant="success">Trial Information</Badge>
                <h2 id="trial-title" className="mt-4 text-3xl font-bold text-slate-900">How the Free Trial Works</h2>
                <p className="mt-4 leading-relaxed text-slate-600">Explore the available store tools before choosing a monthly plan.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex gap-3 rounded-2xl bg-blue-50 p-5"><CalendarDays className="h-6 w-6 shrink-0 text-blue-600" aria-hidden="true" /><div><h3 className="font-semibold text-slate-900">14-day trial</h3><p className="mt-1 text-sm leading-relaxed text-slate-600">The current trial flow is configured for 14 days.</p></div></div>
                <div className="flex gap-3 rounded-2xl bg-purple-50 p-5"><CreditCard className="h-6 w-6 shrink-0 text-purple-600" aria-hidden="true" /><div><h3 className="font-semibold text-slate-900">No payment details</h3><p className="mt-1 text-sm leading-relaxed text-slate-600">The signup form does not request card or payment information.</p></div></div>
                <div className="flex gap-3 rounded-2xl bg-emerald-50 p-5 sm:col-span-2"><Info className="h-6 w-6 shrink-0 text-emerald-600" aria-hidden="true" /><div><h3 className="font-semibold text-slate-900">Expiry and billing policy</h3><p className="mt-1 text-sm leading-relaxed text-slate-600">Automatic billing, grace period and data retention rules are not yet defined in the project. Contact support before the trial ends for the current process.</p></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-14 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-7 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">Need Multiple Stores or Custom Features?</h2>
            <p className="mt-3 max-w-2xl text-slate-300">Discuss dedicated infrastructure, custom integrations and business support with our team.</p>
          </div>
          <Button asChild size="lg" className="shrink-0 bg-white text-slate-900 hover:bg-slate-100">
            <Link href="/contact?subject=Enterprise%20Plan%20Inquiry">Contact Sales <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </Button>
        </div>
      </section>

      <PricingComparison />

      <section aria-labelledby="upgrade-title" className="bg-blue-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:px-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white"><ShieldCheck className="h-7 w-7" aria-hidden="true" /></div>
          <div>
            <h2 id="upgrade-title" className="text-3xl font-bold text-slate-900">Need a Different Plan Later?</h2>
            <p className="mt-3 text-lg leading-relaxed text-slate-600">Plan changes are currently managed by the platform team. Contact support when your business needs more features.</p>
          </div>
          <Button asChild size="lg" variant="outline" className="bg-white"><Link href="/contact">Contact Support</Link></Button>
        </div>
      </section>

      <PricingFAQ />
      <FinalCTA />
    </>
  );
}
