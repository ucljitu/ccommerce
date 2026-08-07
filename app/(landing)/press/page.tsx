import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Mail } from "lucide-react";

export const metadata = { title: "Press Kit — C Commerce" };

const coverage = [
  { outlet: "The Daily Star", headline: "C Commerce empowers 5,000 SMEs to sell online", date: "May 2026", type: "Feature" },
  { outlet: "Prothom Alo Digital", headline: "দেশীয় ই-কমার্স প্ল্যাটফর্ম C Commerce-এর দ্রুত বিকাশ", date: "April 2026", type: "Interview" },
  { outlet: "Dhaka Tribune", headline: "How C Commerce is competing with global ecommerce giants in Bangladesh", date: "March 2026", type: "Feature" },
  { outlet: "The Business Standard", headline: "Local SaaS startup C Commerce raises seed funding", date: "January 2026", type: "News" },
  { outlet: "TechJuice Bangladesh", headline: "C Commerce review: the best ecommerce platform for Bangladeshi SMEs", date: "November 2025", type: "Review" },
];

const facts = [
  { label: "Founded", value: "2021" },
  { label: "Headquarters", value: "Dhaka, Bangladesh" },
  { label: "Active Merchants", value: "5,000+" },
  { label: "Districts Covered", value: "64" },
  { label: "GMV Processed", value: "৳120 Crore+" },
  { label: "Team Size", value: "45+" },
];

const typeColors: Record<string, string> = {
  Feature: "bg-blue-100 text-blue-700",
  Interview: "bg-purple-100 text-purple-700",
  News: "bg-amber-100 text-amber-700",
  Review: "bg-emerald-100 text-emerald-700",
};

export default function PressPage() {
  return (
    <div className="pt-16">
      <div className="gradient-hero py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-0">Press & Media</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Press Kit</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Resources for journalists, bloggers, and media covering Bangladesh's ecommerce industry.
          </p>
          <a href="mailto:press@ccommerce.com.bd">
            <Button className="gradient-primary text-white border-0 h-11 px-6 gap-2">
              <Mail className="w-4 h-4" /> Contact Press Team
            </Button>
          </a>
        </div>
      </div>

      <section className="py-16 max-w-5xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Brand Assets */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-6">Brand Assets</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-100 p-5">
                <div className="w-full h-28 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">C Commerce</span>
                </div>
                <p className="text-sm font-semibold text-slate-900 mb-1">Primary Logo (Dark Background)</p>
                <p className="text-xs text-slate-500 mb-3">PNG, SVG — Full color on dark</p>
                <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  <Download className="w-4 h-4" /> Download Logo Pack
                </button>
              </div>
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
                <div className="w-full h-28 bg-white rounded-xl border border-slate-200 mb-4 flex items-center justify-center">
                  <span className="text-slate-900 font-bold text-2xl">C Commerce</span>
                </div>
                <p className="text-sm font-semibold text-slate-900 mb-1">Primary Logo (Light Background)</p>
                <p className="text-xs text-slate-500 mb-3">PNG, SVG — Full color on white</p>
                <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  <Download className="w-4 h-4" /> Download Logo Pack
                </button>
              </div>
            </div>
          </div>

          {/* Company Facts */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-6">Company Facts</h2>
            <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6">
              <div className="grid grid-cols-2 gap-4">
                {facts.map((f, i) => (
                  <div key={i} className="py-3 border-b border-slate-100 last:border-0">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">{f.label}</p>
                    <p className="font-semibold text-slate-900 text-sm">{f.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-4">One-Line Description</h2>
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 text-sm text-slate-700 italic leading-relaxed">
              "C Commerce is Bangladesh's leading ecommerce SaaS platform, enabling 5,000+ merchants to build, sell, and grow their online businesses with full support for local payment gateways and nationwide delivery."
            </div>
          </div>
        </div>

        {/* Media Coverage */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Media Coverage</h2>
          <div className="space-y-4">
            {coverage.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-sm transition-shadow group cursor-pointer">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-sm font-bold text-slate-900">{item.outlet}</span>
                      <Badge className={`border-0 text-xs ${typeColors[item.type]}`}>{item.type}</Badge>
                      <span className="text-xs text-slate-400">{item.date}</span>
                    </div>
                    <p className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors">{item.headline}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-0.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Press Contact */}
        <div className="mt-12 bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
          <h3 className="font-bold text-slate-900 mb-2">Press Enquiries</h3>
          <p className="text-sm text-slate-500 mb-1">For interviews, feature stories, and media requests:</p>
          <a href="mailto:press@ccommerce.com.bd" className="text-blue-600 font-semibold hover:underline">press@ccommerce.com.bd</a>
          <p className="text-xs text-slate-400 mt-2">We typically respond within 24 hours on business days.</p>
        </div>
      </section>
    </div>
  );
}
