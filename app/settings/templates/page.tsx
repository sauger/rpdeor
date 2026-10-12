import type { Metadata } from "next";
import { EmptySection } from "@/components/shell/empty-section";

export const metadata: Metadata = { title: "文档模板" };

export default function TemplatesPage() {
  return (
    <EmptySection
      title="文档模板"
      description="主服务协议和 Scope of Work"
      heading="文档模板"
    />
  );
}
