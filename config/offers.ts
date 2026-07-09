/**
 * Single source of truth for AESURUS pricing and offer copy.
 * Change a price here and it updates everywhere it's referenced,
 * never hardcode a price directly in a page or component.
 */

import type { ComponentType, SVGProps } from "react";
import { DocumentIcon, CycleIcon, PulseIcon, CloudIcon, ScanIcon } from "@/components/icons";

export type Service = {
  slug: "comply" | "guard" | "shield" | "cloud" | "assessment";
  name: string;
  tagline: string;
  promise: string;
  price: string;
  priceDetail: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Shown in the home page's 3-card offer ladder. */
  inLadder: boolean;
};

export const services: Service[] = [
  {
    slug: "comply",
    name: "COMPLY",
    tagline: "DPA readiness assessment",
    promise: "Know exactly where you stand under the Data Protection Act, in writing.",
    price: "From US$3,500",
    priceDetail: "fixed fee",
    href: "/services/dpa-compliance",
    icon: DocumentIcon,
    inLadder: true,
  },
  {
    slug: "guard",
    name: "GUARD",
    tagline: "Data Protection Officer as a Service",
    promise: "A named data-protection contact who keeps you compliant, ongoing.",
    price: "From US$500",
    priceDetail: "per month",
    href: "/services/data-protection-officer",
    icon: CycleIcon,
    inLadder: true,
  },
  {
    slug: "shield",
    name: "SHIELD MSP",
    tagline: "Managed security, Sophos-based",
    promise: "Endpoints monitored and defended around the clock.",
    price: "From US$900",
    priceDetail: "per month, from 10 seats",
    href: "/services/managed-security",
    icon: PulseIcon,
    inLadder: true,
  },
  {
    slug: "cloud",
    name: "Cloud Enclave",
    tagline: "Managed cloud, Microsoft Azure",
    promise: "Cloud capability without losing control of sensitive data.",
    price: "From US$600",
    priceDetail: "per month management, migration priced by scope",
    href: "/services/cloud-services",
    icon: CloudIcon,
    inLadder: false,
  },
  {
    slug: "assessment",
    name: "Security Assessment",
    tagline: "Vulnerability & posture review",
    promise: "A plain-English findings report your own IT provider can act on.",
    price: "From US$2,000",
    priceDetail: "fixed, by scope",
    href: "/services/security-assessments",
    icon: ScanIcon,
    inLadder: false,
  },
];

/** The three engagements featured in the home page offer ladder. */
export const offers = services.filter((s) => s.inLadder);

export const complyOffer = {
  price: "From US$3,500",
  priceDetail: "fixed fee",
  timeline: "Delivered in 2–3 weeks",
  billing: "No hourly billing. One fee, one scope, one deliverable.",
};

export const guardOffer = {
  price: "From US$500",
  priceDetail: "per month",
  term: "12-month term",
  billing: "Billed quarterly in advance.",
};

export const shieldOffer = {
  tiers: [
    {
      seats: "10–25 seats",
      price: "US$900",
      priceDetail: "per month",
    },
    {
      seats: "26–50 seats",
      price: "US$1,400",
      priceDetail: "per month",
    },
  ],
  term: "12-month term",
};

export const cloudOffer = {
  migration: {
    price: "Priced by scope",
    detail: "Fixed-fee migration, scoped after the exposure check: the one engagement where price follows scoping, not the other way around.",
  },
  management: {
    price: "From US$600",
    priceDetail: "per month",
    detail: "Ongoing environment management, patching, and backup oversight.",
  },
};

export const assessmentOffer = {
  price: "From US$2,000",
  priceDetail: "fixed, depending on scope",
  timeline: "1–2 weeks",
};
