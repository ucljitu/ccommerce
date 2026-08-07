import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PricingCards from "@/components/pricing/PricingCards";

export default function PricingSection() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <Badge className="mb-4 border-0 bg-emerald-100 text-emerald-700">Simple Pricing</Badge>
          <h2 id="pricing-title" className="text-3xl font-bold text-slate-900 sm:text-4xl">Choose the Right Plan for Your Business</h2>
          <p className="mt-4 text-lg text-slate-600">Start small and move to a larger plan when your business grows.</p>
        </div>
        <PricingCards />
        <div className="mt-8 rounded-2xl bg-slate-900 p-7 text-center text-white sm:flex sm:items-center sm:justify-between sm:text-left">
          <div><h3 className="text-2xl font-bold">Need Multiple Stores or Custom Features?</h3><p className="mt-2 text-slate-300">Get dedicated infrastructure, custom integrations and business support.</p></div>
          <Button asChild size="lg" className="mt-5 bg-white text-slate-900 hover:bg-slate-100 sm:mt-0"><Link href="/contact">Contact Sales</Link></Button>
        </div>
        <div className="mt-7 text-center"><Link href="/pricing" className="font-semibold text-blue-600 underline-offset-4 hover:underline">Compare All Features</Link></div>
      </div>
    </section>
  );
}
