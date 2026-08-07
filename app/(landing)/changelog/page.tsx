import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Changelog — C Commerce" };

const releases = [
  {
    version: "v2.4.0",
    date: "June 2026",
    type: "major",
    highlights: ["Admin Super Panel with merchant management", "Global search across all admin pages", "Notification center with real-time alerts", "Subscription management with pagination"],
    fixes: ["Fixed payment status update delay", "Improved mobile responsiveness on checkout"],
  },
  {
    version: "v2.3.0",
    date: "May 2026",
    type: "major",
    highlights: ["Merchant delivery zone configuration with all 64 districts", "WhatsApp order notification integration", "Product variant support (color, size)", "Custom domain connection flow"],
    fixes: ["Fixed duplicate order submission on slow networks", "Resolved bKash callback timeout issue"],
  },
  {
    version: "v2.2.0",
    date: "April 2026",
    type: "minor",
    highlights: ["Coupon & discount code engine", "Customer account portal with order history", "Inventory low-stock alerts", "Staff role management (Manager, Staff, Viewer)"],
    fixes: ["Cart persistence across sessions fixed", "Category filter on shop page corrected"],
  },
  {
    version: "v2.1.0",
    date: "March 2026",
    type: "minor",
    highlights: ["Banner & promotional section management", "Campaign scheduler with start/end dates", "Brand page management", "Export orders as CSV"],
    fixes: ["Product image upload size limit increased to 5MB", "Fixed pagination on orders page"],
  },
  {
    version: "v2.0.0",
    date: "February 2026",
    type: "major",
    highlights: ["Complete UI redesign — cleaner, faster, mobile-first", "Multi-payment gateway support (bKash, Nagad, Rocket, SSLCommerz, UddoktaPay)", "COD with advance payment option", "New storefront themes"],
    fixes: ["Performance improvements across all pages", "Resolved login session expiry bug"],
  },
  {
    version: "v1.5.0",
    date: "December 2025",
    type: "minor",
    highlights: ["District-wise delivery charge configuration", "Track order page for customers", "Return policy page per store", "Store-level terms & conditions"],
    fixes: ["Fixed checkout district dropdown on mobile", "Resolved Nagad webhook validation"],
  },
];

const typeColors: Record<string, string> = {
  major: "bg-blue-100 text-blue-700",
  minor: "bg-emerald-100 text-emerald-700",
};

export default function ChangelogPage() {
  return (
    <div className="pt-16">
      <div className="gradient-hero py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-0">Changelog</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">What's New in C Commerce</h1>
          <p className="text-lg text-slate-600">
            Every update, improvement, and fix — documented so you always know what's changed.
          </p>
        </div>
      </div>

      <section className="py-16 max-w-3xl mx-auto px-4">
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200 ml-5 hidden sm:block" />
          <div className="space-y-12">
            {releases.map((r, i) => (
              <div key={i} className="sm:pl-16 relative">
                <div className="hidden sm:flex absolute left-0 top-1 w-10 h-10 rounded-full bg-white border-2 border-blue-200 items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">{r.version.replace("v", "")}</span>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-sm transition-shadow">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="font-bold text-slate-900 text-lg">{r.version}</span>
                    <Badge className={`border-0 text-xs ${typeColors[r.type]}`}>{r.type === "major" ? "Major Release" : "Minor Update"}</Badge>
                    <span className="text-sm text-slate-400">{r.date}</span>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">New Features</p>
                    <ul className="space-y-1.5">
                      {r.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="text-emerald-500 mt-0.5">✦</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Bug Fixes</p>
                    <ul className="space-y-1.5">
                      {r.fixes.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-slate-500">
                          <span className="text-slate-400 mt-0.5">•</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
