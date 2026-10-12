"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BuildingIcon } from "@/components/icons";
import {
  fieldClass,
  primaryButtonClass,
  secondaryButtonClass,
} from "@/components/shell/section";
import {
  COUNTRIES,
  CURRENCIES,
  EMPTY_DRAFT,
  PARTNER_TYPES,
  createPartner,
  draftFromPartner,
  updatePartner,
  validateDraft,
  type Partner,
  type PartnerDraft,
} from "@/data/partners";

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm text-[#111111]">
        {label}
      </label>
      {children}
      {error ? <p className="mt-1 text-xs text-[#C2410C]">{error}</p> : null}
    </div>
  );
}

export function PartnerForm({
  mode,
  partner,
  from,
}: {
  mode: "create" | "edit";
  partner?: Partner;
  from?: string;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState<PartnerDraft>(
    partner ? draftFromPartner(partner) : EMPTY_DRAFT,
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  function set<K extends keyof PartnerDraft>(key: K, value: PartnerDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors = validateDraft(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    const suffix = from ? `?from=${encodeURIComponent(from)}` : "";
    if (mode === "create") {
      const created = createPartner(draft);
      router.push(`/partners/${created.id}`);
      return;
    }
    if (!partner) return;
    updatePartner(partner.id, draft);
    router.push(`/partners/${partner.id}${suffix}`);
  }

  const title = mode === "create" ? "新建伙伴" : "编辑伙伴";
  const subtitle =
    mode === "create" ? "还没有保存" : `${partner?.country ?? ""} · ${partner?.id ?? ""}`;
  const accent = mode === "create" ? "#F04444" : partner?.accent ?? "#347EE5";
  const returnSuffix = from ? `?from=${encodeURIComponent(from)}` : "";
  const cancelHref =
    mode === "create" ? "/partners" : `/partners/${partner?.id}${returnSuffix}`;

  return (
    <form onSubmit={onSubmit} className="px-8 py-8" noValidate>
      <div className="flex items-center gap-4">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: accent }}
        >
          <BuildingIcon className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#111111]">{title}</h1>
          <p className="mt-1 text-sm text-[#6B7280]">{subtitle}</p>
        </div>
      </div>

      {partner?.status === "inactive" ? (
        <p className="mt-6 rounded-xl border border-[#E6E6E8] bg-[#F4F4F5] px-4 py-3 text-sm text-[#6B7280]" role="status">
          已停用。记录会保留，但不能被以后的新报价、新薪资批次和新伙伴账单选用。
        </p>
      ) : null}

      <h2 className="mt-8 text-base font-semibold text-[#111111]">基本资料</h2>
      <div className="mt-3 grid grid-cols-2 gap-x-10 gap-y-5 rounded-xl border border-[#E6E6E8] p-6">
        <Field label="伙伴名称" htmlFor="name" error={errors.name}>
          <input
            id="name"
            className={fieldClass}
            placeholder="请输入"
            value={draft.name}
            aria-invalid={Boolean(errors.name)}
            onChange={(event) => set("name", event.target.value)}
          />
        </Field>
        <Field label="国家" htmlFor="country" error={errors.country}>
          <select
            id="country"
            className={fieldClass}
            value={draft.country}
            aria-invalid={Boolean(errors.country)}
            onChange={(event) => set("country", event.target.value)}
          >
            <option value="">请选择</option>
            {COUNTRIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>
        <Field label="类型" htmlFor="type" error={errors.type}>
          <select
            id="type"
            className={fieldClass}
            value={draft.type}
            onChange={(event) => set("type", event.target.value as PartnerDraft["type"])}
          >
            {PARTNER_TYPES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>
        <Field label="主体名称" htmlFor="legalName">
          <input
            id="legalName"
            className={fieldClass}
            value={draft.legalName}
            onChange={(event) => set("legalName", event.target.value)}
          />
        </Field>
        <Field label="报价方式" htmlFor="pricing">
          <input id="pricing" className={`${fieldClass} bg-[#F4F4F5] text-[#6B7280]`} value="手工" disabled />
        </Field>
        <Field label="税号" htmlFor="taxId">
          <input
            id="taxId"
            className={fieldClass}
            value={draft.taxId}
            onChange={(event) => set("taxId", event.target.value)}
          />
        </Field>
      </div>

      <h2 className="mt-8 text-base font-semibold text-[#111111]">商务条款</h2>
      <div className="mt-3 grid grid-cols-2 gap-x-10 gap-y-5 rounded-xl border border-[#E6E6E8] p-6">
        <Field label="注册地址" htmlFor="registeredAddress">
          <input
            id="registeredAddress"
            className={fieldClass}
            value={draft.registeredAddress}
            onChange={(event) => set("registeredAddress", event.target.value)}
          />
        </Field>
        <Field label="司法辖区" htmlFor="jurisdiction">
          <select
            id="jurisdiction"
            className={fieldClass}
            value={draft.jurisdiction}
            onChange={(event) => set("jurisdiction", event.target.value)}
          >
            <option value="">请选择</option>
            {COUNTRIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>
        <Field label="押金周期" htmlFor="depositCycle">
          <input
            id="depositCycle"
            className={fieldClass}
            value={draft.depositCycle}
            onChange={(event) => set("depositCycle", event.target.value)}
          />
        </Field>
        <Field label="遣散计提比例" htmlFor="severanceAccrualRate">
          <input
            id="severanceAccrualRate"
            className={fieldClass}
            value={draft.severanceAccrualRate}
            onChange={(event) => set("severanceAccrualRate", event.target.value)}
          />
        </Field>
        <div />
        <Field label="每月 EOR 费用" htmlFor="monthlyEorFee" error={errors.monthlyEorFee}>
          <div className="flex gap-2">
            <input
              id="monthlyEorFee"
              className={fieldClass}
              inputMode="decimal"
              value={draft.monthlyEorFee}
              aria-invalid={Boolean(errors.monthlyEorFee)}
              onChange={(event) => set("monthlyEorFee", event.target.value)}
            />
            <select
              id="currency"
              aria-label="币种"
              className={`${fieldClass} !w-28 shrink-0`}
              value={draft.currency}
              onChange={(event) => set("currency", event.target.value as PartnerDraft["currency"])}
            >
              {CURRENCIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </Field>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Link href={cancelHref} className={secondaryButtonClass}>
          取消
        </Link>
        <button type="submit" className={primaryButtonClass}>
          保存
        </button>
      </div>
    </form>
  );
}
