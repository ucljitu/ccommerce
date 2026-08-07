export type PlanId = "starter" | "growth" | "business";
export type FeatureAvailability = boolean | "coming-soon";

export type PricingPlan = {
  id: PlanId;
  name: string;
  subtitle: string;
  monthlyPrice: number;
  currency: "BDT";
  billingPeriod: "month";
  popular: boolean;
  cardFeatures: readonly string[];
  comparison: {
    onlineStores: string;
    products: string;
    orders: string;
    storeDesigns: string;
    customDomain: FeatureAvailability;
    cashOnDelivery: FeatureAvailability;
    supportedGateways: FeatureAvailability;
    districtDelivery: FeatureAvailability;
    whatsappContact: FeatureAvailability;
    couponCodes: FeatureAvailability;
    staffUsers: string;
    salesReports: string;
    apiAccess: FeatureAvailability;
    support: string;
  };
};

export const pricingPlans: readonly PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    subtitle: "For new businesses",
    monthlyPrice: 999,
    currency: "BDT",
    billingPeriod: "month",
    popular: false,
    cardFeatures: [
      "1 Online Store",
      "Up to 100 Products",
      "Unlimited Orders",
      "Cash on Delivery",
      "Available Payment Methods",
      "Basic Store Designs",
      "Basic Sales Reports",
      "1 Staff User",
      "Email Support",
    ],
    comparison: {
      onlineStores: "1",
      products: "Up to 100",
      orders: "Unlimited",
      storeDesigns: "Basic",
      customDomain: false,
      cashOnDelivery: true,
      supportedGateways: true,
      districtDelivery: true,
      whatsappContact: true,
      couponCodes: true,
      staffUsers: "1",
      salesReports: "Basic",
      apiAccess: false,
      support: "Email",
    },
  },
  {
    id: "growth",
    name: "Growth",
    subtitle: "For growing stores",
    monthlyPrice: 1999,
    currency: "BDT",
    billingPeriod: "month",
    popular: true,
    cardFeatures: [
      "1 Online Store",
      "Unlimited Products",
      "Unlimited Orders",
      "Available Payment Methods",
      "Premium Store Designs",
      "WhatsApp Contact",
      "Coupon and Campaign Tools",
      "Up to 3 Staff Users",
      "Priority Support",
    ],
    comparison: {
      onlineStores: "1",
      products: "Unlimited",
      orders: "Unlimited",
      storeDesigns: "Premium",
      customDomain: false,
      cashOnDelivery: true,
      supportedGateways: true,
      districtDelivery: true,
      whatsappContact: true,
      couponCodes: true,
      staffUsers: "Up to 3",
      salesReports: "Standard",
      apiAccess: false,
      support: "Priority",
    },
  },
  {
    id: "business",
    name: "Business",
    subtitle: "For established businesses",
    monthlyPrice: 3999,
    currency: "BDT",
    billingPeriod: "month",
    popular: false,
    cardFeatures: [
      "Up to 3 Online Stores",
      "Unlimited Products",
      "Unlimited Orders",
      "Available Payment Methods",
      "All Store Designs",
      "Custom Domain",
      "Advanced Sales Reports",
      "Up to 10 Staff Users",
      "Priority Support",
    ],
    comparison: {
      onlineStores: "Up to 3",
      products: "Unlimited",
      orders: "Unlimited",
      storeDesigns: "All designs",
      customDomain: true,
      cashOnDelivery: true,
      supportedGateways: true,
      districtDelivery: true,
      whatsappContact: true,
      couponCodes: true,
      staffUsers: "Up to 10",
      salesReports: "Advanced",
      apiAccess: "coming-soon",
      support: "Priority",
    },
  },
] as const;

export const comparisonGroups = [
  {
    label: "Store",
    rows: [
      { label: "Online Stores", key: "onlineStores" },
      { label: "Products", key: "products" },
      { label: "Orders", key: "orders" },
      { label: "Store Designs", key: "storeDesigns" },
      { label: "Custom Domain", key: "customDomain" },
    ],
  },
  {
    label: "Payments and Delivery",
    rows: [
      { label: "Cash on Delivery", key: "cashOnDelivery" },
      { label: "Available Payment Gateways", key: "supportedGateways" },
      { label: "District Delivery Charges", key: "districtDelivery" },
    ],
  },
  {
    label: "Marketing",
    rows: [
      { label: "WhatsApp Contact", key: "whatsappContact" },
      { label: "Coupon Codes", key: "couponCodes" },
    ],
  },
  {
    label: "Management",
    rows: [
      { label: "Staff Users", key: "staffUsers" },
      { label: "Sales Reports", key: "salesReports" },
      { label: "API Access", key: "apiAccess" },
      { label: "Support Level", key: "support" },
    ],
  },
] as const;

export function formatPlanPrice(price: number) {
  return new Intl.NumberFormat("en-BD").format(price);
}

export function getPricingPlan(planId: string | undefined) {
  return pricingPlans.find((plan) => plan.id === planId);
}

