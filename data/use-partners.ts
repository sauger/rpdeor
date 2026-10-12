"use client";

import { useEffect, useState } from "react";
import { readPartners, subscribePartners, type Partner } from "@/data/partners";

export function usePartners() {
  const [partners, setPartners] = useState<Partner[] | null>(null);

  useEffect(() => {
    const load = () => setPartners(readPartners());
    load();
    return subscribePartners(load);
  }, []);

  return partners;
}
