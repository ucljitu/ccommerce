import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPlanPrice, pricingPlans } from "@/lib/pricing";

export default function PricingCards() {
  return (
    <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
      {pricingPlans.map((plan) => (
        <article
          key={plan.id}
          className={`relative flex h-full flex-col rounded-2xl border-2 bg-white p-7 ${plan.popular ? "border-blue-500 shadow-xl shadow-blue-500/10 md:order-first lg:order-none" : "border-slate-200 shadow-sm"}`}
        >
          {plan.popular && (
            <span className="absolute right-5 top-5 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
              Most Popular
            </span>
          )}
          <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{plan.subtitle}</p>
          <p className="mt-6 flex items-end gap-1 text-slate-900">
            <span className="pb-1 text-xl font-bold" aria-hidden="true">৳</span>
            <span className="text-4xl font-bold">{formatPlanPrice(plan.monthlyPrice)}</span>
            <span className="pb-1 text-sm text-slate-500">/{plan.billingPeriod}</span>
            <span className="sr-only">{plan.monthlyPrice} Bangladeshi Taka per month</span>
          </p>
          <ul className="my-7 flex-1 space-y-3">
            {plan.cardFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-[15px] text-slate-600">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
          <Button asChild variant={plan.popular ? "gradient" : "outline"} size="lg">
            <Link href={`/trial?plan=${plan.id}`}>Start Free <span className="sr-only">with the {plan.name} plan</span></Link>
          </Button>
          <p className="mt-3 text-center text-xs text-slate-500">14-day trial · Payment information is not requested</p>
        </article>
      ))}
    </div>
  );
}

