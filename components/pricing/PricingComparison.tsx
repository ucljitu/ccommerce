"use client";

import { useState } from "react";
import { Check, Clock3, Minus } from "lucide-react";
import {
  comparisonGroups,
  pricingPlans,
  type FeatureAvailability,
  type PlanId,
} from "@/lib/pricing";

function Availability({ value }: { value: string | FeatureAvailability }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700">
        <Check className="h-4 w-4" aria-hidden="true" />
        <span>Included</span>
      </span>
    );
  }
  if (value === "coming-soon") {
    return (
      <span className="inline-flex items-center gap-1.5 font-medium text-amber-700">
        <Clock3 className="h-4 w-4" aria-hidden="true" />
        <span>Coming Soon</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center gap-1.5 text-slate-500">
        <Minus className="h-4 w-4" aria-hidden="true" />
        <span>Not Included</span>
      </span>
    );
  }
  return <span className="font-medium text-slate-700">{value}</span>;
}

export default function PricingComparison() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("growth");
  const activePlan = pricingPlans.find((plan) => plan.id === selectedPlan) ?? pricingPlans[1];

  return (
    <section aria-labelledby="comparison-title" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="comparison-title" className="text-3xl font-bold text-slate-900 sm:text-4xl">Compare Plans</h2>
          <p className="mt-4 text-lg text-slate-600">See which features are included in each plan.</p>
        </div>

        <div className="mt-10 md:hidden">
          <div className="grid grid-cols-3 gap-2" role="tablist" aria-label="Choose a plan to compare">
            {pricingPlans.map((plan) => (
              <button
                key={plan.id}
                type="button"
                role="tab"
                aria-selected={selectedPlan === plan.id}
                aria-controls="mobile-plan-features"
                onClick={() => setSelectedPlan(plan.id)}
                className={`min-h-11 rounded-lg px-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${selectedPlan === plan.id ? "bg-blue-600 text-white" : "border border-slate-200 bg-white text-slate-700"}`}
              >
                {plan.name}
              </button>
            ))}
          </div>
          <div id="mobile-plan-features" role="tabpanel" className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
            {comparisonGroups.map((group) => (
              <div key={group.label}>
                <h3 className="bg-slate-100 px-4 py-3 text-sm font-bold text-slate-900">{group.label}</h3>
                <dl>
                  {group.rows.map((row) => (
                    <div key={row.key} className="flex items-start justify-between gap-4 border-t border-slate-100 px-4 py-3 first:border-0">
                      <dt className="text-sm text-slate-600">{row.label}</dt>
                      <dd className="max-w-[48%] text-right text-sm"><Availability value={activePlan.comparison[row.key]} /></dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th scope="col" className="w-[28%] px-5 py-4 text-left text-sm font-semibold">Feature</th>
                {pricingPlans.map((plan) => (
                  <th key={plan.id} scope="col" className="px-4 py-4 text-center text-sm font-semibold">
                    {plan.name}
                    {plan.popular && <span className="ml-2 rounded-full bg-blue-500 px-2 py-0.5 text-[10px]">Most Popular</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonGroups.map((group) => (
                <FragmentRows key={group.label} group={group} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function FragmentRows({ group }: { group: (typeof comparisonGroups)[number] }) {
  return (
    <>
      <tr>
        <th colSpan={4} scope="colgroup" className="bg-blue-50 px-5 py-3 text-left text-sm font-bold text-blue-900">{group.label}</th>
      </tr>
      {group.rows.map((row, index) => (
        <tr key={row.key} className={index % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
          <th scope="row" className="border-t border-slate-100 px-5 py-3.5 text-left text-sm font-medium text-slate-700">{row.label}</th>
          {pricingPlans.map((plan) => (
            <td key={plan.id} className="border-t border-slate-100 px-4 py-3.5 text-center text-sm">
              <Availability value={plan.comparison[row.key]} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

