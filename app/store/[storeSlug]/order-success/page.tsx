import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Truck, MapPin, MessageCircle } from "lucide-react";
import { isDemoStore } from "@/lib/demo";

export default async function OrderSuccessPage({ params }: { params: Promise<{ storeSlug: string }> }) {
  const { storeSlug } = await params;
  const demoMode = isDemoStore(storeSlug);
  const base = `/store/${storeSlug}`;
  const orderId = demoMode ? "#DEMO-1048" : "#ORD-1048";

  return (
    <div className="pb-24 md:pb-0 max-w-2xl mx-auto px-4 sm:px-6 py-12 text-center">
      {/* Success icon */}
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-emerald-500" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{demoMode ? "Demo Order Preview" : "Order Placed Successfully!"}</h1>
      <p className="text-slate-500 mb-2">{demoMode ? "This is sample data. No order, payment or notification was created." : "Thank you for your order. We will confirm your order shortly."}</p>
      <div className="inline-block bg-blue-50 border border-blue-200 text-blue-700 font-mono font-bold px-4 py-2 rounded-xl text-lg mb-8">{orderId}</div>

      {/* Order details */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 text-left space-y-4 mb-6">
        <h2 className="font-semibold text-slate-900 text-base">Order Details</h2>
        <div className="space-y-3">
          {[
            { label: "Customer", value: demoMode ? "Sample Customer" : "Rahim Miah" },
            { label: "Mobile", value: demoMode ? "01XXXXXXXXX" : "01712-345678" },
            { label: "Delivery Address", value: demoMode ? "Sample Address, Dhaka" : "House #12, Road #5, Mirpur-10, Dhaka" },
            { label: "Payment Method", value: demoMode ? "Demo Order" : "Cash on Delivery" },
            { label: "Delivery Estimate", value: "3–5 Business Days" },
          ].map((row, i) => (
            <div key={i} className="flex justify-between gap-4">
              <span className="text-sm text-slate-500">{row.label}</span>
              <span className="text-sm font-medium text-slate-900 text-right">{row.value}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-100 pt-4">
          <div className="flex justify-between font-bold text-slate-900">
            <span>Total Amount</span>
            <span>৳2,310</span>
          </div>
        </div>
      </div>

      {/* Tracking steps */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
        <h2 className="font-semibold text-slate-900 mb-5 text-left">Order Progress</h2>
        <div className="flex items-center">
          {[
            { icon: CheckCircle, label: "Confirmed", done: true },
            { icon: Package, label: "Processing", done: false },
            { icon: Truck, label: "Shipped", done: false },
            { icon: MapPin, label: "Delivered", done: false },
          ].map((step, i, arr) => (
            <div key={i} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.done ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"}`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className={`text-xs mt-1.5 font-medium ${step.done ? "text-emerald-600" : "text-slate-400"}`}>{step.label}</span>
              </div>
              {i < arr.length - 1 && (
                <div className={`flex-1 h-0.5 mx-1 ${step.done ? "bg-emerald-400" : "bg-slate-200"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp CTA */}
      {!demoMode && <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6">
        <p className="text-sm font-medium text-slate-900 mb-2">Have questions about your order?</p>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 gap-2 w-full">
          <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
        </Button>
      </div>}

      <div className="flex flex-col sm:flex-row gap-3">
        <Link href={`${base}/track-order`} className="flex-1">
          <Button variant="outline" size="lg" className="w-full gap-2"><Truck className="w-4 h-4" />Track Order</Button>
        </Link>
        <Link href={`${base}/shop`} className="flex-1">
          <Button size="lg" className="w-full gradient-primary text-white border-0">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
}
