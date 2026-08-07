"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Result = {
  paymentReference: string;
  transactionId: string | null;
  amount: string;
  currency: string;
  status: string;
  mode: string;
  orderNumber: string;
  storeSlug: string;
};

export default function PaymentResult({ reference }: { reference: string }) {
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/payments/bdpay/result/${encodeURIComponent(reference)}`, { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Payment details could not be found.");
        return response.json() as Promise<Result>;
      })
      .then(setResult)
      .catch((reason: Error) => setError(reason.message));
  }, [reference]);

  if (error) return <StateCard icon={AlertCircle} color="text-red-600 bg-red-100" title="Payment Details Unavailable" description={error} />;
  if (!result) return <div className="flex min-h-80 items-center justify-center"><LoaderCircle className="h-8 w-8 animate-spin text-blue-600 motion-reduce:animate-none" /><span className="sr-only">Loading payment result</span></div>;

  const paid = result.status === "paid";
  const cancelled = result.status === "cancelled";
  const title = paid ? "Payment Successful" : cancelled ? "Payment Cancelled" : "Payment Failed";
  const description = paid
    ? "Your payment has been verified and your order has been confirmed."
    : cancelled
      ? "Your payment was cancelled. No payment has been confirmed for this order."
      : "We could not complete your payment. You can try again or choose another payment method.";
  const Icon = paid ? CheckCircle2 : XCircle;

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-9">
      <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${paid ? "bg-emerald-100 text-emerald-600" : cancelled ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-600"}`}><Icon className="h-8 w-8" /></div>
      <h1 className="mt-5 text-3xl font-bold text-slate-900">{title}</h1>
      <p className="mx-auto mt-3 max-w-lg leading-7 text-slate-600">{description}</p>
      {result.mode === "sandbox" && <p className="mx-auto mt-4 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">Test Mode</p>}
      <dl className="mt-7 divide-y divide-slate-100 rounded-2xl border border-slate-200 text-left">
        {[["Order Number", result.orderNumber], ["Transaction ID", result.transactionId || "Not assigned"], ["Amount", `${result.amount} ${result.currency}`], ["Payment Status", result.status]].map(([label, value]) => <div key={label} className="flex flex-wrap justify-between gap-3 px-4 py-3"><dt className="text-sm text-slate-500">{label}</dt><dd className="break-all text-sm font-semibold capitalize text-slate-900">{value}</dd></div>)}
      </dl>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
        {!paid && <Button asChild className="min-h-11 bg-blue-600 text-white hover:bg-blue-700"><Link href={`/store/${result.storeSlug}/checkout`}>Try Again</Link></Button>}
        <Button asChild variant="outline" className="min-h-11"><Link href={`/store/${result.storeSlug}/shop`}>Continue Shopping</Link></Button>
        <Button asChild variant="outline" className="min-h-11"><Link href="/contact">Contact Support</Link></Button>
      </div>
    </div>
  );
}

function StateCard({ icon: Icon, color, title, description }: { icon: typeof AlertCircle; color: string; title: string; description: string }) {
  return <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center"><div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${color}`}><Icon className="h-7 w-7" /></div><h1 className="mt-4 text-2xl font-bold text-slate-900">{title}</h1><p className="mt-2 text-slate-600">{description}</p><Button asChild variant="outline" className="mt-6"><Link href="/contact">Contact Support</Link></Button></div>;
}
