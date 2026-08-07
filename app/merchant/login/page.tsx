"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react";
import BrandLogo from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LoginResponse = {
  message?: string;
  user?: {
    name: string;
    email: string;
    role: string;
    merchantName: string;
    storeName: string | null;
    storeSlug: string | null;
  };
};

export default function MerchantLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/merchant/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const result = (await response.json()) as LoginResponse;
      if (!response.ok || !result.user) {
        throw new Error(result.message || "Sign in failed.");
      }

      // This cache is display-only. Authorization always uses the HttpOnly session cookie.
      localStorage.setItem("merchant_profile", JSON.stringify(result.user));
      router.replace("/merchant");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Sign in failed.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center">
          <Link href="/" className="flex flex-col items-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-1 shadow-lg shadow-blue-600/20">
              <BrandLogo variant="icon" priority className="h-full w-full" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">C Commerce</h1>
          </Link>
          <p className="mt-1 text-sm text-slate-500">Merchant Dashboard</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60">
          <h2 className="mb-1 text-lg font-semibold text-slate-900">Sign in to your store</h2>
          <p className="mb-6 text-sm text-slate-500">Use the merchant account created for your store.</p>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-1.5">
              <Label htmlFor="merchant-email" className="text-slate-700">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input id="merchant-email" type="email" autoComplete="username" value={email}
                  onChange={(event) => { setEmail(event.target.value); setError(""); }}
                  className="pl-10" required />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="merchant-password" className="text-slate-700">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input id="merchant-password" type={showPassword ? "text" : "password"}
                  autoComplete="current-password" value={password}
                  onChange={(event) => { setPassword(event.target.value); setError(""); }}
                  className="pl-10 pr-10" required />
                <button type="button" onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div role="alert" className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-600">
                <AlertCircle className="h-4 w-4 shrink-0" />{error}
              </div>
            )}

            <Button type="submit" className="gradient-primary mt-1 h-11 w-full border-0 text-base text-white" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>

        <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
          <Link href="/" className="flex items-center gap-1 transition-colors hover:text-slate-600">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </Link>
          <span>© 2026 C Commerce</span>
        </div>
      </div>
    </div>
  );
}
