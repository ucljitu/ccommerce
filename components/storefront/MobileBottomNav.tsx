"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, ShoppingCart, User, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "", icon: Home },
  { label: "Shop", href: "/shop", icon: Grid },
  { label: "Search", href: "/shop?search=true", icon: Search },
  { label: "Cart", href: "/cart", icon: ShoppingCart, badge: 2 },
  { label: "Account", href: "/account", icon: User },
];

interface MobileBottomNavProps { storeSlug: string; }

export default function MobileBottomNav({ storeSlug }: MobileBottomNavProps) {
  const pathname = usePathname();
  const base = `/store/${storeSlug}`;

  return (
    <nav className="mobile-bottom-nav md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const href = `${base}${item.href}`;
          const active = pathname === href || (item.href === "" && pathname === base);
          return (
            <Link key={item.label} href={href} className={cn("flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors relative", active ? "text-blue-600" : "text-slate-400")}>
              <div className="relative">
                <item.icon className="w-5 h-5" />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{item.badge}</span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
