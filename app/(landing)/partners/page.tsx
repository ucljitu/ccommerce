import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Handshake, TrendingUp, Users, Gift, CheckCircle, ArrowRight } from "lucide-react";

export const metadata = { title: "Partner Program — C Commerce" };

const partnerTypes = [
  {
    icon: Users,
    color: "bg-blue-50 text-blue-600",
    badge: "bg-blue-100 text-blue-700",
    title: "Reseller Partner",
    commission: "Up to 30% recurring",
    desc: "Sell C Commerce subscriptions to merchants in your network. Earn a monthly recurring commission for as long as your referred merchant stays active.",
    features: ["30% recurring commission", "Dedicated partner dashboard", "Co-branded sales materials", "Priority partner support"],
  },
  {
    icon: TrendingUp,
    color: "bg-emerald-50 text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
    title: "Agency Partner",
    commission: "Up to 40% recurring",
    desc: "For digital agencies and web developers who build and manage stores for clients. Higher commissions, white-label options, and client management tools.",
    features: ["40% recurring commission", "White-label option", "Bulk client management", "Agency training & certification"],
  },
  {
    icon: Handshake,
    color: "bg-purple-50 text-purple-600",
    badge: "bg-purple-100 text-purple-700",
    title: "Technology Partner",
    commission: "Custom agreement",
    desc: "Integrate your product or service with C Commerce via API. Reach 5,000+ merchants through our app marketplace and co-marketing opportunities.",
    features: ["API access & docs", "Joint press releases", "In-platform listing", "Revenue sharing options"],
  },
];

const benefits = [
  { icon: Gift, color: "bg-amber-50 text-amber-600", title: "Recurring Revenue", desc: "Earn commissions every month — not just one time. Your referrals keep paying." },
  { icon: TrendingUp, color: "bg-blue-50 text-blue-600", title: "High Conversion", desc: "C Commerce has one of the highest conversion rates in the market. Easy to sell." },
  { icon: Users, color: "bg-emerald-50 text-emerald-600", title: "Partner Support", desc: "A dedicated partner manager to help you close deals and grow faster." },
  { icon: CheckCircle, color: "bg-purple-50 text-purple-600", title: "Marketing Materials", desc: "Brochures, banner ads, pitch decks — all ready for you to use." },
];

const steps = [
  { num: "01", title: "Apply Online", desc: "Fill out the partner application form. We review within 2 business days." },
  { num: "02", title: "Get Approved", desc: "Receive your partner agreement, dashboard access, and onboarding kit." },
  { num: "03", title: "Start Referring", desc: "Share your unique referral link or sign up merchants directly via your dashboard." },
  { num: "04", title: "Earn Monthly", desc: "Commissions are paid every month directly to your bKash or bank account." },
];

export default function PartnersPage() {
  return (
    <div className="pt-16">
      <div className="gradient-hero py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-0">Partner Program</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Grow Together <br className="hidden sm:block" />
            with C Commerce
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Join our partner program and earn recurring commissions by referring merchants to Bangladesh's #1 ecommerce platform.
          </p>
          <Link href="/contact">
            <Button className="gradient-primary text-white border-0 h-12 px-8 text-base gap-2">
              Apply to Become a Partner <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Partner Types */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Choose Your Partnership Type</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {partnerTypes.map((pt, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-shadow">
              <div className={`w-11 h-11 rounded-xl ${pt.color} flex items-center justify-center mb-4`}>
                <pt.icon className="w-5 h-5" />
              </div>
              <Badge className={`border-0 text-xs mb-3 ${pt.badge}`}>{pt.title}</Badge>
              <p className="text-lg font-bold text-slate-900 mb-2">{pt.commission}</p>
              <p className="text-sm text-slate-500 mb-5 leading-relaxed">{pt.desc}</p>
              <ul className="space-y-2">
                {pt.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Why Partner with Us?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5">
                <div className={`w-10 h-10 rounded-xl ${b.color} flex items-center justify-center mb-3`}>
                  <b.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">{b.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center">How It Works</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                {s.num}
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-blue-100 mb-8">Join 200+ active partners earning monthly recurring commissions with C Commerce.</p>
          <Link href="/contact">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 h-12 px-8 text-base font-semibold">
              Apply Now — Free to Join
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
