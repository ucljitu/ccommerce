import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Cookie Policy — C Commerce" };

const cookieTypes = [
  {
    type: "Essential Cookies",
    required: true,
    color: "bg-blue-50 border-blue-200",
    badge: "bg-blue-100 text-blue-700",
    desc: "These cookies are necessary for the platform to function. They cannot be disabled.",
    examples: [
      { name: "session_token", purpose: "Keeps you logged in to your C Commerce account", duration: "8 hours" },
      { name: "csrf_token", purpose: "Protects against cross-site request forgery attacks", duration: "Session" },
      { name: "store_cart", purpose: "Saves your customer's shopping cart items", duration: "7 days" },
    ],
  },
  {
    type: "Preference Cookies",
    required: false,
    color: "bg-amber-50 border-amber-200",
    badge: "bg-amber-100 text-amber-700",
    desc: "These cookies remember your preferences to improve your experience.",
    examples: [
      { name: "theme_pref", purpose: "Remembers your dashboard color theme preference", duration: "1 year" },
      { name: "lang_pref", purpose: "Remembers your preferred display language", duration: "1 year" },
      { name: "sidebar_state", purpose: "Remembers whether the navigation sidebar is collapsed", duration: "30 days" },
    ],
  },
  {
    type: "Analytics Cookies",
    required: false,
    color: "bg-purple-50 border-purple-200",
    badge: "bg-purple-100 text-purple-700",
    desc: "Help us understand how you use the platform so we can improve it. Data is aggregated and anonymized.",
    examples: [
      { name: "_ga", purpose: "Google Analytics — tracks page views and user behavior (anonymized)", duration: "2 years" },
      { name: "_fbp", purpose: "Facebook Pixel — measures ad campaign effectiveness", duration: "90 days" },
      { name: "hotjar_id", purpose: "Hotjar — records anonymized session replays for UX analysis", duration: "365 days" },
    ],
  },
  {
    type: "Marketing Cookies",
    required: false,
    color: "bg-rose-50 border-rose-200",
    badge: "bg-rose-100 text-rose-700",
    desc: "Used to show you relevant ads. Set by our advertising partners on our marketing pages.",
    examples: [
      { name: "fr", purpose: "Facebook — delivers and measures ads shown on Facebook", duration: "90 days" },
      { name: "_gcl_au", purpose: "Google Ads — conversion tracking for Google ad campaigns", duration: "90 days" },
    ],
  },
];

export default function CookiesPage() {
  return (
    <div className="pt-16">
      <div className="gradient-hero py-14 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Badge className="mb-4 bg-slate-100 text-slate-700 border-0">Legal</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Cookie Policy</h1>
          <p className="text-slate-500 text-sm">Last updated: June 2026</p>
        </div>
      </div>

      <section className="py-14 max-w-3xl mx-auto px-4">
        <div className="mb-10 space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            Cookies are small text files stored in your browser when you visit a website. C Commerce uses cookies to keep you logged in, remember your preferences, understand how the platform is used, and (on our marketing pages) show relevant ads.
          </p>
          <p>
            This policy explains what cookies we use, why, and how you can control them.
          </p>
        </div>

        <div className="space-y-8">
          {cookieTypes.map((ct, i) => (
            <div key={i} className={`rounded-2xl border p-6 ${ct.color}`}>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h2 className="text-lg font-bold text-slate-900">{ct.type}</h2>
                <Badge className={`border-0 text-xs ${ct.badge}`}>{ct.required ? "Always Active" : "Optional"}</Badge>
              </div>
              <p className="text-sm text-slate-600 mb-5">{ct.desc}</p>
              <div className="bg-white rounded-xl overflow-hidden border border-slate-100">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      <th className="text-left p-3 font-semibold text-slate-500 uppercase tracking-wide">Cookie Name</th>
                      <th className="text-left p-3 font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">Purpose</th>
                      <th className="text-left p-3 font-semibold text-slate-500 uppercase tracking-wide">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {ct.examples.map((ex, j) => (
                      <tr key={j} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-mono text-slate-800">{ex.name}</td>
                        <td className="p-3 text-slate-500 hidden sm:table-cell">{ex.purpose}</td>
                        <td className="p-3 text-slate-500 whitespace-nowrap">{ex.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3">How to Manage Cookies</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              You can control non-essential cookies through your browser settings. Most browsers allow you to:
            </p>
            <ul className="text-sm text-slate-600 space-y-1.5 ml-4">
              <li>• View what cookies are stored and delete them individually</li>
              <li>• Block third-party cookies</li>
              <li>• Block cookies from specific sites</li>
              <li>• Block all cookies (note: essential cookies are required for C Commerce to work)</li>
              <li>• Delete all cookies when you close the browser</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3">Changes to This Policy</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We may update this Cookie Policy from time to time. We will notify you of significant changes on the platform. Your continued use of C Commerce after changes take effect constitutes acceptance.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 text-sm text-slate-500">
          <p className="mb-2">Questions about our cookie practices?</p>
          <p>Email: <a href="mailto:privacy@ccommerce.com.bd" className="text-blue-600 hover:underline">privacy@ccommerce.com.bd</a></p>
        </div>
      </section>
    </div>
  );
}
