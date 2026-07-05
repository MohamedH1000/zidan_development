import type { Locale } from "@/i18n/routing";
import type { LocalizedString, LocalizedStringList } from "@/lib/i18n";
import { pick, pickList } from "@/lib/i18n";
import type { ProjectArea } from "@/types";

interface ProjectSource {
  slug: string;
  name: LocalizedString;
  shortName: LocalizedString;
  tagline: LocalizedString;
  summary: LocalizedString;
  description: LocalizedStringList;
  district: LocalizedString;
  status: ProjectArea["status"];
  unitTypes: LocalizedString[];
  downPayment: LocalizedString;
  installment: LocalizedString;
  delivery: LocalizedString;
  highlights: LocalizedStringList;
  accent: string;
  featured?: boolean;
}

const source: ProjectSource[] = [
  {
    slug: "new-narges",
    name: { en: "New Narges", ar: "النرجس الجديد" },
    shortName: { en: "Narges", ar: "النرجس" },
    tagline: { en: "Established, in demand, and always appreciating.", ar: "منطقة راسخة، مطلوبة، وقيمتها في نمو مستمر." },
    summary: {
      en: "One of New Cairo's most established and sought-after districts — a mature community with strong resale demand and consistent rental yield.",
      ar: "إحدى أكثر مناطق القاهرة الجديدة رسوخاً وطلباً — مجتمع مكتمل الخدمات يتمتع بطلب قوي على إعادة البيع وعائد إيجاري مستقر.",
    },
    description: {
      en: [
        "New Narges sits at the heart of the Fifth Settlement, surrounded by completed infrastructure, schools, retail and greenery. Because it is already established, buyers step into immediate lifestyle value and proven demand.",
        "Our Narges buildings combine functional floor plans with the signature Zidan Stone façade, marble entrances and European elevators — built for owners who want a finished, move-in-ready address in a district that rarely loses value.",
      ],
      ar: [
        "يقع النرجس الجديد في قلب التجمّع الخامس، وسط بنية تحتية مكتملة ومدارس ومناطق تجارية ومساحات خضراء. ولأن المنطقة راسخة بالفعل، يحصل المشتري على قيمة معيشية فورية وطلب مثبت.",
        "مبانينا في النرجس تجمع بين مساحات عملية وواجهة «حجر زيدان» المميزة ومداخل رخامية ومصاعد أوروبية — لتمنحك عنواناً جاهزاً للسكن في منطقة تحافظ على قيمتها.",
      ],
    },
    district: { en: "Fifth Settlement · New Cairo", ar: "التجمّع الخامس · القاهرة الجديدة" },
    status: "Available",
    unitTypes: [
      { en: "Residential Apartments", ar: "شقق سكنية" },
      { en: "Duplexes", ar: "دوبلكس" },
    ],
    downPayment: { en: "From 10%", ar: "من 10%" },
    installment: { en: "Up to 7 years", ar: "حتى 7 سنوات" },
    delivery: { en: "Semi / Fully finished", ar: "نصف تشطيب / تشطيب كامل" },
    highlights: {
      en: [
        "Established, fully-serviced community",
        "Strong resale and rental demand",
        "Minutes from 90th Street & major roads",
        "Signature Zidan Stone façade",
      ],
      ar: [
        "مجتمع راسخ بكامل خدماته",
        "طلب قوي على إعادة البيع والإيجار",
        "دقائق من شارع التسعين والمحاور الرئيسية",
        "واجهة «حجر زيدان» المميزة",
      ],
    },
    accent: "#C8A45C",
    featured: true,
  },
  {
    slug: "bait-al-watan",
    name: { en: "Bait Al Watan", ar: "بيت الوطن" },
    shortName: { en: "Bait Al Watan", ar: "بيت الوطن" },
    tagline: { en: "The investment stronghold of New Cairo.", ar: "إحدى أقوى وجهات الاستثمار في القاهرة الجديدة." },
    summary: {
      en: "Purpose-built for investors — administrative and residential units engineered for yield, liquidity and fast exit.",
      ar: "وجهة مناسبة للمستثمرين — وحدات إدارية وسكنية مصمّمة للعائد والسيولة وسهولة إعادة البيع.",
    },
    description: {
      en: [
        "Bait Al Watan was designed from day one as an investment district, with administrative and residential zoning that drives consistent demand from professionals and businesses.",
        "Zidan's projects here are planned around efficient, leasable layouts with controlled common-area costs, giving investors a clear path to rental income and capital appreciation.",
      ],
      ar: [
        "صُمّم بيت الوطن منذ البداية كمنطقة استثمارية، بتقسيمات إدارية وسكنية تدعم طلباً مستمراً من الأفراد والشركات.",
        "تُخطط مشاريع زيدان هنا بمساحات فعّالة قابلة للتأجير وتكاليف تشغيل واضحة، لتمنح المستثمر مساراً عملياً نحو دخل إيجاري ونمو في رأس المال.",
      ],
    },
    district: { en: "Fifth Settlement · New Cairo", ar: "التجمّع الخامس · القاهرة الجديدة" },
    status: "Under Construction",
    unitTypes: [
      { en: "Administrative Units", ar: "وحدات إدارية" },
      { en: "Residential Apartments", ar: "شقق سكنية" },
    ],
    downPayment: { en: "From 10%", ar: "من 10%" },
    installment: { en: "Up to 8 years", ar: "حتى 8 سنوات" },
    delivery: { en: "Semi-finished", ar: "نصف تشطيب" },
    highlights: {
      en: [
        "Investor-first zoning",
        "Efficient, leasable layouts",
        "High demand from professionals",
        "Transparent payment schedules",
      ],
      ar: [
        "تخطيط مناسب للمستثمر",
        "تصاميم فعّالة قابلة للتأجير",
        "طلب مرتفع من المهنيين",
        "جداول سداد شفافة",
      ],
    },
    accent: "#B8924A",
    featured: true,
  },
  {
    slug: "al-lotus",
    name: { en: "Al Lotus", ar: "اللوتس" },
    shortName: { en: "Lotus", ar: "اللوتس" },
    tagline: { en: "Premium living, beautifully connected.", ar: "حياة راقية بالقرب من كل ما يهم." },
    summary: {
      en: "A premium residential district known for its quality of life, wide roads and proximity to top schools and clubs.",
      ar: "منطقة سكنية راقية معروفة بجودة الحياة، والشوارع الواسعة، والقرب من المدارس والأندية المميزة.",
    },
    description: {
      en: [
        "Al Lotus is one of New Cairo's most desirable residential addresses — known for its quieter streets, larger units and excellent access to international schools, sporting clubs and retail.",
        "Our Lotus buildings emphasize privacy, generous natural light and refined finishing, making them ideal for families seeking a long-term home in a premium community.",
      ],
      ar: [
        "اللوتس من أكثر العناوين السكنية طلباً في القاهرة الجديدة — تشتهر بشوارعها الهادئة ووحداتها الواسعة وقربها من المدارس الدولية والأندية والمناطق التجارية.",
        "مبانينا في اللوتس تمنح الأولوية للخصوصية والإضاءة الطبيعية والتشطيبات الراقية، لتناسب العائلات الباحثة عن بيت طويل الأمد في مجتمع مميز.",
      ],
    },
    district: { en: "Lotus District · New Cairo", ar: "حي اللوتس · القاهرة الجديدة" },
    status: "Available",
    unitTypes: [
      { en: "Residential Apartments", ar: "شقق سكنية" },
      { en: "Duplexes", ar: "دوبلكس" },
    ],
    downPayment: { en: "From 10%", ar: "من 10%" },
    installment: { en: "Up to 7 years", ar: "حتى 7 سنوات" },
    delivery: { en: "Fully finished", ar: "تشطيب كامل" },
    highlights: {
      en: ["Premium, family-friendly district", "Close to schools & clubs", "Generous, light-filled layouts", "High-end finishing standards"],
      ar: ["منطقة راقية وملائمة للعائلات", "قرب واضح من المدارس والأندية", "مساحات واسعة وإضاءة طبيعية", "معايير تشطيب راقية"],
    },
    accent: "#D9BC7A",
    featured: true,
  },
  {
    slug: "al-andalus",
    name: { en: "Al Andalus", ar: "الأندلس" },
    shortName: { en: "Andalus", ar: "الأندلس" },
    tagline: { en: "Balanced family living in a green setting.", ar: "حياة عائلية متوازنة وسط بيئة خضراء." },
    summary: {
      en: "A well-balanced residential district that blends calm, green surroundings with strong access to New Cairo's main arteries.",
      ar: "منطقة سكنية متوازنة تجمع بين الهدوء والبيئة الخضراء وسهولة الوصول إلى محاور القاهرة الجديدة الرئيسية.",
    },
    description: {
      en: [
        "Al Andalus offers a balanced lifestyle — quieter than the commercial core yet minutes from everything that matters. It is a favourite for families looking for value without compromising location.",
        "Zidan's Andalus projects deliver durable construction and practical layouts at an attractive entry point, with the same direct-execution quality standard applied everywhere.",
      ],
      ar: [
        "يقدّم الأندلس نمط حياة متوازناً — أهدأ من المناطق التجارية، ومع ذلك قريب من كل ما تحتاجه. لذلك يفضّله كثير من العائلات الباحثة عن قيمة حقيقية دون التنازل عن الموقع.",
        "مشاريع زيدان في الأندلس تقدّم إنشاءً متيناً ومساحات عملية بسعر دخول مناسب، مع نفس معيار الجودة والتنفيذ المباشر الذي نلتزم به في كل مشاريعنا.",
      ],
    },
    district: { en: "Andalus · New Cairo", ar: "الأندلس · القاهرة الجديدة" },
    status: "Available",
    unitTypes: [{ en: "Residential Apartments", ar: "شقق سكنية" }],
    downPayment: { en: "From 10%", ar: "من 10%" },
    installment: { en: "Up to 7 years", ar: "حتى 7 سنوات" },
    delivery: { en: "Semi / Fully finished", ar: "نصف تشطيب / تشطيب كامل" },
    highlights: {
      en: ["Green, family-oriented setting", "Strong value-to-location ratio", "Practical, efficient layouts", "Direct, supervised execution"],
      ar: ["بيئة خضراء مناسبة للعائلات", "قيمة قوية مقابل الموقع", "مساحات عملية وفعّالة", "تنفيذ مباشر تحت إشراف دقيق"],
    },
    accent: "#C8A45C",
  },
  {
    slug: "gardenia-heights",
    name: { en: "Gardenia Heights", ar: "جاردينيا هايتس" },
    shortName: { en: "Gardenia", ar: "جاردينيا" },
    tagline: { en: "Elevated, green and calm.", ar: "ارتفاع مميز وهدوء ومساحات خضراء." },
    summary: {
      en: "An elevated residential pocket with cooler micro-climate, open views and a relaxed pace of life.",
      ar: "منطقة سكنية مرتفعة بإطلالات مفتوحة وهدوء أوضح ونمط حياة أكثر راحة.",
    },
    description: {
      en: [
        "Gardenia Heights sits at a higher elevation, offering open views, greener surroundings and a noticeably calmer pace than denser districts.",
        "Our buildings here are designed to maximise light and views, with landscaped entrances that complement the area's natural character.",
      ],
      ar: [
        "تقع جاردينيا هايتس على ارتفاع مميز، ما يمنحها إطلالات أوسع وبيئة أكثر خضرة وهدوءاً مقارنة بالمناطق الأعلى كثافة.",
        "صُمّمت مبانينا هنا لتعظيم الإضاءة والإطلالات، مع مداخل مشجّرة تنسجم مع الطابع الهادئ للمنطقة.",
      ],
    },
    district: { en: "Gardenia Heights · New Cairo", ar: "جاردينيا هايتس · القاهرة الجديدة" },
    status: "Available",
    unitTypes: [
      { en: "Residential Apartments", ar: "شقق سكنية" },
      { en: "Duplexes", ar: "دوبلكس" },
    ],
    downPayment: { en: "From 10%", ar: "من 10%" },
    installment: { en: "Up to 7 years", ar: "حتى 7 سنوات" },
    delivery: { en: "Semi-finished", ar: "نصف تشطيب" },
    highlights: {
      en: ["Elevated, open views", "Greener, quieter setting", "Landscaped entrances", "Light-maximising layouts"],
      ar: ["إطلالات مفتوحة من ارتفاع مميز", "بيئة أكثر خضرة وهدوءاً", "مداخل مشجّرة", "تصميمات تستفيد من الإضاءة الطبيعية"],
    },
    accent: "#B8924A",
  },
  {
    slug: "south-investors",
    name: { en: "South Investors", ar: "المستثمرين الجنوبيين" },
    shortName: { en: "South Investors", ar: "المستثمرين الجنوبيين" },
    tagline: { en: "Smart commercial yield.", ar: "فرص تجارية بعائد مدروس." },
    summary: {
      en: "A commercial and administrative corridor engineered for investors seeking yield and flexibility.",
      ar: "منطقة تجارية وإدارية مناسبة للمستثمرين الباحثين عن عائد واضح ومرونة في الاستخدام.",
    },
    description: {
      en: [
        "South Investors is positioned for commercial and administrative use, attracting businesses that need a credible New Cairo address with strong footfall potential.",
        "Zidan's units here are planned for flexibility and efficient use of space, with clear cost structures that make cashflow projections straightforward.",
      ],
      ar: [
        "تتميز منطقة المستثمرين الجنوبيين بطابع تجاري وإداري يجذب الشركات التي تحتاج إلى عنوان موثوق في القاهرة الجديدة مع فرص حركة ونشاط جيدة.",
        "تُخطط وحدات زيدان هنا بمرونة عالية واستخدام فعّال للمساحات، مع هياكل تكلفة واضحة تساعد على قراءة العائد والتدفقات النقدية بسهولة.",
      ],
    },
    district: { en: "South Investors · New Cairo", ar: "المستثمرين الجنوبيين · القاهرة الجديدة" },
    status: "Available",
    unitTypes: [
      { en: "Commercial Units", ar: "وحدات تجارية" },
      { en: "Administrative Units", ar: "وحدات إدارية" },
    ],
    downPayment: { en: "From 15%", ar: "من 15%" },
    installment: { en: "Up to 6 years", ar: "حتى 6 سنوات" },
    delivery: { en: "Core & shell / Semi-finished", ar: "هيكل خرساني / نصف تشطيب" },
    highlights: {
      en: ["Commercial & administrative zoning", "Flexible, efficient unit plans", "Strong business demand", "Clear cost structures"],
      ar: ["تقسيم تجاري وإداري", "مساحات مرنة وفعّالة", "طلب قوي من الأنشطة التجارية", "هياكل تكلفة واضحة"],
    },
    accent: "#D9BC7A",
  },
  {
    slug: "al-takmely",
    name: { en: "Al Takmely District", ar: "حي التكميلي" },
    shortName: { en: "Al Takmely", ar: "التكميلي" },
    tagline: { en: "The new-era growth zone.", ar: "منطقة واعدة للنمو المستقبلي." },
    summary: {
      en: "An emerging district with early-mover pricing and the infrastructure momentum that drives long-term appreciation.",
      ar: "منطقة صاعدة بأسعار دخول مناسبة وزخم بنية تحتية يدعم نمو القيمة على المدى الطويل.",
    },
    description: {
      en: [
        "Al Takmely (Al Hay El Takmily) is one of New Cairo's fastest-developing zones, where early buyers benefit from entry pricing ahead of full infrastructure maturity.",
        "It is a strategic pick for investors with a medium-to-long-term horizon who understand that value follows infrastructure.",
      ],
      ar: [
        "حي التكميلي من أسرع مناطق القاهرة الجديدة تطوراً، حيث يستفيد المشترون الأوائل من أسعار دخول مبكرة قبل اكتمال نضج البنية التحتية.",
        "يمثل الحي اختياراً استراتيجياً للمستثمرين أصحاب الرؤية المتوسطة والطويلة الأجل، ممن يدركون أن القيمة تنمو مع اكتمال الطرق والخدمات.",
      ],
    },
    district: { en: "Al Takmely · New Cairo", ar: "حي التكميلي · القاهرة الجديدة" },
    status: "Coming Soon",
    unitTypes: [
      { en: "Residential Apartments", ar: "شقق سكنية" },
      { en: "Duplexes", ar: "دوبلكس" },
    ],
    downPayment: { en: "From 10%", ar: "من 10%" },
    installment: { en: "Up to 9 years", ar: "حتى 9 سنوات" },
    delivery: { en: "Semi-finished", ar: "نصف تشطيب" },
    highlights: {
      en: ["Early-mover entry pricing", "Infrastructure-driven growth", "Long-horizon appreciation", "Extended payment plans"],
      ar: ["أسعار دخول مناسبة", "نمو مدعوم بالبنية التحتية", "زيادة متوقعة في القيمة على المدى الطويل", "خطط سداد ممتدة"],
    },
    accent: "#C8A45C",
  },
  {
    slug: "fifth-settlement",
    name: { en: "Fifth Settlement", ar: "التجمّع الخامس" },
    shortName: { en: "5th Settlement", ar: "التجمّع الخامس" },
    tagline: { en: "The heart of New Cairo.", ar: "قلب القاهرة الجديدة." },
    summary: {
      en: "The established centre of New Cairo — unmatched connectivity, services and a proven address that buyers and tenants recognise.",
      ar: "مركز القاهرة الجديدة الراسخ — شبكة طرق وخدمات قوية وعنوان معروف لدى المشترين والمستأجرين.",
    },
    description: {
      en: [
        "The Fifth Settlement is the beating heart of New Cairo, with the densest network of services, retail, schools and main roads in the area.",
        "A Fifth Settlement address carries instant recognition and liquidity, making it a cornerstone of any Zidan portfolio.",
      ],
      ar: [
        "التجمّع الخامس هو قلب القاهرة الجديدة النابض، بأقوى شبكة من الخدمات والمناطق التجارية والمدارس والمحاور الرئيسية.",
        "يحمل عنوان التجمّع الخامس شهرة فورية وسيولة قوية، ما يجعله ركناً أساسياً في أي محفظة مشاريع لزيدان.",
      ],
    },
    district: { en: "Fifth Settlement · New Cairo", ar: "التجمّع الخامس · القاهرة الجديدة" },
    status: "Available",
    unitTypes: [
      { en: "Residential Apartments", ar: "شقق سكنية" },
      { en: "Administrative Units", ar: "وحدات إدارية" },
    ],
    downPayment: { en: "From 10%", ar: "من 10%" },
    installment: { en: "Up to 7 years", ar: "حتى 7 سنوات" },
    delivery: { en: "Semi / Fully finished", ar: "نصف تشطيب / تشطيب كامل" },
    highlights: {
      en: ["Unmatched connectivity", "Dense services & retail", "Instantly recognised address", "High liquidity & demand"],
      ar: ["سهولة وصول قوية", "خدمات ومناطق تجارية كثيفة", "عنوان معروف فوراً", "سيولة وطلب مرتفعان"],
    },
    accent: "#B8924A",
  },
];

function resolve(project: ProjectSource, locale: Locale): ProjectArea {
  return {
    slug: project.slug,
    name: pick(project.name, locale),
    shortName: pick(project.shortName, locale),
    tagline: pick(project.tagline, locale),
    summary: pick(project.summary, locale),
    description: pickList(project.description, locale),
    district: pick(project.district, locale),
    status: project.status,
    unitTypes: project.unitTypes.map((u) => pick(u, locale)),
    downPayment: pick(project.downPayment, locale),
    installment: pick(project.installment, locale),
    delivery: pick(project.delivery, locale),
    highlights: pickList(project.highlights, locale),
    accent: project.accent,
    featured: project.featured,
  };
}

export function getProjects(locale: Locale): ProjectArea[] {
  return source.map((project) => resolve(project, locale));
}

/** Stable slug list — used by generateStaticParams and the sitemap. */
export const projectSlugs: string[] = source.map((project) => project.slug);

export function getProjectBySlug(slug: string, locale: Locale): ProjectArea | undefined {
  const project = source.find((p) => p.slug === slug);
  return project ? resolve(project, locale) : undefined;
}

export function getFeaturedProjects(locale: Locale): ProjectArea[] {
  return source.filter((p) => p.featured).map((p) => resolve(p, locale));
}
