import Link from "next/link";
import { ArrowRight, BarChart3, Bell, Package, Play, ShoppingCart, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="gradient-hero relative overflow-hidden pb-20 pt-32 sm:pt-36 lg:pb-24">
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="text-center lg:text-left">
          <Badge className="mb-5 border-0 bg-blue-100 px-4 py-1.5 text-blue-700">
            Online Store Platform for Bangladesh
          </Badge>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Create Your Online Store and <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Start Selling</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 lg:mx-0">
            Add products, receive orders, accept online payments and Cash on Delivery, and manage your business from one simple dashboard.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Button asChild size="xl" variant="gradient">
              <Link href="/trial">Start Free <ArrowRight className="h-5 w-5" aria-hidden="true" /></Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="border-2 bg-white">
              <Link href="/demo"><Play className="h-5 w-5 text-blue-600" aria-hidden="true" />View Demo Store</Link>
            </Button>
          </div>
          <p className="mt-5 text-sm text-slate-500">No credit card required · Easy setup · Bangla support available</p>
        </div>

        <div className="relative rounded-3xl border border-white/80 bg-white/90 p-3 shadow-2xl shadow-blue-900/10 sm:p-5" role="img" aria-label="C Commerce dashboard overview">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
            <div><p className="font-semibold text-slate-900">Store Dashboard</p><p className="text-xs text-slate-500">Business overview</p></div>
            <Bell className="h-5 w-5 text-slate-500" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Today’s Orders", "24", ShoppingCart],
              ["Sales", "৳18,450", BarChart3],
              ["Customers", "312", Users],
              ["Products", "86", Package],
            ].map(([label, value, Icon]) => (
              <div key={label as string} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <Icon className="mb-2 h-5 w-5 text-blue-600" aria-hidden="true" />
                <p className="text-xs text-slate-500">{label as string}</p>
                <p className="mt-1 font-bold text-slate-900">{value as string}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-[1.4fr_1fr]">
            <div className="rounded-xl border border-slate-100 p-4">
              <p className="text-sm font-medium text-slate-700">Sales</p>
              <div className="mt-4 flex h-24 items-end gap-2">
                {[44, 68, 52, 83, 64, 94, 74].map((height, index) => <span key={index} className="flex-1 rounded-t bg-gradient-to-t from-blue-600 to-purple-500" style={{ height: `${height}%` }} />)}
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-xl border border-slate-100 p-4"><p className="text-xs text-slate-500">Recent order</p><p className="mt-1 text-sm font-semibold">#CC-1048 · COD</p></div>
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4"><p className="text-xs text-emerald-700">Payment notification</p><p className="mt-1 text-sm font-semibold text-emerald-900">Payment received</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

