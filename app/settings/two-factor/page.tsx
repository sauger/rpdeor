import type { Metadata } from "next";
import { EmptySection } from "@/components/shell/empty-section";

export const metadata: Metadata = { title: "两步验证" };

export default function TwoFactorPage() {
  return (
    <EmptySection
      title="两步验证"
      description="为运营账号增加一层保护"
      heading="两步验证"
      emptyText="还没有开启"
    />
  );
}
