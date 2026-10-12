"use client";

import { useState } from "react";
import { SearchIcon } from "@/components/icons";
import { AppShell } from "@/components/shell/app-shell";
import { fieldClass, PageHeading, UnderlineTabs } from "@/components/shell/section";
import type { SectionTab } from "@/components/shell/tabs";

export function EmptySection({
  title,
  description,
  heading,
  tabs,
  current,
  emptyText = "还没有记录",
  filteredText = "没有符合筛选条件的结果",
}: {
  title: string;
  description: string;
  heading: string;
  tabs?: SectionTab[];
  current?: string;
  emptyText?: string;
  filteredText?: string;
}) {
  const [query, setQuery] = useState("");
  const message = query.trim() ? filteredText : emptyText;

  return (
    <AppShell>
      <div className="px-8 py-8">
        <PageHeading title={title} count={0} description={description} />
        {tabs && current ? <UnderlineTabs tabs={tabs} current={current} /> : null}
        <h2 className="mt-8 text-lg font-semibold text-[#111111]">{heading}</h2>
        <div className="relative mt-4 max-w-sm">
          <input
            className={`${fieldClass} pr-10`}
            placeholder="搜索"
            aria-label="搜索"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <SearchIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
        </div>
        <div className="mt-4 rounded-xl border border-[#E6E6E8] px-4 py-16 text-sm text-[#6B7280]">
          {message}
        </div>
      </div>
    </AppShell>
  );
}
