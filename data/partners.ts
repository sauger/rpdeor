export const PARTNER_TYPES = ["EOR Service Provider", "ICP Partner"] as const;

export type PartnerType = (typeof PARTNER_TYPES)[number];

export const CURRENCIES = ["USD", "SGD", "JPY", "EUR", "GBP", "CNY", "HKD"] as const;

export type Currency = (typeof CURRENCIES)[number];

export const COUNTRIES = [
  "新加坡",
  "日本",
  "德国",
  "中国",
  "中国香港",
  "英国",
  "美国",
  "法国",
  "荷兰",
  "爱尔兰",
  "澳大利亚",
  "加拿大",
] as const;

export type PartnerStatus = "active" | "inactive";

export type Partner = {
  id: string;
  name: string;
  type: PartnerType;
  country: string;
  pricingMethod: "手工";
  /** 来自种子或新建时的 0。表单不能改，避免和员工名册对不上。 */
  employeeCount: number;
  legalName: string;
  registeredAddress: string;
  taxId: string;
  jurisdiction: string;
  depositCycle: string;
  severanceAccrualRate: string;
  monthlyEorFee: string;
  currency: Currency;
  status: PartnerStatus;
  accent: string;
  createdAt: string;
  updatedAt: string;
};

export type PartnerDraft = {
  name: string;
  type: PartnerType;
  country: string;
  legalName: string;
  registeredAddress: string;
  taxId: string;
  jurisdiction: string;
  depositCycle: string;
  severanceAccrualRate: string;
  monthlyEorFee: string;
  currency: Currency;
};

const STORAGE_KEY = "eor-ops-partners";
const CHANGE_EVENT = "eor-partners-changed";

const ACCENTS = ["#347EE5", "#7C5CFF", "#F5A524", "#14B8A6", "#F04444", "#38AE52"];

/** 几条假伙伴。不使用走查里的姓名、邮箱、地址，也不导入 61 国名录。 */
export const SEED_PARTNERS: Partner[] = [
  {
    id: "PT-1001",
    name: "青岚雇主服务",
    type: "EOR Service Provider",
    country: "新加坡",
    pricingMethod: "手工",
    employeeCount: 0,
    legalName: "青岚雇主服务私人有限公司",
    registeredAddress: "莱佛士坊 8 号",
    taxId: "SG-QL-20481",
    jurisdiction: "新加坡",
    depositCycle: "1 个月",
    severanceAccrualRate: "0%",
    monthlyEorFee: "0.00",
    currency: "SGD",
    status: "active",
    accent: "#347EE5",
    createdAt: "2026-09-02T08:00:00.000Z",
    updatedAt: "2026-09-02T08:00:00.000Z",
  },
  {
    id: "PT-1002",
    name: "澄海在地伙伴",
    type: "ICP Partner",
    country: "日本",
    pricingMethod: "手工",
    employeeCount: 0,
    legalName: "澄海在地伙伴株式会社",
    registeredAddress: "港区南青山 2 丁目",
    taxId: "JP-CH-88310",
    jurisdiction: "日本",
    depositCycle: "2 个月",
    severanceAccrualRate: "8%",
    monthlyEorFee: "480.00",
    currency: "JPY",
    status: "active",
    accent: "#7C5CFF",
    createdAt: "2026-09-04T08:00:00.000Z",
    updatedAt: "2026-09-04T08:00:00.000Z",
  },
  {
    id: "PT-1003",
    name: "岚桥雇主服务",
    type: "EOR Service Provider",
    country: "德国",
    pricingMethod: "手工",
    employeeCount: 2,
    legalName: "岚桥雇主服务有限公司",
    registeredAddress: "柏林米特区示例街 12 号",
    taxId: "DE-LQ-55209",
    jurisdiction: "德国",
    depositCycle: "1 个月",
    severanceAccrualRate: "4%",
    monthlyEorFee: "650.00",
    currency: "EUR",
    status: "active",
    accent: "#F5A524",
    createdAt: "2026-09-06T08:00:00.000Z",
    updatedAt: "2026-09-06T08:00:00.000Z",
  },
];

export const EMPTY_DRAFT: PartnerDraft = {
  name: "",
  type: "EOR Service Provider",
  country: "",
  legalName: "",
  registeredAddress: "",
  taxId: "",
  jurisdiction: "",
  depositCycle: "",
  severanceAccrualRate: "",
  monthlyEorFee: "0.00",
  currency: "USD",
};

function isPartnerType(value: unknown): value is PartnerType {
  return value === "EOR Service Provider" || value === "ICP Partner";
}

function isCurrency(value: unknown): value is Currency {
  return typeof value === "string" && (CURRENCIES as readonly string[]).includes(value);
}

