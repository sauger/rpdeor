import type { Metadata } from "next";
import { EmptySection } from "@/components/shell/empty-section";

export const metadata: Metadata = { title: "休假政策" };

export default function LeavePage() {
  return (
    <EmptySection
      title="休假政策"
      description="按国家、假种分配到员工"
      heading="休假政策"
    />
  );
}
