export type SectionTab = {
  href: string;
  label: string;
};

export const ORG_TABS: SectionTab[] = [
  { href: "/organizations", label: "组织" },
  { href: "/organizations/entities", label: "法律实体" },
  { href: "/organizations/employees", label: "员工" },
  { href: "/organizations/expenses", label: "费用" },
];

export const PAYROLL_TABS: SectionTab[] = [
  { href: "/payroll", label: "批次" },
  { href: "/payroll/client-bills", label: "客户账单" },
  { href: "/payroll/partner-bills", label: "伙伴账单" },
];

export const PARTNER_TABS: SectionTab[] = [
  { href: "/partners", label: "伙伴目录" },
  { href: "/partners/quotes", label: "报价请求" },
];
