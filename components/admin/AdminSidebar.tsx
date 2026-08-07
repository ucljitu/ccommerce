"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard, Store, CreditCard, FlaskConical, DollarSign,
  Package, Globe, Palette, Headphones, BarChart2, Settings,
  ChevronLeft, ChevronRight
} from "lucide-react";
import BrandLogo from "@/components/brand/BrandLogo";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Merchants", href: "/admin/merchants", icon: Store },
  { label: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
  { label: "Trial Stores", href: "/admin/trial-stores", icon: FlaskConical },
  { label: "Payments", href: "/admin/payments", icon: DollarSign },
  { label: "Plans", href: "/admin/plans", icon: Package },
  { label: "Domains", href: "/admin/domains", icon: Globe },
  { label: "Themes", href: "/admin/themes", icon: Palette },
  { label: "Support Tickets", href: "/admin/support", icon: Headphones },
  { label: "Revenue Reports", href: "/admin/reports", icon: BarChart2 },
  { label: "System Settings", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function AdminSidebar({ collapsed = false, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-screen bg-slate-900 text-white flex flex-col z-40 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className={cn("flex items-center h-16 px-4 border-b border-slate-800", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white p-0.5">
              <BrandLogo variant="icon" className="h-full w-full" />
            </div>
            <div>
              <p className="text-sm font-bold">C Commerce</p>
              <p className="text-[10px] text-slate-400">Super Admin</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white p-0.5">
            <BrandLogo variant="icon" className="h-full w-full" />
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
                  active
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">SA</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Super Admin</p>
              <p className="text-xs text-slate-400 truncate">admin@ccommerce.bd</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
