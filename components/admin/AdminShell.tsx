"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin/login") {
      setChecked(true);
      return;
    }
    try {
      const raw = localStorage.getItem("admin_auth");
      if (!raw) {
        router.replace("/admin/login");
        return;
      }
      const auth = JSON.parse(raw);
      const EIGHT_HOURS = 8 * 60 * 60 * 1000;
      if (!auth?.loginAt || Date.now() - auth.loginAt > EIGHT_HOURS) {
        localStorage.removeItem("admin_auth");
        router.replace("/admin/login");
        return;
      }
    } catch {
      router.replace("/admin/login");
      return;
    }
    setChecked(true);
  }, [pathname, router]);

  if (pathname === "/admin/login") return <>{children}</>;

  if (!checked) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div
        className="flex-1 flex flex-col min-h-screen transition-all duration-300"
        style={{ marginLeft: collapsed ? 64 : 256 }}
      >
        {children}
      </div>
    </div>
  );
}
