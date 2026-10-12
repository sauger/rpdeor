import type { Metadata } from "next";
import { EmptySection } from "@/components/shell/empty-section";
import { PAYROLL_TABS } from "@/components/shell/tabs";

export const metadata: Metadata = { title: "薪资" };

export default function PayrollPage() {
  return (
    <EmptySection
      title="薪资"
      description="按伙伴和国家查看月度薪资批次"
      heading="批次"
      tabs={PAYROLL_TABS}
      current="/payroll"
    />
  );
}
