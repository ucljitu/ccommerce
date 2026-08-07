"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Bell, Search, Settings, LogOut, User, CheckCircle, X, Store, CreditCard, Headphones, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface AdminHeaderProps { title: string; }

type Merchant = { id: string; name: string; owner: string; plan: string; status: string; };

const PAGES = [
  { label: "Dashboard", href: "/admin", icon: "📊" },
  { label: "Merchants", href: "/admin/merchants", icon: "🏪" },
  { label: "Subscriptions", href: "/admin/subscriptions", icon: "💳" },
  { label: "Trial Stores", href: "/admin/trial-stores", icon: "🧪" },
  { label: "Payments", href: "/admin/payments", icon: "💰" },
  { label: "Plans", href: "/admin/plans", icon: "📦" },
  { label: "Domains", href: "/admin/domains", icon: "🌐" },
  { label: "Themes", href: "/admin/themes", icon: "🎨" },
  { label: "Support Tickets", href: "/admin/support", icon: "🎧" },
  { label: "Revenue Reports", href: "/admin/reports", icon: "📈" },
  { label: "System Settings", href: "/admin/settings", icon: "⚙️" },
];

const NOTIFICATIONS = [
  { id: 1, icon: Store, color: "text-blue-500 bg-blue-50", title: "New merchant registered", desc: "RestaurantHub just signed up", time: "2 min ago", unread: true },
  { id: 2, icon: CreditCard, color: "text-red-500 bg-red-50", title: "Payment failed", desc: "Sylhet Handicrafts — ৳1,999", time: "1 hour ago", unread: true },
  { id: 3, icon: Headphones, color: "text-amber-500 bg-amber-50", title: "New support ticket", desc: "#T-2041 — Payment gateway issue", time: "2 hours ago", unread: true },
  { id: 4, icon: Package, color: "text-emerald-500 bg-emerald-50", title: "Trial expired", desc: "Green Agro Store trial ended", time: "1 day ago", unread: false },
  { id: 5, icon: Store, color: "text-purple-500 bg-purple-50", title: "Plan upgraded", desc: "TechZone BD → Business plan", time: "2 days ago", unread: false },
];

function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
      {msg}
      <button onClick={onClose} className="ml-2 text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
    </div>
  );
}

export default function AdminHeader({ title }: AdminHeaderProps) {
  const router = useRouter();
  const [toast, setToast] = useState<string | null>(null);

  // Search state
  const [query, setQuery] = useState("");
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Notifications state
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("admin_merchants");
      if (raw) setMerchants(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowSearch(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotif(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const handleLogout = () => {
    showToast("Logging out...");
    setTimeout(() => {
      localStorage.removeItem("admin_auth");
      router.replace("/admin/login");
    }, 800);
  };

  // Search results
  const q = query.toLowerCase().trim();
  const merchantResults = q
    ? merchants.filter(m => m.name.toLowerCase().includes(q) || m.owner.toLowerCase().includes(q)).slice(0, 4)
    : [];
  const pageResults = q
    ? PAGES.filter(p => p.label.toLowerCase().includes(q)).slice(0, 3)
    : [];
  const hasResults = merchantResults.length > 0 || pageResults.length > 0;

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => setNotifications(notifications.map(n => ({ ...n, unread: false })));

  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 gap-4 sticky top-0 z-30">
        <h1 className="text-xl font-semibold text-slate-900 flex-shrink-0">{title}</h1>

        {/* Global Search */}
        <div className="flex-1 max-w-sm ml-4 relative" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search merchants, pages..."
              className="pl-9 h-9 bg-slate-50 border-slate-200"
              value={query}
              onChange={e => { setQuery(e.target.value); setShowSearch(true); }}
              onFocus={() => setShowSearch(true)}
            />
            {query && (
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" onClick={() => { setQuery(""); setShowSearch(false); }}>
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Dropdown */}
          {showSearch && query && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
              {!hasResults && (
                <div className="px-4 py-6 text-center text-sm text-slate-400">No results for &ldquo;{query}&rdquo;</div>
              )}
              {merchantResults.length > 0 && (
                <>
                  <p className="px-3 pt-3 pb-1 text-xs font-semibold text-slate-400 uppercase tracking-wide">Merchants</p>
                  {merchantResults.map(m => (
                    <button
                      key={m.id}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 text-left transition-colors"
                      onClick={() => { router.push(`/admin/merchants/${encodeURIComponent(m.id)}`); setQuery(""); setShowSearch(false); }}
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                        <Store className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{m.name}</p>
                        <p className="text-xs text-slate-400 truncate">{m.owner} · {m.plan} · {m.status}</p>
                      </div>
                    </button>
                  ))}
                </>
              )}
              {pageResults.length > 0 && (
                <>
                  <p className="px-3 pt-2 pb-1 text-xs font-semibold text-slate-400 uppercase tracking-wide">Pages</p>
                  {pageResults.map(p => (
                    <button
                      key={p.href}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 text-left transition-colors"
                      onClick={() => { router.push(p.href); setQuery(""); setShowSearch(false); }}
                    >
                      <span className="text-lg">{p.icon}</span>
                      <span className="text-sm text-slate-700 font-medium">{p.label}</span>
                    </button>
                  ))}
                </>
              )}
              <div className="border-t border-slate-100 px-3 py-2">
                <p className="text-xs text-slate-400">Press Enter to search all merchants</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 ml-auto">

          {/* Notifications Bell */}
          <div className="relative" ref={notifRef}>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setShowNotif(!showNotif)}
            >
              <Bell className="w-5 h-5 text-slate-500" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            {showNotif && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-900 text-sm">Notifications</h3>
                  {unreadCount > 0 && (
                    <button className="text-xs text-blue-600 hover:underline" onClick={markAllRead}>
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      className={`flex items-start gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors ${n.unread ? "bg-blue-50/40" : ""}`}
                      onClick={() => setNotifications(notifications.map(x => x.id === n.id ? { ...x, unread: false } : x))}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${n.color}`}>
                        <n.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900">{n.title}</p>
                        <p className="text-xs text-slate-500 truncate">{n.desc}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                      </div>
                      {n.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0" />}
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-100 p-3">
                  <Button variant="ghost" size="sm" className="w-full text-xs text-slate-500" onClick={() => setShowNotif(false)}>
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Super Admin</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => showToast("Profile page coming soon")}>
                <User className="w-4 h-4 mr-2" />Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/admin/settings")}>
                <Settings className="w-4 h-4 mr-2" />Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </>
  );
}
