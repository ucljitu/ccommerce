"use client";
import MerchantHeader from "@/components/merchant/MerchantHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, Filter, Download, Eye, Printer, CheckCircle, Clock, Truck, XCircle, Package } from "lucide-react";

const orders = [
  { id: "#10045", date: "Jun 25, 10:32 AM", customer: "Rahim Miah", mobile: "01712345678", address: "Mirpur, Dhaka", items: 2, total: "৳1,200", delivery: "৳60", method: "bKash", status: "Pending" },
  { id: "#10044", date: "Jun 25, 9:45 AM", customer: "Sakina Begum", mobile: "01812345678", address: "Agrabad, Chittagong", items: 1, total: "৳8,500", delivery: "৳120", method: "COD", status: "Processing" },
  { id: "#10043", date: "Jun 25, 9:12 AM", customer: "Jamal Uddin", mobile: "01912345678", address: "Shahjalal, Sylhet", items: 1, total: "৳2,200", delivery: "৳150", method: "Nagad", status: "Shipped" },
  { id: "#10042", date: "Jun 24, 6:20 PM", customer: "Runa Akter", mobile: "01612345678", address: "Boalia, Rajshahi", items: 1, total: "৳3,800", delivery: "৳120", method: "COD", status: "Delivered" },
  { id: "#10041", date: "Jun 24, 3:45 PM", customer: "Sabbir Hossain", mobile: "01512345678", address: "Sonadanga, Khulna", items: 3, total: "৳1,500", delivery: "৳120", method: "bKash", status: "Cancelled" },
  { id: "#10040", date: "Jun 24, 2:10 PM", customer: "Mariam Khanam", mobile: "01312345678", address: "Keraniganj, Dhaka", items: 2, total: "৳5,600", delivery: "৳60", method: "COD", status: "Delivered" },
];

const statusBadge = (s: string) => {
  const map: Record<string, { cls: string; Icon: React.ElementType }> = {
    Pending: { cls: "bg-amber-100 text-amber-700", Icon: Clock },
    Processing: { cls: "bg-blue-100 text-blue-700", Icon: Package },
    Shipped: { cls: "bg-purple-100 text-purple-700", Icon: Truck },
    Delivered: { cls: "bg-emerald-100 text-emerald-700", Icon: CheckCircle },
    Cancelled: { cls: "bg-red-100 text-red-700", Icon: XCircle },
  };
  const style = map[s] || { cls: "bg-slate-100 text-slate-700", Icon: Clock };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${style.cls}`}>
      <style.Icon className="w-3 h-3" />{s}
    </span>
  );
};

export default function OrdersPage() {
  return (
    <>
      <MerchantHeader title="Orders" />
      <main className="flex-1 p-6 space-y-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { label: "Total Orders", value: "1,240", color: "text-slate-900" },
            { label: "Pending", value: "48", color: "text-amber-600" },
            { label: "Processing", value: "32", color: "text-blue-600" },
            { label: "Delivered", value: "1,092", color: "text-emerald-600" },
            { label: "Cancelled", value: "68", color: "text-red-600" },
          ].map((c, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">{c.label}</p>
              <p className={`text-xl font-bold mt-1 ${c.color}`}>{c.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200">
          <Tabs defaultValue="all">
            <div className="p-5 border-b border-slate-100 flex flex-wrap gap-3 items-center justify-between">
              <TabsList className="bg-slate-100">
                {["all", "pending", "processing", "shipped", "delivered", "cancelled"].map(tab => (
                  <TabsTrigger key={tab} value={tab} className="capitalize text-xs">{tab}</TabsTrigger>
                ))}
              </TabsList>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input placeholder="Search orders..." className="pl-9 w-48" />
                </div>
                <Button variant="outline" size="sm" className="gap-1"><Filter className="w-4 h-4" />Filter</Button>
                <Button variant="outline" size="sm" className="gap-1"><Download className="w-4 h-4" />Export</Button>
              </div>
            </div>

            <TabsContent value="all" className="m-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Delivery Address</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((o, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-mono text-xs text-blue-600 font-medium">{o.id}</TableCell>
                      <TableCell className="text-xs text-slate-500">{o.date}</TableCell>
                      <TableCell>
                        <p className="text-sm font-medium text-slate-900">{o.customer}</p>
                        <p className="text-xs text-slate-400">{o.mobile}</p>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600 max-w-[150px] truncate">{o.address}</TableCell>
                      <TableCell className="text-slate-700">{o.items} item{o.items > 1 ? "s" : ""}</TableCell>
                      <TableCell>
                        <p className="font-semibold text-slate-900">{o.total}</p>
                        <p className="text-xs text-slate-400">+{o.delivery} delivery</p>
                      </TableCell>
                      <TableCell><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-medium">{o.method}</span></TableCell>
                      <TableCell>{statusBadge(o.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7"><Printer className="w-4 h-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
