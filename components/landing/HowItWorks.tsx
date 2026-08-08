import { Badge } from "@/components/ui/badge";
import { PackagePlus, Rocket, Store } from "lucide-react";

const steps = [
  { title: "Create Your Store", description: "Enter your business information and choose a store design.", icon: Store },
  { title: "Add Your Products", description: "Add product photos, prices, stock and delivery information.", icon: PackagePlus },
  { title: "Start Receiving Orders", description: "Publish your store and manage every order from your dashboard.", icon: Rocket },
] as const;

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="bg-slate-50 py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 max-w-2xl text-center">
          <Badge className="mb-4 border-0 bg-purple-100 text-purple-700">Simple Setup</Badge>
          <h2 id="how-title" className="text-3xl font-bold text-slate-900 sm:text-4xl">Start Selling in 3 Simple Steps</h2>
        </div>
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="relative rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <span className="absolute right-6 top-5 text-5xl font-black text-slate-100" aria-hidden="true">0{index + 1}</span>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <step.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-slate-600">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

