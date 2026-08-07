"use client";
import MerchantHeader from "@/components/merchant/MerchantHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Save, Truck } from "lucide-react";

const districts = [
  { name: "Dhaka", inside: 60, outside: 80, enabled: true },
  { name: "Chittagong", inside: 100, outside: 120, enabled: true },
  { name: "Sylhet", inside: 120, outside: 150, enabled: true },
  { name: "Rajshahi", inside: 120, outside: 150, enabled: true },
  { name: "Khulna", inside: 120, outside: 150, enabled: true },
  { name: "Barisal", inside: 130, outside: 160, enabled: true },
  { name: "Rangpur", inside: 130, outside: 160, enabled: true },
  { name: "Mymensingh", inside: 100, outside: 130, enabled: true },
  { name: "Cumilla", inside: 100, outside: 120, enabled: true },
  { name: "Gazipur", inside: 70, outside: 90, enabled: true },
  { name: "Narayanganj", inside: 70, outside: 90, enabled: true },
  { name: "Tangail", inside: 100, outside: 130, enabled: false },
];

export default function DeliveryPage() {
  return (
    <>
      <MerchantHeader title="Delivery Charge" />
      <main className="flex-1 p-6 space-y-5">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: "Free Delivery Above", value: "৳2,000", icon: "🎁" },
            { label: "Active Zones", value: "11", icon: "✅" },
            { label: "Disabled Zones", value: "1", icon: "❌" },
          ].map((c, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-3">
              <span className="text-2xl">{c.icon}</span>
              <div><p className="text-xs text-slate-500">{c.label}</p><p className="text-xl font-bold text-slate-900">{c.value}</p></div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Global Delivery Settings</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Free Delivery Above (৳)</label><Input defaultValue="2000" type="number" /></div>
            <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Default Charge (৳)</label><Input defaultValue="100" type="number" /></div>
            <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Estimated Delivery</label><Input defaultValue="3-5 business days" /></div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">District-wise Delivery Charges</h3>
            <Button className="gradient-primary text-white border-0 gap-2"><Save className="w-4 h-4" />Save Changes</Button>
          </div>
          <div className="divide-y divide-slate-100">
            <div className="grid grid-cols-4 px-5 py-3 bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              <span className="col-span-1">District</span>
              <span className="text-center">Inside City (৳)</span>
              <span className="text-center">Outside City (৳)</span>
              <span className="text-center">Active</span>
            </div>
            {districts.map((d, i) => (
              <div key={i} className="grid grid-cols-4 px-5 py-3 items-center hover:bg-slate-50">
                <span className="text-sm font-medium text-slate-800">{d.name}</span>
                <div className="flex justify-center"><Input defaultValue={d.inside} type="number" className="h-8 text-sm w-24 text-center" /></div>
                <div className="flex justify-center"><Input defaultValue={d.outside} type="number" className="h-8 text-sm w-24 text-center" /></div>
                <div className="flex justify-center"><Switch defaultChecked={d.enabled} /></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
