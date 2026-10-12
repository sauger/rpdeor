import Link from "next/link";
import type { SectionTab } from "@/components/shell/tabs";

export function PageHeading({
  title,
  count,
  description,
}: {
  title: string;
  count?: number;
  description: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-[#111111]">{title}</h1>
        {typeof count === "number" ? (
          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#F4F4F5] px-2 text-xs font-medium text-[#6B7280]">
            {count}
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-sm text-[#6B7280]">{description}</p>
    </div>
  );
}

export function UnderlineTabs({
  tabs,
  current,
}: {
  tabs: SectionTab[];
  current: string;
}) {
  return (
    <div className="mt-6 flex gap-8 border-b border-[#E6E6E8]">
      {tabs.map((tab) => {
        const active = tab.href === current;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`-mb-px border-b-2 pb-3 text-sm ${
              active
                ? "border-[#111111] font-medium text-[#111111]"
                : "border-transparent text-[#6B7280] hover:text-[#111111]"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}

export const fieldClass =
  "h-10 w-full rounded-lg border border-[#E6E6E8] bg-white px-3 text-sm text-[#111111] outline-none placeholder:text-[#9CA3AF] focus:border-[#347EE5]";

export const primaryButtonClass =
  "inline-flex h-9 items-center justify-center gap-1 rounded-lg bg-[#347EE5] px-4 text-sm font-medium text-white hover:bg-[#2C6FCC]";

export const secondaryButtonClass =
  "inline-flex h-9 items-center justify-center rounded-lg bg-[#F4F4F5] px-4 text-sm text-[#111111] hover:bg-[#E8E8EA]";
