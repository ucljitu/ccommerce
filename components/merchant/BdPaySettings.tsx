"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, KeyRound, LoaderCircle, Save, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

type Setting = {
  configured: boolean;
  mode: "sandbox" | "production";
  enabled: boolean;
  keyLastFour: string | null;
};

export default function BdPaySettings() {
  const [setting, setSetting] = useState<Setting>({
    configured: false,
    mode: "sandbox",
    enabled: false,
    keyLastFour: null,
  });
  const [apiKey, setApiKey] = useState("");
  const [confirmProduction, setConfirmProduction] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/merchant/payments/bdpay", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Payment settings could not be loaded.");
        return response.json() as Promise<Setting>;
      })
      .then(setSetting)
      .catch((reason: Error) => setError(reason.message))
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setError("");
    setMessage("");
    if (!apiKey.trim()) {
      setError("Enter your Bd Payment API key. Saved keys are never returned to the browser.");
      return;
    }
    setSaving(true);
    try {
      const response = await fetch("/api/merchant/payments/bdpay", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey,
          mode: setting.mode,
          enabled: setting.enabled,
          confirmProduction,
        }),
      });
      const result = (await response.json()) as {
        message?: string;
        mode?: "sandbox" | "production";
        enabled?: boolean;
        keyLastFour?: string;
      };
      if (!response.ok) throw new Error(result.message || "Payment settings could not be saved.");
      setSetting({
        configured: true,
        mode: result.mode ?? setting.mode,
        enabled: Boolean(result.enabled),
        keyLastFour: result.keyLastFour ?? null,
      });
      setApiKey("");
      setConfirmProduction(false);
      setMessage("Bd Payment settings saved securely.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Payment settings could not be saved.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex min-h-40 items-center justify-center rounded-xl border border-slate-200 bg-white"><LoaderCircle className="h-6 w-6 animate-spin text-blue-600 motion-reduce:animate-none" /><span className="sr-only">Loading payment settings</span></div>;
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5" aria-labelledby="bdpay-title">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><ShieldCheck className="h-5 w-5" /></div>
          <div>
            <h2 id="bdpay-title" className="font-semibold text-slate-900">Bd Payment</h2>
            <p className="mt-1 text-sm text-slate-500">Your API key is encrypted before it is stored.</p>
          </div>
        </div>
        {setting.mode === "sandbox" && <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">Test Mode</span>}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="bdpay-mode" className="mb-1.5 block text-sm font-medium text-slate-700">Mode</label>
          <select id="bdpay-mode" value={setting.mode} onChange={(event) => { setSetting((current) => ({ ...current, mode: event.target.value as Setting["mode"], enabled: false })); setConfirmProduction(false); }} className="min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            <option value="sandbox">Sandbox</option>
            <option value="production">Production</option>
          </select>
        </div>
        <div>
          <label htmlFor="bdpay-key" className="mb-1.5 block text-sm font-medium text-slate-700">API Key</label>
          <div className="relative"><KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><Input id="bdpay-key" type="password" autoComplete="new-password" value={apiKey} onChange={(event) => setApiKey(event.target.value)} placeholder={setting.keyLastFour ? `Saved key ending in ••••${setting.keyLastFour}` : "Enter your API key"} className="min-h-11 pl-9" /></div>
          <p className="mt-1.5 text-xs text-slate-500">For security, enter the key again whenever you save these settings.</p>
        </div>
      </div>

      {setting.mode === "production" && <label className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900"><input type="checkbox" checked={confirmProduction} onChange={(event) => setConfirmProduction(event.target.checked)} className="mt-1" /><span>I confirm this is a Live API key and real customer payments may be processed.</span></label>}

      <div className="mt-5 flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4">
        <div><p className="text-sm font-medium text-slate-900">Enable Bd Payment</p><p className="mt-0.5 text-xs text-slate-500">Customers can use it only after a valid key is saved.</p></div>
        <Switch checked={setting.enabled} onCheckedChange={(enabled) => setSetting((current) => ({ ...current, enabled }))} aria-label="Enable Bd Payment" />
      </div>

      <div aria-live="polite" className="mt-4">
        {error && <p className="flex items-center gap-2 text-sm text-red-600"><AlertCircle className="h-4 w-4" />{error}</p>}
        {message && <p className="flex items-center gap-2 text-sm text-emerald-700"><CheckCircle2 className="h-4 w-4" />{message}</p>}
      </div>
      <Button onClick={save} disabled={saving} className="mt-5 min-h-11 bg-blue-600 text-white hover:bg-blue-700">{saving ? <LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" /> : <Save className="h-4 w-4" />}{saving ? "Saving..." : "Save Bd Payment Settings"}</Button>
    </section>
  );
}
