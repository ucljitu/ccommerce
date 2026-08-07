import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BrandLogo from "@/components/brand/BrandLogo";

export const metadata = { title: "Login — C Commerce" };

export default function LoginPage() {
  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4 pt-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" aria-label="C Commerce home" className="inline-flex items-center">
            <BrandLogo priority className="h-12 w-auto" />
          </Link>
          <p className="mt-3 text-slate-500">Sign in to your merchant dashboard</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">Welcome back</h1>

          <div className="space-y-5">
            <div className="space-y-1.5">
              <Label>Email or Mobile</Label>
              <Input placeholder="email@example.com or 01XXXXXXXXX" />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <Label>Password</Label>
                <Link href="/forgot-password" className="text-xs text-blue-600 hover:underline">Forgot password?</Link>
              </div>
              <Input type="password" placeholder="••••••••" />
            </div>

            <Button size="lg" className="w-full gradient-primary text-white border-0">
              Sign In
            </Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
            <div className="relative flex justify-center text-xs text-slate-500 bg-white px-2">Or continue with</div>
          </div>

          <Button variant="outline" size="lg" className="w-full gap-3">
            <span className="text-lg">📱</span>
            Continue with OTP (Mobile)
          </Button>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/trial" className="text-blue-600 font-medium hover:underline">Start free trial</Link>
          </p>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Super Admin?{" "}
          <Link href="/admin" className="text-blue-600 hover:underline">Admin Login</Link>
        </p>
      </div>
    </div>
  );
}
