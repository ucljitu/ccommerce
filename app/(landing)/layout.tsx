import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import FloatingButtons from "@/components/landing/FloatingButtons";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
