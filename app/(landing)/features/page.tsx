import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  ArrowDown,
  BarChart3,
  Banknote,
  Boxes,
  Check,
  ClipboardList,
  CreditCard,
  FileBarChart,
  Globe,
  LayoutTemplate,
  MapPin,
  Megaphone,
  MessageCircle,
  MonitorSmartphone,
  PackageCheck,
  Palette,
  ReceiptText,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Store,
  Tag,
  Truck,
  UserRound,
  Users,
  WalletCards,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FinalCTA from "@/components/landing/FinalCTA";

const title = "C Commerce Features | Tools to Run Your Online Store";
const description = "Explore C Commerce features for store building, products, orders, payments, delivery, customers and sales reports.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: "C Commerce Features",
    description: "Simple tools to create, manage and grow your online store in Bangladesh.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "C Commerce Features",
    description: "Simple tools to create, manage and grow your online store in Bangladesh.",
  },
};

type FeatureItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const coreFeatures: FeatureItem[] = [
  { title: "Build Your Store", description: "Create a professional online store without coding.", icon: Store },
  { title: "Products and Orders", description: "Manage products, stock, prices and customer orders.", icon: PackageCheck },
  { title: "Payments", description: "Accept online payments, bank transfer and Cash on Delivery.", icon: CreditCard },
  { title: "Delivery Charges", description: "Set delivery charges by district, area or order amount.", icon: Truck },
  { title: "Customers", description: "View customer information and order history from one place.", icon: Users },
  { title: "Sales Reports", description: "Track orders, payments, sales and business performance.", icon: BarChart3 },
];

const featureCategories: Array<{
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  features: FeatureItem[];
  tone: string;
}> = [
  {
    id: "store-setup",
    eyebrow: "Store Setup",
    title: "Create and Customize Your Store",
    description: "Set up a professional store using simple tools and ready-made designs.",
    tone: "bg-blue-50 text-blue-700",
    features: [
      { title: "Store Settings", description: "Update your store information and contact details from one place.", icon: Store },
      { title: "Store Themes", description: "Choose from available store designs for your business.", icon: LayoutTemplate },
      { title: "Custom Domain", description: "Connect your own domain on supported plans.", icon: Globe },
      { title: "Mobile-Friendly Store", description: "Your store works smoothly on mobile, tablet and desktop.", icon: MonitorSmartphone },
      { title: "Logo and Brand Colors", description: "Add your logo and choose colors that match your brand.", icon: Palette },
      { title: "Banner Management", description: "Add and manage promotional banners for your storefront.", icon: Megaphone },
    ],
  },
  {
    id: "products-orders",
    eyebrow: "Products and Orders",
    title: "Manage Products and Orders Easily",
    description: "Keep your product information, stock and customer orders organized.",
    tone: "bg-purple-50 text-purple-700",
    features: [
      { title: "Product Management", description: "Add product information, prices, categories and stock.", icon: ShoppingBag },
      { title: "Stock Management", description: "Track available stock and identify low-stock products.", icon: Boxes },
      { title: "Order Management", description: "View and manage customer orders from one place.", icon: ClipboardList },
      { title: "Order Status", description: "Move orders through clear processing and delivery stages.", icon: PackageCheck },
      { title: "Product Search", description: "Find products quickly using names, categories or stock status.", icon: Search },
      { title: "Order Filters", description: "Filter orders by status, date and other available details.", icon: ReceiptText },
    ],
  },
  {
    id: "payments-delivery",
    eyebrow: "Payments and Delivery",
    title: "Receive Payments and Manage Delivery",
    description: "Use payment and delivery options commonly used by businesses in Bangladesh.",
    tone: "bg-emerald-50 text-emerald-700",
    features: [
      { title: "Cash on Delivery", description: "Receive and manage Cash on Delivery orders.", icon: Banknote },
      { title: "Supported Payment Gateways", description: "Connect available gateways using your merchant credentials.", icon: WalletCards },
      { title: "Payment Status", description: "See whether an order payment is pending or completed.", icon: CreditCard },
      { title: "Transaction Records", description: "Review payment records linked with customer orders.", icon: ReceiptText },
      { title: "Delivery Charges", description: "Set different delivery fees by location or order value.", icon: Truck },
      { title: "District Delivery", description: "Create separate delivery charges for available districts and areas.", icon: MapPin },
    ],
  },
  {
    id: "customers-marketing",
    eyebrow: "Customers and Marketing",
    title: "Understand Your Customers and Grow Sales",
    description: "Manage customer information and use simple tools to promote your store.",
    tone: "bg-amber-50 text-amber-700",
    features: [
      { title: "Customer Profiles", description: "View contact information and customer order history.", icon: UserRound },
      { title: "Customer Search", description: "Find customers quickly using available contact details.", icon: Search },
      { title: "Coupon Codes", description: "Create discounts for products or customer orders.", icon: Tag },
      { title: "Campaign Tools", description: "Create and manage simple promotional campaigns.", icon: Megaphone },
      { title: "WhatsApp Contact", description: "Let customers contact your business through WhatsApp.", icon: MessageCircle },
      { title: "Store Contact Details", description: "Keep your business contact information clear and easy to find.", icon: MonitorSmartphone },
    ],
  },
  {
    id: "reports-team",
    eyebrow: "Reports and Team",
    title: "Make Better Business Decisions",
    description: "View important business information and allow your team to help manage the store.",
    tone: "bg-rose-50 text-rose-700",
    features: [
      { title: "Sales Summary", description: "See important sales numbers in a clear dashboard.", icon: BarChart3 },
      { title: "Order Reports", description: "Review order activity and status information.", icon: FileBarChart },
      { title: "Payment Reports", description: "Check payment totals and transaction information.", icon: ReceiptText },
      { title: "Inventory Overview", description: "See stock levels and products that need attention.", icon: Boxes },
      { title: "Staff Accounts", description: "Add team members to help manage your store.", icon: Users },
      { title: "Role-Based Permissions", description: "Control which tools each staff role can access.", icon: ShieldCheck },
    ],
  },
];

