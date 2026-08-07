import { Badge } from "@/components/ui/badge";
import { Play, Clock, BookOpen } from "lucide-react";

export const metadata = { title: "Video Tutorials — C Commerce" };

const playlists = [
  {
    category: "Getting Started",
    color: "bg-blue-50 border-blue-200",
    badge: "bg-blue-100 text-blue-700",
    videos: [
      { title: "Complete Setup: Store Ready in 30 Minutes", duration: "28:14", level: "Beginner", thumbnail: "🛒" },
      { title: "Adding Your First 10 Products", duration: "15:42", level: "Beginner", thumbnail: "📦" },
      { title: "Connecting bKash & Nagad Payments", duration: "8:33", level: "Beginner", thumbnail: "💳" },
      { title: "Setting Up Delivery Charges by District", duration: "11:20", level: "Beginner", thumbnail: "🚚" },
    ],
  },
  {
    category: "Products & Inventory",
    color: "bg-amber-50 border-amber-200",
    badge: "bg-amber-100 text-amber-700",
    videos: [
      { title: "Adding Size & Color Variants to Products", duration: "12:05", level: "Intermediate", thumbnail: "🎨" },
      { title: "Managing Stock Levels & Low-Stock Alerts", duration: "9:18", level: "Intermediate", thumbnail: "📊" },
      { title: "Bulk Upload Products via CSV", duration: "14:55", level: "Intermediate", thumbnail: "📋" },
      { title: "Product SEO: Rank on Google", duration: "18:30", level: "Advanced", thumbnail: "🔍" },
    ],
  },
  {
    category: "Marketing & Growth",
    color: "bg-emerald-50 border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
    videos: [
      { title: "Creating Discount Coupons That Convert", duration: "10:22", level: "Intermediate", thumbnail: "🏷️" },
      { title: "Running Flash Sales with Countdown Timer", duration: "7:44", level: "Intermediate", thumbnail: "⚡" },
      { title: "WhatsApp Marketing for Your Store", duration: "16:10", level: "Intermediate", thumbnail: "📱" },
      { title: "Facebook Ads Integration with C Commerce", duration: "22:40", level: "Advanced", thumbnail: "📣" },
    ],
  },
  {
    category: "Advanced Features",
    color: "bg-purple-50 border-purple-200",
    badge: "bg-purple-100 text-purple-700",
    videos: [
      { title: "Connecting Your Own Custom Domain", duration: "9:55", level: "Advanced", thumbnail: "🌐" },
      { title: "Using the Staff Management System", duration: "13:20", level: "Advanced", thumbnail: "👥" },
      { title: "Reading Your Analytics Dashboard", duration: "17:05", level: "Advanced", thumbnail: "📈" },
      { title: "Setting Up SSLCommerz for Card Payments", duration: "11:48", level: "Advanced", thumbnail: "🔐" },
    ],
  },
];

const levelColors: Record<string, string> = {
  Beginner: "bg-emerald-100 text-emerald-700",
  Intermediate: "bg-blue-100 text-blue-700",
  Advanced: "bg-purple-100 text-purple-700",
};

export default function TutorialsPage() {
  return (
    <div className="pt-16">
      <div className="gradient-hero py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-0">Video Tutorials</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Learn at Your Own Pace</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Step-by-step video guides covering every feature of C Commerce — from setting up your store to advanced marketing strategies.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><Play className="w-4 h-4 text-blue-500" /> 60+ videos</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-emerald-500" /> 12+ hours of content</span>
            <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-purple-500" /> Available in Bangla & English</span>
          </div>
        </div>
      </div>

      <section className="py-16 max-w-6xl mx-auto px-4 space-y-12">
        {playlists.map((pl, i) => (
          <div key={i}>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold text-slate-900">{pl.category}</h2>
              <Badge className={`border-0 text-xs ${pl.badge}`}>{pl.videos.length} videos</Badge>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {pl.videos.map((v, j) => (
                <div key={j} className={`rounded-2xl border ${pl.color} p-4 cursor-pointer hover:shadow-md transition-shadow group`}>
                  <div className="w-full aspect-video bg-slate-900 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
                    <span className="text-4xl">{v.thumbnail}</span>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <Play className="w-5 h-5 text-slate-900 ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">{v.title}</h3>
                  <div className="flex items-center justify-between">
                    <Badge className={`border-0 text-xs ${levelColors[v.level]}`}>{v.level}</Badge>
                    <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{v.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3">Subscribe for New Tutorials</h2>
          <p className="text-slate-400 mb-6">New videos every week. Subscribe to our YouTube channel to get notified.</p>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
            <Play className="w-5 h-5" /> Subscribe on YouTube
          </a>
        </div>
      </section>
    </div>
  );
}
