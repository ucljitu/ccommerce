"use client";
import MerchantHeader from "@/components/merchant/MerchantHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Download, TrendingUp } from "lucide-react";

const topProducts = [
  { name: "Smart Watch S8", category: "Wearables", sold: 145, revenue: "৳1,23,250", growth: "+32%" },
  { name: "Wireless Earbuds Pro", category: "Audio", sold: 95, revenue: "৳36,100", growth: "+18%" },
  { name: "iPhone 15 Pro Case", category: "Accessories", sold: 380, revenue: "৳24,700", growth: "+45%" },
  { name: "Samsung 65W Charger", category: "Chargers", sold: 210, revenue: "৳19,950", growth: "+12%" },
  { name: "USB-C Hub 7-in-1", category: "Accessories", sold: 120, revenue: "৳33,600", growth: "+8%" },
];

const weeklySales = [
  { day: "Saturday", orders: 68, revenue: "৳28,400", aov: "৳418" },
  { day: "Sunday", orders: 52, revenue: "৳22,100", aov: "৳425" },
  { day: "Monday", orders: 44, revenue: "৳18,700", aov: "৳425" },
  { day: "Tuesday", orders: 71, revenue: "৳30,200", aov: "৳425" },
  { day: "Wednesday", orders: 58, revenue: "৳24,600", aov: "৳424" },
  { day: "Thursday", orders: 84, revenue: "৳35,700", aov: "৳425" },
  { day: "Friday", orders: 48, revenue: "৳20,300", aov: "৳423" },
];

export default function ReportsPage() {
  return (
    <>
      <MerchantHeader title="Reports" />
      <main className="flex-1 p-6 space-y-6">
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <div className="flex gap-2">
            {["Today", "This Week", "This Month", "Last 3 Months", "Custom"].map((p, i) => (
              <button key={i} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${i === 2 ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{p}</button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="gap-2"><Download className="w-4 h-4" />Export Report</Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Revenue", value: "৳1,20,500", change: "+22%", color: "text-emerald-600" },
            { label: "Total Orders", value: "425", change: "+15%", color: "text-blue-600" },
            { label: "Avg. Order Value", value: "৳2,835", change: "+6%", color: "text-purple-600" },
            { label: "New Customers", value: "142", change: "+18%", color: "text-amber-600" },
          ].map((c, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-xs text-slate-500">{c.label}</p>
              <p className={`text-2xl font-bold mt-1 ${c.color}`}>{c.value}</p>
              <p className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-1"><TrendingUp className="w-3 h-3" />{c.change} vs last month</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="sales">
          <TabsList>
            <TabsTrigger value="sales">Sales Report</TabsTrigger>
            <TabsTrigger value="products">Top Products</TabsTrigger>
          </TabsList>

          <TabsContent value="sales">
            <div className="bg-white rounded-xl border border-slate-200 mt-4">
              {/* Chart */}
              <div className="p-6 border-b border-slate-100">
                <h3 className="font-semibold text-slate-900 mb-4">Revenue This Month</h3>
                <div className="h-48 flex items-end gap-2">
                  {Array.from({ length: 25 }, (_, i) => ({
                    day: i + 1,
                    h: [30,45,38,60,55,80,65,72,50,42,68,75,58,82,90,70,62,88,76,95,83,70,65,78,85][i] || 50,
                  })).map((d) => (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                      <div className={`w-full rounded-t ${d.h > 80 ? "bg-blue-600" : "bg-blue-100 hover:bg-blue-200 transition-colors"}`} style={{ height: `${d.h}%` }} />
                      {d.day % 5 === 0 && <span className="text-[9px] text-slate-400">{d.day}</span>}
                    </div>
                  ))}
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Day</TableHead><TableHead>Orders</TableHead>
                    <TableHead>Revenue</TableHead><TableHead>Avg. Order Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {weeklySales.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium text-slate-900">{row.day}</TableCell>
                      <TableCell className="text-slate-700">{row.orders}</TableCell>
                      <TableCell className="font-semibold text-emerald-700">{row.revenue}</TableCell>
                      <TableCell className="text-slate-600">{row.aov}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="products">
            <div className="bg-white rounded-xl border border-slate-200 mt-4">
              <div className="p-5 border-b border-slate-100"><h3 className="font-semibold text-slate-900">Best Selling Products</h3></div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead><TableHead>Product</TableHead><TableHead>Category</TableHead>
                    <TableHead>Units Sold</TableHead><TableHead>Revenue</TableHead><TableHead>Growth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProducts.map((p, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? "bg-amber-100 text-amber-700" : i === 1 ? "bg-slate-100 text-slate-600" : i === 2 ? "bg-orange-100 text-orange-700" : "bg-slate-50 text-slate-500"}`}>{i + 1}</span>
                      </TableCell>
                      <TableCell className="font-medium text-slate-900">{p.name}</TableCell>
                      <TableCell><span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">{p.category}</span></TableCell>
                      <TableCell className="font-medium text-slate-900">{p.sold}</TableCell>
                      <TableCell className="font-semibold text-emerald-700">{p.revenue}</TableCell>
                      <TableCell><span className="text-emerald-600 font-medium text-sm">{p.growth}</span></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
