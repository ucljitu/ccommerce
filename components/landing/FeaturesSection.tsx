import Link from "next/link";
import { BarChart3, CreditCard, PackageCheck, Store, Truck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const features = [
  { title: "Build Your Store", description: "Create a professional online store without coding.", icon: Store },
  { title: "Products and Orders", description: "Manage products, stock, prices and customer orders.", icon: PackageCheck },
  { title: "Payments", description: "Accept online payments, bank transfer and Cash on Delivery.", icon: CreditCard },
  { title: "Delivery Charges", description: "Set delivery charges by district, area or order amount.", icon: Truck },
  { title: "Customers", description: "View customer information, order history and important notes.", icon: Users },
  { title: "Sales Reports", description: "Track orders, payments, sales and business performance.", icon: BarChart3 },
] as const;

export default function FeaturesSection() {
  return (
    <section id="features" aria-labelledby="features-title" className="bg-white py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 max-w-3xl text-center">
          <Badge className="mb-4 border-0 bg-blue-100 text-blue-700">Everything You Need</Badge>
          <h2 id="features-title" className="text-3xl font-bold text-slate-900 sm:text-4xl">Manage Your Online Business in One Place</h2>
          <p className="mt-4 text-lg text-slate-600">Simple tools to create your store, receive orders and grow your business.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><feature.icon className="h-6 w-6" aria-hidden="true" /></div>
              <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-3 min-h-12 text-[15px] leading-relaxed text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 text-center"><Button asChild size="lg" variant="outline"><Link href="/features">View All Features</Link></Button></div>
      </div>
    </section>
  );
}

