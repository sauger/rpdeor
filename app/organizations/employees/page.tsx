import type { Metadata } from "next";
import { EmptySection } from "@/components/shell/empty-section";
import { ORG_TABS } from "@/components/shell/tabs";

export const metadata: Metadata = { title: "员工" };

export default function EmployeesPage() {
  return (
    <EmptySection
      title="组织"
      description="姓名、工作国家和入职状态"
      heading="员工"
      tabs={ORG_TABS}
      current="/organizations/employees"
    />
  );
}
