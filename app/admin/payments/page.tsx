"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StatsCard from "@/components/admin/StatsCard";
import { Search, TrendingUp, DollarSign, CreditCard, AlertCircle, Download, CheckCircle, X } from "lucide-react";

const allTransactions = [
  { id: "TXN-001", merchant: "Dhaka Fashion Hub", plan: "Growth", amount: "৳1,999", method: "bKash", status: "Completed", date: "Jun 25, 2026" },
  { id: "TXN-002", merchant: "Tech Gadgets BD", plan: "Starter", amount: "৳999", method: "SSLCommerz", status: "Completed", date: "Jun 24, 2026" },
  { id: "TXN-003", merchant: "Green Agro Store", plan: "Business", amount: "৳3,999", method: "Nagad", status: "Pending", date: "Jun 24, 2026" },
  { id: "TXN-004", merchant: "Baby World Shop", plan: "Starter", amount: "৳999", method: "bKash", status: "Completed", date: "Jun 23, 2026" },
  { id: "TXN-005", merchant: "Sylhet Handicrafts", plan: "Growth", amount: "৳1,999", method: "Rocket", status: "Failed", date: "Jun 22, 2026" },
];

const statusBadge = (s: string) => {
  if (s === "Completed") return <Badge variant="success">{s}</Badge>;
  if (s === "Pending") return <Badge variant="warning">{s}</Badge>;
  return <Badge variant="destructive">{s}</Badge>;
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

export default function AdminPaymentsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [methodFilter, setMethodFilter] = useState("All Methods");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const filtered = allTransactions.filter(t => {
    const matchSearch = t.merchant.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All Status" || t.status === statusFilter;
    const matchMethod = methodFilter === "All Methods" || t.method === methodFilter;
    return matchSearch && matchStatus && matchMethod;
  });

  const handleExport = () => {
    const csv = [
      "Txn ID,Merchant,Plan,Amount,Method,Status,Date",
      ...filtered.map(t => `${t.id},${t.merchant},${t.plan},${t.amount},${t.method},${t.status},${t.date}`),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "payments.csv";
    a.click();
    showToast("Payments exported!");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Platform Payments</h1>
        <p className="text-slate-500 text-sm mt-1">All subscription payments received on C Commerce</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Revenue" value="৳8,42,500" change="+18.5%" positive icon={DollarSign} color="text-blue-600" bgColor="bg-blue-50" />
        <StatsCard title="This Month" value="৳68,940" change="+12%" positive icon={TrendingUp} color="text-emerald-600" bgColor="bg-emerald-50" />
        <StatsCard title="Transactions" value="342" change="+22 today" positive icon={CreditCard} color="text-purple-600" bgColor="bg-purple-50" />
        <StatsCard title="Failed Payments" value="7" change="-2 vs last week" positive={false} icon={AlertCircle} color="text-red-600" bgColor="bg-red-50" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search transactions..."
              className="pl-9"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white text-slate-700 focus:outline-none"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
          <select
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white text-slate-700 focus:outline-none"
            value={methodFilter}
            onChange={e => setMethodFilter(e.target.value)}
          >
            <option>All Methods</option>
            <option>bKash</option>
            <option>Nagad</option>
            <option>Rocket</option>
            <option>SSLCommerz</option>
          </select>
          <Button variant="outline" size="sm" className="ml-auto gap-1.5" onClick={handleExport}>
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {["Txn ID", "Merchant", "Plan", "Amount", "Method", "Status", "Date"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-10 text-slate-400">No transactions found</td></tr>
              ) : filtered.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-slate-600 text-xs">{t.id}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{t.merchant}</td>
                  <td className="px-4 py-3"><Badge variant="secondary">{t.plan}</Badge></td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{t.amount}</td>
                  <td className="px-4 py-3 text-slate-600">{t.method}</td>
                  <td className="px-4 py-3">{statusBadge(t.status)}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 text-sm text-slate-500">
          Showing {filtered.length} of {allTransactions.length} transactions
        </div>
      </div>

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
