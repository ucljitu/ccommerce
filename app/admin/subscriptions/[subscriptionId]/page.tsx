"use client";
import { use, useState, useEffect } from "react";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, X, ArrowLeft, RefreshCw, XCircle, CreditCard, AlertTriangle } from "lucide-react";

const subData: Record<string, {
  merchant: string; plan: string; amount: string; status: string;
  start: string; next: string; method: string; orders: number; revenue: string;
}> = {
  sub001: { merchant: "TechZone BD", plan: "Growth", amount: "৳1,999", status: "Active", start: "Jun 1, 2026", next: "Jul 1, 2026", method: "bKash", orders: 1240, revenue: "৳4,52,000" },
  sub002: { merchant: "Fresh Grocery", plan: "Business", amount: "৳3,999", status: "Active", start: "May 15, 2026", next: "Jul 15, 2026", method: "Nagad", orders: 4230, revenue: "৳12,05,000" },
  sub003: { merchant: "Style Avenue", plan: "Starter", amount: "৳999", status: "Trial", start: "Jun 22, 2026", next: "Jul 6, 2026", method: "—", orders: 342, revenue: "৳1,20,000" },
  sub004: { merchant: "Beauty Corner", plan: "Growth", amount: "৳1,999", status: "Active", start: "Feb 1, 2026", next: "Jul 1, 2026", method: "Card", orders: 2100, revenue: "৳6,78,000" },
  sub005: { merchant: "Furniture House", plan: "Starter", amount: "৳999", status: "Expired", start: "May 1, 2026", next: "Jun 1, 2026", method: "bKash", orders: 89, revenue: "৳82,000" },
};

const planColors: Record<string, string> = {
  Starter: "bg-slate-100 text-slate-700",
  Growth: "bg-blue-100 text-blue-700",
  Business: "bg-purple-100 text-purple-700",
  Enterprise: "bg-amber-100 text-amber-700",
  Trial: "bg-cyan-100 text-cyan-700",
};

const statusColors: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Trial: "bg-blue-100 text-blue-700",
  Expired: "bg-red-100 text-red-700",
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

export default function SubscriptionDetailPage({ params }: { params: Promise<{ subscriptionId: string }> }) {
  const { subscriptionId } = use(params);
  const sub = subData[subscriptionId] ?? {
    merchant: subscriptionId.toUpperCase(), plan: "Unknown", amount: "—", status: "Unknown",
    start: "—", next: "—", method: "—", orders: 0, revenue: "৳0",
  };

  const storageKey = `admin_sub_${subscriptionId}`;

  const [status, setStatus] = useState(sub.status);
  const [plan, setPlan] = useState(sub.plan);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.status) setStatus(saved.status);
        if (saved.plan) setPlan(saved.plan);
      }
    } catch { /* ignore */ }
  }, [storageKey]);

  const persist = (newStatus: string, newPlan: string) => {
    localStorage.setItem(storageKey, JSON.stringify({ status: newStatus, plan: newPlan }));
  };
  const [showChangePlan, setShowChangePlan] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [newPlan, setNewPlan] = useState(sub.plan);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const handleRenew = () => {
    setStatus("Active");
    persist("Active", plan);
    showToast("Subscription renewed successfully!");
  };

  const handleChangePlan = () => {
    setPlan(newPlan);
    setShowChangePlan(false);
    persist(status, newPlan);
    showToast(`Plan changed to ${newPlan}!`);
  };

  const handleCancel = () => {
    setStatus("Expired");
    setShowCancel(false);
    persist("Expired", plan);
    showToast("Subscription cancelled.");
  };

  return (
    <>
      <AdminHeader title="Subscription Detail" />
      <main className="flex-1 p-6 space-y-5 max-w-3xl">
        <Link href="/admin/subscriptions" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-4 h-4" /> Back to Subscriptions
        </Link>

        {/* Detail card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">{sub.merchant}</h2>
              <p className="text-slate-500 text-sm mt-0.5 font-mono">{subscriptionId.toUpperCase()}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status] ?? "bg-slate-100 text-slate-600"}`}>{status}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: "Plan", value: <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${planColors[plan] ?? ""}`}>{plan}</span> },
              { label: "Amount", value: <span className="font-semibold text-slate-900">{sub.amount}/mo</span> },
              { label: "Payment Method", value: sub.method },
              { label: "Start Date", value: sub.start },
              { label: "Next Billing", value: sub.next },
              { label: "Total Orders", value: sub.orders.toLocaleString() },
              { label: "Total Revenue", value: <span className="font-semibold text-emerald-700">{sub.revenue}</span> },
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                <div className="text-sm text-slate-700">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Management Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              className="gap-2 gradient-primary text-white border-0"
              onClick={handleRenew}
              disabled={status === "Active"}
            >
              <RefreshCw className="w-4 h-4" /> Renew Subscription
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => setShowChangePlan(true)}>
              <CreditCard className="w-4 h-4" /> Change Plan
            </Button>
            <Button
              variant="outline"
              className="gap-2 text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => setShowCancel(true)}
              disabled={status === "Expired"}
            >
              <XCircle className="w-4 h-4" /> Cancel Subscription
            </Button>
          </div>
          {status === "Active" && (
            <p className="text-xs text-slate-400 mt-3 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Subscription is active and auto-renews on {sub.next}
            </p>
          )}
          {status === "Expired" && (
            <p className="text-xs text-red-400 mt-3 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Subscription has expired. Click Renew to reactivate.
            </p>
          )}
        </div>
      </main>

      {/* Change Plan Modal */}
      <Dialog open={showChangePlan} onOpenChange={setShowChangePlan}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Change Subscription Plan</DialogTitle></DialogHeader>
          <p className="text-sm text-slate-500">Current plan: <strong>{plan}</strong></p>
          <div className="space-y-2 mt-2">
            {["Starter", "Growth", "Business", "Enterprise"].map(p => (
              <label key={p} className={`flex items-center gap-3 border rounded-xl p-3 cursor-pointer transition-colors ${newPlan === p ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}>
                <input type="radio" name="plan" value={p} checked={newPlan === p} onChange={() => setNewPlan(p)} className="accent-blue-600" />
                <span className="text-sm font-medium text-slate-900">{p}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <Button className="flex-1 gradient-primary text-white border-0" onClick={handleChangePlan}>Confirm Change</Button>
            <Button variant="outline" className="flex-1" onClick={() => setShowChangePlan(false)}>Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cancel Confirm Modal */}
      <Dialog open={showCancel} onOpenChange={setShowCancel}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Cancel Subscription?</DialogTitle></DialogHeader>
          <p className="text-sm text-slate-500 py-2">
            Are you sure you want to cancel <strong>{sub.merchant}</strong>&apos;s subscription? They will lose access at the end of the billing cycle.
          </p>
          <div className="flex gap-2">
            <Button variant="destructive" className="flex-1" onClick={handleCancel}>Yes, Cancel</Button>
            <Button variant="outline" className="flex-1" onClick={() => setShowCancel(false)}>Keep Active</Button>
          </div>
        </DialogContent>
      </Dialog>

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </>
  );
}
