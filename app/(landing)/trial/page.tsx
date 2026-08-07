import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Shield, Zap } from "lucide-react";
import BrandLogo from "@/components/brand/BrandLogo";
import { getPricingPlan } from "@/lib/pricing";

export const metadata = { title: "Start Free Trial — C Commerce" };

const categories = ["Fashion & Clothing", "Electronics & Gadgets", "Grocery & Food", "Cosmetics & Beauty", "Pharmacy & Health", "Baby Products", "Furniture & Home", "Restaurant & Food Delivery", "Printing & Stationery", "Other"];

export default async function TrialPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const selectedPlan = getPricingPlan((await searchParams).plan) ?? getPricingPlan("growth");

  return (
    <div className="min-h-screen pt-16 gradient-hero flex items-center">
      <div className="max-w-6xl mx-auto px-4 py-12 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <BrandLogo priority className="mb-6 h-14 w-auto" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Start Your Free 14-Day Trial
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              Payment information is not requested in this signup form.
            </p>
            <ul className="space-y-3">
              {[
                "14-day trial",
                "Available payment settings",
                "District-wise delivery charges",
                "WhatsApp contact settings",
                "Bangla or English storefront content",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700">
                  <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-emerald-600" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Create Your Store</h2>
            {selectedPlan && (
              <div className="mb-5 flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
                <div>
                  <p className="text-xs font-medium text-blue-700">Selected plan</p>
                  <p className="font-semibold text-slate-900">{selectedPlan.name}</p>
                </div>
                <Link href="/pricing" className="text-sm font-medium text-blue-700 underline-offset-4 hover:underline">Change</Link>
              </div>
            )}
            <div className="space-y-4">
              <input type="hidden" name="plan" value={selectedPlan?.id ?? "growth"} />
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>First Name</Label>
                  <Input placeholder="John" />
                </div>
                <div className="space-y-1.5">
                  <Label>Last Name</Label>
                  <Input placeholder="Islam" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Store Name</Label>
                <Input placeholder="My Awesome Store" />
              </div>
              <div className="space-y-1.5">
                <Label>Business Category</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map(c => <SelectItem key={c} value={c.toLowerCase().replace(/ /g, "-")}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Mobile Number</Label>
                <Input placeholder="+880 1XXXXXXXXX" />
              </div>
              <div className="space-y-1.5">
                <Label>Email Address</Label>
                <Input type="email" placeholder="you@example.com" />
              </div>
              <div className="space-y-1.5">
                <Label>Password</Label>
                <Input type="password" placeholder="Create a strong password" />
              </div>

              <Button size="lg" className="w-full gradient-primary text-white border-0">
                Create My Free Store →
              </Button>

              <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Secure</span>
                <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Simple Setup</span>
                <span>No Payment Field</span>
              </div>
            </div>

            <p className="text-center text-xs text-slate-500 mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
