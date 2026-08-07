import { Badge } from "@/components/ui/badge";
import { Cpu, Croissant, ShoppingBasket, Shirt, Sparkles, Store } from "lucide-react";

const categories = [
  ["Fashion", Shirt],
  ["Electronics", Cpu],
  ["Grocery", ShoppingBasket],
  ["Cosmetics", Sparkles],
  ["Restaurants", Croissant],
  ["Local Retail", Store],
] as const;

export default function BusinessCategories() {
  return (
    <section aria-labelledby="categories-title" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <Badge className="mb-4 border-0 bg-blue-100 text-blue-700">Business Types</Badge>
        <h2 id="categories-title" className="text-3xl font-bold text-slate-900 sm:text-4xl">Built for Different Types of Businesses</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map(([name, Icon]) => (
            <div key={name} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <Icon className="mx-auto h-7 w-7 text-blue-600" aria-hidden="true" />
              <h3 className="mt-3 font-semibold text-slate-900">{name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
