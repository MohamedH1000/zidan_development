import type { Locale } from "@/i18n/routing";
import type { LocalizedString, LocalizedStringList } from "@/lib/i18n";
import { pick, pickList } from "@/lib/i18n";
import type { SpecCategory, SpecIcon } from "@/types";

const intro = {
  title: { en: "Construction & Finishing Specifications", ar: "مواصفات الإنشاء والتشطيب" } as LocalizedString,
  subtitle: { en: "Built for long-term value in New Cairo.", ar: "تنفيذ يحافظ على القيمة لسنوات في القاهرة الجديدة." } as LocalizedString,
  body: {
    en: [
      "With 10 years of experience and 200+ delivered projects across residential, commercial, administrative, medical and serviced-use developments, Zidan Development delivers with direct execution and strict supervision to protect quality and timelines.",
      "This is our full specifications sheet — presented as-is for complete clarity.",
    ],
    ar: [
      "بخبرة 10 سنوات وأكثر من 200 مشروع مُسلّم في الاستخدامات السكنية والتجارية والإدارية والطبية والخدمية، تعتمد زيدان على التنفيذ المباشر والإشراف الصارم لحماية الجودة والجداول الزمنية.",
      "هذا هو كشف المواصفات الكامل — نعرضه بوضوح لضمان الشفافية الكاملة.",
    ],
  } as LocalizedStringList,
};

interface SpecSource {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  icon: SpecIcon;
  items: LocalizedStringList;
}

const categories: SpecSource[] = [
  {
    id: "structure",
    title: { en: "Structure & Concrete Quality", ar: "الإنشاء وجودة الخرسانة" },
    description: { en: "Solid foundations that protect your asset value.", ar: "أساسات متينة تحافظ على قيمة استثمارك." },
    icon: "structure",
    items: {
      en: ["Ready-mix concrete to high-grade standards", "Strength and load testing", "Soil tests before execution", "Full internal plastering", "Flat slab ceilings"],
      ar: ["خرسانة جاهزة وفق معايير عالية", "اختبارات مقاومة وتحمل", "اختبارات تربة قبل التنفيذ", "محارة داخلية كاملة", "أسقف فلات سلاب"],
    },
  },
  {
    id: "facade",
    title: { en: "Façades & External Finishing", ar: "الواجهات والتشطيب الخارجي" },
    description: { en: "Durable exteriors designed for Egypt's climate.", ar: "واجهات متينة تناسب المناخ المصري." },
    icon: "facade",
    items: {
      en: ['Front façade "Zidan Stone" as per architectural design', "Heat & humidity resistant exterior paints", "Waterproofing and moisture insulation for roofs", "Aluminum windows with reflective glass (sound & heat insulation)", "External landscaping"],
      ar: ["واجهة أمامية «حجر زيدان» وفق التصميم المعماري", "دهانات خارجية مقاومة للحرارة والرطوبة", "عزل مائي ورطوبة للأسطح", "شبابيك ألمنيوم بزجاج عاكس للعزل الصوتي والحراري", "تنسيق خارجي للمسطحات الخضراء"],
    },
  },
  {
    id: "entrance",
    title: { en: "Entrances & Internal Common Areas", ar: "المداخل والمناطق المشتركة" },
    description: { en: "A premium arrival experience from the first step.", ar: "انطباع راقٍ يبدأ من لحظة الدخول." },
    icon: "entrance",
    items: {
      en: ["Luxury marble entrance", "Italian marble staircases", "European elevator from garage to roof"],
      ar: ["مدخل رخامي فاخر", "سلالم من الرخام الإيطالي", "مصعد أوروبي من الجراج حتى السطح"],
    },
  },
  {
    id: "mep",
    title: { en: "Unit Infrastructure (MEP)", ar: "البنية التحتية للوحدة" },
    description: { en: "Practical readiness, built-in from day one.", ar: "تجهيزات عملية مدمجة منذ اليوم الأول." },
    icon: "mep",
    items: {
      en: ["Power feed from the main meter board", "Internal electrical conduits", "Complete water supply & drainage connections", "Emergency backup battery during power outages", "Electric vehicle charging connections"],
      ar: ["تغذية كهرباء من اللوحة الرئيسية", "مواسير كهرباء داخلية", "تمديدات مياه وصرف كاملة", "بطارية احتياطية للطوارئ عند انقطاع الكهرباء", "توصيلات مخصصة لشحن السيارات الكهربائية"],
    },
  },
  {
    id: "security",
    title: { en: "Security & Safety Systems", ar: "أنظمة الأمان والسلامة" },
    description: { en: "Controlled access and smart protection.", ar: "تحكم في الدخول وأنظمة حماية ذكية." },
    icon: "security",
    items: {
      en: ["HD CCTV surveillance", "Video intercom", "Fire alarm system", "Card access gate", "Electronic garage gate", "On-site security & guarding", "Motion / lighting sensors"],
      ar: ["كاميرات مراقبة عالية الدقة", "إنتركم فيديو", "نظام إنذار حريق", "بوابة دخول بالكارت", "بوابة جراج إلكترونية", "أمن وحراسة بالموقع", "حساسات حركة وإضاءة"],
    },
  },
  {
    id: "comfort",
    title: { en: "Comfort & Added Services", ar: "الراحة والخدمات المكملة" },
    description: { en: "Everyday convenience that adds real value.", ar: "تفاصيل يومية تضيف قيمة حقيقية." },
    icon: "comfort",
    items: {
      en: ["Central satellite dish", "Central internet readiness", "AC outdoor unit holders", "Dedicated parking for each unit", "Private storage room for each unit", "Water tanks", "Security room with private bathroom", "Rainwater drainage system"],
      ar: ["طبق دش مركزي", "جاهزية للإنترنت المركزي", "حوامل خارجية لوحدات التكييف", "مكان انتظار مخصص لكل وحدة", "غرفة تخزين خاصة لكل وحدة", "خزانات مياه", "غرفة أمن بحمام خاص", "نظام لصرف مياه الأمطار"],
    },
  },
];

export function getSpecs(locale: Locale): { intro: { title: string; subtitle: string; body: string[] }; categories: SpecCategory[] } {
  return {
    intro: {
      title: pick(intro.title, locale),
      subtitle: pick(intro.subtitle, locale),
      body: pickList(intro.body, locale),
    },
    categories: categories.map((category) => ({
      id: category.id,
      title: pick(category.title, locale),
      description: pick(category.description, locale),
      icon: category.icon,
      items: pickList(category.items, locale),
    })),
  };
}
