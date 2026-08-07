"use client";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Globe, Search, CheckCircle, Clock, XCircle, ShieldCheck, X, RefreshCw } from "lucide-react";

type Domain = {
  store: string;
  subdomain: string;
  custom: string | null;
  ssl: boolean;
  status: string;
};

const initialDomains: Domain[] = [
  { store: "Dhaka Fashion Hub", subdomain: "dhakafashion.ccommerce.com.bd", custom: "dhakafashion.com", ssl: true, status: "Active" },
  { store: "Tech Gadgets BD", subdomain: "techgadgets.ccommerce.com.bd", custom: null, ssl: true, status: "Active" },
  { store: "Green Agro Store", subdomain: "greenagro.ccommerce.com.bd", custom: "greenagro.com.bd", ssl: false, status: "Pending DNS" },
  { store: "Baby World Shop", subdomain: "babyworld.ccommerce.com.bd", custom: null, ssl: true, status: "Active" },
  { store: "Sylhet Handicrafts", subdomain: "sylhetcraft.ccommerce.com.bd", custom: "sylhetcraft.shop", ssl: true, status: "Active" },
];

const statusIcon = (s: string) => {
  if (s === "Active") return <CheckCircle className="w-4 h-4 text-emerald-500" />;
  if (s === "Pending DNS") return <Clock className="w-4 h-4 text-amber-500" />;
  return <XCircle className="w-4 h-4 text-red-500" />;
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

function loadDomains(): Domain[] {
  if (typeof window === "undefined") return initialDomains;
  try {
    const raw = localStorage.getItem("admin_domains");
    return raw ? JSON.parse(raw) : initialDomains;
  } catch { return initialDomains; }
}

export default function AdminDomainsPage() {
  const [domains, setDomains] = useState(initialDomains);

  useEffect(() => { setDomains(loadDomains()); }, []);

  const saveDomains = (updated: Domain[]) => {
    setDomains(updated);
    localStorage.setItem("admin_domains", JSON.stringify(updated));
  };
  const [search, setSearch] = useState("");
  const [manageDomain, setManageDomain] = useState<Domain | null>(null);
  const [editCustom, setEditCustom] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const filtered = domains.filter(d =>
    d.store.toLowerCase().includes(search.toLowerCase()) ||
    d.subdomain.toLowerCase().includes(search.toLowerCase()) ||
    (d.custom ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const openManage = (d: Domain) => {
    setManageDomain(d);
    setEditCustom(d.custom ?? "");
  };

  const handleSaveCustomDomain = () => {
    if (!manageDomain) return;
    saveDomains(domains.map(d =>
      d.store === manageDomain.store
        ? { ...d, custom: editCustom || null, status: editCustom ? "Pending DNS" : d.status }
        : d
    ));
    setManageDomain(null);
    showToast(`Custom domain updated for ${manageDomain.store}.`);
  };

  const handleVerifySSL = () => {
    if (!manageDomain) return;
    saveDomains(domains.map(d =>
      d.store === manageDomain.store ? { ...d, ssl: true, status: "Active" } : d
    ));
    setManageDomain(null);
    showToast(`SSL verified for ${manageDomain.store}!`);
  };

  const handleRemoveCustom = () => {
    if (!manageDomain) return;
    saveDomains(domains.map(d =>
      d.store === manageDomain.store ? { ...d, custom: null } : d
    ));
    setManageDomain(null);
    showToast(`Custom domain removed from ${manageDomain.store}.`);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Domain Management</h1>
        <p className="text-slate-500 text-sm mt-1">Manage subdomains and custom domains for all merchant stores</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Domains", value: String(domains.length), color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Custom Domains", value: String(domains.filter(d => d.custom).length), color: "text-purple-600", bg: "bg-purple-50" },
          { label: "SSL Active", value: String(domains.filter(d => d.ssl).length), color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending Setup", value: String(domains.filter(d => d.status !== "Active").length), color: "text-amber-600", bg: "bg-amber-50" },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} rounded-xl p-4`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-slate-600 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* DNS Config Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Globe className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-blue-900 text-sm mb-1">Custom Domain Setup Instructions for Merchants</p>
            <p className="text-blue-700 text-xs">Merchants must point their domain&apos;s CNAME record to <code className="bg-blue-100 px-1 py-0.5 rounded">stores.ccommerce.com.bd</code> or A record to <code className="bg-blue-100 px-1 py-0.5 rounded">103.45.67.89</code>. SSL is provisioned automatically via Let&apos;s Encrypt within 24–48 hours.</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search stores or domains..."
              className="pl-9"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Badge variant="secondary" className="ml-auto">{filtered.length} domains</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {["Store", "Subdomain", "Custom Domain", "SSL", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-10 text-slate-400">No domains found</td></tr>
              ) : filtered.map((d, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{d.store}</td>
                  <td className="px-4 py-3 font-mono text-xs text-blue-600">{d.subdomain}</td>
                  <td className="px-4 py-3">
                    {d.custom ? (
                      <span className="font-mono text-xs text-purple-600">{d.custom}</span>
                    ) : (
                      <span className="text-slate-400 text-xs">Not configured</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {d.ssl ? (
                      <div className="flex items-center gap-1 text-emerald-600 text-xs">
                        <ShieldCheck className="w-4 h-4" /> Active
                      </div>
                    ) : (
                      <span className="text-amber-600 text-xs">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {statusIcon(d.status)}
                      <span className="text-xs text-slate-600">{d.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Button size="sm" variant="outline" className="text-xs" onClick={() => openManage(d)}>Manage</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manage Domain Modal */}
      <Dialog open={!!manageDomain} onOpenChange={() => setManageDomain(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Manage Domain — {manageDomain?.store}</DialogTitle></DialogHeader>
          {manageDomain && (
            <div className="space-y-4 pt-2">
              <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Subdomain</span>
                  <span className="font-mono text-xs text-blue-600">{manageDomain.subdomain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">SSL Status</span>
                  <span className={manageDomain.ssl ? "text-emerald-600" : "text-amber-600"}>
                    {manageDomain.ssl ? "Active" : "Pending"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Domain Status</span>
                  <span className="text-slate-700">{manageDomain.status}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Custom Domain</Label>
                <Input
                  placeholder="e.g. mystore.com"
                  value={editCustom}
                  onChange={e => setEditCustom(e.target.value)}
                />
                <p className="text-xs text-slate-400">Leave empty to remove custom domain.</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <Button className="gradient-primary text-white border-0 gap-2 flex-1" onClick={handleSaveCustomDomain}>
                  Save Domain
                </Button>
                {!manageDomain.ssl && (
                  <Button variant="outline" className="gap-2 text-emerald-700 border-emerald-200 hover:bg-emerald-50" onClick={handleVerifySSL}>
                    <RefreshCw className="w-4 h-4" /> Verify SSL
                  </Button>
                )}
                {manageDomain.custom && (
                  <Button variant="outline" className="gap-2 text-red-600 border-red-200 hover:bg-red-50" onClick={handleRemoveCustom}>
                    <X className="w-4 h-4" /> Remove Custom
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
