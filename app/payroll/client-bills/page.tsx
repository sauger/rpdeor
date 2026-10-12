import type { Metadata } from "next";
import { EmptySection } from "@/components/shell/empty-section";
import { PAYROLL_TABS } from "@/components/shell/tabs";

export const metadata: Metadata = { title: "客户账单" };

export default function ClientBillsPage() {
  return (
    <EmptySection
      title="薪资"
      description="客户发票与未开票薪资"
      heading="客户账单"
      tabs={PAYROLL_TABS}
      current="/payroll/client-bills"
    />
  );
}
