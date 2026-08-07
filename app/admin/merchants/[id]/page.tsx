"use client";
import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  ArrowLeft, Store, Phone, Mail, Package, ShoppingCart,
  TrendingUp, Edit, Trash2, ExternalLink, CheckCircle,
  X, AlertTriangle, Ban, RotateCcw
} from "lucide-react";

type Merchant = {
  id: string; name: string; owner: string; mobile: string;
  plan: string; status: string; orders: number; revenue: string;
  joined: string; email?: string;
};

const SEED_MERCHANTS: Merchant[] = [
  { id: "#M001", name: "TechZone BD", owner: "Rafiqul Islam", mobile: "01712345678", email: "rafiq@techzone.com", plan: "Growth", status: "Active", orders: 1240, revenue: "৳4,52,000", joined: "Jan 10, 2026" },
  { id: "#M002", name: "Style Avenue", owner: "Fatema Begum", mobile: "01812345678", email: "fatema@styleavenue.com", plan: "Starter", status: "Trial", orders: 342, revenue: "৳1,20,000", joined: "Jun 22, 2026" },
  { id: "#M003", name: "Fresh Grocery", owner: "Karim Hossain", mobile: "01912345678", email: "karim@freshgrocery.com", plan: "Business", status: "Active", orders: 4230, revenue: "৳12,05,000", joined: "Mar 15, 2026" },
  { id: "#M004", name: "Beauty Corner", owner: "Nasrin Akhter", mobile: "01612345678", email: "nasrin@beautycorner.com", plan: "Growth", status: "Active", orders: 2100, revenue: "৳6,78,000", joined: "Feb 18, 2026" },
  { id: "#M005", name: "Furniture House", owner: "Jahangir Alom", mobile: "01512345678", email: "jahangir@furniture.com", plan: "Starter", status: "Inactive", orders: 89, revenue: "৳82,000", joined: "Jun 10, 2026" },
  { id: "#M006", name: "Baby Bliss", owner: "Sumaiya Khatun", mobile: "01312345678", email: "sumaiya@babybliss.com", plan: "Growth", status: "Active", orders: 876, revenue: "৳3,24,000", joined: "Apr 5, 2026" },
  { id: "#M007", name: "PharmaCare BD", owner: "Dr. Rahim", mobile: "01412345678", email: "rahim@pharmacare.com", plan: "Business", status: "Active", orders: 3200, revenue: "৳9,60,000", joined: "Feb 1, 2026" },
  { id: "#M008", name: "RestaurantHub", owner: "Chef Salam", mobile: "01112345678", email: "salam@resthub.com", plan: "Growth", status: "Trial", orders: 124, revenue: "৳45,000", joined: "Jun 23, 2026" },
];

const recentOrders = [
  { id: "#ORD-1091", customer: "Rina Akter", amount: "৳1,250", status: "Delivered", date: "Jun 25, 2026" },
  { id: "#ORD-1088", customer: "Kamal Hossain", amount: "৳3,400", status: "Processing", date: "Jun 24, 2026" },
  { id: "#ORD-1085", customer: "Salma Begum", amount: "৳890", status: "Delivered", date: "Jun 23, 2026" },
  { id: "#ORD-1082", customer: "Jahir Islam", amount: "৳5,700", status: "Cancelled", date: "Jun 22, 2026" },
  { id: "#ORD-1079", customer: "Tania Akter", amount: "৳2,100", status: "Delivered", date: "Jun 21, 2026" },
];

const planColors: Record<string, string> = {
  Starter: "bg-slate-100 text-slate-700",
  Growth: "bg-blue-100 text-blue-700",
  Business: "bg-purple-100 text-purple-700",
  Enterprise: "bg-amber-100 text-amber-700",
};
const statusColors: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Trial: "bg-blue-100 text-blue-700",
  Inactive: "bg-slate-100 text-slate-600",
  Suspended: "bg-red-100 text-red-700",
};
const orderStatusColors: Record<string, string> = {
  Delivered: "text-emerald-600",
  Processing: "text-blue-600",
  Cancelled: "text-red-500",
};

