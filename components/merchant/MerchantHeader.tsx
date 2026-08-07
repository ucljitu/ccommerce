"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bell, Search, ExternalLink, Settings, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface MerchantHeaderProps { title: string; }

interface MerchantAuth {
  name: string;
  storeName: string | null;
  storeSlug: string | null;
  role: string;
  email: string;
}

export default function MerchantHeader({ title }: MerchantHeaderProps) {
  const router = useRouter();
  const [auth, setAuth] = useState<MerchantAuth | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("merchant_profile");
      if (raw) setAuth(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const handleLogout = async () => {
    await fetch("/api/merchant/auth/logout", { method: "POST", credentials: "same-origin" });
    localStorage.removeItem("merchant_profile");
    router.replace("/merchant/login");
    router.refresh();
  };

  const storeSlug = auth?.storeSlug ?? "my-store";
  const ownerName = auth?.name ?? "Merchant";
  const storeName = auth?.storeName ?? "My Store";
  const initials = ownerName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 gap-4 sticky top-0 z-30">
      <h1 className="text-xl font-semibold text-slate-900 shrink-0">{title}</h1>

      <div className="flex-1 max-w-xs ml-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search..." className="pl-9 h-9 bg-slate-50" />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <Link href={`/store/${storeSlug}`} target="_blank">
          <Button variant="outline" size="sm" className="gap-2 text-blue-600 border-blue-200 hover:bg-blue-50">
            <ExternalLink className="w-4 h-4" /> View Store
          </Button>
        </Link>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-slate-500" />
          <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 text-[10px] flex items-center justify-center bg-red-500 text-white border-0 rounded-full">3</Badge>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-blue-600 text-white text-xs">{initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="pb-1">
              <p className="font-semibold text-slate-900 text-sm">{ownerName}</p>
              <p className="text-xs text-slate-500 font-normal">{storeName}</p>
              <span className="mt-1.5 inline-block rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium capitalize text-blue-700">
                {auth?.role ?? "merchant"}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/merchant/settings" className="flex items-center gap-2 cursor-pointer">
                <User className="w-4 h-4" />My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/merchant/settings" className="flex items-center gap-2 cursor-pointer">
                <Settings className="w-4 h-4" />Store Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
