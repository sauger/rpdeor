import type { Metadata } from "next";
import { Suspense } from "react";
import { PartnerList } from "@/components/partners/partner-list";
import { AppShell } from "@/components/shell/app-shell";

export const metadata: Metadata = { title: "合作伙伴" };

export default function PartnersPage() {
  return (
    <Suspense
      fallback={
        <AppShell>
          <p className="px-8 py-8 text-sm text-[#6B7280]">加载中</p>
        </AppShell>
      }
    >
      <PartnerList />
    </Suspense>
  );
}
