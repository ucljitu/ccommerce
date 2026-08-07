"use client";
import MerchantHeader from "@/components/merchant/MerchantHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Shield, CheckCircle, ExternalLink, AlertCircle } from "lucide-react";

export default function DomainPage() {
  return (
    <>
      <MerchantHeader title="Domain Settings" />
      <main className="flex-1 p-6 space-y-6 max-w-3xl">
        {/* Free subdomain */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center"><Globe className="w-5 h-5 text-blue-600" /></div>
            <div><h3 className="font-semibold text-slate-900">Your Free Subdomain</h3><p className="text-xs text-slate-500">Available on all plans</p></div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
              <Input className="border-0 bg-transparent flex-1 rounded-none" defaultValue="techzone-bd" />
              <span className="px-3 text-slate-500 text-sm bg-slate-100 h-10 flex items-center border-l border-slate-200">.ccommerce.com.bd</span>
            </div>
            <Button className="gradient-primary text-white border-0">Save</Button>
          </div>
          <div className="flex items-center gap-2 mt-3 text-emerald-600 text-sm">
            <CheckCircle className="w-4 h-4" />
            <span className="font-medium">Active:</span>
            <a href="#" className="underline flex items-center gap-1">techzone-bd.ccommerce.com.bd <ExternalLink className="w-3 h-3" /></a>
          </div>
        </div>

        {/* Custom domain */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center"><Shield className="w-5 h-5 text-purple-600" /></div>
              <div><h3 className="font-semibold text-slate-900">Custom Domain</h3><p className="text-xs text-slate-500">Business plan & above • Free SSL included</p></div>
            </div>
            <span className="px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Business Plan</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-500 block mb-1.5">Your Domain</label>
              <div className="flex gap-2">
                <Input placeholder="www.techzonebd.com" className="flex-1" />
                <Button className="gradient-primary text-white border-0">Connect</Button>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-amber-800">Add these DNS records to your domain provider</p>
              </div>
              <div className="space-y-2">
                {[
                  { type: "CNAME", name: "www", value: "ccommerce.com.bd" },
                  { type: "A", name: "@", value: "103.57.120.1" },
                ].map((r, i) => (
                  <div key={i} className="grid grid-cols-3 gap-2 text-xs">
                    <span className="font-mono bg-white border border-amber-200 rounded px-2 py-1 text-slate-700">{r.type}</span>
                    <span className="font-mono bg-white border border-amber-200 rounded px-2 py-1 text-slate-700">{r.name}</span>
                    <span className="font-mono bg-white border border-amber-200 rounded px-2 py-1 text-slate-700">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <Shield className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-sm font-medium text-slate-900">SSL Certificate</p>
                <p className="text-xs text-slate-500">Auto-provisioned via Let's Encrypt after domain verification</p>
              </div>
              <span className="ml-auto px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">Free</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
