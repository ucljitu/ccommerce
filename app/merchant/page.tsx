"use client";
import MerchantHeader from "@/components/merchant/MerchantHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ShoppingCart, DollarSign, Users, Package, TrendingUp, TrendingDown,
  ArrowRight, Eye, Clock, CheckCircle, XCircle, Truck
} from "lucide-react";

const stats = [
  { title: "Today's Orders", value: "48", change: "+12%", positive: true, icon: ShoppingCart, color: "text-blue-600", bg: "bg-blue-50" },
  { title: "Today's Revenue", value: "৳24,500", change: "+8%", positive: true, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
  { title: "Total Customers", value: "1,234", change: "+15%", positive: true, icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
  { title: "Total Products", value: "256", change: "+5%", positive: true, icon: Package, color: "text-amber-600", bg: "bg-amber-50" },
];

const recentOrders = [
  { id: "#10045", customer: "Rahim Miah", mobile: "01712345678", product: "iPhone 15 Case", qty: 2, total: "৳1,200", method: "bKash", status: "Pending", area: "Dhaka" },
  { id: "#10044", customer: "Sakina Begum", mobile: "01812345678", product: "Smart Watch", qty: 1, total: "৳8,500", method: "COD", status: "Processing", area: "Chittagong" },
  { id: "#10043", customer: "Jamal Uddin", mobile: "01912345678", product: "Laptop Bag", qty: 1, total: "৳2,200", method: "Nagad", status: "Shipped", area: "Sylhet" },
  { id: "#10042", customer: "Runa Akter", mobile: "01612345678", product: "Wireless Earbuds", qty: 1, total: "৳3,800", method: "COD", status: "Delivered", area: "Rajshahi" },
  { id: "#10041", customer: "Sabbir Hossain", mobile: "01512345678", product: "Phone Stand", qty: 3, total: "৳1,500", method: "bKash", status: "Cancelled", area: "Khulna" },
];

const statusBadge = (s: string) => {
  const map: Record<string, { cls: string; icon: React.ReactNode }> = {
    Pending: { cls: "bg-amber-100 text-amber-700", icon: <Clock className="w-3 h-3" /> },
    Processing: { cls: "bg-blue-100 text-blue-700", icon: <Package className="w-3 h-3" /> },
    Shipped: { cls: "bg-purple-100 text-purple-700", icon: <Truck className="w-3 h-3" /> },
    Delivered: { cls: "bg-emerald-100 text-emerald-700", icon: <CheckCircle className="w-3 h-3" /> },
    Cancelled: { cls: "bg-red-100 text-red-700", icon: <XCircle className="w-3 h-3" /> },
  };
  const style = map[s] || { cls: "bg-slate-100 text-slate-700", icon: null };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${style.cls}`}>
      {style.icon}{s}
    </span>
  );
};

export default function MerchantDashboard() {
  return (
    <>
      <MerchantHeader title="Dashboard" />
      <main className="flex-1 p-6 space-y-6">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
          <h2 className="text-xl font-bold mb-1">Good morning, Rafiqul! 👋</h2>
          <p className="text-blue-100 text-sm">Here's what's happening with TechZone BD today.</p>
          <div className="flex gap-3 mt-4">
            <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm">Add Product</Button>
            <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm">View Orders</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="stats-card bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-4">
              <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-0.5">{s.title}</p>
                <p className="text-xl font-bold text-slate-900">{s.value}</p>
                <div className={`flex items-center gap-1 text-xs font-medium mt-1 ${s.positive ? "text-emerald-600" : "text-red-500"}`}>
                  {s.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {s.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts + quick actions */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Sales This Week</h3>
              <Badge variant="secondary">৳1,20,500 total</Badge>
            </div>
            <div className="h-40 flex items-end gap-3">
              {[
                { day: "Sat", val: 55, amount: "৳18k" }, { day: "Sun", val: 70, amount: "৳22k" },
                { day: "Mon", val: 45, amount: "৳14k" }, { day: "Tue", val: 80, amount: "৳25k" },
                { day: "Wed", val: 60, amount: "৳19k" }, { day: "Thu", val: 90, amount: "৳28k" },
                { day: "Fri", val: 75, amount: "৳24k" },
              ].map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-slate-500">{d.amount}</span>
                  <div className={`w-full rounded-t-lg transition-all ${i === 5 ? "bg-blue-600" : "bg-blue-100 hover:bg-blue-200"}`} style={{ height: `${d.val}%` }} />
                  <span className="text-[10px] text-slate-500">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-3 text-sm">Order Status</h3>
              {[
                { label: "Pending", count: 12, color: "bg-amber-500", pct: 25 },
                { label: "Processing", count: 18, color: "bg-blue-500", pct: 37 },
                { label: "Shipped", count: 8, color: "bg-purple-500", pct: 17 },
                { label: "Delivered", count: 10, color: "bg-emerald-500", pct: 21 },
              ].map((s, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">{s.label}</span>
                    <span className="font-medium text-slate-900">{s.count}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-amber-800">⚠️ Low Stock Alert</p>
              <p className="text-xs text-amber-700 mt-1">5 products running low on inventory</p>
              <Button variant="outline" size="sm" className="mt-3 w-full border-amber-300 text-amber-700 hover:bg-amber-100">View Inventory</Button>
            </div>
          </div>
        </div>

        {/* Recent orders */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">Recent Orders</h3>
            <Button variant="ghost" size="sm" className="text-blue-600 gap-1">All Orders <ArrowRight className="w-4 h-4" /></Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((o, i) => (
                <TableRow key={i}>
                  <TableCell className="font-mono text-xs text-slate-500">{o.id}</TableCell>
                  <TableCell>
                    <p className="font-medium text-sm text-slate-900">{o.customer}</p>
                    <p className="text-xs text-slate-400">{o.mobile}</p>
                  </TableCell>
                  <TableCell className="text-sm text-slate-700">{o.product} <span className="text-slate-400">×{o.qty}</span></TableCell>
                  <TableCell className="font-semibold text-slate-900">{o.total}</TableCell>
                  <TableCell><span className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-700 font-medium">{o.method}</span></TableCell>
                  <TableCell className="text-sm text-slate-600">{o.area}</TableCell>
                  <TableCell>{statusBadge(o.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="w-4 h-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}
