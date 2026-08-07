"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, AlertCircle, Lock, Mail } from "lucide-react";
import BrandLogo from "@/components/brand/BrandLogo";

const ADMIN_EMAIL = "admin@ccommerce.bd";
const ADMIN_PASSWORD = "admin123";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("admin_auth", JSON.stringify({ email, loginAt: Date.now() }));
      router.push("/admin");
    } else {
      setError("Invalid email or password.");
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-1 shadow-lg shadow-blue-600/20">
            <BrandLogo variant="icon" priority className="h-full w-full" />
          </div>
          <h1 className="text-2xl font-bold text-white">C Commerce</h1>
          <p className="text-slate-400 text-sm mt-1">Super Admin Panel</p>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7 shadow-2xl">
          <h2 className="text-lg font-semibold text-white mb-6">Sign in to your account</h2>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-slate-300">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  type="email"
                  placeholder="admin@ccommerce.bd"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(""); }}
                  onKeyDown={handleKeyDown}
                  className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-slate-300">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  onKeyDown={handleKeyDown}
                  className="pl-10 pr-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">
                <AlertCircle className="w-4 h-4 shrink-0" />{error}
              </div>
            )}

            <Button
              className="w-full gradient-primary text-white border-0 h-11 text-base mt-2"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </div>

          {/* Demo hint */}
          <div className="mt-5 pt-5 border-t border-slate-800">
            <p className="text-xs text-slate-500 text-center mb-2">Demo credentials</p>
            <div className="bg-slate-800/60 rounded-lg px-3 py-2 text-xs text-slate-400 space-y-1">
              <div className="flex justify-between"><span>Email</span><span className="text-slate-300 font-mono">admin@ccommerce.bd</span></div>
              <div className="flex justify-between"><span>Password</span><span className="text-slate-300 font-mono">admin123</span></div>
            </div>
          </div>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">© 2026 C Commerce. All rights reserved.</p>
      </div>
    </div>
  );
}
