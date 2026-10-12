import type { Metadata } from "next";
import { EmptySection } from "@/components/shell/empty-section";
import { PAYROLL_TABS } from "@/components/shell/tabs";

export const metadata: Metadata = { title: "伙伴账单" };

export default function PartnerBillsPage() {
  return (
    <EmptySection
      title="薪资"
      description="向 EOR Service Provider 或 ICP Partner 结算的账单"
      heading="伙伴账单"
      tabs={PAYROLL_TABS}
      current="/payroll/partner-bills"
    />
  );
}
