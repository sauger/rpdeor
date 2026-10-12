import type { Metadata } from "next";
import { EmptySection } from "@/components/shell/empty-section";

export const metadata: Metadata = { title: "外汇加价" };

export default function FxPage() {
  return (
    <EmptySection
      title="外汇加价"
      description="默认加价和特定货币对加价"
      heading="外汇加价"
    />
  );
}
