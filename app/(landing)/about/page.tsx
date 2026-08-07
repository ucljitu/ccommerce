import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Target, Users, Globe, Zap, Heart, Award } from "lucide-react";

export const metadata = { title: "About Us — C Commerce" };

const values = [
  { icon: Target, color: "bg-blue-50 text-blue-600", title: "Merchant First", desc: "Every feature we build starts with a real merchant problem. We listen to the businesses using our platform every day." },
  { icon: Zap, color: "bg-amber-50 text-amber-600", title: "Speed Matters", desc: "Bangladesh has fast mobile internet. Our storefronts load in under 2 seconds — because slow pages lose sales." },
  { icon: Heart, color: "bg-rose-50 text-rose-600", title: "Local by Default", desc: "bKash, Nagad, COD, district-wise delivery — built in from day one. Not an afterthought." },
  { icon: Globe, color: "bg-emerald-50 text-emerald-600", title: "Reach Everyone", desc: "From Dhaka to Chittagong to Sylhet — every merchant can sell nationwide without technical knowledge." },
  { icon: Users, color: "bg-purple-50 text-purple-600", title: "Community Driven", desc: "Our merchant community helps shape the roadmap. Your feedback directly influences what we build next." },
  { icon: Award, color: "bg-orange-50 text-orange-600", title: "Quality Always", desc: "We'd rather ship one great feature than ten mediocre ones. Reliability and polish come first." },
];

const stats = [
  { value: "5,000+", label: "Active Merchants" },
  { value: "৳120 Cr+", label: "GMV Processed" },
  { value: "64", label: "Districts Covered" },
  { value: "2021", label: "Founded" },
];

const team = [
  { name: "Rafiqul Islam", role: "CEO & Co-Founder", initials: "RI", color: "bg-blue-500" },
  { name: "Nasrin Akter", role: "CTO & Co-Founder", initials: "NA", color: "bg-purple-500" },
  { name: "Mahmudul Hasan", role: "Head of Product", initials: "MH", color: "bg-emerald-500" },
  { name: "Fatema Begum", role: "Head of Growth", initials: "FB", color: "bg-rose-500" },
];

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="gradient-hero py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-0">About C Commerce</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Built in Bangladesh, <br className="hidden sm:block" />
            Built for Bangladesh
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            We started C Commerce because we saw thousands of Bangladeshi entrepreneurs struggling to sell online.
            Existing platforms were built for the West — too expensive, too complicated, wrong payment methods.
            So we built the right one.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/trial">
              <Button className="gradient-primary text-white border-0 h-11 px-6">Start Free Trial</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="h-11 px-6">Get in Touch</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i}>
                <p className="text-3xl font-bold text-blue-600 mb-1">{s.value}</p>
                <p className="text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Our Story</h2>
          <div className="prose prose-slate max-w-none space-y-4 text-slate-600 leading-relaxed">
            <p>
              In 2021, our founders noticed something: Bangladesh had millions of small business owners ready to sell online,
              but no platform that truly understood them. Shopify was priced in USD. WooCommerce required a developer.
              Facebook Live selling was chaotic and hard to scale.
            </p>
            <p>
              C Commerce was born from this gap. We built a platform where a fashion entrepreneur in Mirpur could
              launch a professional online store in 30 minutes, accept bKash payments instantly, and deliver to all
              64 districts with automated shipping cost calculations.
            </p>
            <p>
              Today, over 5,000 merchants trust C Commerce to run their online businesses. From single-product stores
              to multi-category shops processing hundreds of orders daily — we power them all.
            </p>
            <p>
              Our team is based in Dhaka, Bangladesh. We understand the market because we live in it.
              Every product decision is informed by real conversations with real Bangladeshi merchants.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">What We Believe</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100">
                <div className={`w-10 h-10 rounded-xl ${v.color} flex items-center justify-center mb-4`}>
                  <v.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Leadership Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className={`w-16 h-16 rounded-2xl ${m.color} flex items-center justify-center text-white font-bold text-lg`}>
                  {m.initials}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{m.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Join 5,000+ Merchants</h2>
          <p className="text-blue-100 mb-8">Start your free 14-day trial today. No credit card required.</p>
          <Link href="/trial">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 h-12 px-8 text-base font-semibold">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
