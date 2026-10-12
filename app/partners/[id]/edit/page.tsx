import type { Metadata } from "next";
import { Suspense } from "react";
import { PartnerEdit } from "@/components/partners/partner-editor";
import { AppShell } from "@/components/shell/app-shell";

export const metadata: Metadata = { title: "编辑伙伴" };

export default function EditPartnerPage() {
  return (
    <Suspense
      fallback={
        <AppShell>
          <p className="px-8 py-8 text-sm text-[#6B7280]">加载中</p>
        </AppShell>
      }
    >
      <PartnerEdit />
    </Suspense>
  );
}
