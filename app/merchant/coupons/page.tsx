"use client";
import MerchantHeader from "@/components/merchant/MerchantHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Copy, Trash2, Edit } from "lucide-react";

const coupons = [
  { code: "EID2026", type: "Percentage", value: "20%", min: "৳500", used: 142, limit: 500, expires: "Jul 10, 2026", status: "Active" },
  { code: "NEWUSER50", type: "Flat", value: "৳50", min: "৳300", used: 89, limit: 200, expires: "Jul 1, 2026", status: "Active" },
  { code: "SUMMER15", type: "Percentage", value: "15%", min: "৳1,000", used: 310, limit: 300, expires: "Jun 30, 2026", status: "Expired" },
  { code: "FREESHIP", type: "Free Shipping", value: "Free", min: "৳800", used: 55, limit: 100, expires: "Jul 31, 2026", status: "Active" },
  { code: "FLASH30", type: "Percentage", value: "30%", min: "৳2,000", used: 0, limit: 50, expires: "Jun 26, 2026", status: "Scheduled" },
];

const statusBadge = (s: string) => {
  const map: Record<string, string> = {
    Active: "bg-emerald-100 text-emerald-700",
    Expired: "bg-red-100 text-red-700",
    Scheduled: "bg-blue-100 text-blue-700",
  };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${map[s]}`}>{s}</span>;
};

export default function CouponsPage() {
  return (
    <>
      <MerchantHeader title="Coupons" />
      <main className="flex-1 p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Create Coupon */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 h-fit">
            <h3 className="font-semibold text-slate-900 mb-5">Create Coupon</h3>
            <div className="space-y-4">
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Coupon Code *</label><Input placeholder="EID2026" className="uppercase" /></div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Discount Type</label>
                <select className="w-full h-10 border border-slate-200 rounded-lg px-3 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Percentage (%)</option><option>Flat Amount (৳)</option><option>Free Shipping</option>
                </select>
              </div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Discount Value</label><Input placeholder="20" type="number" /></div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Minimum Order (৳)</label><Input placeholder="500" type="number" /></div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Usage Limit</label><Input placeholder="500" type="number" /></div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Expiry Date</label><Input type="date" /></div>
              <Button className="w-full gradient-primary text-white border-0 gap-2"><Plus className="w-4 h-4" />Create Coupon</Button>
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200">
            <div className="p-5 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900">All Coupons</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead><TableHead>Type</TableHead><TableHead>Value</TableHead>
                  <TableHead>Min. Order</TableHead><TableHead>Used / Limit</TableHead>
                  <TableHead>Expires</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.map((c, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="bg-slate-100 px-2 py-0.5 rounded text-sm font-mono font-bold text-blue-700">{c.code}</code>
                        <button className="text-slate-400 hover:text-slate-600"><Copy className="w-3.5 h-3.5" /></button>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">{c.type}</TableCell>
                    <TableCell className="font-semibold text-slate-900">{c.value}</TableCell>
                    <TableCell className="text-sm text-slate-600">{c.min}</TableCell>
                    <TableCell>
                      <div className="text-sm"><span className="font-medium text-slate-900">{c.used}</span><span className="text-slate-400"> / {c.limit}</span></div>
                      <div className="mt-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(c.used / c.limit) * 100}%` }} />
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">{c.expires}</TableCell>
                    <TableCell>{statusBadge(c.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </>
  );
}
