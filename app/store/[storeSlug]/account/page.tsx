import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Package, MapPin, Heart, User, LogOut } from "lucide-react";
import { isDemoStore } from "@/lib/demo";

const orders = [
  { id: "#10045", date: "Jun 25, 2026", items: 2, total: "৳2,310", status: "Processing" },
  { id: "#10033", date: "Jun 12, 2026", items: 1, total: "৳8,500", status: "Delivered" },
  { id: "#10021", date: "May 28, 2026", items: 3, total: "৳5,600", status: "Delivered" },
];

const statusBadge = (s: string) => {
  const map: Record<string, string> = {
    Processing: "bg-blue-100 text-blue-700",
    Delivered: "bg-emerald-100 text-emerald-700",
    Cancelled: "bg-red-100 text-red-700",
  };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${map[s]}`}>{s}</span>;
};

export default async function AccountPage({ params }: { params: Promise<{ storeSlug: string }> }) {
  const { storeSlug } = await params;
  const base = `/store/${storeSlug}`;
  const demoMode = isDemoStore(storeSlug);

  return (
    <div className="pb-24 md:pb-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {demoMode && <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"><strong>Demo Account</strong> · All profile and order information on this page is sample data.</div>}
      {/* Profile header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">RA</div>
        <div>
          <h1 className="text-xl font-bold">{demoMode ? "Sample Shopper" : "Customer Account"}</h1>
          <p className="text-blue-200 text-sm">{demoMode ? "01XXXXXXXXX" : "Customer mobile"}</p>
          <p className="text-blue-200 text-sm">{demoMode ? "sample@example.com" : "Customer email"}</p>
        </div>
        <Button variant="outline" size="sm" className="ml-auto border-white/30 text-white hover:bg-white/10 gap-1.5">
          <LogOut className="w-4 h-4" /> Logout
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Orders", value: "12", icon: "📦" },
          { label: "Wishlist", value: "5", icon: "❤️" },
          { label: "Total Spent", value: "৳18,400", icon: "💰" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <span className="text-2xl">{s.icon}</span>
            <p className="text-lg font-bold text-slate-900 mt-1">{s.value}</p>
            <p className="text-xs text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      <Tabs defaultValue="orders">
        <TabsList className="w-full grid grid-cols-3 mb-5">
          <TabsTrigger value="orders" className="gap-1.5"><Package className="w-4 h-4" />My Orders</TabsTrigger>
          <TabsTrigger value="wishlist" className="gap-1.5"><Heart className="w-4 h-4" />Wishlist</TabsTrigger>
          <TabsTrigger value="profile" className="gap-1.5"><User className="w-4 h-4" />Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
            {orders.map((order, i) => (
              <div key={i} className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-slate-900 text-sm">{order.id}</p>
                    {statusBadge(order.status)}
                  </div>
                  <p className="text-xs text-slate-500">{order.date} · {order.items} item{order.items > 1 ? "s" : ""}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">{order.total}</p>
                  <Link href={`${base}/track-order`} className="text-xs text-blue-600 hover:underline">Track →</Link>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="wishlist">
          <div className="bg-white rounded-xl border border-slate-200 p-6 text-center py-12">
            <Heart className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-500">Your wishlist is empty</p>
            <Link href={`${base}/shop`} className="inline-block mt-4">
              <Button className="gradient-primary text-white border-0">Browse Products</Button>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="profile">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 max-w-md">
            <h3 className="font-semibold text-slate-900">Edit Profile</h3>
            <div className="space-y-1.5"><Label>Full Name</Label><Input defaultValue="Rahim Miah" /></div>
            <div className="space-y-1.5"><Label>Mobile Number</Label><Input defaultValue="01712-345678" /></div>
            <div className="space-y-1.5"><Label>Email</Label><Input type="email" defaultValue="rahim@email.com" /></div>
            <div className="space-y-1.5"><Label>Address</Label>
              <textarea className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="House #12, Road #5, Mirpur-10, Dhaka" />
            </div>
            <Button className="gradient-primary text-white border-0">Save Changes</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
