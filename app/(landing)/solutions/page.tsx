import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shirt, Smartphone, Leaf, Baby, Gem, ShoppingBag } from "lucide-react";

const solutions = [
  {
    icon: Shirt,
    title: "Fashion & Clothing",
    desc: "Sell apparel, accessories, shoes, and more. Size/color variants, lookbook galleries, seasonal campaigns, and influencer discount codes built in.",
    features: ["Color & size variants", "Lookbook gallery", "Seasonal flash sales", "Instagram product tags"],
    stores: "180+",
    color: "bg-pink-50 text-pink-600",
  },
  {
    icon: Smartphone,
    title: "Electronics & Gadgets",
    desc: "Perfect for phone accessories, gadgets, and tech products. Technical spec sheets, warranty management, and service center support.",
    features: ["Product spec tables", "Warranty tracking", "Bundle offers", "Brand filtering"],
    stores: "95+",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Leaf,
    title: "Food & Agro",
    desc: "Sell organic produce, packaged food, and agricultural products. Freshness badges, bulk pricing, and district-based delivery scheduling.",
    features: ["Freshness badges", "Bulk pricing tiers", "Delivery scheduling", "Perishable handling"],
    stores: "72+",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Baby,
    title: "Baby & Kids",
    desc: "Build a trusted children's product store. Age-based filtering, safety certifications, and gentle pastel themes designed for parents.",
    features: ["Age-based categories", "Safety badge display", "Pastel storefront theme", "Parent-friendly UX"],
    stores: "48+",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Gem,
    title: "Jewelry & Crafts",
    desc: "Showcase handmade and artisan products beautifully. Custom order requests, material descriptions, and artisan story pages.",
    features: ["Custom order form", "Material details", "Artisan story page", "Craft lookbook"],
    stores: "63+",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: ShoppingBag,
    title: "General Retail",
    desc: "Multi-category retail stores. Manage thousands of SKUs with smart inventory alerts, supplier tracking, and POS-ready reporting.",
    features: ["Multi-category support", "Smart inventory alerts", "Supplier tracking", "Detailed reporting"],
    stores: "140+",
    color: "bg-slate-100 text-slate-600",
  },
];

export default function SolutionsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-primary py-20 px-4 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Solutions for Every Business</h1>
          <p className="text-xl text-blue-100 mb-8">
            C Commerce is built to handle the unique needs of Bangladeshi businesses — from a single-category boutique to a multi-category retail empire.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((s, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${s.color}`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-slate-900 text-lg">{s.title}</h3>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full whitespace-nowrap">{s.stores} stores</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <ul className="space-y-1.5">
                  {s.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Link href="/trial" className="block mt-5">
                  <Button variant="outline" size="sm" className="w-full gap-1.5">
                    Start for free <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 gradient-primary text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-3">Don't See Your Industry?</h2>
          <p className="text-blue-100 mb-6">C Commerce is flexible enough to power any type of product-based business. Talk to us and we'll customize it for you.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-bold gap-2">Talk to Sales</Button>
            </Link>
            <Link href="/trial">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
