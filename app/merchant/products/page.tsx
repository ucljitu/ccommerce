"use client";
import MerchantHeader from "@/components/merchant/MerchantHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Filter, Upload, Edit, Trash2, Eye, Copy } from "lucide-react";

const products = [
  { id: "#P001", name: "iPhone 15 Pro Case", category: "Accessories", sku: "IP15-CASE-BLK", price: "৳850", sale: "৳650", stock: 142, sold: 380, status: "Active", img: "📱" },
  { id: "#P002", name: "Samsung 65W Charger", category: "Chargers", sku: "SAM-CHG-65W", price: "৳1,200", sale: "৳950", stock: 56, sold: 210, status: "Active", img: "🔌" },
  { id: "#P003", name: "Wireless Earbuds Pro", category: "Audio", sku: "WEB-PRO-WHT", price: "৳4,500", sale: "৳3,800", stock: 23, sold: 95, status: "Active", img: "🎧" },
  { id: "#P004", name: "Smart Watch S8", category: "Wearables", sku: "SW-S8-BLK", price: "৳12,000", sale: "৳8,500", stock: 8, sold: 45, status: "Active", img: "⌚" },
  { id: "#P005", name: "Laptop Stand Adjustable", category: "Accessories", sku: "LST-ADJ-SLV", price: "৳2,500", sale: "৳2,200", stock: 0, sold: 67, status: "Out of Stock", img: "💻" },
  { id: "#P006", name: "USB-C Hub 7-in-1", category: "Accessories", sku: "USB-HUB-7N1", price: "৳3,200", sale: "৳2,800", stock: 34, sold: 120, status: "Active", img: "🔗" },
  { id: "#P007", name: "Phone Ring Stand", category: "Accessories", sku: "PRS-RNG-GLD", price: "৳350", sale: "৳280", stock: 5, sold: 450, status: "Low Stock", img: "💍" },
  { id: "#P008", name: "Gaming Mouse Pad XL", category: "Gaming", sku: "GMP-XL-BLK", price: "৳1,800", sale: "—", stock: 88, sold: 155, status: "Active", img: "🖱️" },
];

const statusBadge = (s: string) => {
  const map: Record<string, string> = {
    Active: "bg-emerald-100 text-emerald-700",
    "Out of Stock": "bg-red-100 text-red-700",
    "Low Stock": "bg-amber-100 text-amber-700",
    Draft: "bg-slate-100 text-slate-600",
  };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${map[s] || ""}`}>{s}</span>;
};

export default function ProductsPage() {
  return (
    <>
      <MerchantHeader title="Products" />
      <main className="flex-1 p-6 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Products", value: "256", color: "text-blue-600" },
            { label: "Active", value: "238", color: "text-emerald-600" },
            { label: "Out of Stock", value: "12", color: "text-red-600" },
            { label: "Low Stock", value: "6", color: "text-amber-600" },
          ].map((c, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-xs text-slate-500">{c.label}</p>
              <p className={`text-2xl font-bold mt-1 ${c.color}`}>{c.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200">
          <div className="p-5 border-b border-slate-100 flex flex-wrap gap-3 items-center justify-between">
            <div className="flex gap-3 flex-1 flex-wrap">
              <div className="relative min-w-48 flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder="Search products..." className="pl-9" />
              </div>
              <Button variant="outline" size="sm" className="gap-1"><Filter className="w-4 h-4" />Filter</Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1"><Upload className="w-4 h-4" />Import CSV</Button>
              <Button size="sm" className="gradient-primary text-white border-0 gap-1"><Plus className="w-4 h-4" />Add Product</Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"><input type="checkbox" className="rounded" /></TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Price / Sale</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Sold</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p, i) => (
                <TableRow key={i}>
                  <TableCell><input type="checkbox" className="rounded" /></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-xl">{p.img}</div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{p.name}</p>
                        <p className="text-xs text-slate-400">{p.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">{p.category}</span></TableCell>
                  <TableCell className="font-mono text-xs text-slate-500">{p.sku}</TableCell>
                  <TableCell>
                    <p className="font-medium text-slate-900">{p.sale !== "—" ? p.sale : p.price}</p>
                    {p.sale !== "—" && <p className="text-xs text-slate-400 line-through">{p.price}</p>}
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${p.stock === 0 ? "text-red-600" : p.stock < 10 ? "text-amber-600" : "text-slate-900"}`}>{p.stock}</span>
                  </TableCell>
                  <TableCell className="text-slate-600">{p.sold}</TableCell>
                  <TableCell>{statusBadge(p.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-blue-600"><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7"><Copy className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
            <span>Showing 8 of 256 products</span>
            <div className="flex gap-1">
              {[1,2,3,"...",32].map((p, i) => (
                <button key={i} className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${p === 1 ? "bg-blue-600 text-white" : "hover:bg-slate-100 text-slate-600"}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
