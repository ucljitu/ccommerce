import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FinalCTA() {
  return (
    <section aria-labelledby="final-cta-title" className="gradient-primary relative overflow-hidden py-12 sm:py-16">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 id="final-cta-title" className="text-3xl font-bold text-white sm:text-4xl">Ready to Start Selling Online?</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100">Create your store, add your products and start receiving orders.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="xl" className="bg-white text-blue-700 hover:bg-blue-50"><Link href="/trial">Start Free <ArrowRight className="h-5 w-5" aria-hidden="true" /></Link></Button>
          <Button asChild size="xl" variant="outline" className="border-white/60 text-white hover:bg-white/10"><Link href="/demo">View Demo Store</Link></Button>
        </div>
        <p className="mt-6 text-sm text-blue-100">Payment information is not requested · Easy setup · Support available</p>
      </div>
    </section>
  );
}
