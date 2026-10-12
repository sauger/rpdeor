import type { Metadata } from "next";
import { PartnerCreate } from "@/components/partners/partner-editor";

export const metadata: Metadata = { title: "新建伙伴" };

export default function NewPartnerPage() {
  return <PartnerCreate />;
}
