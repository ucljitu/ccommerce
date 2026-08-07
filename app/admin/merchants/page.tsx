"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Download, Eye, Trash2, ExternalLink, Store, X, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 5;

const initialMerchants = [
  { id: "#M001", name: "TechZone BD", owner: "Rafiqul Islam", mobile: "01712345678", plan: "Growth", status: "Active", orders: 1240, revenue: "৳4,52,000", joined: "Jan 10, 2026" },
  { id: "#M002", name: "Style Avenue", owner: "Fatema Begum", mobile: "01812345678", plan: "Starter", status: "Trial", orders: 342, revenue: "৳1,20,000", joined: "Jun 22, 2026" },
  { id: "#M003", name: "Fresh Grocery", owner: "Karim Hossain", mobile: "01912345678", plan: "Business", status: "Active", orders: 4230, revenue: "৳12,05,000", joined: "Mar 15, 2026" },
  { id: "#M004", name: "Beauty Corner", owner: "Nasrin Akhter", mobile: "01612345678", plan: "Growth", status: "Active", orders: 2100, revenue: "৳6,78,000", joined: "Feb 18, 2026" },
  { id: "#M005", name: "Furniture House", owner: "Jahangir Alom", mobile: "01512345678", plan: "Starter", status: "Inactive", orders: 89, revenue: "৳82,000", joined: "Jun 10, 2026" },
  { id: "#M006", name: "Baby Bliss", owner: "Sumaiya Khatun", mobile: "01312345678", plan: "Growth", status: "Active", orders: 876, revenue: "৳3,24,000", joined: "Apr 5, 2026" },
  { id: "#M007", name: "PharmaCare BD", owner: "Dr. Rahim", mobile: "01412345678", plan: "Business", status: "Active", orders: 3200, revenue: "৳9,60,000", joined: "Feb 1, 2026" },
  { id: "#M008", name: "RestaurantHub", owner: "Chef Salam", mobile: "01112345678", plan: "Growth", status: "Trial", orders: 124, revenue: "৳45,000", joined: "Jun 23, 2026" },
];

const statusBadge = (s: string) => {
  const map: Record<string, string> = {
    Active: "bg-emerald-100 text-emerald-700",
    Trial: "bg-blue-100 text-blue-700",
    Inactive: "bg-slate-100 text-slate-600",
  };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${map[s] ?? ""}`}>{s}</span>;
};

const planBadge = (p: string) => {
  const map: Record<string, string> = {
    Starter: "bg-slate-100 text-slate-700",
    Growth: "bg-blue-100 text-blue-700",
    Business: "bg-purple-100 text-purple-700",
  };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${map[p] ?? ""}`}>{p}</span>;
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

function loadMerchants() {
  if (typeof window === "undefined") return initialMerchants;
  try {
    const raw = localStorage.getItem("admin_merchants");
    return raw ? JSON.parse(raw) : initialMerchants;
  } catch { return initialMerchants; }
}