function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
      {msg}
      <button onClick={onClose} className="ml-2 text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
    </div>
  );
}

export default function MerchantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const merchantId = decodeURIComponent(id);

  const [merchants, setMerchants] = useState<Merchant[]>(SEED_MERCHANTS);
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showSuspend, setShowSuspend] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Merchant>>({});
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("admin_merchants");
      const list: Merchant[] = raw ? JSON.parse(raw) : SEED_MERCHANTS;
      setMerchants(list);
      const found = list.find(m => m.id === merchantId);
      setMerchant(found ?? null);
      if (found) setEditForm(found);
    } catch {
      const found = SEED_MERCHANTS.find(m => m.id === merchantId);
      setMerchant(found ?? null);
      if (found) setEditForm(found);
    }
  }, [merchantId]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const persist = (updated: Merchant[]) => {
    setMerchants(updated);
    localStorage.setItem("admin_merchants", JSON.stringify(updated));
  };

  const handleEditSave = () => {
    if (!merchant || !editForm.name || !editForm.owner) return;
    const updated = merchants.map(m => m.id === merchant.id ? { ...m, ...editForm } as Merchant : m);
    persist(updated);
    setMerchant({ ...merchant, ...editForm } as Merchant);
    setShowEdit(false);
    showToast("Merchant updated!");
  };

  const handleDelete = () => {
    const updated = merchants.filter(m => m.id !== merchantId);
    persist(updated);
    showToast("Merchant deleted.");
    setTimeout(() => router.push("/admin/merchants"), 1000);
  };

  const handleToggleSuspend = () => {
    if (!merchant) return;
    const newStatus = merchant.status === "Suspended" ? "Active" : "Suspended";
    const updated = merchants.map(m => m.id === merchant.id ? { ...m, status: newStatus } : m);
    persist(updated);
    setMerchant({ ...merchant, status: newStatus });
    setShowSuspend(false);
    showToast(`Merchant ${newStatus === "Suspended" ? "suspended" : "reactivated"}!`);
  };

  if (!merchant) {
    return (
      <>
        <AdminHeader title="Merchant Detail" />
        <main className="flex-1 p-6">
          <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
            <p className="text-slate-400 text-lg">Merchant not found</p>
            <Link href="/admin/merchants" className="mt-4 inline-block text-blue-600 hover:underline text-sm">← Back to Merchants</Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <AdminHeader title="Merchant Detail" />
      <main className="flex-1 p-6 space-y-6">

        {/* Back */}
        <Link href="/admin/merchants" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-4 h-4" /> Back to Merchants
        </Link>

        {/* Header card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                <Store className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{merchant.name}</h2>
                <p className="text-slate-500 text-sm">{merchant.owner}</p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${planColors[merchant.plan] ?? "bg-slate-100 text-slate-700"}`}>{merchant.plan}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[merchant.status] ?? "bg-slate-100 text-slate-600"}`}>{merchant.status}</span>
                  <span className="text-xs text-slate-400">Joined {merchant.joined}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-1.5" onClick={() => { setEditForm(merchant); setShowEdit(true); }}>
                <Edit className="w-4 h-4" /> Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`gap-1.5 ${merchant.status === "Suspended" ? "text-emerald-600 border-emerald-200 hover:bg-emerald-50" : "text-amber-600 border-amber-200 hover:bg-amber-50"}`}
                onClick={() => setShowSuspend(true)}
              >
                {merchant.status === "Suspended"
                  ? <><RotateCcw className="w-4 h-4" /> Reactivate</>
                  : <><Ban className="w-4 h-4" /> Suspend</>
                }
              </Button>
              <Button
                size="sm"
                className="gap-1.5 gradient-primary text-white border-0"
                onClick={() => showToast(`Logging in as ${merchant.name}...`)}
              >
                <ExternalLink className="w-4 h-4" /> Login as Merchant
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => setShowDelete(true)}
              >
                <Trash2 className="w-4 h-4" /> Delete
              </Button>
            </div>
          </div>

          {/* Contact info */}
          <div className="mt-5 pt-5 border-t border-slate-100 flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Phone className="w-4 h-4 text-slate-400" />{merchant.mobile}
            </div>
            {merchant.email && (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Mail className="w-4 h-4 text-slate-400" />{merchant.email}
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Orders", value: merchant.orders.toLocaleString(), icon: ShoppingCart, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Total Revenue", value: merchant.revenue, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Products", value: "48", icon: Package, color: "text-purple-600", bg: "bg-purple-50" },
            { label: "Avg Order Value", value: "৳1,240", icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50" },
          ].map((s, i) => (
            <div key={i} className={`${s.bg} rounded-xl p-4 flex items-center gap-3`}>
              <s.icon className={`w-7 h-7 ${s.color}`} />
              <div>
                <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-slate-600">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Recent Orders</h3>
            <span className="text-xs text-slate-400">{merchant.orders.toLocaleString()} total orders</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {["Order ID", "Customer", "Amount", "Status", "Date"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{o.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{o.customer}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">{o.amount}</td>
                    <td className={`px-4 py-3 font-medium text-sm ${orderStatusColors[o.status]}`}>{o.status}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Edit Modal */}
      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Edit Merchant — {merchant.name}</DialogTitle></DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label>Store Name *</Label>
              <Input value={editForm.name ?? ""} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Owner Name *</Label>
              <Input value={editForm.owner ?? ""} onChange={e => setEditForm({ ...editForm, owner: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Mobile</Label>
              <Input value={editForm.mobile ?? ""} onChange={e => setEditForm({ ...editForm, mobile: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" value={editForm.email ?? ""} onChange={e => setEditForm({ ...editForm, email: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Plan</Label>
                <select className="w-full h-10 border border-slate-200 rounded-lg px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editForm.plan ?? "Starter"} onChange={e => setEditForm({ ...editForm, plan: e.target.value })}>
                  {["Starter", "Growth", "Business", "Enterprise"].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label>Status</Label>
                <select className="w-full h-10 border border-slate-200 rounded-lg px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editForm.status ?? "Active"} onChange={e => setEditForm({ ...editForm, status: e.target.value })}>
                  {["Active", "Trial", "Inactive", "Suspended"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button className="flex-1 gradient-primary text-white border-0" onClick={handleEditSave}>Save Changes</Button>
              <Button variant="outline" className="flex-1" onClick={() => setShowEdit(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Suspend Modal */}
      <Dialog open={showSuspend} onOpenChange={setShowSuspend}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{merchant.status === "Suspended" ? "Reactivate Merchant?" : "Suspend Merchant?"}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-slate-500 py-2 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            {merchant.status === "Suspended"
              ? `Reactivating ${merchant.name} will restore their store access immediately.`
              : `Suspending ${merchant.name} will block their store and admin panel access until reactivated.`
            }
          </p>
          <div className="flex gap-2">
            <Button
              className={`flex-1 ${merchant.status === "Suspended" ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-amber-500 hover:bg-amber-600 text-white"}`}
              onClick={handleToggleSuspend}
            >
              {merchant.status === "Suspended" ? "Yes, Reactivate" : "Yes, Suspend"}
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => setShowSuspend(false)}>Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Delete Merchant?</DialogTitle></DialogHeader>
          <p className="text-sm text-slate-500 py-2">
            Permanently delete <strong>{merchant.name}</strong>? All their data will be removed. This cannot be undone.
          </p>
          <div className="flex gap-2">
            <Button variant="destructive" className="flex-1" onClick={handleDelete}>Yes, Delete</Button>
            <Button variant="outline" className="flex-1" onClick={() => setShowDelete(false)}>Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </>
  );
}
