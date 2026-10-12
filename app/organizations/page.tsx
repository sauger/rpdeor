import type { Metadata } from "next";
import { EmptySection } from "@/components/shell/empty-section";
import { ORG_TABS } from "@/components/shell/tabs";

export const metadata: Metadata = { title: "组织" };

export default function OrganizationsPage() {
  return (
    <EmptySection
      title="组织"
      description="客户组织的名称、国家和标签"
      heading="组织"
      tabs={ORG_TABS}
      current="/organizations"
    />
  );
}
