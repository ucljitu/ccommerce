import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "How to Start an Online Store in Bangladesh in 2026",
    excerpt: "A step-by-step guide to launching your first ecommerce store — from product selection to your first sale using C Commerce.",
    author: "C Commerce Team",
    date: "Jun 20, 2026",
    readTime: "7 min read",
    tag: "Getting Started",
    tagColor: "bg-blue-100 text-blue-700",
    emoji: "🚀",
  },
  {
    id: 2,
    title: "bKash, Nagad, or COD — Which Payment Method Gets More Sales?",
    excerpt: "We analyzed 10,000+ orders across 200 stores to find out which payment methods Bangladeshi customers prefer, and why.",
    author: "Sadia Islam",
    date: "Jun 15, 2026",
    readTime: "5 min read",
    tag: "Payments",
    tagColor: "bg-emerald-100 text-emerald-700",
    emoji: "💳",
  },
  {
    id: 3,
    title: "10 Ways to Reduce Cart Abandonment in Your Bangladeshi Store",
    excerpt: "Cart abandonment is killing your sales. Here are 10 proven tactics used by top C Commerce merchants to recover lost revenue.",
    author: "Rahim Uddin",
    date: "Jun 10, 2026",
    readTime: "6 min read",
    tag: "Growth",
    tagColor: "bg-purple-100 text-purple-700",
    emoji: "🛒",
  },
  {
    id: 4,
    title: "District-Wise Delivery Strategy: How to Expand Beyond Dhaka",
    excerpt: "Reaching customers outside Dhaka is easier than you think. Here's a practical delivery expansion strategy for Bangladeshi merchants.",
    author: "C Commerce Team",
    date: "Jun 5, 2026",
    readTime: "8 min read",
    tag: "Delivery",
    tagColor: "bg-amber-100 text-amber-700",
    emoji: "🗺️",
  },
  {
    id: 5,
    title: "Facebook Ads for Bangladeshi Ecommerce: A Complete 2026 Guide",
    excerpt: "Facebook remains the #1 traffic source for BD ecommerce. Learn how to set up Pixel, run campaigns, and retarget effectively.",
    author: "Nasreen Begum",
    date: "May 28, 2026",
    readTime: "12 min read",
    tag: "Marketing",
    tagColor: "bg-rose-100 text-rose-700",
    emoji: "📣",
  },
  {
    id: 6,
    title: "How Sylhet Handicrafts Grew from ৳0 to ৳5 Lakh/Month",
    excerpt: "A behind-the-scenes look at how a small artisan shop in Sylhet scaled their online store using C Commerce in just 6 months.",
    author: "C Commerce Team",
    date: "May 20, 2026",
    readTime: "9 min read",
    tag: "Success Story",
    tagColor: "bg-indigo-100 text-indigo-700",
    emoji: "🏆",
  },
];

const tags = ["All", "Getting Started", "Payments", "Growth", "Delivery", "Marketing", "Success Story"];

export default function BlogPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">C Commerce Blog</h1>
          <p className="text-slate-300 text-lg">Tips, guides, and success stories to help Bangladeshi merchants sell more online.</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tags.map((tag, i) => (
            <button
              key={tag}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${i === 0 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white mb-10 flex flex-col sm:flex-row gap-6 items-start">
          <span className="text-6xl shrink-0">{posts[0].emoji}</span>
          <div>
            <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-medium">{posts[0].tag}</span>
            <h2 className="text-2xl font-bold mt-3 mb-2">{posts[0].title}</h2>
            <p className="text-blue-100 text-sm leading-relaxed mb-4">{posts[0].excerpt}</p>
            <div className="flex items-center gap-4 text-xs text-blue-200">
              <span className="flex items-center gap-1"><User className="w-3 h-3" />{posts[0].author}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{posts[0].readTime}</span>
              <span>{posts[0].date}</span>
            </div>
            <Button className="mt-4 bg-white text-blue-700 hover:bg-blue-50 gap-2 text-sm">
              Read Article <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Post Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(1).map((post) => (
            <div key={post.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col hover:shadow-md transition-shadow">
              <span className="text-4xl mb-4">{post.emoji}</span>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full self-start mb-3 ${post.tagColor}`}>{post.tag}</span>
              <h3 className="font-bold text-slate-900 leading-snug mb-2">{post.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.author}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
              </div>
              <Button variant="outline" size="sm" className="gap-1.5 w-full">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-10">
          <Button variant="outline" size="lg">Load More Articles</Button>
        </div>
      </div>
    </div>
  );
}
