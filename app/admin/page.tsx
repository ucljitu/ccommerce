"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import StatsCard from "@/components/admin/StatsCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Store, DollarSign, ShoppingCart, Package, ArrowRight, CheckCircle, X } from "lucide-react";

type Merchant = {
  id: string; name: string; owner: string; plan: string;
  status: string; orders: number; revenue: string; joined: string;
};

const SEED: Merchant[] = [
  { id: "#M001", name: "TechZone BD", owner: "Rafiqul Islam", plan: "Growth", status: "Active", orders: 1240, revenue: "৳4,52,000", joined: "Jan 10, 2026" },
  { id: "#M002", name: "Style Avenue", owner: "Fatema Begum", plan: "Starter", status: "Trial", orders: 342, revenue: "৳1,20,000", joined: "Jun 22, 2026" },
  { id: "#M003", name: "Fresh Grocery", owner: "Karim Hossain", plan: "Business", status: "Active", orders: 4230, revenue: "৳12,05,000", joined: "Mar 15, 2026" },
  { id: "#M004", name: "Beauty Corner", owner: "Nasrin Akhter", plan: "Growth", status: "Active", orders: 2100, revenue: "৳6,78,000", joined: "Feb 18, 2026" },
  { id: "#M005", name: "Furniture House", owner: "Jahangir Alom", plan: "Starter", status: "Inactive", orders: 89, revenue: "৳82,000", joined: "Jun 10, 2026" },
  { id: "#M006", name: "Baby Bliss", owner: "Sumaiya Khatun", plan: "Growth", status: "Active", orders: 876, revenue: "৳3,24,000", joined: "Apr 5, 2026" },
  { id: "#M007", name: "PharmaCare BD", owner: "Dr. Rahim", plan: "Business", status: "Active", orders: 3200, revenue: "৳9,60,000", joined: "Feb 1, 2026" },
  { id: "#M008", name: "RestaurantHub", owner: "Chef Salam", plan: "Growth", status: "Trial", orders: 124, revenue: "৳45,000", joined: "Jun 23, 2026" },
];

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    Active: "bg-emerald-100 text-emerald-700",
    Trial: "bg-blue-100 text-blue-700",
    Inactive: "bg-slate-100 text-slate-600",
    Suspended: "bg-red-100 text-red-700",
  };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${map[status] || ""}`}>{status}</span>;
};

const planBadge = (plan: string) => {
  const map: Record<string, string> = {
    Starter: "bg-slate-100 text-slate-700",
    Growth: "bg-blue-100 text-blue-700",
    Business: "bg-purple-100 text-purple-700",
    Enterprise: "bg-amber-100 text-amber-700",
  };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${map[plan] || ""}`}>{plan}</span>;
};

function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
      {msg}
      <button onClick={onClose} className="ml-2 text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [toast, setToast] = useState<string | null>(null);
  const [merchants, setMerchants] = useState<Merchant[]>(SEED);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("admin_merchants");
      if (raw) setMerchants(JSON.parse(raw));
    } catch { /* use seed */ }
  }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  // Dynamic stats
  const total = merchants.length;
  const active = merchants.filter(m => m.status === "Active").length;
  const totalOrders = merchants.reduce((s, m) => s + (m.orders ?? 0), 0);
  const planCounts = ["Starter", "Growth", "Business", "Enterprise"].map(plan => ({
    plan,
    count: merchants.filter(m => m.plan === plan).length,
    color: plan === "Starter" ? "bg-slate-400" : plan === "Growth" ? "bg-blue-500" : plan === "Business" ? "bg-purple-500" : "bg-amber-500",
  }));

  const stats = [
    { title: "Total Merchants", value: total.toLocaleString(), change: "+12%", positive: true, icon: Store, color: "text-blue-600", bgColor: "bg-blue-50" },
    { title: "Monthly Revenue", value: "৳28.4L", change: "+18%", positive: true, icon: DollarSign, color: "text-emerald-600", bgColor: "bg-emerald-50" },
    { title: "Active Stores", value: active.toLocaleString(), change: "+9%", positive: true, icon: ShoppingCart, color: "text-purple-600", bgColor: "bg-purple-50" },
    { title: "Total Orders", value: totalOrders >= 1000 ? `${(totalOrders / 1000).toFixed(1)}K` : String(totalOrders), change: "+22%", positive: true, icon: Package, color: "text-amber-600", bgColor: "bg-amber-50" },
  ];

  const recentMerchants = [...merchants].reverse().slice(0, 5);

  return (
    <>
      <AdminHeader title="Dashboard" />
      <main className="flex-1 p-6 space-y-6">

        {/* Stats */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((stat, i) => <StatsCard key={i} {...stat} />)}
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Revenue chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-slate-900">Monthly Revenue</h3>
              <Badge variant="secondary">Last 6 months</Badge>
            </div>
            <div className="h-48 flex items-end gap-3">
              {[
                { month: "Jan", val: 55, label: "21.5L" },
                { month: "Feb", val: 70, label: "23.2L" },
                { month: "Mar", val: 60, label: "24.8L" },
                { month: "Apr", val: 80, label: "26.1L" },
                { month: "May", val: 75, label: "27.4L" },
                { month: "Jun", val: 95, label: "28.4L" },
              ].map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group cursor-pointer" onClick={() => router.push("/admin/reports")}>
                  <span className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">{d.label}</span>
                  <div className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all" style={{ height: `${d.val}%` }} />
                  <span className="text-xs text-slate-500">{d.month}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 text-right mt-2">Click bar → Reports</p>
          </div>

          {/* Plan distribution — dynamic */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-6">Subscription Plans</h3>
            <div className="space-y-4">
              {planCounts.map((p, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-700 font-medium">{p.plan}</span>
                    <span className="text-slate-500">{p.count}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${p.color} transition-all duration-500`}
                      style={{ width: total > 0 ? `${(p.count / total) * 100}%` : "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-4 text-xs text-slate-500 hover:text-blue-600"
              onClick={() => router.push("/admin/plans")}
            >
              Manage Plans →
            </Button>
          </div>
        </div>

        {/* Recent Merchants — dynamic */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <div>
              <h3 className="font-semibold text-slate-900">Recent Merchants</h3>
              <p className="text-xs text-slate-400 mt-0.5">{total} total merchants</p>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600 gap-1" onClick={() => router.push("/admin/merchants")}>
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Store</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentMerchants.map((m, i) => (
                <TableRow key={i} className="cursor-pointer hover:bg-slate-50/80">
                  <TableCell className="font-medium text-slate-900">{m.name}</TableCell>
                  <TableCell className="text-slate-600">{m.owner}</TableCell>
                  <TableCell>{planBadge(m.plan)}</TableCell>
                  <TableCell>{statusBadge(m.status)}</TableCell>
                  <TableCell className="font-medium text-emerald-700">{m.revenue}</TableCell>
                  <TableCell className="text-slate-500 text-xs">{m.joined}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost" size="sm" className="h-7 text-xs"
                        onClick={() => router.push(`/admin/merchants/${encodeURIComponent(m.id)}`)}
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost" size="sm" className="h-7 text-xs text-blue-600"
                        onClick={() => showToast(`Logging in as ${m.name}...`)}
                      >
                        Login
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </>
  );
}
