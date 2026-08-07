import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Package, Truck, MapPin, CheckCircle, Clock } from "lucide-react";
import { isDemoStore } from "@/lib/demo";

const steps = [
  { icon: CheckCircle, label: "Order Confirmed", time: "Jun 25, 10:32 AM", desc: "Your order has been received and confirmed.", done: true },
  { icon: Package, label: "Processing", time: "Jun 25, 2:00 PM", desc: "Your order is being packed and prepared for shipment.", done: true },
  { icon: Truck, label: "Shipped", time: "Jun 26, 9:00 AM", desc: "Your package is with Pathao Courier for delivery.", done: false },
  { icon: MapPin, label: "Out for Delivery", time: "—", desc: "Your package will be delivered today.", done: false },
  { icon: CheckCircle, label: "Delivered", time: "—", desc: "Package delivered successfully.", done: false },
];

export default async function TrackOrderPage({ params }: { params: Promise<{ storeSlug: string }> }) {
  const { storeSlug } = await params;
  const demoMode = isDemoStore(storeSlug);
  return (
    <div className="pb-24 md:pb-0 max-w-2xl mx-auto px-4 sm:px-6 py-12">
      {demoMode && <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-900"><strong>Demo Tracking</strong> · The status below is sample data and does not represent a real shipment.</div>}
      <h1 className="text-2xl font-bold text-slate-900 mb-2 text-center">Track Your Order</h1>
      <p className="text-slate-500 text-center mb-8">Enter your order ID or mobile number to track</p>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Order ID (e.g. #ORD10045) or Mobile Number" className="pl-9" />
          </div>
          <Button className="gradient-primary text-white border-0 shrink-0">Track</Button>
        </div>
      </div>

      {/* Result */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-bold text-slate-900 text-lg">#ORD10045</h2>
            <p className="text-sm text-slate-500">Placed Jun 25, 2026 · 2 items · ৳2,310</p>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Processing</span>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3">
          <Truck className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm font-medium text-slate-900">Pathao Courier</p>
            <p className="text-xs text-slate-500">Tracking #: PTH-2026-987654</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs text-slate-500">Estimated Delivery</p>
            <p className="text-sm font-semibold text-slate-900">Jun 28–30, 2026</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-0">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${step.done ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-300"}`}>
                  <step.icon className="w-5 h-5" />
                </div>
                {i < steps.length - 1 && <div className={`w-0.5 flex-1 my-1 min-h-[32px] ${step.done ? "bg-emerald-300" : "bg-slate-200"}`} />}
              </div>
              <div className="pb-6 flex-1">
                <div className="flex items-baseline gap-3">
                  <p className={`font-medium text-sm ${step.done ? "text-slate-900" : "text-slate-400"}`}>{step.label}</p>
                  {step.time !== "—" && <span className="text-xs text-slate-400">{step.time}</span>}
                </div>
                <p className={`text-xs mt-0.5 ${step.done ? "text-slate-500" : "text-slate-300"}`}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 pt-4">
          <h3 className="font-medium text-slate-900 text-sm mb-2">Delivery Address</h3>
          <p className="text-sm text-slate-600">Rahim Miah<br />House #12, Road #5, Mirpur-10<br />Dhaka, Bangladesh<br />📞 01712-345678</p>
        </div>
      </div>
    </div>
  );
}
