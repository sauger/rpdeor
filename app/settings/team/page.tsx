import type { Metadata } from "next";
import { EmptySection } from "@/components/shell/empty-section";

export const metadata: Metadata = { title: "团队" };

export default function TeamPage() {
  return (
    <EmptySection
      title="团队"
      description="内部运营同事"
      heading="团队"
    />
  );
}
