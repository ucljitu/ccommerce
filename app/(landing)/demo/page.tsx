import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  ArrowRight,
  Baby,
  BarChart3,
  Boxes,
  Check,
  ClipboardList,
  CreditCard,
  Info,
  LayoutDashboard,
  MapPin,
  MonitorSmartphone,
  PackagePlus,
  ShieldCheck,
  Shirt,
  ShoppingCart,
  Smartphone,
  Sprout,
  Store,
  Truck,
  UserRound,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { demoStores } from "@/lib/demo";

const title = "C Commerce Demo | Explore the Ecommerce Platform";
const description = "Explore the C Commerce merchant dashboard, customer storefront and online store features using safe sample data.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: "See C Commerce in Action",
    description: "Explore store management, orders, products and customer shopping through the C Commerce demo.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "See C Commerce in Action",
    description: "Explore store management, orders, products and customer shopping through the C Commerce demo.",
  },
};

type Panel = {
  id: string;
  title: string;
  description: string;
  items: readonly string[];
  cta: string;
  route: string;
  icon: LucideIcon;
  featured?: boolean;
  note: string;
};

const demoPanels: readonly Panel[] = [
  {
    id: "admin-preview",
    title: "Super Admin Preview",
    description: "See a safe overview of platform-level management without opening administration access.",
    items: ["Merchant overview", "Subscription overview", "Plan management", "Platform reports"],
    cta: "View Admin Preview",
    route: "#admin-preview",
    icon: ShieldCheck,
    note: "Preview only",
  },
  {
    id: "merchant",
    title: "Merchant Dashboard",
    description: "See how products, orders, customers, payments and store settings are managed.",
    items: ["Manage products", "Review orders", "View customers", "Check reports"],
    cta: "Start Guided Demo",
    route: "#merchant-demo",
    icon: LayoutDashboard,
    featured: true,
    note: "Guided preview",
  },
  {
    id: "storefront",
    title: "Customer Storefront",
    description: "Browse products, use the cart and preview a safe customer checkout.",
    items: ["Browse products", "View details", "Use the cart", "Preview checkout"],
    cta: "Open Customer Demo",
    route: `/store/${demoStores[0].slug}`,
    icon: ShoppingCart,
    note: "Interactive sample store",
  },
];

const merchantSteps = [
  { title: "Add a Product", description: "Create a product with price, stock and category.", icon: PackagePlus },
  { title: "Receive an Order", description: "See sample customer orders in the dashboard.", icon: ClipboardList },
  { title: "Update Order Status", description: "Move an order through clear delivery stages.", icon: Truck },
  { title: "Check Sales", description: "Review sample sales, payments and order reports.", icon: BarChart3 },
] as const;

const explorationFeatures = [
  { title: "Product Management", description: "View how products, prices, categories and stock are managed.", icon: Boxes },
  { title: "Order Management", description: "See how merchants review and update customer orders.", icon: ClipboardList },
  { title: "Customer Records", description: "View sample customer information and order history.", icon: UserRound },
  { title: "Delivery Charges", description: "See how delivery fees can be set by location.", icon: MapPin },
  { title: "Sales Reports", description: "Explore sample sales, payment and order summaries.", icon: BarChart3 },
  { title: "Customer Checkout", description: "Browse products, use the cart and preview demo checkout.", icon: CreditCard },
] as const;

const storeIcons: Record<(typeof demoStores)[number]["id"], LucideIcon> = {
  fashion: Shirt,
  electronics: Smartphone,
  agro: Sprout,
  baby: Baby,
};

