"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, RotateCcw, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import type { FashionProduct } from "@/lib/demo-fashion-store";
import { useStorefrontCart } from "./StorefrontCartProvider";

export default function FashionProductDetail({ product, storeSlug }: { product: FashionProduct; storeSlug: string }) {
  const [size, setSize] = useState("");
  const [color, setColor] = useState(product.variants?.color?.length === 1 ? product.variants.color[0] : "");
  const [error, setError] = useState("");
  const cart = useStorefrontCart();
  const currentPrice = product.salePrice ?? product.price;
  const discount = product.salePrice ? Math.round((1 - product.salePrice / product.price) * 100) : 0;
  function add() {
    if (product.variants?.size?.length && !size) return setError("Please select a size.");
    if (product.variants?.color?.length && !color) return setError("Please select a color.");
    cart.add({ productId: product.id, name: product.name, image: product.image, price: currentPrice, variant: [size, color].filter(Boolean).join(" / ") });
    setError("");
  }
  return <div>
    <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#eee8df]"><Image src={product.image} alt={product.alt} fill priority unoptimized sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div>
      <div className="py-2">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#7b263a]">{product.category}</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-[#172033]">{product.name}</h1>
        <div className="mt-5 flex items-baseline gap-3"><span className="text-3xl font-bold text-[#172033]">৳{currentPrice.toLocaleString()}</span>{product.salePrice && <><span className="text-lg text-slate-400 line-through">৳{product.price.toLocaleString()}</span><span className="rounded-full bg-[#7b263a]/10 px-2.5 py-1 text-xs font-semibold text-[#7b263a]">{discount}% OFF</span></>}</div>
        <p className="mt-5 leading-7 text-slate-600">{product.shortDescription}</p>
        <p className="mt-3 text-sm font-semibold text-emerald-700">{product.inStock ? "In Stock" : "Out of Stock"}</p>
        {product.variants?.size && <fieldset className="mt-7"><legend className="mb-3 text-sm font-semibold text-[#172033]">Select Size</legend><div className="flex flex-wrap gap-2">{product.variants.size.map((item) => <button type="button" key={item} onClick={() => { setSize(item); setError(""); }} className={`min-h-11 min-w-11 rounded-lg border px-3 text-sm font-semibold ${size === item ? "border-[#172033] bg-[#172033] text-white" : "border-stone-300 bg-white"}`}>{item}</button>)}</div></fieldset>}
        {product.variants?.color && <fieldset className="mt-6"><legend className="mb-3 text-sm font-semibold text-[#172033]">Color</legend><div className="flex flex-wrap gap-2">{product.variants.color.map((item) => <button type="button" key={item} onClick={() => { setColor(item); setError(""); }} className={`min-h-11 rounded-full border px-4 text-sm ${color === item ? "border-[#7b263a] bg-[#7b263a]/10 text-[#7b263a]" : "border-stone-300 bg-white"}`}>{item}</button>)}</div></fieldset>}
        {error && <p role="alert" className="mt-4 text-sm font-medium text-red-600">{error}</p>}
        <div className="mt-7 flex gap-3"><button type="button" disabled={!product.inStock} onClick={add} className="flex min-h-12 flex-1 items-center justify-center gap-2 bg-[#172033] px-5 font-semibold text-white hover:bg-[#7b263a] disabled:opacity-50"><ShoppingBag className="h-5 w-5" />Add to Cart</button><button aria-label="Add to wishlist" className="flex h-12 w-12 items-center justify-center border border-stone-300 bg-white"><Heart className="h-5 w-5" /></button></div>
        <Link href={`/store/${storeSlug}/cart`} className="mt-3 flex min-h-12 items-center justify-center border border-[#172033] font-semibold text-[#172033]">View Cart</Link>
        <div className="mt-8 grid grid-cols-3 gap-3 border-t border-stone-200 pt-6 text-center">{[[Truck, "3–5 Day Delivery"], [RotateCcw, "7-Day Returns"], [ShieldCheck, "Secure Checkout"]].map(([Icon, label]) => { const C = Icon as typeof Truck; return <div key={String(label)} className="text-xs text-slate-600"><C className="mx-auto mb-2 h-5 w-5 text-[#7b263a]" />{String(label)}</div>; })}</div>
      </div>
    </div>
    <section className="mt-14 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8"><h2 className="font-serif text-2xl font-semibold text-[#172033]">Product Details</h2><ul className="mt-4 grid gap-2 text-slate-600 sm:grid-cols-2">{product.details.map((detail) => <li key={detail} className="flex gap-2"><span aria-hidden className="text-[#7b263a]">•</span>{detail}</li>)}</ul></section>
  </div>;
}
