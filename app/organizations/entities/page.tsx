import type { Metadata } from "next";
import { EmptySection } from "@/components/shell/empty-section";
import { ORG_TABS } from "@/components/shell/tabs";

export const metadata: Metadata = { title: "法律实体" };

export default function EntitiesPage() {
  return (
    <EmptySection
      title="组织"
      description="法定名称、国家和审批状态"
      heading="法律实体"
      tabs={ORG_TABS}
      current="/organizations/entities"
    />
  );
}
