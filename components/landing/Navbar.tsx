"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/brand/BrandLogo";

const navLinks = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Demo", href: "/demo" },
  { label: "Help", href: "/help" },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 8);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition ${scrolled || open ? "border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur" : "border-b border-transparent bg-white/80 backdrop-blur"}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="C Commerce home" className="flex min-h-11 items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
          <BrandLogo priority className="h-9 w-auto sm:h-10" />
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => <Link key={link.href} href={link.href} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">{link.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost"><Link href="/login">Login</Link></Button>
          <Button asChild variant="gradient"><Link href="/trial">Start Free</Link></Button>
        </div>
        <button type="button" className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:hidden" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-slate-100 bg-white px-4 py-4 md:hidden">
          {navLinks.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block min-h-11 rounded-lg px-3 py-3 font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700">{link.label}</Link>)}
          <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
            <Button asChild variant="outline"><Link href="/login" onClick={() => setOpen(false)}>Login</Link></Button>
            <Button asChild variant="gradient"><Link href="/trial" onClick={() => setOpen(false)}>Start Free</Link></Button>
          </div>
        </nav>
      )}
    </header>
  );
}
