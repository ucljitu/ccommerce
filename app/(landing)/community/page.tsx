import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, MessageCircle, Lightbulb, Trophy, ArrowRight } from "lucide-react";

export const metadata = { title: "Community — C Commerce" };

const channels = [
  { icon: "💬", platform: "Facebook Group", members: "12,000+", desc: "Our main community hub. Ask questions, share tips, and connect with other merchants.", action: "Join Group", color: "border-blue-200 bg-blue-50" },
  { icon: "📱", platform: "WhatsApp Community", members: "3,500+", desc: "Quick updates, flash tips, and real-time merchant support — on WhatsApp.", action: "Join Community", color: "border-emerald-200 bg-emerald-50" },
  { icon: "🎥", platform: "YouTube Channel", members: "8,000+", desc: "Step-by-step tutorials, feature walkthroughs, and merchant success stories.", action: "Subscribe", color: "border-rose-200 bg-rose-50" },
];

const discussions = [
  { title: "How I went from 0 to 200 orders/month in 3 months", author: "Sakib R.", time: "2 hours ago", replies: 24, category: "Success Story" },
  { title: "Best practices for product photography on a budget", author: "Nusrat J.", time: "5 hours ago", replies: 18, category: "Tips" },
  { title: "Which courier is best for Chittagong deliveries?", author: "Imran H.", time: "Yesterday", replies: 31, category: "Discussion" },
  { title: "How to handle COD fraud attempts?", author: "Fatima K.", time: "Yesterday", replies: 12, category: "Help" },
  { title: "Feature request: Bulk order status update", author: "Rony M.", time: "2 days ago", replies: 8, category: "Feature Request" },
];

const categoryColors: Record<string, string> = {
  "Success Story": "bg-emerald-100 text-emerald-700",
  "Tips": "bg-blue-100 text-blue-700",
  "Discussion": "bg-purple-100 text-purple-700",
  "Help": "bg-amber-100 text-amber-700",
  "Feature Request": "bg-rose-100 text-rose-700",
};

const perks = [
  { icon: Lightbulb, color: "bg-amber-50 text-amber-600", title: "Share & Learn", desc: "Get advice from thousands of Bangladeshi merchants who've been through it all." },
  { icon: Trophy, color: "bg-purple-50 text-purple-600", title: "Merchant Spotlight", desc: "Get featured in our monthly success stories — reach new customers organically." },
  { icon: MessageCircle, color: "bg-blue-50 text-blue-600", title: "Direct Feedback", desc: "Your ideas shape the product. Community votes drive our roadmap priorities." },
  { icon: Users, color: "bg-emerald-50 text-emerald-600", title: "Network & Grow", desc: "Find suppliers, collaborators, and potential wholesale partners in the community." },
];

export default function CommunityPage() {
  return (
    <div className="pt-16">
      <div className="gradient-hero py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-0">Community</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Bangladesh's Largest <br className="hidden sm:block" />
            Merchant Community
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Join 20,000+ C Commerce merchants. Share tips, get help, celebrate wins, and shape the future of the platform together.
          </p>
          <Link href="https://facebook.com" target="_blank">
            <Button className="gradient-primary text-white border-0 h-12 px-8 text-base">
              Join the Community
            </Button>
          </Link>
        </div>
      </div>

      {/* Channels */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Where to Find Us</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {channels.map((ch, i) => (
            <div key={i} className={`rounded-2xl border p-6 ${ch.color}`}>
              <div className="text-3xl mb-3">{ch.icon}</div>
              <h3 className="font-bold text-slate-900 mb-1">{ch.platform}</h3>
              <p className="text-xs font-semibold text-slate-500 mb-3">{ch.members} members</p>
              <p className="text-sm text-slate-600 mb-4">{ch.desc}</p>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                {ch.action} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Join */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Why Join?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5">
                <div className={`w-10 h-10 rounded-xl ${p.color} flex items-center justify-center mb-3`}>
                  <p.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1 text-sm">{p.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Discussions */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Recent Discussions</h2>
        <div className="space-y-3">
          {discussions.map((d, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-sm transition-shadow cursor-pointer group">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors mb-2">{d.title}</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge className={`border-0 text-xs ${categoryColors[d.category] || "bg-slate-100 text-slate-600"}`}>{d.category}</Badge>
                    <span className="text-xs text-slate-400">by {d.author}</span>
                    <span className="text-xs text-slate-400">{d.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400 flex-shrink-0">
                  <MessageCircle className="w-3.5 h-3.5" />
                  {d.replies}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 mx-auto">
            View all discussions <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
