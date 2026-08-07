"use client";
import MerchantHeader from "@/components/merchant/MerchantHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BdPaySettings from "@/components/merchant/BdPaySettings";
import PaymentTransactions from "@/components/merchant/PaymentTransactions";

export default function PaymentsPage() {
  return (
    <>
      <MerchantHeader title="Payments" />
      <main className="flex-1 p-6 space-y-5">
        <Tabs defaultValue="transactions">
          <TabsList><TabsTrigger value="transactions">Transactions</TabsTrigger><TabsTrigger value="gateways">Payment Gateways</TabsTrigger></TabsList>

          <TabsContent value="transactions">
            <div className="mt-4"><PaymentTransactions /></div>
          </TabsContent>

          <TabsContent value="gateways">
            <div className="mt-4"><BdPaySettings /></div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
