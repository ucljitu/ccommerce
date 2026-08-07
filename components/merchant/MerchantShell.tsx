"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import MerchantSidebar from "./MerchantSidebar";

export default function MerchantShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/merchant/login") {
      setChecked(true);
      return;
    }
    let active = true;
    fetch("/api/merchant/auth/session", { credentials: "same-origin", cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unauthenticated");
        const result = await response.json();
        if (result.user) localStorage.setItem("merchant_profile", JSON.stringify(result.user));
        if (active) setChecked(true);
      })
      .catch(() => {
        localStorage.removeItem("merchant_profile");
        if (active) router.replace("/merchant/login");
      });
    return () => { active = false; };
  }, [pathname, router]);

  if (pathname === "/merchant/login") return <>{children}</>;

  if (!checked) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <MerchantSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div
        className="flex-1 flex flex-col min-h-screen transition-all duration-300"
        style={{ marginLeft: collapsed ? 64 : 256 }}
      >
        {children}
      </div>
    </div>
  );
}
