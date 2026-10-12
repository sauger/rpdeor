import type { Metadata } from "next";
import { Suspense } from "react";
import { PartnerDetail } from "@/components/partners/partner-detail";
import { AppShell } from "@/components/shell/app-shell";

export const metadata: Metadata = { title: "伙伴详情" };

export default function PartnerDetailPage() {
  return (
    <Suspense
      fallback={
        <AppShell>
          <p className="px-8 py-8 text-sm text-[#6B7280]">加载中</p>
        </AppShell>
      }
    >
      <PartnerDetail />
    </Suspense>
  );
}
