"use client";
import MerchantHeader from "@/components/merchant/MerchantHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Save, Upload } from "lucide-react";

export default function SettingsPage() {
  return (
    <>
      <MerchantHeader title="Store Settings" />
      <main className="flex-1 p-6">
        <Tabs defaultValue="general" className="space-y-5">
          <TabsList className="flex-wrap h-auto gap-1">
            {["general", "contact", "social", "seo", "integrations", "notifications"].map(tab => (
              <TabsTrigger key={tab} value={tab} className="capitalize">{tab}</TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="general">
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 max-w-2xl">
              <h3 className="font-semibold text-slate-900">General Settings</h3>
              <Separator />
              {/* Logo upload */}
              <div>
                <label className="text-xs font-medium text-slate-500 block mb-2">Store Logo</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-2xl border-2 border-dashed border-slate-300">🛒</div>
                  <Button variant="outline" size="sm" className="gap-2"><Upload className="w-4 h-4" />Upload Logo</Button>
                </div>
              </div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Store Name *</label><Input defaultValue="TechZone BD" /></div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Store Tagline</label><Input defaultValue="Bangladesh's Best Gadget Store" /></div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Store Description</label><Textarea defaultValue="We sell premium electronics, gadgets, and accessories at the best prices in Bangladesh." rows={3} /></div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Store Currency</label>
                  <select className="w-full h-10 border border-slate-200 rounded-lg px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"><option>BDT (৳) - Bangladeshi Taka</option></select>
                </div>
                <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Store Language</label>
                  <select className="w-full h-10 border border-slate-200 rounded-lg px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"><option>English</option><option>Bangla</option><option>Both</option></select>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div><p className="text-sm font-medium text-slate-900">Store Active</p><p className="text-xs text-slate-500">Turn off to put store in maintenance mode</p></div>
                <Switch defaultChecked />
              </div>
              <Button className="gradient-primary text-white border-0 gap-2"><Save className="w-4 h-4" />Save Settings</Button>
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 max-w-2xl">
              <h3 className="font-semibold text-slate-900">Contact Information</h3>
              <Separator />
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Business Email</label><Input defaultValue="info@techzonebd.com" type="email" /></div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">WhatsApp Number</label><Input defaultValue="+880 1712-345678" /></div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Phone Number</label><Input defaultValue="01712345678" /></div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Business Address</label><Textarea defaultValue="Shop #12, Level 3, Bashundhara City, Dhaka-1229" rows={2} /></div>
              <Button className="gradient-primary text-white border-0 gap-2"><Save className="w-4 h-4" />Save Contact</Button>
            </div>
          </TabsContent>

          <TabsContent value="integrations">
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 max-w-2xl">
              <h3 className="font-semibold text-slate-900">Marketing Integrations</h3>
              <Separator />
              {[
                { label: "Facebook Pixel ID", placeholder: "1234567890123456", desc: "Track conversions and run retargeting ads" },
                { label: "Google Analytics (G4) ID", placeholder: "G-XXXXXXXXXX", desc: "Track traffic and user behavior" },
                { label: "Google Tag Manager ID", placeholder: "GTM-XXXXXXX", desc: "Manage all tags without code changes" },
                { label: "Hotjar Site ID", placeholder: "1234567", desc: "Record sessions and heatmaps" },
              ].map((f, i) => (
                <div key={i}>
                  <label className="text-xs font-medium text-slate-500 block mb-1">{f.label}</label>
                  <p className="text-xs text-slate-400 mb-1.5">{f.desc}</p>
                  <Input placeholder={f.placeholder} />
                </div>
              ))}
              <Button className="gradient-primary text-white border-0 gap-2"><Save className="w-4 h-4" />Save Integrations</Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
