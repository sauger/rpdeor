"use client";

import { useParams, useSearchParams } from "next/navigation";
import { AppShell } from "@/components/shell/app-shell";
import { PartnerForm } from "@/components/partners/partner-form";
import { usePartners } from "@/data/use-partners";

export function PartnerCreate() {
  return (
    <AppShell>
      <PartnerForm mode="create" />
    </AppShell>
  );
}

export function PartnerEdit() {
  const id = useParams<{ id: string }>().id;
  const partners = usePartners();
  const from = useSearchParams().get("from") ?? undefined;
  const partner = partners?.find((item) => item.id === id) ?? null;

  return (
    <AppShell>
      {partners === null ? (
        <p className="px-8 py-8 text-sm text-[#6B7280]">加载中</p>
      ) : !partner ? (
        <p className="px-8 py-8 text-sm text-[#6B7280]">找不到这家伙伴。</p>
      ) : (
        <PartnerForm key={partner.updatedAt} mode="edit" partner={partner} from={from} />
      )}
    </AppShell>
  );
}
