"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useStorefrontCart } from "./StorefrontCartProvider";

interface StoreHeaderProps { storeName: string; storeSlug: string; phone?: string; isDemo?: boolean; isFashion?: boolean; isTech?: boolean }

export default function StoreHeader({ storeName, storeSlug, phone, isDemo = false, isFashion = false, isTech = false }: StoreHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { count } = useStorefrontCart();
  const pathname = usePathname();
  const router = useRouter();
  const base = `/store/${storeSlug}`;
  const links = isFashion ? [
    ["Home", base], ["New Arrivals", `${base}/shop?tag=new`], ["Women", `${base}/shop?cat=women`],
    ["Men", `${base}/shop?cat=men`], ["Kids", `${base}/shop?cat=kids`], ["Accessories", `${base}/shop?cat=accessories`], ["Sale", `${base}/shop?tag=sale`],
  ] : isTech ? [
    ["Home", base], ["New Arrivals", `${base}/shop?tag=new`], ["Smartphones", `${base}/shop?cat=smartphones`],
    ["Accessories", `${base}/shop?cat=mobile-accessories`], ["Audio", `${base}/shop?cat=audio`],
    ["Computers", `${base}/shop?cat=computers`], ["Gaming", `${base}/shop?cat=gaming`], ["Deals", `${base}/shop?tag=sale`],
  ] : [["Home", base], ["Shop", `${base}/shop`], ["About", `${base}/about`], ["Contact", `${base}/contact`]];

  function search(event: FormEvent) {
    event.preventDefault();
    router.push(`${base}/shop${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`);
    setMenuOpen(false);
  }

  return (
    <>
      {isDemo && <div className="flex min-h-8 items-center justify-center bg-[#172033] px-3 py-1.5 text-center text-[11px] font-medium text-white sm:text-xs">
        <span>Demo Store · Sample Data Only · No Real Payment Is Processed</span>
        <Link href="/demo" className="ml-2 underline underline-offset-2">Back to C Commerce Demo</Link>
      </div>}
      {phone && <div className="bg-slate-800 px-4 py-2 text-center text-xs text-white">{phone}</div>}
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <button type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)} className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-stone-100 lg:hidden">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link href={base} className="mr-auto flex shrink-0 items-center" aria-label={`${storeName} home`}>
            {isFashion ? (
              <Image src="/demo-fashion/dhaka-fashion-hub-logo.png" alt="Dhaka Fashion Hub" width={529} height={225} priority unoptimized className="h-12 w-auto max-w-[142px] object-contain sm:max-w-[168px]" />
            ) : isTech ? (
              <span className="flex items-center gap-2 font-bold tracking-tight text-slate-950"><span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white">TG</span><span className="hidden text-lg sm:block">Tech Gadgets BD</span></span>
            ) : (
              <span className="font-serif text-lg font-bold tracking-tight text-[#172033] sm:text-xl">{storeName}</span>
            )}
          </Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-0.5 lg:flex">
            {links.map(([label, href]) => {
              const active = href === base ? pathname === base : pathname.startsWith(href.split("?")[0]);
              return <Link key={label} href={href} className={`rounded-lg px-2.5 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7b263a] ${active ? "text-[#7b263a]" : "text-slate-600 hover:text-[#172033]"}`}>{label}</Link>;
            })}
          </nav>
          <form onSubmit={search} role="search" className="ml-auto hidden w-44 xl:block">
            <label className="sr-only" htmlFor="store-search">Search products</label>
            <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input id="store-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" className="h-11 w-full rounded-full border border-stone-200 bg-stone-50 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-[#7b263a]" /></div>
          </form>
          <Link href={`${base}/account`} aria-label="My account" className="hidden h-11 w-11 items-center justify-center rounded-full hover:bg-stone-100 sm:flex"><User className="h-5 w-5" /></Link>
          <button type="button" aria-label="Wishlist" className="hidden h-11 w-11 items-center justify-center rounded-full hover:bg-stone-100 sm:flex"><Heart className="h-5 w-5" /></button>
          <Link href={`${base}/cart`} aria-label={`Cart with ${count} items`} className="relative flex h-11 w-11 items-center justify-center rounded-full hover:bg-stone-100">
            <ShoppingBag className="h-5 w-5" />{count > 0 && <span className="absolute right-0.5 top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#7b263a] px-1 text-[10px] font-bold text-white">{count}</span>}
          </Link>
        </div>
        {(isFashion || isTech) && <div className={`border-t py-2 text-center text-xs font-semibold tracking-wide ${isTech ? "border-blue-100 bg-blue-50 text-slate-800" : "border-stone-100 bg-[#f6f0e7] text-[#172033]"}`}>Free Delivery on Orders Above ৳2,000</div>}
        {menuOpen && <div className="border-t border-stone-200 bg-white p-4 lg:hidden">
          <form onSubmit={search} className="mb-3 flex"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" className="min-h-11 flex-1 rounded-l-lg border border-stone-300 px-3 text-sm outline-none focus:ring-2 focus:ring-[#7b263a]" /><button aria-label="Search" className="min-h-11 rounded-r-lg bg-[#172033] px-4 text-white"><Search className="h-4 w-4" /></button></form>
          <nav aria-label="Mobile navigation" className="grid">
            {links.map(([label, href]) => <Link key={label} href={href} onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-slate-700 hover:bg-stone-50">{label}</Link>)}
            <Link href={`${base}/track-order`} onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-slate-700 hover:bg-stone-50">Track Order</Link>
            <Link href={`${base}/account`} onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-slate-700 hover:bg-stone-50">My Account</Link>
          </nav>
        </div>}
      </header>
    </>
  );
}
