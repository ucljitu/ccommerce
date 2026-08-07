import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, Shirt, Smartphone, Leaf, UtensilsCrossed, Pill, ArrowLeft } from "lucide-react";

const CATEGORIES: Record<string, {
  title: string; subtitle: string; icon: React.ElementType;
  color: string; bg: string; badge: string;
  desc: string; features: { title: string; desc: string }[];
  stats: { label: string; value: string }[];
  useCases: string[];
}> = {
  fashion: {
    title: "Fashion Store",
    subtitle: "Sell clothing, accessories & shoes online",
    icon: Shirt,
    color: "text-pink-600",
    bg: "bg-pink-50",
    badge: "bg-pink-100 text-pink-700",
    desc: "Everything you need to run a successful fashion ecommerce store in Bangladesh. Manage sizes, colors, seasonal sales, and reach customers nationwide.",
    features: [
      { title: "Color & Size Variants", desc: "Let customers pick color and size on the product page. Inventory tracked per variant." },
      { title: "Lookbook Gallery", desc: "Upload styled photoshoots and tag products in images for direct purchase." },
      { title: "Seasonal Flash Sales", desc: "Eid, Puja, New Year — schedule flash sales with countdown timers automatically." },
      { title: "Influencer Coupons", desc: "Create custom discount codes for influencers. Track conversions per code." },
      { title: "Size Guide", desc: "Add size charts per product so customers buy the right size the first time." },
      { title: "Instagram-Style Layout", desc: "Grid-based storefront that showcases fashion products beautifully on mobile." },
    ],
    stats: [{ label: "Active Fashion Stores", value: "180+" }, { label: "Avg Monthly Orders", value: "1,200+" }, { label: "Setup Time", value: "30 min" }],
    useCases: ["Women's clothing", "Men's fashion", "Shoes & footwear", "Hijab & modest fashion", "Kids' apparel", "Bags & accessories"],
  },
  electronics: {
    title: "Electronics Store",
    subtitle: "Sell gadgets, phones & tech products online",
    icon: Smartphone,
    color: "text-blue-600",
    bg: "bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
    desc: "Built for electronics retailers in Bangladesh. Showcase specs, manage warranty, handle bulk B2B orders, and win customer trust with authenticity badges.",
    features: [
      { title: "Product Spec Tables", desc: "Display RAM, storage, battery, screen size — in a clean comparison-friendly format." },
      { title: "Warranty Tracking", desc: "Issue warranty cards digitally. Customers can check warranty status by order ID." },
      { title: "Bundle Offers", desc: "Sell phone + case + charger bundles with combined pricing and discounts." },
      { title: "Brand Filtering", desc: "Let shoppers filter by brand (Samsung, Apple, Xiaomi, etc.) with one click." },
      { title: "Authenticity Badge", desc: "Add official dealer or authorized retailer badges to build trust." },
      { title: "COD + bKash Support", desc: "COD and all major mobile banking supported. Reduce fake orders with upfront payment." },
    ],
    stats: [{ label: "Active Electronics Stores", value: "95+" }, { label: "Avg Monthly Revenue", value: "BDT 80K+" }, { label: "Setup Time", value: "45 min" }],
    useCases: ["Phone accessories", "Laptop & computers", "Smart gadgets", "Chargers & cables", "Smart home devices", "Gaming peripherals"],
  },
  grocery: {
    title: "Grocery Store",
    subtitle: "Sell fresh produce & packaged food online",
    icon: Leaf,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-700",
    desc: "Run a full online grocery store or dark store from C Commerce. Handle daily orders, perishable stock, slot-based delivery, and neighbourhood delivery routes.",
    features: [
      { title: "Freshness Badges", desc: "Mark products as Fresh Today, Organic, or Local Farm to boost buyer confidence." },
      { title: "Bulk Pricing Tiers", desc: "Set price breaks — buy 5kg, get 10% off. Great for wholesale grocery buyers." },
      { title: "Delivery Time Slots", desc: "Morning/evening delivery slots. Customers pick their preferred window at checkout." },
      { title: "Recurring Orders", desc: "Let customers set weekly or monthly recurring grocery orders automatically." },
      { title: "Low Stock Alerts", desc: "Auto-notify customers when a favourite item is back in stock." },
      { title: "Perishable Handling", desc: "Set expiry-based availability so expired or near-expiry items are hidden automatically." },
    ],
    stats: [{ label: "Active Grocery Stores", value: "72+" }, { label: "Daily Orders Avg", value: "50–200" }, { label: "Setup Time", value: "1 hour" }],
    useCases: ["Online grocery delivery", "Organic produce stores", "Dairy & bakery shops", "Dry food & spices", "Fish & meat delivery", "Dark store operations"],
  },
  restaurant: {
    title: "Restaurant & Food",
    subtitle: "Take online orders for your restaurant or cloud kitchen",
    icon: UtensilsCrossed,
    color: "text-amber-600",
    bg: "bg-amber-50",
    badge: "bg-amber-100 text-amber-700",
    desc: "Accept food orders online from your own website — no commissions to Foodpanda or Shohoz. Keep 100% of revenue and build your own customer base.",
    features: [
      { title: "Digital Menu", desc: "Upload your full menu with photos, descriptions, and prices. Easy to update anytime." },
      { title: "Table & Delivery Toggle", desc: "Support both dine-in table orders and home delivery from one dashboard." },
      { title: "Food Addons & Notes", desc: "Let customers add extras (extra cheese, no spice, etc.) on each item." },
      { title: "WhatsApp Order Confirm", desc: "Automatically send order confirmation and ETA to customer via WhatsApp." },
      { title: "Delivery Zone Radius", desc: "Set your delivery radius. Block orders from outside your service area." },
      { title: "Rush Hour Pricing", desc: "Increase delivery fees automatically during peak hours (lunch, dinner time)." },
    ],
    stats: [{ label: "Active Food Shops", value: "60+" }, { label: "Commission Saved", value: "0%" }, { label: "Setup Time", value: "1 hour" }],
    useCases: ["Restaurants", "Cloud kitchens", "Biriyani shops", "Cake & bakery", "Tiffin services", "Corporate catering"],
  },
  pharmacy: {
    title: "Pharmacy & Health",
    subtitle: "Sell medicines, health & wellness products online",
    icon: Pill,
    color: "text-red-600",
    bg: "bg-red-50",
    badge: "bg-red-100 text-red-700",
    desc: "Run a compliant online pharmacy in Bangladesh. Upload prescription requirements, manage medicine stock carefully, and deliver to customers doorstep safely.",
    features: [
      { title: "Prescription Upload", desc: "Require prescription photos for controlled medicines before order confirmation." },
      { title: "Generic Name Search", desc: "Customers can search by generic name (e.g. paracetamol) and find all matching brands." },
      { title: "Expiry Date Tracking", desc: "Set expiry dates per batch. Products auto-hide as they approach expiry." },
      { title: "Medicine Substitution", desc: "Suggest generic alternatives when a brand is out of stock." },
      { title: "Health Category Pages", desc: "Organize by category: Fever, Diabetes, Vitamins, Skincare, Baby Health, etc." },
      { title: "Repeat Order Reminder", desc: "Remind customers to reorder chronic medicines every 30 days automatically." },
    ],
    stats: [{ label: "Active Pharmacies", value: "40+" }, { label: "Avg Repeat Orders", value: "65%" }, { label: "Setup Time", value: "45 min" }],
    useCases: ["Retail pharmacies", "Online medicine delivery", "Health & supplements", "Medical equipment", "Baby health products", "Herbal & Ayurvedic"],
  },
};

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map(category => ({ category }));
}

