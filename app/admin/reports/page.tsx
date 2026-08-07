"use client";
import { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import StatsCard from "@/components/admin/StatsCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, TrendingUp, Users, Store, Download, Calendar, CheckCircle, X } from "lucide-react";

const ALL_MONTHS = [
  { month: "January",   merchants: 4200, revenue: "৳21.5L", revenueNum: 21.5, growth: "+8%", churn: "2.8%", bar: 43 },
  { month: "February",  merchants: 4450, revenue: "৳23.2L", revenueNum: 23.2, growth: "+8%", churn: "2.5%", bar: 46 },
  { month: "March",     merchants: 4680, revenue: "৳24.8L", revenueNum: 24.8, growth: "+7%", churn: "2.4%", bar: 50 },
  { month: "April",     merchants: 4820, revenue: "৳26.1L", revenueNum: 26.1, growth: "+5%", churn: "2.3%", bar: 52 },
  { month: "May",       merchants: 5050, revenue: "৳27.4L", revenueNum: 27.4, growth: "+4%", churn: "2.2%", bar: 55 },
  { month: "June",      merchants: 5284, revenue: "৳28.4L", revenueNum: 28.4, growth: "+5%", churn: "2.1%", bar: 57 },
];

const PERIOD_CONFIG = [
  { label: "This Month",     slice: 1 },
  { label: "Last 3 Months",  slice: 3 },
  { label: "Last 6 Months",  slice: 6 },
  { label: "This Year",      slice: 6 },
];

function computeStats(rows: typeof ALL_MONTHS) {
  const totalRevenue = rows.reduce((s, r) => s + r.revenueNum, 0);
  const latestMerchants = rows[rows.length - 1]?.merchants ?? 0;
  const latestMRR = rows[rows.length - 1]?.revenue ?? "—";
  return { totalRevenue: `৳${totalRevenue.toFixed(1)}L`, latestMRR, latestMerchants };
}

function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
      {msg}
      <button onClick={onClose} className="ml-2 text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
    </div>
  );
}

export default function ReportsPage() {
  const [activePeriod, setActivePeriod] = useState(2);
  const [activeYear, setActiveYear] = useState(2026);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const periodRows = ALL_MONTHS.slice(-PERIOD_CONFIG[activePeriod].slice);
  const { totalRevenue, latestMRR, latestMerchants } = computeStats(periodRows);

  const maxBar = Math.max(...periodRows.map(r => r.bar));

  const stats = [
    { title: "Total Revenue", value: totalRevenue, change: "+24%", positive: true, icon: DollarSign, color: "text-emerald-600", bgColor: "bg-emerald-50" },
    { title: "MRR (Latest Month)", value: latestMRR, change: "+18%", positive: true, icon: TrendingUp, color: "text-blue-600", bgColor: "bg-blue-50" },
    { title: "Active Merchants", value: latestMerchants.toLocaleString(), change: "+9%", positive: true, icon: Store, color: "text-purple-600", bgColor: "bg-purple-50" },
    { title: "Churn Rate", value: periodRows[periodRows.length - 1]?.churn ?? "—", change: "-0.4%", positive: true, icon: Users, color: "text-amber-600", bgColor: "bg-amber-50" },
  ];

  const handleExportCSV = () => {
    const csv = [
      "Month,Active Merchants,MRR,Growth,Churn Rate",
      ...periodRows.map(r => `${r.month},${r.merchants},${r.revenue},${r.growth},${r.churn}`),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `revenue-report-${PERIOD_CONFIG[activePeriod].label.replace(/ /g, "-")}-${activeYear}.csv`;
    a.click();
    showToast("CSV exported!");
  };

  const handleExportPDF = () => showToast("PDF report generated and downloading...");

  return (
    <>
      <AdminHeader title="Revenue Reports" />
      <main className="flex-1 p-6 space-y-6">

        {/* Period selector + export */}
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div className="flex gap-2 flex-wrap">
            {PERIOD_CONFIG.map((p, i) => (
              <button
                key={i}
                onClick={() => setActivePeriod(i)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activePeriod === i ? "bg-blue-600 text-white shadow-sm" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={handleExportCSV}>
              <Download className="w-4 h-4" />Export CSV
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleExportPDF}>
              <Download className="w-4 h-4" />Export PDF
            </Button>
          </div>
        </div>

        {/* Stats — react to period */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((stat, i) => <StatsCard key={i} {...stat} />)}
        </div>

        {/* Revenue Chart — reacts to period */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-900">
              Revenue Trend — {PERIOD_CONFIG[activePeriod].label}
            </h3>
            <Badge variant="secondary">{totalRevenue} Total</Badge>
          </div>
          <div className="h-56 flex items-end gap-3">
            {periodRows.map((r, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-slate-500">{r.revenue}</span>
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-blue-600 to-indigo-400 transition-all duration-500"
                  style={{ height: `${(r.bar / maxBar) * 180}px` }}
                />
                <span className="text-xs text-slate-500">{r.month.slice(0, 3)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly breakdown — reacts to period */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">
              Monthly Breakdown — {PERIOD_CONFIG[activePeriod].label}
            </h3>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-slate-100 rounded transition-colors text-slate-500" onClick={() => setActiveYear(y => y - 1)}>‹</button>
              <Button variant="outline" size="sm" className="gap-2 min-w-[80px]">
                <Calendar className="w-4 h-4" />{activeYear}
              </Button>
              <button className="p-1 hover:bg-slate-100 rounded transition-colors text-slate-500" onClick={() => setActiveYear(y => y + 1)}>›</button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Active Merchants</TableHead>
                <TableHead>MRR</TableHead>
                <TableHead>Growth</TableHead>
                <TableHead>Churn Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {periodRows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium text-slate-900">{row.month}</TableCell>
                  <TableCell className="text-slate-700">{row.merchants.toLocaleString()}</TableCell>
                  <TableCell className="font-semibold text-emerald-700">{row.revenue}</TableCell>
                  <TableCell><span className="text-emerald-600 font-medium">{row.growth}</span></TableCell>
                  <TableCell><span className="text-slate-600">{row.churn}</span></TableCell>
                </TableRow>
              ))}
              {/* Totals row */}
              <TableRow className="bg-slate-50 font-semibold">
                <TableCell className="text-slate-700">Total / Avg</TableCell>
                <TableCell className="text-slate-900">{periodRows[periodRows.length - 1]?.merchants.toLocaleString()}</TableCell>
                <TableCell className="text-emerald-700">{totalRevenue}</TableCell>
                <TableCell className="text-emerald-600">—</TableCell>
                <TableCell className="text-slate-600">
                  {(periodRows.reduce((s, r) => s + parseFloat(r.churn), 0) / periodRows.length).toFixed(1)}%
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </main>

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </>
  );
}
