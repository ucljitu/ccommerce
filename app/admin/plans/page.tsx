"use client";
import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Users, Check, CheckCircle, X } from "lucide-react";

type Plan = {
  id: string;
  name: string;
  price: string;
  period: string;
  merchants: number;
  revenue: string;
  color: string;
  features: string[];
};

const initialPlans: Plan[] = [
  { id: "p1", name: "Starter", price: "৳999", period: "month", merchants: 2100, revenue: "৳20.97L", color: "border-slate-200", features: ["1 Store", "100 Products", "Unlimited Orders", "bKash & COD", "5 Themes", "Email Support"] },
  { id: "p2", name: "Growth", price: "৳1,999", period: "month", merchants: 2350, revenue: "৳46.97L", color: "border-blue-400", features: ["1 Store", "Unlimited Products", "All Payments", "20+ Themes", "Facebook Pixel", "3 Staff Users", "Priority Support"] },
  { id: "p3", name: "Business", price: "৳3,999", period: "month", merchants: 720, revenue: "৳28.79L", color: "border-purple-400", features: ["3 Stores", "Unlimited Products", "Custom Domain", "All Themes", "10 Staff Users", "API Access", "Phone Support"] },
  { id: "p4", name: "Enterprise", price: "Custom", period: "", merchants: 114, revenue: "৳34.2L", color: "border-amber-400", features: ["Unlimited Stores", "White-label", "Dedicated Server", "SLA", "Custom Features", "Account Manager"] },
];

function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
      {msg}
      <button onClick={onClose} className="ml-2 text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
    </div>
  );
}

function loadPlans(): Plan[] {
  if (typeof window === "undefined") return initialPlans;
  try {
    const raw = localStorage.getItem("admin_plans");
    return raw ? JSON.parse(raw) : initialPlans;
  } catch { return initialPlans; }
}

export default function PlansPage() {
  const [plans, setPlans] = useState(initialPlans);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => { setPlans(loadPlans()); }, []);

  const savePlans = (updated: Plan[]) => {
    setPlans(updated);
    localStorage.setItem("admin_plans", JSON.stringify(updated));
  };
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editPlan, setEditPlan] = useState<Plan | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", period: "month", featuresRaw: "" });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const handleDelete = (id: string) => {
    savePlans(plans.filter(p => p.id !== id));
    setDeleteId(null);
    showToast("Plan deleted.");
  };

  const handleCreate = () => {
    if (!form.name || !form.price) return;
    const newPlan: Plan = {
      id: `p${Date.now()}`,
      name: form.name,
      price: form.price,
      period: form.period,
      merchants: 0,
      revenue: "৳0",
      color: "border-slate-200",
      features: form.featuresRaw.split("\n").map(f => f.trim()).filter(Boolean),
    };
    savePlans([...plans, newPlan]);
    setForm({ name: "", price: "", period: "month", featuresRaw: "" });
    setShowCreate(false);
    showToast(`Plan "${newPlan.name}" created!`);
  };

  const handleEditSave = () => {
    if (!editPlan) return;
    savePlans(plans.map(p => p.id === editPlan.id ? editPlan : p));
    setEditPlan(null);
    showToast(`Plan "${editPlan.name}" updated!`);
  };

  return (
    <>
      <AdminHeader title="Plans" />
      <main className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-slate-500">Manage subscription plans and pricing</p>
          <Button className="gradient-primary text-white border-0 gap-2" onClick={() => setShowCreate(true)}>
            <Plus className="w-4 h-4" />Create Plan
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div key={plan.id} className={`bg-white rounded-2xl border-2 ${plan.color} p-6 flex flex-col`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-bold text-slate-900">{plan.price}</span>
                    {plan.period && <span className="text-slate-500 text-sm">/{plan.period}</span>}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                    onClick={() => setEditPlan({ ...plan })}
                  >
                    <Edit className="w-4 h-4 text-slate-500" />
                  </button>
                  <button
                    className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                    onClick={() => setDeleteId(plan.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-50 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-slate-900">{plan.merchants.toLocaleString()}</p>
                  <p className="text-xs text-slate-500">Merchants</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-3 text-center">
                  <p className="text-sm font-bold text-emerald-700">{plan.revenue}</p>
                  <p className="text-xs text-slate-500">Revenue</p>
                </div>
              </div>

              <ul className="space-y-2 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      {/* Create Plan Modal */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Create New Plan</DialogTitle></DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label>Plan Name *</Label>
              <Input placeholder="e.g. Premium" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Price *</Label>
                <Input placeholder="e.g. ৳2,499" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Period</Label>
                <select className="w-full h-10 border border-slate-200 rounded-lg px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.period} onChange={e => setForm({ ...form, period: e.target.value })}>
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
                  <option value="">One-time / Custom</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Features (one per line)</Label>
              <textarea
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={5}
                placeholder={"1 Store\nUnlimited Products\nCustom Domain"}
                value={form.featuresRaw}
                onChange={e => setForm({ ...form, featuresRaw: e.target.value })}
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button className="flex-1 gradient-primary text-white border-0" onClick={handleCreate}>Create Plan</Button>
              <Button variant="outline" className="flex-1" onClick={() => setShowCreate(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Plan Modal */}
      <Dialog open={!!editPlan} onOpenChange={() => setEditPlan(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Edit Plan — {editPlan?.name}</DialogTitle></DialogHeader>
          {editPlan && (
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label>Plan Name</Label>
                <Input value={editPlan.name} onChange={e => setEditPlan({ ...editPlan, name: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Price</Label>
                  <Input value={editPlan.price} onChange={e => setEditPlan({ ...editPlan, price: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Period</Label>
                  <select className="w-full h-10 border border-slate-200 rounded-lg px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editPlan.period} onChange={e => setEditPlan({ ...editPlan, period: e.target.value })}>
                    <option value="month">Monthly</option>
                    <option value="year">Yearly</option>
                    <option value="">One-time / Custom</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Features (one per line)</Label>
                <textarea
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={5}
                  value={editPlan.features.join("\n")}
                  onChange={e => setEditPlan({ ...editPlan, features: e.target.value.split("\n").map(f => f.trim()).filter(Boolean) })}
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button className="flex-1 gradient-primary text-white border-0" onClick={handleEditSave}>Save Changes</Button>
                <Button variant="outline" className="flex-1" onClick={() => setEditPlan(null)}>Cancel</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Modal */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Delete Plan?</DialogTitle></DialogHeader>
          <p className="text-sm text-slate-500 py-2">
            Are you sure you want to delete <strong>{plans.find(p => p.id === deleteId)?.name}</strong>? Existing subscribers won&apos;t be affected.
          </p>
          <div className="flex gap-2">
            <Button variant="destructive" className="flex-1" onClick={() => deleteId && handleDelete(deleteId)}>Yes, Delete</Button>
            <Button variant="outline" className="flex-1" onClick={() => setDeleteId(null)}>Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </>
  );
}
