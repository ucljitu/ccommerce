"use client";
import MerchantHeader from "@/components/merchant/MerchantHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, Filter, MessageCircle, Eye } from "lucide-react";

const customers = [
  { id: "#C001", name: "Rahim Miah", mobile: "01712345678", email: "rahim@email.com", area: "Mirpur, Dhaka", orders: 12, spent: "৳18,400", last: "Jun 25", status: "Regular" },
  { id: "#C002", name: "Sakina Begum", mobile: "01812345678", email: "sakina@email.com", area: "Agrabad, Chittagong", orders: 4, spent: "৳9,200", last: "Jun 24", status: "Regular" },
  { id: "#C003", name: "Jamal Uddin", mobile: "01912345678", email: "jamal@email.com", area: "Sylhet Sadar", orders: 28, spent: "৳67,000", last: "Jun 25", status: "VIP" },
  { id: "#C004", name: "Runa Akter", mobile: "01612345678", email: "runa@email.com", area: "Boalia, Rajshahi", orders: 7, spent: "৳14,500", last: "Jun 22", status: "Regular" },
  { id: "#C005", name: "Sabbir Hossain", mobile: "01512345678", email: "sabbir@email.com", area: "Sonadanga, Khulna", orders: 2, spent: "৳3,200", last: "Jun 20", status: "New" },
  { id: "#C006", name: "Mariam Khanam", mobile: "01312345678", email: "mariam@email.com", area: "Keraniganj, Dhaka", orders: 19, spent: "৳42,800", last: "Jun 24", status: "VIP" },
  { id: "#C007", name: "Tanvir Ahmed", mobile: "01412345678", email: "tanvir@email.com", area: "Cumilla Sadar", orders: 1, spent: "৳1,800", last: "Jun 18", status: "New" },
];

const statusBadge = (s: string) => {
  const map: Record<string, string> = {
    VIP: "bg-purple-100 text-purple-700",
    Regular: "bg-blue-100 text-blue-700",
    New: "bg-emerald-100 text-emerald-700",
  };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${map[s] || ""}`}>{s}</span>;
};

export default function CustomersPage() {
  return (
    <>
      <MerchantHeader title="Customers" />
      <main className="flex-1 p-6 space-y-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Customers", value: "1,234", color: "text-blue-600" },
            { label: "VIP Customers", value: "87", color: "text-purple-600" },
            { label: "New This Month", value: "142", color: "text-emerald-600" },
            { label: "Avg. Order Value", value: "৳2,340", color: "text-amber-600" },
          ].map((c, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-xs text-slate-500">{c.label}</p>
              <p className={`text-2xl font-bold mt-1 ${c.color}`}>{c.value}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="p-5 border-b border-slate-100 flex flex-wrap gap-3 items-center justify-between">
            <div className="relative flex-1 min-w-48 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Search customers..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1"><Filter className="w-4 h-4" />Filter</Button>
              <Button variant="outline" size="sm" className="gap-1"><Download className="w-4 h-4" />Export</Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead><TableHead>Customer</TableHead><TableHead>Mobile</TableHead>
                <TableHead>Area</TableHead><TableHead>Orders</TableHead><TableHead>Total Spent</TableHead>
                <TableHead>Last Order</TableHead><TableHead>Type</TableHead><TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((c, i) => (
                <TableRow key={i}>
                  <TableCell className="font-mono text-xs text-slate-400">{c.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">{c.name[0]}</div>
                      <div><p className="font-medium text-sm text-slate-900">{c.name}</p><p className="text-xs text-slate-400">{c.email}</p></div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">{c.mobile}</TableCell>
                  <TableCell className="text-sm text-slate-600">{c.area}</TableCell>
                  <TableCell className="font-medium text-slate-900">{c.orders}</TableCell>
                  <TableCell className="font-semibold text-emerald-700">{c.spent}</TableCell>
                  <TableCell className="text-xs text-slate-500">{c.last}</TableCell>
                  <TableCell>{statusBadge(c.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-emerald-600"><MessageCircle className="w-4 h-4" /></Button>
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
