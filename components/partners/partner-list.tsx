"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import {
  BuildingIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  SearchIcon,
} from "@/components/icons";
import { AppShell } from "@/components/shell/app-shell";
import {
  fieldClass,
  PageHeading,
  primaryButtonClass,
  UnderlineTabs,
} from "@/components/shell/section";
import { PARTNER_TABS } from "@/components/shell/tabs";
import { StatusBadge } from "@/components/status-badge";
import {
  filterPartners,
  PAGE_SIZE,
  PARTNER_TYPES,
  type Partner,
} from "@/data/partners";
import { usePartners } from "@/data/use-partners";

function PartnerMark({ partner }: { partner: Partner }) {
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
      style={{ backgroundColor: partner.accent }}
    >
      <BuildingIcon className="h-4 w-4" />
    </span>
  );
}

export function PartnerList() {
  const partners = usePartners();
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get("q") ?? "";
  const country = searchParams.get("country") ?? "";
  const type = searchParams.get("type") ?? "";
  const requestedPage = Number(searchParams.get("page") ?? "1");
  const listQuery = searchParams.toString();

  const filtered = useMemo(
    () => (partners ? filterPartners(partners, { q, country, type }) : []),
    [partners, q, country, type],
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, Number.isFinite(requestedPage) ? requestedPage : 1), pageCount);
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const countries = useMemo(() => {
    const values = new Set((partners ?? []).map((partner) => partner.country).filter(Boolean));
    if (country) values.add(country);
    return Array.from(values);
  }, [partners, country]);

  function replaceQuery(next: Record<string, string | null>, resetPage = true) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(next)) {
      if (!value) params.delete(key);
      else params.set(key, value);
    }
    if (resetPage) params.delete("page");
    const query = params.toString();
    router.replace(query ? `/partners?${query}` : "/partners");
  }

  function setPage(nextPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextPage <= 1) params.delete("page");
    else params.set("page", String(nextPage));
    const query = params.toString();
    router.replace(query ? `/partners?${query}` : "/partners");
  }

  const emptyMessage =
    partners && partners.length === 0
      ? "还没有合作伙伴"
      : "没有符合筛选条件的伙伴";

  return (
    <AppShell>
      <div className="px-8 py-8">
        <PageHeading
          title="合作伙伴"
          count={partners ? filtered.length : undefined}
          description="维护各国的 EOR Service Provider 和 ICP Partner"
        />
        <UnderlineTabs tabs={PARTNER_TABS} current="/partners" />
        <div className="mt-8 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-[#111111]">伙伴目录</h2>
          <Link href="/partners/new" className={primaryButtonClass}>
            <PlusIcon className="h-4 w-4" />
            新建
          </Link>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <div className="relative w-full max-w-sm">
            <input
              className={`${fieldClass} pr-10`}
              placeholder="搜索"
              aria-label="搜索"
              value={q}
              onChange={(event) => replaceQuery({ q: event.target.value })}
            />
            <SearchIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
          </div>
          <select
            className={`${fieldClass} !w-40 shrink-0`}
            aria-label="国家"
            value={country}
            onChange={(event) => replaceQuery({ country: event.target.value })}
          >
            <option value="">国家</option>
            {countries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            className={`${fieldClass} !w-64 shrink-0`}
            aria-label="类型"
            value={type}
            onChange={(event) => replaceQuery({ type: event.target.value })}
          >
            <option value="">类型</option>
            {PARTNER_TYPES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-[#E6E6E8]">
          <table className="w-full border-collapse text-left">
            <thead className="bg-[#F4F4F5] text-[13px] text-[#6B7280]">
              <tr>
                <th className="h-11 px-4 font-medium">伙伴名称</th>
                <th className="h-11 px-4 font-medium">类型</th>
                <th className="h-11 px-4 font-medium">国家</th>
                <th className="h-11 px-4 font-medium">报价方式</th>
                <th className="h-11 px-4 font-medium">当前员工数</th>
              </tr>
            </thead>
            <tbody>
              {partners === null ? (
                <tr>
                  <td colSpan={5} className="px-4 py-16 text-sm text-[#6B7280]">
                    加载中
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-16 text-sm text-[#6B7280]">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                rows.map((partner) => (
                  <tr key={partner.id} className="border-t border-[#E6E6E8] hover:bg-[#FAFAFA]">
                    <td className="relative h-[52px] px-4 text-sm">
                      <Link
                        href={
                          listQuery
                            ? `/partners/${partner.id}?from=${encodeURIComponent(listQuery)}`
                            : `/partners/${partner.id}`
                        }
                        className="flex items-center gap-3 after:absolute after:inset-0"
                      >
                        <PartnerMark partner={partner} />
                        <span>{partner.name}</span>
                        {partner.status === "inactive" ? (
                          <StatusBadge status="inactive" />
                        ) : null}
                      </Link>
                    </td>
                    <td className="h-[52px] px-4 text-sm">{partner.type}</td>
                    <td className="h-[52px] px-4 text-sm">{partner.country}</td>
                    <td className="h-[52px] px-4 text-sm">{partner.pricingMethod}</td>
                    <td className="h-[52px] px-4 text-sm">{partner.employeeCount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {partners && rows.length > 0 ? (
            <div className="flex items-center gap-3 border-t border-[#E6E6E8] px-4 py-3">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7280] disabled:opacity-40"
                  aria-label="向前翻页"
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </button>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
                  <button
                    key={number}
                    type="button"
                    aria-current={number === page ? "page" : undefined}
                    className={`h-7 w-7 rounded-full text-sm ${
                      number === page
                        ? "bg-[#347EE5] text-white"
                        : "text-[#6B7280] hover:bg-[#F4F4F5]"
                    }`}
                    onClick={() => setPage(number)}
                  >
                    {number}
                  </button>
                ))}
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7280] disabled:opacity-40"
                  aria-label="向后翻页"
                  disabled={page >= pageCount}
                  onClick={() => setPage(page + 1)}
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                className="h-8 rounded-lg border border-[#E6E6E8] px-3 text-sm text-[#6B7280] disabled:opacity-40"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                上一页
              </button>
              <button
                type="button"
                className="h-8 rounded-lg border border-[#E6E6E8] px-3 text-sm text-[#6B7280] disabled:opacity-40"
                disabled={page >= pageCount}
                onClick={() => setPage(page + 1)}
              >
                下一页
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </AppShell>
  );
}
