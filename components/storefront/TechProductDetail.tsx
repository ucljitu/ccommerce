"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, RotateCcw, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import type { TechProduct } from "@/lib/demo-tech-store";
import { useStorefrontCart } from "./StorefrontCartProvider";

export default function TechProductDetail({ product, storeSlug }: { product: TechProduct; storeSlug: string }) {
  const [color, setColor] = useState(product.variants?.color?.length === 1 ? product.variants.color[0] : "");
  const [storage, setStorage] = useState(product.variants?.storage?.length === 1 ? product.variants.storage[0] : "");
  const [error, setError] = useState("");
  const cart = useStorefrontCart();
  const currentPrice = product.salePrice ?? product.price;
  const discount = product.salePrice ? Math.round((1 - product.salePrice / product.price) * 100) : 0;
  function add() {
    if (product.variants?.color?.length && !color) return setError("Please select a color.");
    if (product.variants?.storage?.length && !storage) return setError("Please select a storage option.");
    cart.add({ productId: product.id, name: product.name, image: product.image, price: currentPrice, variant: [color, storage].filter(Boolean).join(" / ") });
    setError("");
  }
  return <div><div className="grid gap-10 md:grid-cols-2 lg:gap-16"><div className="relative aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-white"><Image src={product.image} alt={product.alt} fill priority unoptimized sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-8" /></div><div className="py-2"><p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">{product.brand}</p><h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-slate-950">{product.name}</h1><p className="mt-3 text-sm font-medium text-slate-500">SKU: {product.sku}</p><div className="mt-5 flex flex-wrap items-baseline gap-3"><span className="text-3xl font-bold text-slate-950">৳{currentPrice.toLocaleString()}</span>{product.salePrice && <><span className="text-lg text-slate-400 line-through">৳{product.price.toLocaleString()}</span><span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">{discount}% OFF</span></>}</div><p className="mt-5 leading-7 text-slate-600">{product.shortDescription}</p><div className="mt-4 inline-flex rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">{product.specification}</div><p className="mt-4 text-sm font-semibold text-emerald-700">{product.inStock ? "In Stock" : "Out of Stock"}</p>
      {product.variants?.color && <OptionGroup label="Color" options={product.variants.color} value={color} onChange={setColor} />}
      {product.variants?.storage && <OptionGroup label="Configuration" options={product.variants.storage} value={storage} onChange={setStorage} />}
      {error && <p role="alert" className="mt-4 text-sm font-medium text-red-600">{error}</p>}
      <div className="mt-7 flex gap-3"><button type="button" disabled={!product.inStock} onClick={add} className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"><ShoppingCart className="h-5 w-5" />Add to Cart</button><button aria-label="Add to wishlist" className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-300 bg-white"><Heart className="h-5 w-5" /></button></div><Link href={`/store/${storeSlug}/cart`} className="mt-3 flex min-h-12 items-center justify-center rounded-lg border border-slate-900 font-semibold text-slate-900">View Cart</Link>
      <div className="mt-8 grid grid-cols-3 gap-3 border-t border-slate-200 pt-6 text-center">{[[Truck, "3–5 Day Delivery"], [RotateCcw, "7-Day Returns"], [ShieldCheck, "Secure Checkout"]].map(([Icon, label]) => { const C = Icon as typeof Truck; return <div key={String(label)} className="text-xs text-slate-600"><C className="mx-auto mb-2 h-5 w-5 text-blue-600" />{String(label)}</div>; })}</div></div></div>
    <section className="mt-14 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"><h2 className="text-2xl font-bold text-slate-950">Key Specifications</h2><ul className="mt-4 grid gap-3 text-slate-600 sm:grid-cols-2">{product.details.map((detail) => <li key={detail} className="flex gap-2"><span aria-hidden className="text-blue-600">•</span>{detail}</li>)}</ul></section>
  </div>;
}

function OptionGroup({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (value: string) => void }) { return <fieldset className="mt-6"><legend className="mb-3 text-sm font-semibold text-slate-900">{label}</legend><div className="flex flex-wrap gap-2">{options.map((option) => <button type="button" key={option} onClick={() => onChange(option)} className={`min-h-11 rounded-lg border px-4 text-sm font-semibold ${value === option ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-300 bg-white"}`}>{option}</button>)}</div></fieldset>; }
