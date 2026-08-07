"use client";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Clock, Mail, CheckCircle, X, ArrowRight } from "lucide-react";

type Trial = {
  id: string;
  store: string;
  owner: string;
  mobile: string;
  email: string;
  started: string;
  ends: string;
  daysLeft: number;
  products: number;
  converted?: boolean;
};

const initialTrials: Trial[] = [
  { id: "T-001", store: "Dhaka Fashion Hub", owner: "Karim Islam", mobile: "01812-111222", email: "karim@email.com", started: "Jun 20, 2026", ends: "Jul 4, 2026", daysLeft: 9, products: 12 },
  { id: "T-002", store: "Tech Gadgets BD", owner: "Nasrin Begum", mobile: "01711-333444", email: "nasrin@email.com", started: "Jun 22, 2026", ends: "Jul 6, 2026", daysLeft: 11, products: 8 },
  { id: "T-003", store: "Green Agro Store", owner: "Alam Hossain", mobile: "01612-555666", email: "alam@email.com", started: "Jun 10, 2026", ends: "Jun 24, 2026", daysLeft: 0, products: 22 },
  { id: "T-004", store: "Baby World Shop", owner: "Rina Akter", mobile: "01515-777888", email: "rina@email.com", started: "Jun 15, 2026", ends: "Jun 29, 2026", daysLeft: 4, products: 5 },
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

function loadTrials(): Trial[] {
  if (typeof window === "undefined") return initialTrials;
  try {
    const raw = localStorage.getItem("admin_trials");
    return raw ? JSON.parse(raw) : initialTrials;
  } catch { return initialTrials; }
}

export default function TrialStoresPage() {
  const [trials, setTrials] = useState(initialTrials);

  useEffect(() => { setTrials(loadTrials()); }, []);

  const saveTrials = (updated: Trial[]) => {
    setTrials(updated);
    localStorage.setItem("admin_trials", JSON.stringify(updated));
  };
  const [search, setSearch] = useState("");
  const [convertTarget, setConvertTarget] = useState<Trial | null>(null);
  const [emailTarget, setEmailTarget] = useState<Trial | null>(null);
  const [selectedPlan, setSelectedPlan] = useState("Starter");
  const [emailMessage, setEmailMessage] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const filtered = trials.filter(t =>
    t.store.toLowerCase().includes(search.toLowerCase()) ||
    t.owner.toLowerCase().includes(search.toLowerCase()) ||
    t.mobile.includes(search)
  );

  const handleConvert = () => {
    if (!convertTarget) return;
    saveTrials(trials.map(t =>
      t.id === convertTarget.id ? { ...t, converted: true } : t
    ));
    showToast(`${convertTarget.store} converted to ${selectedPlan} plan!`);
    setConvertTarget(null);
    setSelectedPlan("Starter");
  };

  const handleSendEmail = () => {
    if (!emailTarget || !emailMessage.trim()) return;
    showToast(`Email sent to ${emailTarget.owner} (${emailTarget.email})!`);
    setEmailMessage("");
    setEmailTarget(null);
  };

  const activeTrials = trials.filter(t => !t.converted && t.daysLeft > 0).length;
  const expiring = trials.filter(t => !t.converted && t.daysLeft > 0 && t.daysLeft <= 7).length;
  const expired = trials.filter(t => !t.converted && t.daysLeft === 0).length;
  const converted = trials.filter(t => t.converted).length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Trial Stores</h1>
        <p className="text-slate-500 text-sm mt-1">Manage merchants on free trial — convert them to paid plans</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Trials", value: String(activeTrials), color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Expiring in 7 days", value: String(expiring), color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Expired", value: String(expired), color: "text-red-600", bg: "bg-red-50" },
          { label: "Converted This Month", value: String(converted + 8), color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} rounded-xl p-4`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-slate-600 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search trial stores..."
              className="pl-9"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Badge variant="secondary" className="ml-auto">{filtered.length} stores</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {["Store", "Owner", "Mobile", "Trial Period", "Days Left", "Products", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-10 text-slate-400">No trial stores found</td></tr>
              ) : filtered.map((t) => (
                <tr key={t.id} className={`hover:bg-slate-50 ${t.converted ? "opacity-60" : ""}`}>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {t.store}
                    {t.converted && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Converted</span>}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{t.owner}</td>
                  <td className="px-4 py-3 text-slate-600">{t.mobile}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-xs">{t.started} – {t.ends}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {t.converted ? (
                      <Badge variant="success">Paid</Badge>
                    ) : t.daysLeft === 0 ? (
                      <Badge variant="destructive">Expired</Badge>
                    ) : t.daysLeft <= 5 ? (
                      <Badge variant="warning">{t.daysLeft}d left</Badge>
                    ) : (
                      <Badge variant="success">{t.daysLeft}d left</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{t.products}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="gradient-primary text-white border-0 text-xs gap-1"
                        disabled={!!t.converted}
                        onClick={() => setConvertTarget(t)}
                      >
                        <ArrowRight className="w-3 h-3" /> Convert
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs gap-1"
                        onClick={() => { setEmailTarget(t); setEmailMessage(""); }}
                      >
                        <Mail className="w-3 h-3" /> Email
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Convert Modal */}
      <Dialog open={!!convertTarget} onOpenChange={() => setConvertTarget(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Convert to Paid Plan</DialogTitle></DialogHeader>
          {convertTarget && (
            <div className="space-y-4 pt-2">
              <p className="text-sm text-slate-500">Convert <strong>{convertTarget.store}</strong> from Trial to a paid plan.</p>
              <div className="space-y-2">
                {["Starter", "Growth", "Business"].map(p => (
                  <label key={p} className={`flex items-center gap-3 border rounded-xl p-3 cursor-pointer transition-colors ${selectedPlan === p ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}>
                    <input type="radio" name="plan" value={p} checked={selectedPlan === p} onChange={() => setSelectedPlan(p)} className="accent-blue-600" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-slate-900">{p}</span>
                      <span className="text-xs text-slate-400 ml-2">{p === "Starter" ? "৳999/mo" : p === "Growth" ? "৳1,999/mo" : "৳3,999/mo"}</span>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 gradient-primary text-white border-0" onClick={handleConvert}>Convert Now</Button>
                <Button variant="outline" className="flex-1" onClick={() => setConvertTarget(null)}>Cancel</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Email Modal */}
      <Dialog open={!!emailTarget} onOpenChange={() => setEmailTarget(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Send Email — {emailTarget?.store}</DialogTitle></DialogHeader>
          {emailTarget && (
            <div className="space-y-4 pt-2">
              <div className="bg-slate-50 rounded-xl p-3 text-sm">
                <p className="text-slate-500 text-xs mb-1">To</p>
                <p className="font-medium text-slate-900">{emailTarget.owner} &lt;{emailTarget.email}&gt;</p>
              </div>
              <div className="space-y-1.5">
                <Label>Message</Label>
                <textarea
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={5}
                  placeholder={`Hi ${emailTarget.owner},\n\nYour free trial ends on ${emailTarget.ends}. Upgrade now to keep your store running!`}
                  value={emailMessage}
                  onChange={e => setEmailMessage(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1 gradient-primary text-white border-0 gap-2"
                  onClick={handleSendEmail}
                  disabled={!emailMessage.trim()}
                >
                  <Mail className="w-4 h-4" /> Send Email
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setEmailTarget(null)}>Cancel</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
