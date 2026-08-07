"use client";
import MerchantHeader from "@/components/merchant/MerchantHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Search } from "lucide-react";

const categories = [
  { id: 1, name: "Electronics", slug: "electronics", products: 98, icon: "⚡", status: "Active", parent: "—" },
  { id: 2, name: "Mobile Accessories", slug: "mobile-accessories", products: 64, icon: "📱", status: "Active", parent: "Electronics" },
  { id: 3, name: "Chargers & Cables", slug: "chargers-cables", products: 22, icon: "🔌", status: "Active", parent: "Electronics" },
  { id: 4, name: "Audio & Headphones", slug: "audio", products: 18, icon: "🎧", status: "Active", parent: "Electronics" },
  { id: 5, name: "Wearables", slug: "wearables", products: 14, icon: "⌚", status: "Active", parent: "Electronics" },
  { id: 6, name: "Laptop & Computing", slug: "laptops", products: 30, icon: "💻", status: "Active", parent: "Electronics" },
  { id: 7, name: "Gaming", slug: "gaming", products: 12, icon: "🎮", status: "Active", parent: "—" },
];

export default function CategoriesPage() {
  return (
    <>
      <MerchantHeader title="Categories" />
      <main className="flex-1 p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Add Category form */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 h-fit">
            <h3 className="font-semibold text-slate-900 mb-5">Add New Category</h3>
            <div className="space-y-4">
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Category Name *</label><Input placeholder="e.g. Electronics" /></div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Slug</label><Input placeholder="electronics" /></div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Parent Category</label>
                <select className="w-full h-10 border border-slate-200 rounded-lg px-3 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">— None (Top Level) —</option>
                  <option>Electronics</option><option>Gaming</option>
                </select>
              </div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Icon / Emoji</label><Input placeholder="⚡" /></div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Description</label>
                <textarea className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Optional description..." />
              </div>
              <Button className="w-full gradient-primary text-white border-0 gap-2"><Plus className="w-4 h-4" />Add Category</Button>
            </div>
          </div>

          {/* Category List */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between gap-3">
              <h3 className="font-semibold text-slate-900">All Categories ({categories.length})</h3>
              <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><Input placeholder="Search..." className="pl-9 w-48" /></div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead><TableHead>Parent</TableHead>
                  <TableHead>Products</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{c.icon}</span>
                        <div><p className="font-medium text-sm text-slate-900">{c.name}</p><p className="text-xs text-slate-400">{c.slug}</p></div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-500">{c.parent}</TableCell>
                    <TableCell><span className="font-medium text-slate-900">{c.products}</span></TableCell>
                    <TableCell><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">{c.status}</span></TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </>
  );
}
