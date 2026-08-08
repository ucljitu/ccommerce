"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  ["Do I need technical knowledge to use C Commerce?", "No. C Commerce is designed for non-technical business owners. You can create and manage your store from a simple dashboard."],
  ["Can I use my own domain?", "Yes. You can connect your own domain on supported plans. SSL will be configured based on the selected plan and domain setup."],
  ["Which payment methods are supported?", "C Commerce supports Cash on Delivery and selected local payment gateways. Available integrations depend on the current platform configuration."],
  ["Can I set different delivery charges?", "Yes. You can set different delivery charges by district, area, upazila or other available delivery rules."],
  ["Can I add store content in Bangla?", "Yes. Product names, descriptions and storefront content can be added in Bangla or English. The merchant dashboard remains in English."],
  ["What happens after the free trial?", "Your store and data will remain subject to the current subscription policy. Contact our team to confirm the current upgrade, expiry and store suspension rules."],
] as const;

export default function FAQ() {
  return (
    <section aria-labelledby="faq-title" className="bg-slate-50 py-6 sm:py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <Badge className="mb-4 border-0 bg-purple-100 text-purple-700">FAQ</Badge>
          <h2 id="faq-title" className="text-3xl font-bold text-slate-900 sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-slate-600">Need more information? <Link href="/contact" className="font-medium text-blue-600 underline-offset-4 hover:underline">Contact us</Link>.</p>
        </div>
        <Accordion type="single" collapsible className="rounded-2xl border border-slate-200 bg-white px-5">
          {faqs.map(([question, answer], index) => (
            <AccordionItem key={question} value={`faq-${index}`}>
              <AccordionTrigger className="min-h-14 text-left text-base">{question}</AccordionTrigger>
              <AccordionContent className="text-[15px]">{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

