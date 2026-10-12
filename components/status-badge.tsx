import type { PartnerStatus } from "@/data/partners";

const STYLES = {
  inactive: "bg-[#F4F4F5] text-[#6B7280]",
  active: "bg-[#C0E8C8] text-[#38AE52]",
  pending: "bg-[#F8E8A8] text-[#E0A000]",
} as const;

const LABELS: Record<PartnerStatus, string> = {
  inactive: "已停用",
  active: "使用中",
};

export function StatusBadge({
  status,
  label,
}: {
  status: keyof typeof STYLES;
  label?: string;
}) {
  const text = label ?? (status === "pending" ? "待审批" : LABELS[status]);
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STYLES[status]}`}
    >
      {text}
    </span>
  );
}
