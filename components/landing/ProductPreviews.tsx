import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BarChart3, Check, Package, ShoppingCart, Users } from "lucide-react";

const salesBars = [46, 68, 54, 82, 64, 94, 76];

function DashboardMockup() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-100 p-3 shadow-xl sm:p-5" role="img" aria-label="C Commerce dashboard preview showing orders, products, customers and sales">
      <div className="rounded-xl bg-white p-4">
        <div className="mb-5 flex items-center justify-between">
          <div><p className="text-sm font-semibold text-slate-900">Business Overview</p><p className="text-xs text-slate-500">Today</p></div>
          <span className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700">View reports</span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["Today’s Orders", "24", ShoppingCart],
            ["Sales", "৳18,450", BarChart3],
            ["Customers", "312", Users],
            ["Products", "86", Package],
          ].map(([label, value, Icon]) => (
            <div key={label as string} className="rounded-xl border border-slate-100 p-3">
              <Icon className="mb-2 h-5 w-5 text-blue-600" aria-hidden="true" />
              <p className="text-xs text-slate-500">{label as string}</p>
              <p className="mt-1 font-bold text-slate-900">{value as string}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-[1.5fr_1fr]">
          <div className="rounded-xl border border-slate-100 p-4">
            <p className="mb-3 text-sm font-medium text-slate-700">Sales this week</p>
            <div className="flex h-28 items-end gap-2">
              {salesBars.map((height, index) => <div key={index} className="flex-1 rounded-t bg-gradient-to-t from-blue-600 to-purple-500" style={{ height: `${height}%` }} />)}
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-xl border border-slate-100 p-4"><p className="text-xs text-slate-500">Recent order</p><p className="mt-1 text-sm font-semibold text-slate-900">#CC-1048 · Cash on Delivery</p></div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4"><p className="text-xs text-emerald-700">Payment notification</p><p className="mt-1 text-sm font-semibold text-emerald-900">Payment received</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductPreviews() {
  return (
    <>
      <section id="dashboard" aria-labelledby="dashboard-title" className="bg-slate-950 py-20 text-white sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.35fr_.65fr] lg:px-8">
          <DashboardMockup />
          <div>
            <p className="font-semibold text-blue-300">Dashboard Preview</p>
            <h2 id="dashboard-title" className="mt-3 text-3xl font-bold sm:text-4xl">Everything in One Simple Dashboard</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-300">See your orders, products, customers, payments and sales from one place.</p>
            <ul className="mt-7 space-y-3">
              {["View today’s orders", "Update order status", "Manage products and stock", "Check payments and sales"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-200"><Check className="h-5 w-5 text-emerald-400" aria-hidden="true" />{item}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link href="/login">Explore Dashboard</Link></Button>
              <Button asChild size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800"><Link href="/demo">Watch Demo</Link></Button>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="store-title" className="overflow-hidden bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="font-semibold text-purple-600">Store Preview</p>
            <h2 id="store-title" className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Create a Store Your Customers Will Enjoy</h2>
            <p className="mt-5 text-lg text-slate-600">Every store works smoothly on mobile, tablet and desktop.</p>
            <div className="mt-7 grid grid-cols-2 gap-3 text-sm font-medium text-slate-700">
              {["Mobile-friendly store", "Fast product browsing", "Easy checkout", "Custom domain support"].map((item) => <div key={item} className="flex gap-2"><Check className="h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />{item}</div>)}
            </div>
            <Button asChild size="lg" className="mt-8"><Link href="/demo">View Demo Store</Link></Button>
          </div>
          <div className="relative min-h-96 rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 p-6">
            <div className="absolute inset-x-10 top-8 rounded-2xl border border-white bg-white p-5 shadow-xl">
              <div className="mb-4 flex items-center justify-between"><span className="font-bold">Your Store</span><ShoppingCart className="h-5 w-5" /></div>
              <div className="grid grid-cols-3 gap-3">{["Fashion", "Grocery", "Electronics"].map((name, i) => <div key={name}><div className={`aspect-square rounded-xl ${["bg-blue-100","bg-amber-100","bg-purple-100"][i]}`} /><p className="mt-2 text-xs font-medium">{name}</p></div>)}</div>
            </div>
            <div className="absolute bottom-5 right-5 w-40 rounded-[2rem] border-4 border-slate-900 bg-white p-3 shadow-2xl">
              <div className="mx-auto mb-3 h-1 w-10 rounded bg-slate-300" />
              <div className="aspect-square rounded-xl bg-purple-100" />
              <p className="mt-3 text-xs font-semibold">Featured Product</p>
              <button type="button" className="mt-3 min-h-11 w-full rounded-lg bg-blue-600 text-xs font-semibold text-white">Add to Cart</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

