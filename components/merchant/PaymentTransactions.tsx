"use client";

import { useEffect, useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Payment = {
  reference: string;
  transactionId: string | null;
  orderNumber: string;
  customerName: string;
  amountPaisa: number;
  currency: string;
  mode: "sandbox" | "production";
  status: string;
  createdAt: string;
};

const badge: Record<string, string> = {
  paid: "bg-emerald-100 text-emerald-700",
  processing: "bg-blue-100 text-blue-700",
  pending: "bg-amber-100 text-amber-700",
  failed: "bg-red-100 text-red-700",
  cancelled: "bg-slate-100 text-slate-600",
  expired: "bg-slate-100 text-slate-600",
};

function money(paisa: number, currency: string) {
  return new Intl.NumberFormat("en-BD", { style: "currency", currency }).format(paisa / 100);
}

export default function PaymentTransactions() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/merchant/payments", { credentials: "same-origin", cache: "no-store" })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Payments could not be loaded.");
        setPayments(result.payments || []);
      })
      .catch((caught) => setError(caught instanceof Error ? caught.message : "Payments could not be loaded."))
      .finally(() => setLoading(false));
  }, []);

  const totals = useMemo(() => {
    const paid = payments.filter((payment) => payment.status === "paid");
    return {
      paid: paid.reduce((sum, payment) => sum + payment.amountPaisa, 0),
      processing: payments.filter((payment) => payment.status === "processing").length,
      failed: payments.filter((payment) => payment.status === "failed").length,
      sandbox: payments.filter((payment) => payment.mode === "sandbox").length,
    };
  }, [payments]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          ["Paid Revenue", money(totals.paid, "BDT")],
          ["Processing", String(totals.processing)],
          ["Failed", String(totals.failed)],
          ["Sandbox Attempts", String(totals.sandbox)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="text-xl font-bold text-slate-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-5"><h3 className="font-semibold text-slate-900">BD Pay transaction history</h3></div>
        {loading && <p className="p-6 text-sm text-slate-500">Loading payments…</p>}
        {error && <p role="alert" className="p-6 text-sm text-red-600">{error}</p>}
        {!loading && !error && payments.length === 0 && <p className="p-6 text-sm text-slate-500">No payment attempts yet.</p>}
        {!loading && !error && payments.length > 0 && (
          <Table>
            <TableHeader><TableRow>
              <TableHead>Transaction</TableHead><TableHead>Order</TableHead><TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead><TableHead>Mode</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.reference}>
                  <TableCell className="font-mono text-xs text-slate-500">{payment.transactionId || payment.reference.slice(0, 12)}</TableCell>
                  <TableCell className="font-medium text-blue-600">{payment.orderNumber}</TableCell>
                  <TableCell>{payment.customerName}</TableCell>
                  <TableCell className="font-semibold">{money(payment.amountPaisa, payment.currency)}</TableCell>
                  <TableCell><span className={payment.mode === "sandbox" ? "text-amber-700" : "text-emerald-700"}>{payment.mode === "sandbox" ? "Test" : "Live"}</span></TableCell>
                  <TableCell className="text-xs text-slate-500">{new Date(payment.createdAt).toLocaleString("en-BD")}</TableCell>
                  <TableCell><span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${badge[payment.status] || badge.pending}`}>{payment.status}</span></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
