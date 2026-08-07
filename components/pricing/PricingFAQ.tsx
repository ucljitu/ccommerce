"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const pricingFaqs = [
  ["Do I need technical knowledge to use C Commerce?", "No. You can manage the basic parts of your store without coding."],
  ["Can I use my own domain?", "Custom domains are currently available on the Business plan. Every plan includes a store subdomain."],
  ["Which payment methods are supported?", "Cash on Delivery and available payment gateways can be configured. Gateway availability depends on the current platform settings and merchant credentials."],
  ["Can I set different delivery charges?", "Yes. You can configure different delivery charges for available districts and delivery areas."],
  ["Can I add store content in Bangla?", "Yes. Store content can be added in Bangla or English. The merchant dashboard remains in English."],
  ["What happens after the free trial?", "The current project does not yet define a final expiry, data retention or automatic billing policy. Contact support before your trial ends for the current process."],
  ["Can I upgrade my plan later?", "Plan changes are managed by the platform team in the current system. Contact support when you need a different plan."],
] as const;

export default function PricingFAQ() {
  return (
    <section aria-labelledby="pricing-faq-title" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 id="pricing-faq-title" className="text-3xl font-bold text-slate-900 sm:text-4xl">Pricing Questions</h2>
          <p className="mt-4 text-lg text-slate-600">Need more information? <Link href="/contact" className="font-medium text-blue-600 underline-offset-4 hover:underline">Contact us</Link>.</p>
        </div>
        <Accordion type="single" collapsible className="mt-10 rounded-2xl border border-slate-200 bg-white px-5">
          {pricingFaqs.map(([question, answer], index) => (
            <AccordionItem key={question} value={`pricing-faq-${index}`}>
              <AccordionTrigger className="min-h-14 text-left text-base">{question}</AccordionTrigger>
              <AccordionContent className="text-[15px]">{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
