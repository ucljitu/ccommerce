import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Clock } from "lucide-react";

export const metadata = { title: "Roadmap — C Commerce" };

const quarters = [
  {
    period: "Q2 2026 — In Progress",
    status: "active",
    items: [
      { done: true, label: "Admin Super Panel with full merchant management" },
      { done: true, label: "Global search and notifications center" },
      { done: true, label: "Subscription management with plan enforcement" },
      { done: false, label: "Merchant mobile app (Android beta)" },
      { done: false, label: "Automated invoice & receipt generation" },
      { done: false, label: "Real-time order tracking map for customers" },
    ],
  },
  {
    period: "Q3 2026 — Planned",
    status: "planned",
    items: [
      { done: false, label: "Facebook & Instagram catalog sync" },
      { done: false, label: "Multi-language storefront (Bangla + English toggle)" },
      { done: false, label: "Abandoned cart recovery emails via SMS/WhatsApp" },
      { done: false, label: "Advanced analytics dashboard with cohort analysis" },
      { done: false, label: "Bulk product import via Excel/CSV" },
      { done: false, label: "Loyalty points & rewards program" },
    ],
  },
  {
    period: "Q4 2026 — Planned",
    status: "planned",
    items: [
      { done: false, label: "B2B wholesale portal with tiered pricing" },
      { done: false, label: "POS (Point of Sale) integration for physical stores" },
      { done: false, label: "Multi-vendor marketplace mode" },
      { done: false, label: "Pathao, Steadfast, RedX courier integration" },
      { done: false, label: "AI product description generator" },
      { done: false, label: "Customer review & rating system" },
    ],
  },
  {
    period: "Q1 2027 — Exploring",
    status: "exploring",
    items: [
      { done: false, label: "ERP integration (accounting, inventory sync)" },
      { done: false, label: "Subscription box products support" },
      { done: false, label: "Affiliate & referral marketing tools" },
      { done: false, label: "AI-powered demand forecasting for inventory" },
      { done: false, label: "Native iOS merchant app" },
    ],
  },
];

const statusConfig: Record<string, { color: string; bg: string; badge: string }> = {
  active: { color: "text-blue-600", bg: "bg-blue-50 border-blue-200", badge: "bg-blue-100 text-blue-700" },
  planned: { color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", badge: "bg-emerald-100 text-emerald-700" },
  exploring: { color: "text-slate-500", bg: "bg-slate-50 border-slate-200", badge: "bg-slate-100 text-slate-600" },
};

export default function RoadmapPage() {
  return (
    <div className="pt-16">
      <div className="gradient-hero py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-0">Product Roadmap</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Where We're Headed</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Transparency is important to us. Here's what we're building, what's coming next, and what we're exploring for the future.
          </p>
        </div>
      </div>

      <section className="py-16 max-w-3xl mx-auto px-4 space-y-8">
        {quarters.map((q, i) => {
          const cfg = statusConfig[q.status];
          return (
            <div key={i} className={`rounded-2xl border p-6 ${cfg.bg}`}>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <h2 className={`font-bold text-lg ${cfg.color}`}>{q.period}</h2>
                <Badge className={`border-0 text-xs ${cfg.badge}`}>
                  {q.status === "active" ? "In Progress" : q.status === "planned" ? "Planned" : "Exploring"}
                </Badge>
              </div>
              <ul className="space-y-3">
                {q.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    {q.status === "active" ? (
                      item.done ? (
                        <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Clock className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      )
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${item.done ? "line-through text-slate-400" : "text-slate-700"}`}>
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        <div className="bg-blue-600 rounded-2xl p-6 text-white text-center">
          <h3 className="font-bold text-lg mb-2">Have a Feature Request?</h3>
          <p className="text-blue-100 text-sm mb-4">
            Our roadmap is shaped by merchant feedback. Tell us what you need most.
          </p>
          <a href="/contact" className="inline-block bg-white text-blue-600 font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-colors">
            Submit a Request
          </a>
        </div>
      </section>
    </div>
  );
}
