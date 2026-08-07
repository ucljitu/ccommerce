"use client";
import MerchantHeader from "@/components/merchant/MerchantHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Upload, GripVertical } from "lucide-react";

const banners = [
  { title: "Eid Special Sale", subtitle: "Up to 30% off on all gadgets", link: "/shop?tag=eid-sale", position: "Home Hero", status: true, img: "🎉" },
  { title: "New Arrivals", subtitle: "Check out our latest products", link: "/shop?tag=new", position: "Home Section 1", status: true, img: "✨" },
  { title: "Free Delivery", subtitle: "On orders above ৳2,000", link: "/shop", position: "Home Section 2", status: true, img: "🚚" },
  { title: "Summer Collection", subtitle: "Stay cool with our new picks", link: "/category/summer", position: "Category Page", status: false, img: "☀️" },
];

export default function BannersPage() {
  return (
    <>
      <MerchantHeader title="Banners" />
      <main className="flex-1 p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upload */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 h-fit">
            <h3 className="font-semibold text-slate-900 mb-5">Add New Banner</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-500 block mb-1.5">Banner Image</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">Click to upload<br />1200×450px recommended</p>
                </div>
              </div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Title</label><Input placeholder="Eid Special Sale" /></div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Subtitle</label><Input placeholder="Up to 30% off" /></div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Link URL</label><Input placeholder="/shop?tag=sale" /></div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Position</label>
                <select className="w-full h-10 border border-slate-200 rounded-lg px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Home Hero</option><option>Home Section 1</option><option>Home Section 2</option><option>Category Page</option><option>Shop Page</option>
                </select>
              </div>
              <Button className="w-full gradient-primary text-white border-0 gap-2"><Plus className="w-4 h-4" />Add Banner</Button>
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex justify-between items-center"><h3 className="font-semibold text-slate-900">Active Banners</h3><p className="text-xs text-slate-500">Drag to reorder</p></div>
            {banners.map((b, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4">
                <GripVertical className="w-4 h-4 text-slate-300 cursor-grab" />
                <div className="w-24 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-3xl shrink-0">{b.img}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 truncate">{b.title}</p>
                  <p className="text-xs text-slate-500 truncate">{b.subtitle}</p>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded mt-1 inline-block">{b.position}</span>
                </div>
                <Switch defaultChecked={b.status} />
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