const bangladeshFeatures: FeatureItem[] = [
  { title: "Local Payment Options", description: "Support Cash on Delivery and available local payment gateways.", icon: WalletCards },
  { title: "District and Area Delivery", description: "Set delivery charges for available districts and areas.", icon: MapPin },
  { title: "Bangla or English Store Content", description: "Add product names, descriptions and store content in Bangla or English.", icon: Globe },
  { title: "WhatsApp Customer Support", description: "Let customers contact your business directly through WhatsApp.", icon: MessageCircle },
];

const setupSteps = [
  { title: "Create Your Account", description: "Enter your business information and create your store." },
  { title: "Add Products and Settings", description: "Add products, payment options and delivery charges." },
  { title: "Publish Your Store", description: "Launch your store and start receiving orders." },
] as const;

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Badge className="border-0 bg-blue-100 text-blue-700">{eyebrow}</Badge>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{description}</p>
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <>
      <section className="gradient-hero overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <div className="text-center lg:text-left">
            <Badge className="border-0 bg-blue-100 text-blue-700">Platform Features</Badge>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Everything You Need to Run Your Online Store
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 lg:mx-0">
              Create your store, manage products, receive orders, accept payments and grow your business from one simple platform.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Button asChild size="xl" variant="gradient"><Link href="/trial">Start Free</Link></Button>
              <Button asChild size="xl" variant="outline" className="border-2 bg-white"><Link href="/demo">View Demo Store</Link></Button>
            </div>
            <p className="mt-5 text-sm text-slate-500">Easy setup · No coding required · Support available</p>
          </div>

          <div className="rounded-3xl border border-white bg-white p-5 shadow-2xl shadow-blue-900/10" aria-label="Connected C Commerce feature overview">
            <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
              <div><p className="font-semibold text-slate-900">Your Online Store</p><p className="text-xs text-slate-500">Manage everything in one place</p></div>
              <Store className="h-7 w-7 text-blue-600" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Products", ShoppingBag, "86 items"],
                ["Orders", ShoppingCart, "24 today"],
                ["Payments", CreditCard, "View status"],
                ["Reports", BarChart3, "Sales summary"],
              ].map(([label, Icon, value]) => (
                <div key={label as string} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <Icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                  <p className="mt-4 font-semibold text-slate-900">{label as string}</p>
                  <p className="mt-1 text-xs text-slate-500">{value as string}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
              <Check className="h-5 w-5" aria-hidden="true" /> Essential tools built for online businesses in Bangladesh.
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Everything You Need" title="Manage Your Online Business in One Place" description="Simple tools to create your store, receive orders and grow your business." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreFeatures.map((feature) => (
              <Card key={feature.title} className="p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><feature.icon className="h-6 w-6" aria-hidden="true" /></div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{feature.description}</p>
              </Card>
            ))}
          </div>
          <div className="mt-9 text-center">
            <Button asChild variant="outline" size="lg"><a href="#store-setup">Explore All Features <ArrowDown className="h-4 w-4" aria-hidden="true" /></a></Button>
          </div>
        </div>
      </section>

      <div id="store-setup">
        {featureCategories.map((category, categoryIndex) => (
          <section key={category.id} id={category.id === "store-setup" ? undefined : category.id} aria-labelledby={`${category.id}-title`} className={categoryIndex % 2 === 0 ? "bg-slate-50 py-16 sm:py-20 lg:py-24" : "bg-white py-16 sm:py-20 lg:py-24"}>
            <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[.7fr_1.3fr] lg:gap-14 lg:px-8">
              <div>
                <Badge className={`border-0 ${category.tone}`}>{category.eyebrow}</Badge>
                <h2 id={`${category.id}-title`} className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{category.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">{category.description}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {category.features.map((feature) => (
                  <article key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${category.tone}`}><feature.icon className="h-5 w-5" aria-hidden="true" /></div>
                    <h3 className="mt-4 text-lg font-semibold text-slate-900">{feature.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{feature.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="bg-slate-950 py-16 text-white sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="border-0 bg-blue-500/20 text-blue-200">Built for Bangladesh</Badge>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Tools Made for Local Businesses</h2>
            <p className="mt-4 text-lg text-slate-300">Support the payments, delivery methods and order process commonly used in Bangladesh.</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {bangladeshFeatures.map((feature) => (
              <article key={feature.title} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <feature.icon className="h-7 w-7 text-blue-400" aria-hidden="true" />
                <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-400">{feature.description}</p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-slate-400">
            The website, dashboard, settings and system messages remain in English. Merchants can add storefront content in Bangla or English.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Simple Setup" title="Start in 3 Simple Steps" description="Create your store and begin managing your online business." />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {setupSteps.map((step, index) => (
              <li key={step.title} className="relative rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white">{index + 1}</span>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{step.description}</p>
              </li>
            ))}
          </ol>
          <div className="mt-9 text-center"><Button asChild size="lg" variant="gradient"><Link href="/trial">Start Free</Link></Button></div>
        </div>
      </section>

      <section className="bg-slate-50 pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-blue-100 bg-blue-50 p-7 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Feature Availability by Plan</h2>
              <p className="mt-2 text-slate-600">Some advanced features are available only on selected plans.</p>
            </div>
            <div className="mt-5 flex flex-col justify-center gap-3 sm:mt-0 sm:flex-row">
              <Button asChild variant="outline" className="bg-white"><Link href="/help">Visit Help Center</Link></Button>
              <Button asChild><Link href="/pricing">View Pricing</Link></Button>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