export default async function SolutionCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const data = CATEGORIES[category];
  if (!data) notFound();

  const Icon = data.icon;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className={`${data.bg} pt-16 pb-20`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/solutions" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Solutions
          </Link>
          <div className="flex items-start gap-5 mb-6">
            <div className={`p-4 rounded-2xl ${data.bg} border border-white shadow-sm`}>
              <Icon className={`w-10 h-10 ${data.color}`} />
            </div>
            <div>
              <Badge className={`mb-3 border-0 ${data.badge}`}>{data.title}</Badge>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-3">{data.title}</h1>
              <p className="text-xl text-slate-600">{data.subtitle}</p>
            </div>
          </div>
          <p className="text-lg text-slate-600 max-w-3xl mb-8">{data.desc}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/trial">
              <Button className="gradient-primary text-white border-0 gap-2 h-12 px-6 text-base">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" className="h-12 px-6 text-base">View Live Demo</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-12">
            {data.stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className={`text-3xl font-bold ${data.color}`}>{s.value}</p>
                <p className="text-sm text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center">Features Built for {data.title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.features.map((f, i) => (
              <div key={i} className="p-5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all">
                <CheckCircle className={`w-5 h-5 ${data.color} mb-3`} />
                <h3 className="font-semibold text-slate-900 mb-1.5">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className={`py-16 ${data.bg}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Popular Use Cases</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {data.useCases.map((u, i) => (
              <span key={i} className="px-4 py-2 bg-white rounded-full border border-slate-200 text-sm font-medium text-slate-700 shadow-sm">
                {u}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to launch your {data.title.toLowerCase()}?</h2>
          <p className="text-slate-500 mb-8">Start free for 14 days. No credit card required. Your store live in under an hour.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/trial">
              <Button className="gradient-primary text-white border-0 h-12 px-8 text-base gap-2">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" className="h-12 px-8 text-base">View Pricing</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
