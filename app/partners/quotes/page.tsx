import type { Metadata } from "next";
import { EmptySection } from "@/components/shell/empty-section";
import { PARTNER_TABS } from "@/components/shell/tabs";

export const metadata: Metadata = { title: "报价请求" };

export default function QuoteRequestsPage() {
  return (
    <EmptySection
      title="合作伙伴"
      description="职位、组织和负责的伙伴"
      heading="报价请求"
      tabs={PARTNER_TABS}
      current="/partners/quotes"
      emptyText="还没有记录"
    />
  );
}
