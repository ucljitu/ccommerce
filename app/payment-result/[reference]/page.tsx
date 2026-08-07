import type { Metadata } from "next";
import PaymentResult from "@/components/payments/PaymentResult";

export const metadata: Metadata = {
  title: "Payment Result | C Commerce",
  robots: { index: false, follow: false },
};

export default async function PaymentResultPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;
  return <main className="min-h-screen bg-slate-50 px-4 py-16"><PaymentResult reference={reference} /></main>;
}
