"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BuildingIcon } from "@/components/icons";
import { AppShell } from "@/components/shell/app-shell";
import { primaryButtonClass } from "@/components/shell/section";
import { StatusBadge } from "@/components/status-badge";
import { deactivatePartner, type Partner } from "@/data/partners";
import { usePartners } from "@/data/use-partners";

function Value({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div>
      <div className="text-sm text-[#6B7280]">{label}</div>
      <div className="mt-1 text-sm text-[#111111]">{value.trim() ? value : "—"}</div>
      {hint ? <p className="mt-1 text-xs text-[#6B7280]">{hint}</p> : null}
    </div>
  );
}

function DeactivateDialog({
  partner,
  onCancel,
  onConfirm,
}: {
  partner: Partner;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="deactivate-title"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
      >
        <h2 id="deactivate-title" className="text-lg font-semibold text-[#111111]">
          停用这家伙伴？
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#6B7280]">
          停用后，{partner.name} 不能被以后的新报价、新薪资批次和新伙伴账单选用。记录会保留，名称和类型仍可查看。已经生成的单据仍指向这条记录。
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            className="inline-flex h-9 items-center rounded-lg bg-[#F4F4F5] px-4 text-sm text-[#111111]"
            onClick={onCancel}
          >
            取消
          </button>
          <button
            type="button"
            className="inline-flex h-9 items-center rounded-lg bg-[#111111] px-4 text-sm font-medium text-white"
            onClick={onConfirm}
          >
            确认停用
          </button>
        </div>
      </div>
    </div>
  );
}

export function PartnerDetail() {
  const id = useParams<{ id: string }>().id;
  const partners = usePartners();
  const partner = partners?.find((item) => item.id === id) ?? null;
  const [confirming, setConfirming] = useState(false);
  const from = useSearchParams().get("from");
  const backHref = from ? `/partners?${from}` : "/partners";
  const editHref = from
    ? `/partners/${id}/edit?from=${encodeURIComponent(from)}`
    : `/partners/${id}/edit`;

  function confirmDeactivate() {
    deactivatePartner(id);
    setConfirming(false);
  }

  return (
    <AppShell>
      <div className="px-8 py-8">
        <Link href={backHref} className="text-sm text-[#6B7280] hover:text-[#111111]">
          返回伙伴目录
        </Link>
        {partners === null ? (
          <p className="mt-6 text-sm text-[#6B7280]">加载中</p>
        ) : !partner ? (
          <p className="mt-6 text-sm text-[#6B7280]">找不到这家伙伴。</p>
        ) : (
          <>
            <div className="mt-4 flex items-start justify-between gap-6">
              <div className="flex items-center gap-4">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: partner.accent }}
                >
                  <BuildingIcon className="h-7 w-7" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-semibold tracking-tight text-[#111111]">
                      {partner.name}
                    </h1>
                    {partner.status === "inactive" ? <StatusBadge status="inactive" /> : null}
                  </div>
                  <p className="mt-1 text-sm text-[#6B7280]">
                    {partner.country} · {partner.id}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {partner.status === "active" ? (
                  <button
                    type="button"
                    className="inline-flex h-9 items-center rounded-lg border border-[#E6E6E8] px-4 text-sm text-[#111111] hover:bg-[#F4F4F5]"
                    onClick={() => setConfirming(true)}
                  >
                    停用
                  </button>
                ) : null}
                <Link href={editHref} className={primaryButtonClass}>
                  编辑
                </Link>
              </div>
            </div>

            <div className="mt-6 border-b border-[#E6E6E8]">
              <span className="-mb-px inline-block border-b-2 border-[#111111] pb-3 text-sm font-medium">
                概览
              </span>
            </div>

            {partner.status === "inactive" ? (
              <p
                className="mt-6 rounded-xl border border-[#E6E6E8] bg-[#F4F4F5] px-4 py-3 text-sm text-[#6B7280]"
                role="status"
              >
                已停用。记录会保留，但不能被以后的新报价、新薪资批次和新伙伴账单选用。
              </p>
            ) : null}

            <h2 className="mt-8 text-base font-semibold text-[#111111]">基本资料</h2>
            <div className="mt-3 grid grid-cols-2 gap-x-12 gap-y-6 rounded-xl border border-[#E6E6E8] p-6">
              <Value label="伙伴名称" value={partner.name} />
              <Value label="类型" value={partner.type} />
              <Value label="国家" value={partner.country} />
              <Value label="报价方式" value={partner.pricingMethod} />
              <Value label="主体名称" value={partner.legalName} />
              <Value label="税号" value={partner.taxId} />
              <Value
                label="当前员工数"
                value={String(partner.employeeCount)}
                hint="来自员工名册，不能手改"
              />
              <div>
                <div className="text-sm text-[#6B7280]">状态</div>
                <div className="mt-1">
                  <StatusBadge status={partner.status} />
                </div>
              </div>
            </div>

            <h2 className="mt-8 text-base font-semibold text-[#111111]">商务条款</h2>
            <div className="mt-3 grid grid-cols-2 gap-x-12 gap-y-6 rounded-xl border border-[#E6E6E8] p-6">
              <Value label="注册地址" value={partner.registeredAddress} />
              <Value label="司法辖区" value={partner.jurisdiction} />
              <Value label="押金周期" value={partner.depositCycle} />
              <Value label="遣散计提比例" value={partner.severanceAccrualRate} />
              <Value
                label="每月 EOR 费用"
                value={`${partner.monthlyEorFee} ${partner.currency}`}
              />
            </div>
            {confirming ? (
              <DeactivateDialog
                partner={partner}
                onCancel={() => setConfirming(false)}
                onConfirm={confirmDeactivate}
              />
            ) : null}
          </>
        )}
      </div>
    </AppShell>
  );
}
