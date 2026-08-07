"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import ProductCard from "./ProductCard";
import type { TechProduct } from "@/lib/demo-tech-store";

export default function TechShop({ products, storeSlug, initialQuery, initialCategory, initialTag }: { products: TechProduct[]; storeSlug: string; initialQuery: string; initialCategory: string; initialTag: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory.toLowerCase());
  const [sort, setSort] = useState("newest");
  const categories = ["all", ...Array.from(new Set(products.map((product) => product.category.toLowerCase().replaceAll(" ", "-"))))];
  const visible = (() => {
    const needle = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const searchable = [product.name, product.category, product.brand, product.sku, ...product.tags, product.specification].join(" ").toLowerCase();
      return (category === "all" || product.category.toLowerCase().replaceAll(" ", "-") === category) &&
        (!needle || searchable.includes(needle)) &&
        (initialTag !== "sale" || Boolean(product.salePrice)) &&
        (initialTag !== "new" || Boolean(product.isNew));
    });
    return [...filtered].sort((a, b) => sort === "low" ? (a.salePrice ?? a.price) - (b.salePrice ?? b.price) : sort === "high" ? (b.salePrice ?? b.price) - (a.salePrice ?? a.price) : Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)));
  })();

  return <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><div className="mb-8"><p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Tech Gadgets BD</p><h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">Shop Electronics</h1><p className="mt-2 text-slate-600">Smartphones, accessories, audio devices and computer essentials.</p></div>
    <div className="mb-8 flex flex-col gap-4 border-y border-slate-200 py-5 lg:flex-row lg:items-center lg:justify-between"><div className="flex gap-2 overflow-x-auto pb-1">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold capitalize ${category === item ? "bg-blue-600 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-blue-400"}`}>{item.replaceAll("-", " ")}</button>)}</div><div className="flex flex-col gap-3 sm:flex-row"><label className="relative"><span className="sr-only">Search products</span><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, brand, SKU or tag" className="min-h-11 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 sm:w-72" /></label><select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)} className="min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"><option value="newest">Newest</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option></select></div></div>
    <p className="mb-5 text-sm text-slate-500">{visible.length} {visible.length === 1 ? "product" : "products"}</p>
    {visible.length ? <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{visible.map((product) => <ProductCard key={product.id} product={{ ...product, storeSlug }} />)}</div> : <div className="rounded-2xl border border-slate-200 bg-white px-6 py-20 text-center"><h2 className="text-xl font-semibold text-slate-950">No Products Found</h2><p className="mt-2 text-slate-500">Try another search term or browse our categories.</p><button onClick={() => { setQuery(""); setCategory("all"); }} className="mt-5 min-h-11 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white">Clear Filters</button></div>}
  </main>;
}
