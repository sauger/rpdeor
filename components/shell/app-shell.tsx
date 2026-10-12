"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  BellIcon,
  GearIcon,
  HomeIcon,
  LogoMark,
  OrgIcon,
  PartnersIcon,
  PayrollIcon,
} from "@/components/icons";

const NAV = [
  { href: "/", label: "首页", icon: HomeIcon },
  { href: "/organizations", label: "组织", icon: OrgIcon },
  { href: "/payroll", label: "薪资", icon: PayrollIcon },
  { href: "/partners", label: "合作伙伴", icon: PartnersIcon },
];

const GEAR_LINKS = [
  { href: "/settings/two-factor", label: "开启两步验证" },
  { href: "/settings/fx", label: "外汇加价" },
  { href: "/settings/leave", label: "休假政策" },
  { href: "/settings/templates", label: "文档模板" },
  { href: "/settings/team", label: "团队" },
];

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menu, setMenu] = useState<"gear" | "bell" | "user" | null>(null);
  const [menuPath, setMenuPath] = useState(pathname);
  const menuRef = useRef<HTMLDivElement>(null);
  const gearId = useId();
  const bellId = useId();
  const userId = useId();

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenu(null);
  }

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setMenu(null);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenu(null);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-30 border-b border-[#E6E6E8] bg-white">
        <div className="relative flex h-16 items-center px-8">
          <Link href="/" aria-label="回到首页" className="flex items-center">
            <LogoMark />
          </Link>
          <nav
            aria-label="主导航"
            className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[#F4F4F5] px-1.5 py-1.5"
          >
            {NAV.map((item) => {
              const active = isActive(item.href, pathname);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm ${
                    active ? "text-[#347EE5]" : "text-[#6B7280] hover:text-[#111111]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div ref={menuRef} className="ml-auto flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#111111] hover:bg-[#F4F4F5]"
                aria-label="设置"
                aria-expanded={menu === "gear"}
                aria-controls={gearId}
                onClick={() => setMenu((current) => (current === "gear" ? null : "gear"))}
              >
                <GearIcon className="h-5 w-5" />
              </button>
              {menu === "gear" ? (
                <div
                  id={gearId}
                  className="absolute right-0 top-11 w-44 overflow-hidden rounded-xl border border-[#E6E6E8] bg-white py-1 shadow-lg"
                >
                  {GEAR_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-[#111111] hover:bg-[#F4F4F5]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="relative">
              <button
                type="button"
                className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#111111] hover:bg-[#F4F4F5]"
                aria-label="通知，3"
                aria-expanded={menu === "bell"}
                aria-controls={bellId}
                onClick={() => setMenu((current) => (current === "bell" ? null : "bell"))}
              >
                <BellIcon className="h-5 w-5" />
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#F04444] px-1 text-[10px] font-medium leading-none text-white">
                  3
                </span>
              </button>
              {menu === "bell" ? (
                <div
                  id={bellId}
                  className="absolute right-0 top-11 w-72 rounded-xl border border-[#E6E6E8] bg-white p-4 shadow-lg"
                >
                  <p className="text-sm font-medium text-[#111111]">今日待办</p>
                  <p className="mt-4 text-sm text-[#6B7280]">今天没有待办</p>
                </div>
              ) : null}
            </div>
            <div className="relative">
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D9D9DE] text-sm font-medium text-[#111111]"
                aria-label="当前用户 周宁"
                aria-expanded={menu === "user"}
                aria-controls={userId}
                onClick={() => setMenu((current) => (current === "user" ? null : "user"))}
              >
                周
              </button>
              {menu === "user" ? (
                <div
                  id={userId}
                  className="absolute right-0 top-11 w-44 rounded-xl border border-[#E6E6E8] bg-white px-4 py-3 shadow-lg"
                >
                  <p className="text-sm font-medium text-[#111111]">周宁</p>
                  <p className="mt-1 text-xs text-[#6B7280]">运营人员</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
