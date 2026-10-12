import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function svg(props: IconProps) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    ...props,
  };
}

export function LogoMark() {
  return (
    <span className="text-[28px] font-black leading-none tracking-tight text-[#111111]">
      R
    </span>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" />
    </svg>
  );
}

export function OrgIcon(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <path d="M4 20V8.5L12 4l8 4.5V20" />
      <path d="M9 20v-5h6v5" />
      <path d="M9 10h.01M12 10h.01M15 10h.01" />
    </svg>
  );
}

export function PayrollIcon(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </svg>
  );
}

export function PartnersIcon(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.2" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.2" />
    </svg>
  );
}

export function GearIcon(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2H4.5L6 16Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <circle cx="11" cy="11" r="6" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <path d="m14 6-6 6 6 6" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <path d="m10 6 6 6-6 6" />
    </svg>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <path d="M5 20V7l7-3 7 3v13" />
      <path d="M9 20v-4h6v4M9 9h.01M12 9h.01M15 9h.01M9 12.5h.01M12 12.5h.01M15 12.5h.01" />
    </svg>
  );
}

export function PeopleIcon(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <circle cx="8" cy="8.5" r="2.4" />
      <path d="M3.8 18.5c.5-2.5 2.3-3.8 4.2-3.8s3.7 1.3 4.2 3.8" />
      <circle cx="16.2" cy="9.2" r="2" />
      <path d="M13.6 18.5c.4-1.7 1.6-2.8 2.8-2.8 1.1 0 2 .7 2.6 1.8" />
    </svg>
  );
}

export function DocumentIcon(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
      <path d="M14 3.5V8h4M9 13h6M9 16.5h4" />
    </svg>
  );
}

export function IdIcon(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <rect x="3.5" y="6" width="17" height="12" rx="2" />
      <circle cx="9" cy="12" r="1.8" />
      <path d="M13 11h5M13 14h3.5" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <path d="M12 3.5 19 6.5v5.2c0 4-2.8 6.7-7 8.3-4.2-1.6-7-4.3-7-8.3V6.5L12 3.5Z" />
    </svg>
  );
}

export function ChecklistIcon(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="m8 12 2 2 4-4" />
    </svg>
  );
}

export function BoltIcon(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <path d="M13 3 6 13h6l-1 8 7-10h-6l1-8Z" />
    </svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <rect x="6" y="11" width="12" height="8" rx="1.5" />
      <path d="M8.5 11V8.5a3.5 3.5 0 0 1 7 0V11" />
    </svg>
  );
}
