import type { Metadata } from "next";
import HeroSection from "@/components/landing/HeroSection";
import PaymentMethods from "@/components/landing/PaymentMethods";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturesSection from "@/components/landing/FeaturesSection";
import BangladeshSection from "@/components/landing/BangladeshSection";
import ProductPreviews from "@/components/landing/ProductPreviews";
import PricingSection from "@/components/landing/PricingSection";
import BusinessCategories from "@/components/landing/BusinessCategories";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";

const title = "C Commerce | Create Your Online Store in Bangladesh";
const description = "Create an online store, manage products and orders, accept local payments and grow your business with C Commerce.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PaymentMethods />
      <HowItWorks />
      <FeaturesSection />
      <BangladeshSection />
      <ProductPreviews />
      <PricingSection />
      <BusinessCategories />
      <FAQ />
      <FinalCTA />
    </>
  );
}
