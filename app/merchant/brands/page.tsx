"use client";
import MerchantHeader from "@/components/merchant/MerchantHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Search } from "lucide-react";

const brands = [
  { id: 1, name: "Apple", slug: "apple", products: 24, logo: "🍎", status: "Active" },
  { id: 2, name: "Samsung", slug: "samsung", products: 38, logo: "📱", status: "Active" },
  { id: 3, name: "Sony", slug: "sony", products: 15, logo: "🎵", status: "Active" },
  { id: 4, name: "JBL", slug: "jbl", products: 12, logo: "🔊", status: "Active" },
  { id: 5, name: "Xiaomi", slug: "xiaomi", products: 29, logo: "📷", status: "Active" },
  { id: 6, name: "Anker", slug: "anker", products: 18, logo: "🔌", status: "Active" },
  { id: 7, name: "Baseus", slug: "baseus", products: 22, logo: "⚡", status: "Active" },
  { id: 8, name: "Generic", slug: "generic", products: 98, logo: "🏷️", status: "Active" },
];

export default function BrandsPage() {
  return (
    <>
      <MerchantHeader title="Brands" />
      <main className="flex-1 p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 h-fit">
            <h3 className="font-semibold text-slate-900 mb-5">Add New Brand</h3>
            <div className="space-y-4">
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Brand Name *</label><Input placeholder="e.g. Samsung" /></div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Slug</label><Input placeholder="samsung" /></div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Logo / Emoji</label><Input placeholder="📱" /></div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Description</label>
                <textarea className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm min-h-[70px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Optional..." />
              </div>
              <Button className="w-full gradient-primary text-white border-0 gap-2"><Plus className="w-4 h-4" />Add Brand</Button>
            </div>
          </div>
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between gap-3">
              <h3 className="font-semibold text-slate-900">All Brands ({brands.length})</h3>
              <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><Input placeholder="Search..." className="pl-9 w-44" /></div>
            </div>
            <Table>
              <TableHeader>
                <TableRow><TableHead>Brand</TableHead><TableHead>Products</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {brands.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{b.logo}</span>
                        <div><p className="font-medium text-sm text-slate-900">{b.name}</p><p className="text-xs text-slate-400">{b.slug}</p></div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">{b.products}</TableCell>
                    <TableCell><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">{b.status}</span></TableCell>
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