function normalizePartner(value: unknown): Partner | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Partial<Partner>;
  if (typeof row.id !== "string" || typeof row.name !== "string") return null;
  if (!isPartnerType(row.type)) return null;
  if (row.status !== "active" && row.status !== "inactive") return null;
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    country: typeof row.country === "string" ? row.country : "",
    pricingMethod: "手工",
    employeeCount:
      typeof row.employeeCount === "number" && row.employeeCount >= 0
        ? row.employeeCount
        : 0,
    legalName: typeof row.legalName === "string" ? row.legalName : "",
    registeredAddress:
      typeof row.registeredAddress === "string" ? row.registeredAddress : "",
    taxId: typeof row.taxId === "string" ? row.taxId : "",
    jurisdiction: typeof row.jurisdiction === "string" ? row.jurisdiction : "",
    depositCycle: typeof row.depositCycle === "string" ? row.depositCycle : "",
    severanceAccrualRate:
      typeof row.severanceAccrualRate === "string" ? row.severanceAccrualRate : "",
    monthlyEorFee:
      typeof row.monthlyEorFee === "string" ? row.monthlyEorFee : "0.00",
    currency: isCurrency(row.currency) ? row.currency : "USD",
    status: row.status,
    accent: typeof row.accent === "string" ? row.accent : "#347EE5",
    createdAt: typeof row.createdAt === "string" ? row.createdAt : new Date().toISOString(),
    updatedAt: typeof row.updatedAt === "string" ? row.updatedAt : new Date().toISOString(),
  };
}

export function readPartners(): Partner[] {
  if (typeof window === "undefined") return SEED_PARTNERS;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PARTNERS));
    return SEED_PARTNERS;
  }
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) throw new Error("partners");
    const partners = parsed.map(normalizePartner);
    if (partners.some((partner) => partner === null)) throw new Error("partner");
    return partners as Partner[];
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PARTNERS));
    return SEED_PARTNERS;
  }
}

export function writePartners(partners: Partner[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(partners));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribePartners(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) onChange();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function validateDraft(draft: PartnerDraft): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!draft.name.trim()) errors.name = "请填写伙伴名称";
  if (!draft.country) errors.country = "请选择国家";
  if (!isPartnerType(draft.type)) errors.type = "请选择类型";
  const fee = Number(draft.monthlyEorFee);
  if (!Number.isFinite(fee) || fee < 0) errors.monthlyEorFee = "请填写不小于 0 的费用";
  if (!isCurrency(draft.currency)) errors.currency = "请选择币种";
  return errors;
}

function cleanDraft(draft: PartnerDraft): PartnerDraft {
  const fee = Number(draft.monthlyEorFee);
  return {
    name: draft.name.trim(),
    type: draft.type,
    country: draft.country,
    legalName: draft.legalName.trim(),
    registeredAddress: draft.registeredAddress.trim(),
    taxId: draft.taxId.trim(),
    jurisdiction: draft.jurisdiction,
    depositCycle: draft.depositCycle.trim(),
    severanceAccrualRate: draft.severanceAccrualRate.trim(),
    monthlyEorFee: fee.toFixed(2),
    currency: draft.currency,
  };
}

function nextId(partners: Partner[]) {
  const max = partners.reduce((highest, partner) => {
    const value = Number(partner.id.replace(/\D/g, ""));
    return Number.isFinite(value) ? Math.max(highest, value) : highest;
  }, 1000);
  return `PT-${max + 1}`;
}

function accentFor(id: string) {
  let hash = 0;
  for (const char of id) hash = (hash + char.charCodeAt(0)) % ACCENTS.length;
  return ACCENTS[hash] ?? "#347EE5";
}

export function createPartner(draft: PartnerDraft): Partner {
  const partners = readPartners();
  const id = nextId(partners);
  const now = new Date().toISOString();
  const partner: Partner = {
    ...cleanDraft(draft),
    id,
    pricingMethod: "手工",
    employeeCount: 0,
    status: "active",
    accent: accentFor(id),
    createdAt: now,
    updatedAt: now,
  };
  writePartners([...partners, partner]);
  return partner;
}

export function updatePartner(id: string, draft: PartnerDraft): Partner | null {
  const partners = readPartners();
  let updated: Partner | null = null;
  const next = partners.map((partner) => {
    if (partner.id !== id) return partner;
    updated = {
      ...partner,
      ...cleanDraft(draft),
      id: partner.id,
      pricingMethod: "手工",
      employeeCount: partner.employeeCount,
      status: partner.status,
      accent: partner.accent,
      createdAt: partner.createdAt,
      updatedAt: new Date().toISOString(),
    };
    return updated;
  });
  if (!updated) return null;
  writePartners(next);
  return updated;
}

export function deactivatePartner(id: string): Partner | null {
  const partners = readPartners();
  let updated: Partner | null = null;
  const next = partners.map((partner) => {
    if (partner.id !== id) return partner;
    updated = {
      ...partner,
      status: "inactive",
      updatedAt: new Date().toISOString(),
    };
    return updated;
  });
  if (!updated) return null;
  writePartners(next);
  return updated;
}

export function filterPartners(
  partners: Partner[],
  query: { q?: string; country?: string; type?: string },
) {
  const q = query.q?.trim().toLowerCase() ?? "";
  return partners.filter((partner) => {
    if (q && !partner.name.toLowerCase().includes(q)) return false;
    if (query.country && partner.country !== query.country) return false;
    if (query.type && partner.type !== query.type) return false;
    return true;
  });
}

export function draftFromPartner(partner: Partner): PartnerDraft {
  return {
    name: partner.name,
    type: partner.type,
    country: partner.country,
    legalName: partner.legalName,
    registeredAddress: partner.registeredAddress,
    taxId: partner.taxId,
    jurisdiction: partner.jurisdiction,
    depositCycle: partner.depositCycle,
    severanceAccrualRate: partner.severanceAccrualRate,
    monthlyEorFee: partner.monthlyEorFee,
    currency: partner.currency,
  };
}

export const PAGE_SIZE = 10;
