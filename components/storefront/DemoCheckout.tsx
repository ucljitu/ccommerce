"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck } from "lucide-react";
import { useStorefrontCart } from "./StorefrontCartProvider";

export default function DemoCheckout({ storeSlug, demoMode }: { storeSlug: string; demoMode: boolean }) {
  const router = useRouter();
  const { lines, clear } = useStorefrontCart();
  const [submitting, setSubmitting] = useState(false);
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const delivery = subtotal >= 2000 || !lines.length ? 0 : 60;
  function submit(event: FormEvent) {
    event.preventDefault();
    if (!demoMode) return;
    setSubmitting(true);
    sessionStorage.setItem(`demo-order:${storeSlug}`, JSON.stringify({ items: lines.length, total: subtotal + delivery, createdAt: Date.now() }));
    clear();
    router.push(`/store/${storeSlug}/order-success`);
  }
  return <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8"><div className="mb-7 flex items-center justify-between"><div><div className="mb-2 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">DEMO CHECKOUT</div><h1 className="font-serif text-4xl font-semibold text-[#172033]">Checkout</h1></div><span className="flex items-center gap-2 text-sm text-slate-500"><Lock className="h-4 w-4" />Secure Checkout</span></div>
    {demoMode && <div role="note" className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><strong>Sample data only.</strong> This checkout creates a browser-only demo confirmation. No real payment, order, stock update, email, SMS or WhatsApp notification will occur.</div>}
    <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[1fr_380px]"><div className="space-y-5">
      <Section number="1" title="Customer Information"><div className="grid gap-4 sm:grid-cols-2"><Field label="Full Name" name="name" /><Field label="Mobile Number" name="mobile" type="tel" /><Field label="Email Address" name="email" type="email" optional /></div></Section>
      <Section number="2" title="Delivery Address"><div className="grid gap-4 sm:grid-cols-2"><Field label="District" name="district" /><Field label="Area / Upazila" name="area" /><div className="sm:col-span-2"><Field label="Full Address" name="address" /></div></div></Section>
      <Section number="3" title="Payment Method"><label className="flex min-h-16 cursor-pointer items-center gap-3 rounded-xl border-2 border-[#7b263a] bg-[#7b263a]/5 p-4"><input type="radio" name="payment" defaultChecked className="accent-[#7b263a]" /><div><p className="font-semibold text-[#172033]">Demo Payment</p><p className="text-sm text-slate-500">No real payment will be processed.</p></div></label><label className="mt-3 flex min-h-16 cursor-pointer items-center gap-3 rounded-xl border border-stone-200 p-4"><input type="radio" name="payment" className="accent-[#7b263a]" /><div><p className="font-semibold text-[#172033]">Cash on Delivery (Demo)</p><p className="text-sm text-slate-500">Preview only; no order is sent.</p></div></label></Section>
    </div><aside className="h-fit rounded-2xl border border-stone-200 bg-white p-6"><h2 className="font-serif text-2xl font-semibold text-[#172033]">Order Summary</h2>{lines.length ? <div className="mt-5 max-h-72 space-y-3 overflow-auto">{lines.map((line) => <div key={line.productId} className="flex gap-3"><div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg"><Image src={line.image} alt="" fill sizes="56px" className="object-cover" /></div><div className="min-w-0 flex-1"><p className="line-clamp-2 text-sm font-medium">{line.name}</p><p className="text-xs text-slate-500">Qty {line.quantity}</p></div><span className="text-sm font-semibold">৳{(line.price * line.quantity).toLocaleString()}</span></div>)}</div> : <p className="mt-5 text-sm text-slate-500">Your cart is empty.</p>}<dl className="mt-5 space-y-3 border-t border-stone-200 pt-5 text-sm"><div className="flex justify-between"><dt>Subtotal</dt><dd>৳{subtotal.toLocaleString()}</dd></div><div className="flex justify-between"><dt>Delivery</dt><dd>{delivery ? `৳${delivery}` : "Free"}</dd></div><div className="flex justify-between border-t border-stone-200 pt-4 text-lg font-bold"><dt>Total</dt><dd>৳{(subtotal + delivery).toLocaleString()}</dd></div></dl><button disabled={!demoMode || !lines.length || submitting} className="mt-6 min-h-12 w-full bg-[#172033] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">{submitting ? "Creating Demo Order…" : "Preview Demo Order"}</button><p className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-slate-500"><ShieldCheck className="h-4 w-4 text-emerald-600" />No payment or notification is sent</p></aside></form>
  </main>;
}

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) { return <section className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6"><h2 className="mb-5 flex items-center gap-3 font-serif text-xl font-semibold text-[#172033]"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#172033] text-xs text-white">{number}</span>{title}</h2>{children}</section>; }
function Field({ label, name, type = "text", optional = false }: { label: string; name: string; type?: string; optional?: boolean }) { return <label className="block text-sm font-medium text-slate-700">{label}{!optional && " *"}<input name={name} type={type} required={!optional} className="mt-1.5 min-h-11 w-full rounded-lg border border-stone-300 px-3 outline-none focus:ring-2 focus:ring-[#7b263a]" /></label>; }
