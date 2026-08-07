"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard, ShoppingCart, Package, Tag, Award, Layers,
  Users, Ticket, Megaphone, CreditCard, Truck, Image, FileText,
  BarChart2, Settings, Globe, UserCog, Headphones,
  ChevronLeft, ChevronRight
} from "lucide-react";
import BrandLogo from "@/components/brand/BrandLogo";

const navGroups = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/merchant", icon: LayoutDashboard },
    ],
  },
  {
    label: "Store",
    items: [
      { label: "Orders", href: "/merchant/orders", icon: ShoppingCart },
      { label: "Products", href: "/merchant/products", icon: Package },
      { label: "Categories", href: "/merchant/categories", icon: Tag },
      { label: "Brands", href: "/merchant/brands", icon: Award },
      { label: "Inventory", href: "/merchant/inventory", icon: Layers },
    ],
  },
  {
    label: "Customers",
    items: [
      { label: "Customers", href: "/merchant/customers", icon: Users },
      { label: "Coupons", href: "/merchant/coupons", icon: Ticket },
      { label: "Campaigns", href: "/merchant/campaigns", icon: Megaphone },
    ],
  },
  {
    label: "Finance",
    items: [
      { label: "Payments", href: "/merchant/payments", icon: CreditCard },
      { label: "Delivery Charge", href: "/merchant/delivery", icon: Truck },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Banners", href: "/merchant/banners", icon: Image },
      { label: "Pages", href: "/merchant/pages", icon: FileText },
    ],
  },
  {
    label: "Analytics",
    items: [
      { label: "Reports", href: "/merchant/reports", icon: BarChart2 },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: "Store Settings", href: "/merchant/settings", icon: Settings },
      { label: "Domain Settings", href: "/merchant/domain", icon: Globe },
      { label: "Staff Users", href: "/merchant/staff", icon: UserCog },
      { label: "Support", href: "/merchant/support", icon: Headphones },
    ],
  },
];

interface MerchantSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function MerchantSidebar({ collapsed = false, onToggle }: MerchantSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-screen bg-white border-r border-slate-200 flex flex-col z-40 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className={cn("flex items-center h-16 px-4 border-b border-slate-200", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white p-0.5">
              <BrandLogo variant="icon" className="h-full w-full" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 truncate max-w-[120px]">TechZone BD</p>
              <p className="text-[10px] text-slate-400">Merchant Panel</p>
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
          className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-2">
        <nav className="px-2">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-2">
              {!collapsed && (
                <p className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {group.label}
                </p>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200",
                        active
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <item.icon className={cn("w-4 h-4 shrink-0", active ? "text-blue-600" : "text-slate-400")} />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                      {!collapsed && active && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
                      )}
                    </Link>
                  );
                })}
              </div>
              {!collapsed && <div className="h-px bg-slate-100 my-2 mx-3" />}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Store info footer */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">TZ</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900 truncate">Rafiqul Islam</p>
              <p className="text-[10px] text-slate-500 truncate">Growth Plan • Active</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
