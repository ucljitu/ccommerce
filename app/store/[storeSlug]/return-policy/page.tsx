import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, MessageCircle } from "lucide-react";

const returnable = [
  "Defective or damaged products",
  "Wrong item sent",
  "Product significantly different from description",
  "Missing accessories or parts",
  "Product not working as advertised",
];

const notReturnable = [
  "Products with broken seals (hygiene items, food, cosmetics)",
  "Digital or downloadable products",
  "Customized or personalized items",
  "Products damaged by misuse",
  "Returns requested after 7 days of delivery",
];

const steps = [
  { step: "01", title: "Contact Us", desc: "WhatsApp or call us within 7 days of delivery with your order ID and issue." },
  { step: "02", title: "Photo Evidence", desc: "Send clear photos of the defective/damaged product for review." },
  { step: "03", title: "Approval", desc: "We'll review and approve or explain why the return is not eligible within 24–48 hours." },
  { step: "04", title: "Ship Back", desc: "Send the product to our address using any courier. We'll cover shipping costs for our mistake." },
  { step: "05", title: "Refund/Replacement", desc: "Receive your refund or replacement within 3–7 business days after we receive the product." },
];

export default function ReturnPolicyPage() {
  return (
    <div className="pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-2">Return & Refund Policy</h1>
        <p className="text-slate-300 text-sm">Last updated: June 25, 2026 · 7-day return window</p>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Summary Banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center">
          <p className="text-emerald-800 font-semibold text-lg">7-Day Easy Return Guarantee</p>
          <p className="text-emerald-700 text-sm mt-1">Not happy with your order? We'll make it right — full refund or free replacement.</p>
        </div>

        {/* Return Steps */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-5">How to Return</h2>
          <div className="space-y-3">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-4 bg-white border border-slate-200 rounded-xl p-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-sm shrink-0">{s.step}</div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{s.title}</p>
                  <p className="text-sm text-slate-500 mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What's returnable */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="bg-white border border-emerald-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-slate-900">Eligible for Return</h3>
            </div>
            <ul className="space-y-2">
              {returnable.map((item, i) => (
                <li key={i} className="text-sm text-slate-600 flex gap-2">
                  <span className="text-emerald-500 shrink-0">✓</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-red-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-slate-900">Not Eligible</h3>
            </div>
            <ul className="space-y-2">
              {notReturnable.map((item, i) => (
                <li key={i} className="text-sm text-slate-600 flex gap-2">
                  <span className="text-red-400 shrink-0">✕</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Refund Timeline */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h2 className="font-semibold text-slate-900 mb-4">Refund Timeline by Payment Method</h2>
          <div className="space-y-2.5">
            {[
              { method: "💗 bKash / 🟠 Nagad / 🚀 Rocket", time: "1–2 business days" },
              { method: "💳 Card / Net Banking", time: "3–7 business days" },
              { method: "💵 Cash on Delivery (COD)", time: "Refunded via bKash/Nagad within 2–3 days" },
            ].map((r, i) => (
              <div key={i} className="flex justify-between items-center text-sm border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                <span className="text-slate-700">{r.method}</span>
                <span className="text-slate-500 font-medium">{r.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center">
          <p className="text-slate-700 font-medium mb-1">Need help with a return?</p>
          <p className="text-sm text-slate-500 mb-4">Our team is available Sat–Thu, 9 AM – 9 PM</p>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 gap-2">
            <MessageCircle className="w-4 h-4" /> Contact via WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
