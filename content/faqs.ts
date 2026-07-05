import type { Locale } from "@/i18n/routing";
import type { LocalizedString } from "@/lib/i18n";
import { pick } from "@/lib/i18n";
import type { FaqCategory, FaqItem } from "@/types";

interface FaqSource {
  id: string;
  category: FaqCategory;
  question: LocalizedString;
  answer: LocalizedString;
}

const source: FaqSource[] = [
  {
    id: "locations",
    category: "Buying",
    question: { en: "Where is Zidan Development building in New Cairo / Fifth Settlement?", ar: "أين تقع مشاريع زيدان للتطوير في القاهرة الجديدة والتجمّع الخامس؟" },
    answer: {
      en: "We focus on prime locations across New Cairo and the Fifth Settlement. Depending on availability, projects may be in areas such as El Narges, Bait Al Watan, Al Andalus and Lotus. We share the exact map pin and nearby main roads before booking.",
      ar: "نركّز على المواقع المميزة في القاهرة الجديدة والتجمّع الخامس. حسب التوفر، قد تشمل المشاريع مناطق مثل النرجس وبيت الوطن والأندلس واللوتس. قبل الحجز نشاركك الموقع الدقيق على الخريطة وأقرب المحاور الرئيسية.",
    },
  },
  {
    id: "unit-types",
    category: "Buying",
    question: { en: "What unit types are available — apartments, duplexes, commercial units?", ar: "ما أنواع الوحدات المتاحة — شقق، دوبلكس، أو وحدات تجارية؟" },
    answer: {
      en: "Unit types vary by project. Options typically include apartments in multiple sizes and layouts, and in some developments commercial or administrative units based on the master plan.",
      ar: "تختلف أنواع الوحدات حسب كل مشروع. تشمل الخيارات عادةً شققاً بمساحات وتصميمات متعددة، وقد تتوفر في بعض المشروعات وحدات تجارية أو إدارية وفقاً للمخطط العام.",
    },
  },
  {
    id: "down-payment",
    category: "Payment",
    question: { en: "What is the minimum down payment?", ar: "ما الحد الأدنى للمقدّم؟" },
    answer: {
      en: "The down payment depends on the project and current sales phase. You will receive a written offer sheet showing the down payment, installment schedule and any applicable fees before you sign.",
      ar: "يعتمد المقدّم على المشروع ومرحلة البيع الحالية. قبل التوقيع ستحصل على عرض مكتوب يوضح قيمة المقدّم وجدول الأقساط وأي رسوم مطبقة.",
    },
  },
  {
    id: "installments",
    category: "Payment",
    question: { en: "How long are the installment plans — monthly or quarterly?", ar: "ما مدة خطط السداد — وهل الأقساط شهرية أم ربع سنوية؟" },
    answer: {
      en: "Payment schedules differ by project and launch stage. Plans may be monthly, quarterly or semi-annual. We provide a clear schedule so you can compare total cashflow — not just the headline price.",
      ar: "تختلف جداول السداد حسب المشروع ومرحلة الطرح. قد تكون الأقساط شهرية أو ربع سنوية أو نصف سنوية. نوفر لك جدولاً واضحاً لتقارن إجمالي الالتزامات المالية، وليس السعر المعلن فقط.",
    },
  },
  {
    id: "delivery-date",
    category: "Delivery",
    question: { en: "When is delivery, and is the delivery date stated in the contract?", ar: "متى موعد التسليم، وهل تاريخ التسليم مذكور في العقد؟" },
    answer: {
      en: "Delivery timelines are confirmed per project and written in the contract. Always review the delivery date, handover conditions and the inspection/snag process before committing.",
      ar: "يتم تحديد موعد التسليم لكل مشروع وكتابته في العقد. راجع دائماً تاريخ التسليم وشروط الاستلام وإجراءات المعاينة قبل الالتزام.",
    },
  },
  {
    id: "finishing",
    category: "Finishing",
    question: { en: "What are the finishing specifications — semi-finished or fully finished?", ar: "ما مواصفات التشطيب — نصف تشطيب أم تشطيب كامل؟" },
    answer: {
      en: "Finishing level varies by project. We provide a detailed finishing specs sheet covering floors, paint, doors, aluminum, plumbing and electrical so expectations are clear in writing.",
      ar: "تختلف مستويات التشطيب حسب المشروع. نوفر كشف مواصفات مفصلاً يغطي الأرضيات والدهانات والأبواب والألمنيوم والسباكة والكهرباء، حتى تكون كل التوقعات واضحة ومكتوبة.",
    },
  },
  {
    id: "maintenance",
    category: "After-Sales",
    question: { en: "Are there maintenance fees, and when are they paid?", ar: "هل توجد رسوم صيانة، ومتى تُدفع؟" },
    answer: {
      en: "Maintenance fees may apply based on services and operations. We clarify the amount, timing (one-time or phased) and scope — security, landscaping, cleaning, lighting and management.",
      ar: "قد تُطبق رسوم صيانة حسب الخدمات ونظام التشغيل. نوضح لك القيمة، وموعد السداد — مرة واحدة أو على مراحل — وما تغطيه الرسوم مثل الأمن والنظافة والإنارة والإدارة.",
    },
  },
  {
    id: "rights-protection",
    category: "After-Sales",
    question: { en: "What protects my rights if delivery is delayed or specifications change?", ar: "ما الذي يحمي حقوقي إذا تأخّر التسليم أو تغيّرت المواصفات؟" },
    answer: {
      en: "Your contract is the key protection: unit specs, delivery date and the official process for claims. Make sure every promise is documented in writing.",
      ar: "العقد هو الحماية الأساسية: مواصفات الوحدة، وتاريخ التسليم، والإجراءات الرسمية عند وجود مطالبة. تأكّد دائماً أن كل وعد مهم موثّق كتابةً.",
    },
  },
  {
    id: "site-visits",
    category: "Delivery",
    question: { en: "Can I visit the construction site and see real progress?", ar: "هل يمكنني زيارة موقع البناء ومتابعة التقدّم الفعلي؟" },
    answer: {
      en: "Yes. Site visits can be arranged when available. Where applicable, we also share progress updates including photos and videos.",
      ar: "نعم. يمكن ترتيب زيارات للموقع حسب التوفر. وعند الإمكان نشارك أيضاً تحديثات عن نسب التنفيذ بالصور والفيديو.",
    },
  },
  {
    id: "documents",
    category: "Buying",
    question: { en: "What documents do I sign when booking and contracting?", ar: "ما المستندات التي أوقّعها عند الحجز والتعاقد؟" },
    answer: {
      en: "Typically, booking includes a reservation/booking form and payment receipts, followed by a sales contract detailing unit specifications, pricing, payment schedule and handover terms.",
      ar: "عادةً يشمل الحجز استمارة حجز وإيصالات سداد، ثم عقد بيع يوضح مواصفات الوحدة والأسعار وجدول السداد وشروط الاستلام.",
    },
  },
  {
    id: "registration",
    category: "After-Sales",
    question: { en: "Can the unit be registered, and when does registration happen?", ar: "هل يمكن تسجيل الوحدة، ومتى يتم التسجيل؟" },
    answer: {
      en: "Registration depends on the project's legal documentation and procedures. We recommend discussing the registration pathway early and confirming the required documents and steps.",
      ar: "يعتمد التسجيل على المستندات القانونية والإجراءات الخاصة بكل مشروع. ننصح بمناقشة مسار التسجيل مبكراً والتأكد من المستندات والخطوات المطلوبة.",
    },
  },
  {
    id: "property-management",
    category: "After-Sales",
    question: { en: "Is there property management or an owners association?", ar: "هل توجد إدارة أملاك أو اتحاد ملاك؟" },
    answer: {
      en: "In serviced developments, property management helps maintain standards — security, maintenance and rules of use. Where applicable, we clarify the management model and responsibilities.",
      ar: "في المشروعات المخدومة، تساعد إدارة الأملاك على الحفاظ على مستوى التشغيل — مثل الأمن والصيانة وقواعد الاستخدام. وعند وجود هذا النظام نوضح نموذج الإدارة والمسؤوليات.",
    },
  },
  {
    id: "resale",
    category: "Investment",
    question: { en: "Can I resell before delivery, and is unit assignment allowed?", ar: "هل يمكن إعادة البيع قبل التسليم، وهل يُسمح بتحويل الوحدة؟" },
    answer: {
      en: "Resale and assignment rules vary by contract and project policy. If allowed, we clarify timing, conditions and any administrative fees in writing.",
      ar: "تختلف قواعد إعادة البيع والتنازل حسب العقد وسياسة كل مشروع. إذا كان ذلك مسموحاً، نوضح التوقيت والشروط وأي رسوم إدارية كتابةً.",
    },
  },
  {
    id: "nearby",
    category: "Buying",
    question: { en: "What services and landmarks are nearby?", ar: "ما الخدمات والمعالم القريبة؟" },
    answer: {
      en: "New Cairo zones differ in access and nearby services. Based on the exact project location, we share the nearest roads, key landmarks, schools, medical services and shopping areas.",
      ar: "تختلف مناطق القاهرة الجديدة من حيث سهولة الوصول والخدمات المحيطة. بناءً على موقع المشروع الدقيق، نشاركك أقرب المحاور والمعالم والمدارس والخدمات الطبية ومناطق التسوق.",
    },
  },
  {
    id: "living-vs-investment",
    category: "Investment",
    question: { en: "Should I buy for living or for investment in New Cairo?", ar: "هل أشتري للسكن أم للاستثمار في القاهرة الجديدة؟" },
    answer: {
      en: "It depends on your objective. For living, prioritize delivery, services and daily convenience. For investment, prioritize demand, resale flexibility and payment-plan structure.",
      ar: "يعتمد القرار على هدفك. للسكن، ركّز على موعد التسليم والخدمات وراحة الحياة اليومية. وللاستثمار، ركّز على قوة الطلب ومرونة إعادة البيع وهيكل خطة السداد.",
    },
  },
];

export function getFaqs(locale: Locale): FaqItem[] {
  return source.map((item) => ({
    id: item.id,
    category: item.category,
    question: pick(item.question, locale),
    answer: pick(item.answer, locale),
  }));
}

export const faqCategories = [
  "All",
  "Buying",
  "Payment",
  "Delivery",
  "Finishing",
  "After-Sales",
  "Investment",
] as const;
