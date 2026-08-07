import { Store, Award, Users, Heart } from "lucide-react";

export default async function AboutPage({ params }: { params: Promise<{ storeSlug: string }> }) {
  await params;
  return (
    <div className="pb-24 md:pb-0">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Store className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-3">About Our Store</h1>
          <p className="text-blue-100 text-lg">
            We are committed to bringing you the best products at the best prices — delivered right to your door.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Story */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Story</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Founded in 2022, we started with a simple mission: make quality products accessible to everyone in Bangladesh.
            What began as a small operation has grown into a trusted online destination for thousands of happy customers
            across the country.
          </p>
          <p className="text-slate-600 leading-relaxed">
            We carefully select each product we carry, working directly with manufacturers and trusted suppliers to ensure
            quality and authenticity. Our team is passionate about customer satisfaction and works hard to make your
            shopping experience smooth, safe, and enjoyable.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "10,000+", label: "Happy Customers", icon: "😊" },
            { value: "500+", label: "Products", icon: "📦" },
            { value: "64", label: "Districts Served", icon: "🗺️" },
            { value: "4.8★", label: "Average Rating", icon: "⭐" },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 text-center">
              <span className="text-3xl">{stat.icon}</span>
              <p className="text-xl font-bold text-slate-900 mt-2">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Our Values</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: Award, title: "Quality First", desc: "Every product is verified for quality and authenticity before listing.", color: "text-blue-600 bg-blue-50" },
              { icon: Users, title: "Customer Focus", desc: "Your satisfaction is our top priority. We're here whenever you need help.", color: "text-emerald-600 bg-emerald-50" },
              { icon: Heart, title: "Community", desc: "We support local businesses and contribute to our community.", color: "text-rose-600 bg-rose-50" },
            ].map((v, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${v.color}`}>
                  <v.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment & Delivery */}
        <div className="bg-slate-50 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Payment & Delivery</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Accepted Payments</p>
              <div className="flex flex-wrap gap-2">
                {["💗 bKash", "🟠 Nagad", "🚀 Rocket", "💳 Card", "💵 COD"].map(p => (
                  <span key={p} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm">{p}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Delivery Coverage</p>
              <p className="text-sm text-slate-500">We deliver to all 64 districts across Bangladesh. Dhaka delivery within 1–2 days, nationwide in 3–7 days.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
