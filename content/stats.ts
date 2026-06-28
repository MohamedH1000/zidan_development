import type { Locale } from "@/i18n/routing";
import type { LocalizedString } from "@/lib/i18n";
import { pick } from "@/lib/i18n";
import type { StatItem } from "@/types";

type StatSourceItem = {
  id: string;
  value: number;
  suffix: string;
  label: LocalizedString;
  description?: LocalizedString;
};

const source: StatSourceItem[] = [
  {
    id: "projects",
    value: 350,
    suffix: "+",
    label: { en: "Units Delivered", ar: "وحدات مسلّمة" } as LocalizedString,
    // description: {
    //   en: "Residential, commercial & administrative across New Cairo.",
    //   ar: "سكني وتجاري وإداري في كل القاهرة الجديدة.",
    // } as LocalizedString,
  },
  {
    id: "experience",
    value: 10,
    suffix: "+",
    label: { en: "Years of Experience", ar: "سنوات من الخبرة" } as LocalizedString,
    // description: {
    //   en: "A decade of disciplined execution and on-time delivery.",
    //   ar: "عقد كامل من التنفيذ المنضبط والتسليم في الموعد.",
    // } as LocalizedString,
  },
  {
    id: "districts",
    value: 250,
    suffix: "",
    label: { en: "Satisfied Clients", ar: "عملاء راضون" } as LocalizedString,
    // description: {
    //   en: "From Al Narges to Al Takmely — locations that hold value.",
    //   ar: "من النرجس إلى التكميلي — مواقع تحافظ على قيمتها.",
    // } as LocalizedString,
  },
  {
    id: "execution",
    value: 100,
    suffix: "%",
    label: { en: "Delivery Specifications", ar: "مواصفات التسليم" } as LocalizedString,
    // description: {
    //   en: "We own and build every project — no outsourcing.",
    //   ar: "نملك ونبني كل مشروع — بلا وسطاء.",
    // } as LocalizedString,
  },
] as const;

export function getStats(locale: Locale): StatItem[] {
  return source.map((stat) => ({
    id: stat.id,
    value: stat.value,
    suffix: stat.suffix,
    label: pick(stat.label, locale),
    description: "description" in stat ? pick(stat.description, locale) : undefined,
  }));
}
