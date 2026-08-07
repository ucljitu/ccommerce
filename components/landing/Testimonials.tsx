import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rafiqul Islam",
    business: "TechZone BD",
    location: "Dhaka",
    avatar: "RI",
    rating: 5,
    text: "C Commerce has completely transformed my gadget business. Setting up bKash payments was incredibly easy, and my sales increased 3x within 2 months. The district delivery feature saved me so much time!",
    category: "Electronics",
  },
  {
    name: "Fatema Begum",
    business: "Style Avenue",
    location: "Chittagong",
    avatar: "FB",
    rating: 5,
    text: "My fashion store now sells all across Bangladesh. Setting up Nagad payment with C Commerce took only 5 minutes. Absolutely amazing!",
    category: "Fashion",
  },
  {
    name: "Karim Hossain",
    business: "Fresh Grocery",
    location: "Sylhet",
    avatar: "KH",
    rating: 5,
    text: "WhatsApp order button is a game changer! 60% of my orders now come through WhatsApp directly. The COD system works perfectly for my grocery delivery business.",
    category: "Grocery",
  },
  {
    name: "Nasrin Akhter",
    business: "Beauty Corner",
    location: "Rajshahi",
    avatar: "NA",
    rating: 5,
    text: "The Facebook Pixel integration helped me run targeted ads that actually convert. My cosmetics store ROI on ads went from 2x to 7x since switching to C Commerce.",
    category: "Cosmetics",
  },
  {
    name: "Jahangir Alom",
    business: "Furniture House",
    location: "Khulna",
    avatar: "JA",
    rating: 5,
    text: "Managing orders from all over Bangladesh was a nightmare before C Commerce. Now with the district delivery system and order tracking, my customers are always happy.",
    category: "Furniture",
  },
  {
    name: "Sumaiya Khatun",
    business: "Baby Bliss",
    location: "Comilla",
    avatar: "SK",
    rating: 5,
    text: "Starting my baby products store was so easy — no technical knowledge needed! The support team is always there to help. I had my store live in 30 minutes.",
    category: "Baby Products",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-amber-100 text-amber-700 border-0">Customer Stories</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Loved by Bangladeshi Merchants
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From fashion to furniture, grocery to gadgets — merchants across Bangladesh trust C Commerce to run their business.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-shadow duration-300 flex flex-col">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-900 truncate">{t.name}</h4>
                  <p className="text-sm text-slate-500 truncate">{t.business} • {t.location}</p>
                  <div className="flex items-center gap-0.5 mt-1">
                    {Array(t.rating).fill(0).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs shrink-0">{t.category}</Badge>
              </div>
              <div className="relative flex-1">
                <Quote className="w-6 h-6 text-blue-100 absolute -top-1 -left-1" />
                <p className="text-sm text-slate-600 leading-relaxed pl-4">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
