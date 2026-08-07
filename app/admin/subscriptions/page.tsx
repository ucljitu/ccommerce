"use client";
import { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Download, CheckCircle, X, ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 4;

const initialSubs = [
  { id: "#SUB001", merchant: "TechZone BD", plan: "Growth", amount: "৳1,999", status: "Active", start: "Jun 1, 2026", next: "Jul 1, 2026", method: "bKash" },
  { id: "#SUB002", merchant: "Fresh Grocery", plan: "Business", amount: "৳3,999", status: "Active", start: "May 15, 2026", next: "Jul 15, 2026", method: "Nagad" },
  { id: "#SUB003", merchant: "Style Avenue", plan: "Starter", amount: "৳999", status: "Trial", start: "Jun 22, 2026", next: "Jul 6, 2026", method: "—" },
  { id: "#SUB004", merchant: "Beauty Corner", plan: "Growth", amount: "৳1,999", status: "Active", start: "Feb 1, 2026", next: "Jul 1, 2026", method: "Card" },
  { id: "#SUB005", merchant: "Furniture House", plan: "Starter", amount: "৳999", status: "Expired", start: "May 1, 2026", next: "Jun 1, 2026", method: "bKash" },
];

const statusBadge = (s: string) => {
  const map: Record<string, string> = {
    Active: "bg-emerald-100 text-emerald-700",
    Trial: "bg-blue-100 text-blue-700",
    Expired: "bg-red-100 text-red-700",
  };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${map[s] ?? ""}`}>{s}</span>;
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

export default function SubscriptionsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const filtered = initialSubs.filter(s => {
    const matchSearch = s.merchant.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || s.status === statusFilter;
    const matchPlan = planFilter === "All" || s.plan === planFilter;
    return matchSearch && matchStatus && matchPlan;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleExport = () => {
    const csv = [
      "ID,Merchant,Plan,Amount,Status,Start Date,Next Billing,Method",
      ...filtered.map(s => `${s.id},${s.merchant},${s.plan},${s.amount},${s.status},${s.start},${s.next},${s.method}`),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "subscriptions.csv";
    a.click();
    showToast("CSV exported!");
  };

  return (
    <>
      <AdminHeader title="Subscriptions" />
      <main className="flex-1 p-6 space-y-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Subscriptions", value: "5,284", color: "text-blue-600" },
            { label: "Active", value: "4,891", color: "text-emerald-600" },
            { label: "Trial", value: "284", color: "text-amber-600" },
            { label: "MRR", value: "৳28.4L", color: "text-purple-600" },
          ].map((c, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">{c.label}</p>
              <p className={`text-2xl font-bold mt-1 ${c.color}`}>{c.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200">
          <div className="p-5 border-b border-slate-100 flex flex-wrap gap-3 items-center justify-between">
            <div className="relative flex-1 min-w-48 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search subscriptions..."
                className="pl-9"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {showFilter && (
                <>
                  <select
                    className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white text-slate-700 focus:outline-none"
                    value={statusFilter}
                    onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
                  >
                    {["All", "Active", "Trial", "Expired"].map(s => <option key={s}>{s}</option>)}
                  </select>
                  <select
                    className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white text-slate-700 focus:outline-none"
                    value={planFilter}
                    onChange={e => { setPlanFilter(e.target.value); setPage(1); }}
                  >
                    {["All", "Starter", "Growth", "Business", "Enterprise"].map(p => <option key={p}>{p}</option>)}
                  </select>
                </>
              )}
              <Button
                variant="outline"
                size="sm"
                className={`gap-1 ${showFilter ? "bg-blue-50 border-blue-300 text-blue-700" : ""}`}
                onClick={() => setShowFilter(!showFilter)}
              >
                <Filter className="w-4 h-4" />Filter
              </Button>
              <Button variant="outline" size="sm" className="gap-1" onClick={handleExport}>
                <Download className="w-4 h-4" />Export
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Next Billing</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.length === 0 ? (
                <TableRow><TableCell colSpan={9} className="text-center py-10 text-slate-400">No subscriptions found</TableCell></TableRow>
              ) : paginated.map((s, i) => (
                <TableRow key={i}>
                  <TableCell className="font-mono text-xs text-slate-400">{s.id}</TableCell>
                  <TableCell className="font-medium text-slate-900">{s.merchant}</TableCell>
                  <TableCell><span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700 font-medium">{s.plan}</span></TableCell>
                  <TableCell className="font-semibold text-slate-900">{s.amount}</TableCell>
                  <TableCell>{statusBadge(s.status)}</TableCell>
                  <TableCell className="text-slate-500 text-xs">{s.start}</TableCell>
                  <TableCell className="text-slate-500 text-xs">{s.next}</TableCell>
                  <TableCell className="text-slate-600 text-sm">{s.method}</TableCell>
                  <TableCell>
                    <Link href={`/admin/subscriptions/${s.id.replace("#", "").toLowerCase()}`}>
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-blue-600">Manage</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
            <span>Showing {Math.min((safePage - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length} subscriptions</span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" disabled={safePage <= 1} onClick={() => setPage(safePage - 1)}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <Button
                  key={p}
                  variant={p === safePage ? "default" : "ghost"}
                  size="icon"
                  className={`h-8 w-8 text-xs ${p === safePage ? "gradient-primary text-white border-0" : ""}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              ))}
              <Button variant="ghost" size="icon" className="h-8 w-8" disabled={safePage >= totalPages} onClick={() => setPage(safePage + 1)}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </>
  );
}
