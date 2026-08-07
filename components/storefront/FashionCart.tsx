"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useStorefrontCart } from "./StorefrontCartProvider";

export default function FashionCart({ storeSlug }: { storeSlug: string }) {
  const { lines, update, remove, count } = useStorefrontCart();
  const base = `/store/${storeSlug}`;
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const delivery = subtotal >= 2000 || !lines.length ? 0 : 60;
  if (!lines.length) return <main className="mx-auto max-w-4xl px-4 py-24 text-center"><ShoppingBag className="mx-auto h-14 w-14 text-stone-300" /><h1 className="mt-5 font-serif text-3xl font-semibold text-[#172033]">Your cart is empty</h1><p className="mt-2 text-slate-500">Explore our collection and add your favourite styles.</p><Link href={`${base}/shop`} className="mt-7 inline-flex min-h-12 items-center bg-[#172033] px-6 font-semibold text-white">Continue Shopping</Link></main>;
  return <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><h1 className="font-serif text-4xl font-semibold text-[#172033]">Shopping Cart</h1><p className="mt-2 text-slate-500">{count} items saved for this store</p>
    <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">{lines.map((line) => <article key={`${line.productId}:${line.variant}`} className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-4"><div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-[#eee8df]"><Image src={line.image} alt={line.name} fill sizes="96px" className="object-cover" /></div><div className="min-w-0 flex-1"><h2 className="font-semibold text-[#172033]">{line.name}</h2>{line.variant && <p className="mt-1 text-xs text-slate-500">{line.variant}</p>}<p className="mt-2 font-bold text-[#7b263a]">৳{line.price.toLocaleString()}</p><div className="mt-3 flex items-center gap-3"><div className="flex overflow-hidden rounded-lg border border-stone-300"><button aria-label="Decrease quantity" onClick={() => update(line.productId, line.quantity - 1)} className="flex h-11 w-11 items-center justify-center"><Minus className="h-4 w-4" /></button><span className="flex h-11 w-10 items-center justify-center text-sm font-semibold">{line.quantity}</span><button aria-label="Increase quantity" onClick={() => update(line.productId, line.quantity + 1)} className="flex h-11 w-11 items-center justify-center"><Plus className="h-4 w-4" /></button></div><button aria-label={`Remove ${line.name}`} onClick={() => remove(line.productId)} className="flex h-11 w-11 items-center justify-center text-red-600"><Trash2 className="h-4 w-4" /></button></div></div><p className="hidden font-semibold sm:block">৳{(line.price * line.quantity).toLocaleString()}</p></article>)}</div>
      <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-6"><h2 className="font-serif text-2xl font-semibold text-[#172033]">Order Summary</h2><dl className="mt-5 space-y-3 text-sm"><div className="flex justify-between"><dt className="text-slate-500">Subtotal</dt><dd>৳{subtotal.toLocaleString()}</dd></div><div className="flex justify-between"><dt className="text-slate-500">Delivery estimate</dt><dd>{delivery ? `৳${delivery}` : "Free"}</dd></div><div className="flex justify-between border-t border-stone-200 pt-4 text-lg font-bold"><dt>Total</dt><dd>৳{(subtotal + delivery).toLocaleString()}</dd></div></dl><Link href={`${base}/checkout`} className="mt-6 flex min-h-12 items-center justify-center bg-[#172033] font-semibold text-white">Proceed to Checkout</Link><Link href={`${base}/shop`} className="mt-3 flex min-h-11 items-center justify-center text-sm font-semibold text-[#7b263a]">Continue Shopping</Link></aside>
    </div>
  </main>;
}
