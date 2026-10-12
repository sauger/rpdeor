import type { Metadata } from "next";
import { EmptySection } from "@/components/shell/empty-section";
import { ORG_TABS } from "@/components/shell/tabs";

export const metadata: Metadata = { title: "费用" };

export default function ExpensesPage() {
  return (
    <EmptySection
      title="组织"
      description="待归类、已归类、已通过和已驳回"
      heading="费用"
      tabs={ORG_TABS}
      current="/organizations/expenses"
    />
  );
}
