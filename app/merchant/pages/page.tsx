"use client";
import MerchantHeader from "@/components/merchant/MerchantHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

const pages = [
  { title: "About Us", slug: "about", type: "Custom", status: true, updated: "Jun 20, 2026" },
  { title: "Contact Us", slug: "contact", type: "Custom", status: true, updated: "Jun 15, 2026" },
  { title: "Terms & Conditions", slug: "terms", type: "Policy", status: true, updated: "Jun 10, 2026" },
  { title: "Return & Refund Policy", slug: "return-policy", type: "Policy", status: true, updated: "Jun 10, 2026" },
  { title: "Privacy Policy", slug: "privacy", type: "Policy", status: true, updated: "Jun 10, 2026" },
  { title: "FAQ", slug: "faq", type: "Custom", status: false, updated: "Jun 5, 2026" },
];

export default function PagesPage() {
  return (
    <>
      <MerchantHeader title="Pages" />
      <main className="flex-1 p-6 space-y-5">
        <div className="flex justify-between items-center">
          <p className="text-slate-500 text-sm">Manage your store's static pages</p>
          <Button className="gradient-primary text-white border-0 gap-2"><Plus className="w-4 h-4" />New Page</Button>
        </div>
        <div className="bg-white rounded-xl border border-slate-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page Title</TableHead><TableHead>Slug</TableHead><TableHead>Type</TableHead>
                <TableHead>Published</TableHead><TableHead>Last Updated</TableHead><TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((p, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium text-slate-900">{p.title}</TableCell>
                  <TableCell className="font-mono text-xs text-slate-500">/{p.slug}</TableCell>
                  <TableCell><span className={`px-2 py-0.5 rounded text-xs font-medium ${p.type === "Policy" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>{p.type}</span></TableCell>
                  <TableCell><Switch defaultChecked={p.status} /></TableCell>
                  <TableCell className="text-xs text-slate-500">{p.updated}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-blue-600"><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}
