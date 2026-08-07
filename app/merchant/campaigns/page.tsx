"use client";
import MerchantHeader from "@/components/merchant/MerchantHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, BarChart2 } from "lucide-react";

const campaigns = [
  { name: "Eid Special Sale", type: "Flash Sale", discount: "Up to 30% off", start: "Jun 25", end: "Jul 5", products: 45, status: "Active", views: "12,450", sales: "৳45,200" },
  { name: "New Arrival Week", type: "Product Launch", discount: "15% off new items", start: "Jul 1", end: "Jul 7", products: 18, status: "Scheduled", views: "—", sales: "—" },
  { name: "Monsoon Sale", type: "Seasonal", discount: "20% off select items", start: "Jun 1", end: "Jun 30", products: 62, status: "Ended", views: "28,100", sales: "৳1,20,400" },
  { name: "Clearance Stock", type: "Clearance", discount: "Up to 50% off", start: "Jun 20", end: "Jun 30", products: 30, status: "Active", views: "8,230", sales: "৳22,100" },
];

const statusBadge = (s: string) => {
  const map: Record<string, string> = { Active: "bg-emerald-100 text-emerald-700", Scheduled: "bg-blue-100 text-blue-700", Ended: "bg-slate-100 text-slate-600" };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${map[s]}`}>{s}</span>;
};

export default function CampaignsPage() {
  return (
    <>
      <MerchantHeader title="Campaigns" />
      <main className="flex-1 p-6 space-y-5">
        <div className="flex justify-between items-center">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Active Campaigns", value: "2", color: "text-emerald-600" },
              { label: "Scheduled", value: "1", color: "text-blue-600" },
              { label: "Total Campaign Revenue", value: "৳1,87,700", color: "text-purple-600" },
            ].map((c, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 px-5 py-4">
                <p className="text-xs text-slate-500">{c.label}</p>
                <p className={`text-xl font-bold mt-1 ${c.color}`}>{c.value}</p>
              </div>
            ))}
          </div>
          <Button className="gradient-primary text-white border-0 gap-2 ml-4"><Plus className="w-4 h-4" />New Campaign</Button>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {campaigns.map((c, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-slate-900">{c.name}</h3>
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-medium">{c.type}</span>
                </div>
                {statusBadge(c.status)}
              </div>
              <p className="text-sm text-slate-600 mb-3">{c.discount} · {c.products} products</p>
              <div className="flex justify-between text-xs text-slate-500 mb-4">
                <span>📅 {c.start} – {c.end}</span>
                <span>👁️ {c.views} views</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-emerald-700">{c.sales} revenue</div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-blue-600"><BarChart2 className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
