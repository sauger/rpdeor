import Link from "next/link";
import {
  BoltIcon,
  ChecklistIcon,
  ChevronRightIcon,
  DocumentIcon,
  IdIcon,
  LockIcon,
  PeopleIcon,
  ShieldIcon,
} from "@/components/icons";

const CARDS = [
  { label: "组织", icon: PeopleIcon, bar: "#FF5A6A" },
  { label: "法律实体", icon: DocumentIcon, bar: "#7C5CFF" },
  { label: "员工", icon: IdIcon, bar: "#347EE5" },
  { label: "合作伙伴", icon: ShieldIcon, bar: "#E85BB8" },
];

const ACTIONS = [
  {
    href: "/organizations",
    title: "邀请用户创建组织",
    detail: "邀请客户完成后，组织出现在列表中",
    icon: DocumentIcon,
  },
  {
    href: "/settings/two-factor",
    title: "开启两步验证",
    detail: "为运营账号增加一层保护",
    icon: LockIcon,
  },
];

export function HomeContent() {
  return (
    <div className="px-8 py-8">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#14B8A6] text-2xl font-semibold text-white">
          周
        </div>
        <h1 className="text-[28px] font-semibold tracking-tight text-[#111111]">你好 周宁</h1>
      </div>

      {/* 开放问题 1：四个汇总数字的口径未定。效果图上的 0 只是占位，不拿伙伴条数去填。 */}
      <div className="mt-8 grid grid-cols-4 gap-4">
        {CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.label}
              className="flex min-h-[148px] flex-col overflow-hidden rounded-xl border border-[#E6E6E8] bg-white"
            >
              <div className="flex-1 px-5 pt-5 pb-6">
                <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
                  {card.label}
                </div>
                <p className="mt-6 text-[36px] font-semibold leading-none tracking-tight">0</p>
              </div>
              <div className="h-2" style={{ backgroundColor: card.bar }} />
            </article>
          );
        })}
      </div>

      <div className="mt-10 grid grid-cols-2 items-stretch gap-10">
        <section className="flex flex-col">
          <h2 className="flex items-center gap-2 text-base font-semibold text-[#111111]">
            <ChecklistIcon className="h-4 w-4" />
            今日待办
          </h2>
          <div className="mt-4 flex flex-1 items-start rounded-xl border border-[#E6E6E8] px-5 py-5 text-sm text-[#6B7280]">
            今天没有待办
          </div>
        </section>
        <section>
          <h2 className="flex items-center gap-2 text-base font-semibold text-[#111111]">
            <BoltIcon className="h-4 w-4" />
            快捷操作
          </h2>
          <div className="mt-4 flex flex-col gap-3">
            {ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-4 rounded-xl border border-[#E6E6E8] px-4 py-4 hover:bg-[#FAFAFA]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#F04444] text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-[#111111]">{action.title}</span>
                    <span className="mt-0.5 block text-sm text-[#6B7280]">{action.detail}</span>
                  </span>
                  <ChevronRightIcon className="h-4 w-4 shrink-0 text-[#9CA3AF]" />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
