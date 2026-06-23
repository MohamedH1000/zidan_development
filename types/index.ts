/**
 * Shared domain types for the Zidan Development marketing site.
 * Kept framework-agnostic so they can be imported on both server and client.
 */

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIcon;
}

export type SocialIcon = "facebook" | "instagram" | "linkedin" | "x" | "youtube";

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  description?: string;
}

export interface ValueItem {
  id: string;
  index: string;
  title: string;
  description: string;
}

export interface AreaSummary {
  name: string;
  slug: string;
  tagline: string;
}

export interface ProjectArea {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  summary: string;
  description: string[];
  district: string;
  status: "Available" | "Under Construction" | "Delivered" | "Coming Soon";
  unitTypes: string[];
  downPayment: string;
  installment: string;
  delivery: string;
  highlights: string[];
  accent: string;
  featured?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
}

export type FaqCategory =
  | "Buying"
  | "Payment"
  | "Delivery"
  | "Finishing"
  | "After-Sales"
  | "Investment";

export interface SpecCategory {
  id: string;
  title: string;
  description: string;
  icon: SpecIcon;
  items: string[];
}

export type SpecIcon =
  | "structure"
  | "facade"
  | "entrance"
  | "mep"
  | "security"
  | "comfort";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: string;
  date: string; // ISO date
  readingTime: string;
  tags: string[];
  featured?: boolean;
}
