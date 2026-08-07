"use client";
import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, X, AlertCircle } from "lucide-react";

const DEFAULT_PLATFORM = {
  name: "C Commerce",
  supportEmail: "support@ccommerce.com.bd",
  supportPhone: "+880 1700-000000",
  tagline: "Bangladesh's Smart Ecommerce SaaS Platform",
  announcement: "",
};

const DEFAULT_FLAGS = [
  { label: "Trial Accounts", desc: "Allow new merchants to sign up for free trials", on: true },
  { label: "bKash Payments", desc: "Enable bKash payment integration platform-wide", on: true },
  { label: "Nagad Payments", desc: "Enable Nagad payment integration", on: true },
  { label: "Custom Domains", desc: "Allow merchants to connect custom domains", on: true },
  { label: "Maintenance Mode", desc: "Put the entire platform in maintenance mode", on: false },
  { label: "New Registrations", desc: "Allow new merchant registrations", on: true },
];

const DEFAULT_SMTP = { host: "", port: "", username: "", password: "" };

function Toast({ msg, type = "success", onClose }: { msg: string; type?: "success" | "error"; onClose: () => void }) {
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-2 px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-2 ${type === "error" ? "bg-red-600 text-white" : "bg-slate-900 text-white"}`}>
      {type === "error"
        ? <AlertCircle className="w-4 h-4 text-red-200 shrink-0" />
        : <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
      }
      {msg}
      <button onClick={onClose} className="ml-2 text-white/60 hover:text-white"><X className="w-4 h-4" /></button>
    </div>
  );
}

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function SettingsPage() {
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [platform, setPlatform] = useState(DEFAULT_PLATFORM);
  const [flags, setFlags] = useState(DEFAULT_FLAGS);
  const [smtp, setSmtp] = useState(DEFAULT_SMTP);
  const [platformError, setPlatformError] = useState("");
  const [smtpError, setSmtpError] = useState("");

  // Load persisted values on mount
  useEffect(() => {
    setPlatform(load("admin_platform", DEFAULT_PLATFORM));
    setFlags(load("admin_flags", DEFAULT_FLAGS));
    setSmtp(load("admin_smtp", DEFAULT_SMTP));
  }, []);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSavePlatform = () => {
    if (!platform.name.trim()) {
      setPlatformError("Platform name is required.");
      return;
    }
    if (!platform.supportEmail.trim()) {
      setPlatformError("Support email is required.");
      return;
    }
    setPlatformError("");
    localStorage.setItem("admin_platform", JSON.stringify(platform));
    showToast("Platform settings saved!");
  };

  const handleSaveSmtp = () => {
    if (!smtp.host.trim() || !smtp.port.trim()) {
      setSmtpError("SMTP Host and Port are required.");
      return;
    }
    setSmtpError("");
    // Don't persist password in localStorage — just save the rest
    const { password, ...safeSmtp } = smtp;
    localStorage.setItem("admin_smtp", JSON.stringify({ ...safeSmtp, password: "" }));
    showToast("SMTP settings saved!");
  };

  const toggleFlag = (i: number) => {
    const updated = flags.map((f, idx) => idx === i ? { ...f, on: !f.on } : f);
    setFlags(updated);
    localStorage.setItem("admin_flags", JSON.stringify(updated));
    showToast(`${updated[i].label} ${updated[i].on ? "enabled" : "disabled"}.`);
  };

  return (
    <>
      <AdminHeader title="System Settings" />
      <main className="flex-1 p-6 max-w-3xl space-y-6">

        {/* Platform Settings */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-1">Platform Settings</h3>
          <p className="text-sm text-slate-500 mb-6">Configure global platform settings</p>
          <Separator className="mb-6" />
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Platform Name *</Label>
              <Input
                value={platform.name}
                onChange={e => { setPlatform({ ...platform, name: e.target.value }); setPlatformError(""); }}
                className={platformError && !platform.name.trim() ? "border-red-400 focus-visible:ring-red-400" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Support Email *</Label>
              <Input
                type="email"
                value={platform.supportEmail}
                onChange={e => { setPlatform({ ...platform, supportEmail: e.target.value }); setPlatformError(""); }}
                className={platformError && !platform.supportEmail.trim() ? "border-red-400 focus-visible:ring-red-400" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Support Phone</Label>
              <Input
                value={platform.supportPhone}
                onChange={e => setPlatform({ ...platform, supportPhone: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Platform Tagline</Label>
              <Input
                value={platform.tagline}
                onChange={e => setPlatform({ ...platform, tagline: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Announcement Banner</Label>
              <Textarea
                placeholder="Optional platform-wide announcement..."
                rows={2}
                value={platform.announcement}
                onChange={e => setPlatform({ ...platform, announcement: e.target.value })}
              />
            </div>
          </div>
          {platformError && (
            <p className="mt-3 text-sm text-red-500 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />{platformError}
            </p>
          )}
          <Button className="mt-6 gradient-primary text-white border-0" onClick={handleSavePlatform}>
            Save Changes
          </Button>
        </div>

        {/* Feature Flags */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-1">Feature Flags</h3>
          <p className="text-sm text-slate-500 mb-6">Toggle platform features globally — changes save automatically</p>
          <Separator className="mb-6" />
          <div className="space-y-5">
            {flags.map((flag, i) => (
              <div key={i} className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-900">{flag.label}</p>
                  <p className="text-xs text-slate-500">{flag.desc}</p>
                </div>
                <Switch checked={flag.on} onCheckedChange={() => toggleFlag(i)} />
              </div>
            ))}
          </div>
        </div>

        {/* SMTP */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-1">Email (SMTP) Settings</h3>
          <p className="text-sm text-slate-500 mb-6">Configure outgoing email server</p>
          <Separator className="mb-6" />
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>SMTP Host *</Label>
                <Input
                  placeholder="smtp.gmail.com"
                  value={smtp.host}
                  onChange={e => { setSmtp({ ...smtp, host: e.target.value }); setSmtpError(""); }}
                  className={smtpError && !smtp.host.trim() ? "border-red-400 focus-visible:ring-red-400" : ""}
                />
              </div>
              <div className="space-y-1.5">
                <Label>SMTP Port *</Label>
                <Input
                  placeholder="587"
                  value={smtp.port}
                  onChange={e => { setSmtp({ ...smtp, port: e.target.value }); setSmtpError(""); }}
                  className={smtpError && !smtp.port.trim() ? "border-red-400 focus-visible:ring-red-400" : ""}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>SMTP Username</Label>
              <Input
                placeholder="noreply@ccommerce.com.bd"
                value={smtp.username}
                onChange={e => setSmtp({ ...smtp, username: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>SMTP Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={smtp.password}
                onChange={e => setSmtp({ ...smtp, password: e.target.value })}
              />
            </div>
          </div>
          {smtpError && (
            <p className="mt-3 text-sm text-red-500 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />{smtpError}
            </p>
          )}
          <Button className="mt-6 gradient-primary text-white border-0" onClick={handleSaveSmtp}>
            Save SMTP
          </Button>
        </div>

      </main>

      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
