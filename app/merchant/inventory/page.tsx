"use client";
import MerchantHeader from "@/components/merchant/MerchantHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Search, Edit, Save } from "lucide-react";

const inventory = [
  { name: "iPhone 15 Pro Case", sku: "IP15-CASE-BLK", category: "Accessories", stock: 142, low: 20, sold: 380, status: "In Stock" },
  { name: "Samsung 65W Charger", sku: "SAM-CHG-65W", category: "Chargers", stock: 56, low: 15, sold: 210, status: "In Stock" },
  { name: "Wireless Earbuds Pro", sku: "WEB-PRO-WHT", category: "Audio", stock: 23, low: 20, sold: 95, status: "Low Stock" },
  { name: "Smart Watch S8", sku: "SW-S8-BLK", category: "Wearables", stock: 8, low: 10, sold: 45, status: "Low Stock" },
  { name: "Laptop Stand Adjustable", sku: "LST-ADJ-SLV", category: "Accessories", stock: 0, low: 10, sold: 67, status: "Out of Stock" },
  { name: "USB-C Hub 7-in-1", sku: "USB-HUB-7N1", category: "Accessories", stock: 34, low: 10, sold: 120, status: "In Stock" },
  { name: "Phone Ring Stand", sku: "PRS-RNG-GLD", category: "Accessories", stock: 5, low: 15, sold: 450, status: "Low Stock" },
  { name: "Gaming Mouse Pad XL", sku: "GMP-XL-BLK", category: "Gaming", stock: 88, low: 20, sold: 155, status: "In Stock" },
];

const statusBadge = (s: string) => {
  const map: Record<string, string> = {
    "In Stock": "bg-emerald-100 text-emerald-700",
    "Low Stock": "bg-amber-100 text-amber-700",
    "Out of Stock": "bg-red-100 text-red-700",
  };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${map[s]}`}>{s}</span>;
};

export default function InventoryPage() {
  return (
    <>
      <MerchantHeader title="Inventory" />
      <main className="flex-1 p-6 space-y-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Products", value: "256", color: "text-blue-600" },
            { label: "In Stock", value: "215", color: "text-emerald-600" },
            { label: "Low Stock", value: "28", color: "text-amber-600" },
            { label: "Out of Stock", value: "13", color: "text-red-600" },
          ].map((c, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-xs text-slate-500">{c.label}</p>
              <p className={`text-2xl font-bold mt-1 ${c.color}`}>{c.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <p className="text-sm text-amber-800 font-medium">5 products are critically low on stock — <span className="underline cursor-pointer">restock now</span></p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between gap-3">
            <h3 className="font-semibold text-slate-900">Stock Levels</h3>
            <div className="flex gap-2">
              <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><Input placeholder="Search products..." className="pl-9 w-52" /></div>
              <Button className="gradient-primary text-white border-0 gap-2"><Save className="w-4 h-4" />Save Changes</Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead><TableHead>SKU</TableHead><TableHead>Category</TableHead>
                <TableHead>Current Stock</TableHead><TableHead>Low Alert</TableHead><TableHead>Sold</TableHead>
                <TableHead>Status</TableHead><TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium text-slate-900">{item.name}</TableCell>
                  <TableCell className="font-mono text-xs text-slate-400">{item.sku}</TableCell>
                  <TableCell><span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">{item.category}</span></TableCell>
                  <TableCell>
                    <Input defaultValue={item.stock} type="number" className={`h-8 w-20 text-sm text-center font-semibold ${item.stock === 0 ? "border-red-300 text-red-600" : item.stock < item.low ? "border-amber-300 text-amber-600" : ""}`} />
                  </TableCell>
                  <TableCell className="text-slate-600 text-sm">{item.low}</TableCell>
                  <TableCell className="text-slate-700 font-medium">{item.sold}</TableCell>
                  <TableCell>{statusBadge(item.status)}</TableCell>
                  <TableCell><Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="w-4 h-4" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}
