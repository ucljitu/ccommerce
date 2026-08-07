import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, Clock, Briefcase, Heart, Zap, Users, Coffee } from "lucide-react";

export const metadata = { title: "Careers — C Commerce" };

const openings = [
  { title: "Senior Frontend Engineer", team: "Engineering", type: "Full-time", location: "Dhaka (Hybrid)", level: "Senior" },
  { title: "Backend Engineer (Node.js)", team: "Engineering", type: "Full-time", location: "Dhaka (Hybrid)", level: "Mid-Senior" },
  { title: "Product Manager", team: "Product", type: "Full-time", location: "Dhaka (Onsite)", level: "Mid-Senior" },
  { title: "UI/UX Designer", team: "Design", type: "Full-time", location: "Dhaka (Hybrid)", level: "Mid-level" },
  { title: "Merchant Success Manager", team: "Customer Success", type: "Full-time", location: "Dhaka (Onsite)", level: "Mid-level" },
  { title: "Digital Marketing Executive", team: "Growth", type: "Full-time", location: "Dhaka (Onsite)", level: "Mid-level" },
  { title: "Support Agent (Bangla/English)", team: "Support", type: "Part-time", location: "Remote", level: "Junior" },
];

const perks = [
  { icon: Coffee, color: "bg-amber-50 text-amber-600", title: "Flexible Hours", desc: "Results matter, not clock hours. Work when you're most productive." },
  { icon: Zap, color: "bg-blue-50 text-blue-600", title: "Fast Growth", desc: "A startup growing fast — your impact is visible and your career grows with it." },
  { icon: Heart, color: "bg-rose-50 text-rose-600", title: "Health Insurance", desc: "Full health coverage for you and your family." },
  { icon: Users, color: "bg-purple-50 text-purple-600", title: "Great Team", desc: "Work alongside passionate, talented people building something meaningful." },
  { icon: Briefcase, color: "bg-emerald-50 text-emerald-600", title: "Competitive Salary", desc: "Above-market pay with annual performance bonuses." },
  { icon: MapPin, color: "bg-indigo-50 text-indigo-600", title: "Hybrid / Remote", desc: "Many roles are hybrid or fully remote — flexibility is real here." },
];

const teamColors: Record<string, string> = {
  Engineering: "bg-blue-100 text-blue-700",
  Product: "bg-purple-100 text-purple-700",
  Design: "bg-rose-100 text-rose-700",
  "Customer Success": "bg-emerald-100 text-emerald-700",
  Growth: "bg-amber-100 text-amber-700",
  Support: "bg-slate-100 text-slate-600",
};

const levelColors: Record<string, string> = {
  Junior: "bg-emerald-50 text-emerald-600",
  "Mid-level": "bg-blue-50 text-blue-600",
  "Mid-Senior": "bg-purple-50 text-purple-600",
  Senior: "bg-amber-50 text-amber-600",
};

export default function CareersPage() {
  return (
    <div className="pt-16">
      <div className="gradient-hero py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-0">We're Hiring</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Build the Future of <br className="hidden sm:block" />
            Bangladesh Ecommerce
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            C Commerce is one of Bangladesh's fastest-growing SaaS companies. We're looking for passionate people who want to help 100,000 merchants thrive online.
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm text-slate-600">
            <span className="bg-white border border-slate-200 rounded-full px-4 py-1.5">{openings.length} open positions</span>
            <span className="bg-white border border-slate-200 rounded-full px-4 py-1.5">Dhaka + Remote</span>
            <span className="bg-white border border-slate-200 rounded-full px-4 py-1.5">Full-time & Part-time</span>
          </div>
        </div>
      </div>

      {/* Perks */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Why Work at C Commerce?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {perks.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5">
                <div className={`w-10 h-10 rounded-xl ${p.color} flex items-center justify-center mb-3`}>
                  <p.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{p.title}</h3>
                <p className="text-sm text-slate-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Open Positions</h2>
        <div className="space-y-4">
          {openings.map((job, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md transition-shadow group cursor-pointer">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={`border-0 text-xs ${teamColors[job.team] || "bg-slate-100 text-slate-600"}`}>{job.team}</Badge>
                    <Badge className={`border-0 text-xs ${levelColors[job.level] || "bg-slate-100 text-slate-600"}`}>{job.level}</Badge>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-slate-500 text-sm">
          Don't see a role that fits?{" "}
          <Link href="/contact" className="text-blue-600 hover:underline font-medium">Send us your CV anyway</Link> — we hire for great people first.
        </div>
      </section>
    </div>
  );
}