export default function MerchantsPage() {
  const router = useRouter();
  const [merchants, setMerchants] = useState(initialMerchants);

  useEffect(() => { setMerchants(loadMerchants()); }, []);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", owner: "", mobile: "", email: "", plan: "Starter" });
  const [page, setPage] = useState(1);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = merchants.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.owner.toLowerCase().includes(search.toLowerCase()) ||
      m.mobile.includes(search);
    const matchStatus = statusFilter === "All" || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const saveMerchants = (updated: typeof initialMerchants) => {
    setMerchants(updated);
    localStorage.setItem("admin_merchants", JSON.stringify(updated));
  };

  const handleAdd = () => {
    if (!form.name || !form.owner || !form.mobile) return;
    const newM = {
      id: `#M${String(merchants.length + 1).padStart(3, "0")}`,
      name: form.name,
      owner: form.owner,
      mobile: form.mobile,
      plan: form.plan,
      status: "Trial",
      orders: 0,
      revenue: "৳0",
      joined: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    saveMerchants([newM, ...merchants]);
    setForm({ name: "", owner: "", mobile: "", email: "", plan: "Starter" });
    setShowAdd(false);
    showToast("Merchant added successfully!");
  };

  const handleDelete = (id: string) => {
    saveMerchants(merchants.filter(m => m.id !== id));
    setDeleteId(null);
    showToast("Merchant removed.");
  };

  const handleExport = () => {
    const csv = ["ID,Store,Owner,Mobile,Plan,Status,Orders,Revenue,Joined",
      ...filtered.map(m => `${m.id},${m.name},${m.owner},${m.mobile},${m.plan},${m.status},${m.orders},${m.revenue},${m.joined}`)
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "merchants.csv"; a.click();
    showToast("CSV exported!");
  };

  return (
    <>
      <AdminHeader title="Merchants" />
      <main className="flex-1 p-6 space-y-5">
        {/* Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Merchants", value: merchants.length, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Active", value: merchants.filter(m => m.status === "Active").length, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "On Trial", value: merchants.filter(m => m.status === "Trial").length, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Inactive", value: merchants.filter(m => m.status === "Inactive").length, color: "text-red-600", bg: "bg-red-50" },
          ].map((c, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">{c.label}</p>
              <p className={`text-2xl font-bold mt-1 ${c.color}`}>{c.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200">
          <div className="p-4 border-b border-slate-100 flex flex-wrap gap-3 items-center justify-between">
            <div className="flex gap-2 flex-1 min-w-0">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search merchants..."
                  className="pl-9"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                />
              </div>
              <select
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white text-slate-700 focus:outline-none"
                value={statusFilter}
                onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
              >
                {["All", "Active", "Trial", "Inactive"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1.5" onClick={handleExport}>
                <Download className="w-4 h-4" /> Export CSV
              </Button>
              <Button size="sm" className="gradient-primary text-white border-0 gap-1.5" onClick={() => setShowAdd(true)}>
                <Store className="w-4 h-4" /> Add Merchant
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead><TableHead>Store / Owner</TableHead><TableHead>Mobile</TableHead>
                <TableHead>Plan</TableHead><TableHead>Status</TableHead><TableHead>Orders</TableHead>
                <TableHead>Revenue</TableHead><TableHead>Joined</TableHead><TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.length === 0 ? (
                <TableRow><TableCell colSpan={9} className="text-center py-10 text-slate-400">No merchants found</TableCell></TableRow>
              ) : paginated.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="text-slate-400 text-xs font-mono">{m.id}</TableCell>
                  <TableCell>
                    <p className="font-medium text-slate-900 text-sm">{m.name}</p>
                    <p className="text-xs text-slate-500">{m.owner}</p>
                  </TableCell>
                  <TableCell className="text-slate-600 text-sm">{m.mobile}</TableCell>
                  <TableCell>{planBadge(m.plan)}</TableCell>
                  <TableCell>{statusBadge(m.status)}</TableCell>
                  <TableCell className="font-medium text-slate-900">{m.orders.toLocaleString()}</TableCell>
                  <TableCell className="font-medium text-emerald-700">{m.revenue}</TableCell>
                  <TableCell className="text-slate-500 text-xs">{m.joined}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" title="View Detail" onClick={() => router.push(`/admin/merchants/${encodeURIComponent(m.id)}`)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-blue-600" title="Visit Store" onClick={() => {
                        const slug = m.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
                        window.open(`/store/${slug}`, "_blank");
                      }}>
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500" title="Delete" onClick={() => setDeleteId(m.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
            <span>Showing {Math.min((safePage - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length} merchants</span>
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

      {/* Add Merchant Modal */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Merchant</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label>Store Name *</Label>
              <Input placeholder="e.g. TechZone BD" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Owner Name *</Label>
              <Input placeholder="Full name" value={form.owner} onChange={e => setForm({ ...form, owner: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Mobile Number *</Label>
              <Input placeholder="01XXXXXXXXX" value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" placeholder="owner@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Plan</Label>
              <select className="w-full h-10 border border-slate-200 rounded-lg px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.plan} onChange={e => setForm({ ...form, plan: e.target.value })}>
                {["Starter", "Growth", "Business"].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              <Button className="flex-1 gradient-primary text-white border-0" onClick={handleAdd}>Add Merchant</Button>
              <Button variant="outline" className="flex-1" onClick={() => setShowAdd(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Modal */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Merchant?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-slate-500 py-2">
            Are you sure you want to remove <strong>{merchants.find(m => m.id === deleteId)?.name}</strong>? This action cannot be undone.
          </p>
          <div className="flex gap-2">
            <Button variant="destructive" className="flex-1" onClick={() => deleteId && handleDelete(deleteId)}>Yes, Delete</Button>
            <Button variant="outline" className="flex-1" onClick={() => setDeleteId(null)}>Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Toast */}
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </>
  );
}