export default function DemoPage() {
  return (
    <>
      <section className="gradient-hero overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <div className="text-center lg:text-left">
            <Badge className="border-0 bg-blue-100 text-blue-700">Live Demo</Badge>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">See C Commerce in Action</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 lg:mx-0">
              Explore the platform with sample data and see how store management, orders and customer shopping work.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Button asChild size="xl" variant="gradient"><a href="#merchant-demo">Start Merchant Demo</a></Button>
              <Button asChild size="xl" variant="outline" className="border-2 bg-white"><Link href={`/store/${demoStores[0].slug}`}>View Demo Store</Link></Button>
            </div>
            <p className="mt-5 text-sm text-slate-500">Sample data · Safe demo access · No payment required</p>
          </div>

          <div className="rounded-3xl border border-white bg-white p-4 shadow-2xl shadow-blue-900/10" role="img" aria-label="C Commerce sample dashboard and storefront preview">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
              <div><p className="font-semibold text-slate-900">Sample Store Overview</p><p className="text-xs text-slate-500">Demo data</p></div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">Demo</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[["Orders", ClipboardList], ["Products", Boxes], ["Sales", BarChart3]].map(([label, Icon]) => (
                <div key={label as string} className="rounded-xl bg-slate-50 p-3"><Icon className="h-5 w-5 text-blue-600" aria-hidden="true" /><p className="mt-3 text-sm font-semibold text-slate-900">{label as string}</p><p className="mt-1 text-xs text-slate-500">Sample summary</p></div>
              ))}
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-[1.2fr_.8fr]">
              <div className="rounded-xl border border-slate-100 p-4">
                <p className="text-sm font-medium text-slate-700">Recent sample order</p>
                <div className="mt-4 flex items-center justify-between rounded-lg bg-blue-50 p-3"><div><p className="text-sm font-semibold text-slate-900">Demo Customer</p><p className="text-xs text-slate-500">2 sample products</p></div><Badge variant="warning">Pending</Badge></div>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 p-4">
                <MonitorSmartphone className="h-6 w-6 text-purple-700" aria-hidden="true" />
                <p className="mt-4 text-sm font-semibold text-slate-900">Storefront</p>
                <p className="mt-1 text-xs text-slate-600">Mobile-friendly preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="demo-access-title" className="border-y border-slate-100 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="demo-access-title" className="text-center text-2xl font-bold text-slate-900">How Demo Access Works</h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              ["Open a Demo", "Explore a safe preview or sample storefront."],
              ["Try Key Features", "View products, orders, reports and storefront pages."],
              ["Start Your Store", "Create your own account when you are ready."],
            ].map(([step, text], index) => (
              <li key={step} className="flex gap-4 rounded-2xl bg-slate-50 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">{index + 1}</span>
                <div><h3 className="font-semibold text-slate-900">{step}</h3><p className="mt-1 text-sm leading-relaxed text-slate-600">{text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="panels-title" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="panels-title" className="text-3xl font-bold text-slate-900 sm:text-4xl">Explore All Panels</h2>
            <p className="mt-4 text-lg text-slate-600">Choose the experience you want to explore.</p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {demoPanels.map((panel) => (
              <Card key={panel.id} className={`flex h-full flex-col p-7 transition hover:-translate-y-1 hover:shadow-lg ${panel.featured ? "border-blue-500 ring-1 ring-blue-500" : ""}`}>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${panel.featured ? "gradient-primary text-white" : "bg-blue-50 text-blue-600"}`}><panel.icon className="h-6 w-6" aria-hidden="true" /></div>
                <div className="mt-5 flex items-center gap-2"><h3 className="text-xl font-bold text-slate-900">{panel.title}</h3>{panel.featured && <Badge>Primary Demo</Badge>}</div>
                <p className="mt-3 leading-relaxed text-slate-600">{panel.description}</p>
                <ul className="my-6 flex-1 space-y-2">
                  {panel.items.map((item) => <li key={item} className="flex items-center gap-2 text-sm text-slate-600"><Check className="h-4 w-4 text-emerald-500" aria-hidden="true" />{item}</li>)}
                </ul>
                <p className="mb-4 text-xs font-medium uppercase tracking-wide text-slate-400">{panel.note}</p>
                <Button asChild size="lg" variant={panel.featured ? "gradient" : "outline"}>
                  {panel.route.startsWith("#") ? <a href={panel.route}>{panel.cta}</a> : <Link href={panel.route}>{panel.cta}</Link>}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="merchant-demo" aria-labelledby="merchant-demo-title" className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.65fr_1.35fr] lg:items-center">
            <div>
              <Badge variant="purple">Merchant Experience</Badge>
              <h2 id="merchant-demo-title" className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">See How Store Management Works</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">Follow the main steps a merchant uses every day.</p>
              <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">This is a guided preview. Public Merchant Dashboard access is not enabled because a restricted server-side demo session is not available.</p>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2">
              {merchantSteps.map((step, index) => (
                <li key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex items-center justify-between"><step.icon className="h-7 w-7 text-blue-600" aria-hidden="true" /><span className="text-3xl font-black text-slate-200">0{index + 1}</span></div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="admin-preview" aria-labelledby="admin-preview-title" className="bg-slate-950 py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[.75fr_1.25fr] lg:items-center lg:px-8">
          <div>
            <Badge className="border-0 bg-blue-500/20 text-blue-200">Safe Preview</Badge>
            <h2 id="admin-preview-title" className="mt-4 text-3xl font-bold">Super Admin Overview</h2>
            <p className="mt-4 leading-relaxed text-slate-300">Public administration access is disabled. This preview shows the available management areas without exposing credentials or settings.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[["Merchants", Users], ["Subscriptions", CreditCard], ["Plans", Store], ["Reports", BarChart3]].map(([label, Icon]) => (
              <div key={label as string} className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><Icon className="h-6 w-6 text-blue-400" aria-hidden="true" /><h3 className="mt-4 font-semibold">{label as string}</h3><p className="mt-1 text-sm text-slate-400">Sample overview</p></div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="stores-title" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="stores-title" className="text-3xl font-bold text-slate-900 sm:text-4xl">Explore Demo Storefronts</h2>
            <p className="mt-4 text-lg text-slate-600">See sample online stores for different types of businesses.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {demoStores.map((store) => {
              const Icon = storeIcons[store.id];
              return (
                <Card key={store.id} className="overflow-hidden">
                  <div className={`flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${store.visual}`} role="img" aria-label={`${store.name} storefront category illustration`}>
                    <Icon className="h-16 w-16 text-slate-700/70" aria-hidden="true" />
                  </div>
                  <div className="p-5">
                    <Badge variant="secondary">{store.category}</Badge>
                    <h3 className="mt-3 text-lg font-semibold text-slate-900">{store.name}</h3>
                    <p className="mt-2 min-h-12 text-sm leading-relaxed text-slate-600">{store.description}</p>
                    <p className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-700"><MonitorSmartphone className="h-4 w-4" aria-hidden="true" />Mobile-friendly preview</p>
                    <Button asChild variant="outline" className="mt-4 w-full"><Link href={`/store/${store.slug}`}>Visit Store <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="explore-title" className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="explore-title" className="text-3xl font-bold text-slate-900 sm:text-4xl">What You Can Explore</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {explorationFeatures.map((feature) => (
              <article key={feature.title} className="rounded-2xl border border-slate-200 p-6">
                <feature.icon className="h-7 w-7 text-blue-600" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <Info className="h-7 w-7 shrink-0 text-blue-600" aria-hidden="true" />
            <div>
              <h2 className="text-xl font-bold text-slate-900">This Is a Demo Environment</h2>
              <p className="mt-2 leading-relaxed text-slate-700">All storefront information is sample data. Demo checkout does not create an order, process a payment or send notifications. Admin and Merchant panels are shown as view-only previews because secure restricted demo sessions are not yet available.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="gradient-primary py-16 text-center text-white sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">Ready to Start Your Own Store?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">Create your account, add your products and start building your online store.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="xl" className="bg-white text-blue-700 hover:bg-blue-50"><Link href="/trial?source=demo">Start Free</Link></Button>
            <Button asChild size="xl" variant="outline" className="border-white/50 text-white hover:bg-white/10"><Link href="/pricing">View Pricing</Link></Button>
          </div>
          <p className="mt-5 text-sm text-blue-100">14-day trial · Payment information is not requested · Support available</p>
          <div className="mt-6 flex justify-center gap-5 text-sm">
            <Link href="/features" className="underline underline-offset-4">View Features</Link>
            <Link href="/help" className="underline underline-offset-4">Visit Help Center</Link>
          </div>
        </div>
      </section>
    </>
  );
}
