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
    tagline: { en: "Established, in demand, and always appreciating.", ar: "راسخة وعالية الطلب وقيمتها في تزايد دائم." },
    summary: {
      en: "One of New Cairo's most established and sought-after districts — a mature community with strong resale demand and consistent rental yield.",
      ar: "من أكثر مناطق القاهرة الجديدة رسوخاً وطلباً — مجتمع ناضج بطلب قوي على إعادة البيع وعائد إيجاري ثابت.",
    },
    description: {
      en: [
        "New Narges sits at the heart of the Fifth Settlement, surrounded by completed infrastructure, schools, retail and greenery. Because it is already established, buyers step into immediate lifestyle value and proven demand.",
        "Our Narges buildings combine functional floor plans with the signature Zidan Stone façade, marble entrances and European elevators — built for owners who want a finished, move-in-ready address in a district that rarely loses value.",
      ],
      ar: [
        "يقع النرجس الجديد في قلب التجمّع الخامس، محاطاً ببنية تحتية مكتملة ومدارس ومنافذ بيع ومساحات خضراء. ولأنه منطقة راسخة، يجد المشتري قيمة حياتية فورية وطلباً مثبتاً.",
        "مبانينا في النرجس تجمع بين تصاميم وظيفية وواجهة «حجر زيدان» المميزة ومداخل رخامية ومصاعد أوروبية — مبنية لمن يريد عنواناً جاهزاً للسكن الفوري في منطقة نادراً ما تفقد قيمتها.",
      ],
    },
    district: { en: "Fifth Settlement · New Cairo", ar: "التجمّع الخامس · القاهرة الجديدة" },
    status: "Available",
    unitTypes: [
      { en: "Residential Apartments", ar: "شقق سكنية" },
      { en: "Duplexes", ar: "دوبلكسات" },
    ],
    downPayment: { en: "From 10%", ar: "من 10%" },
    installment: { en: "Up to 7 years", ar: "حتى 7 سنوات" },
    delivery: { en: "Semi / Fully finished", ar: "نصف / تشطيب كامل" },
    highlights: {
      en: [
        "Established, fully-serviced community",
        "Strong resale and rental demand",
        "Minutes from 90th Street & major roads",
        "Signature Zidan Stone façade",
      ],
      ar: [
        "مجتمع راسخ بكامل خدماته",
        "طلب قوي على البيع والإيجار",
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
    tagline: { en: "The investment stronghold of New Cairo.", ar: "معقل الاستثمار في القاهرة الجديدة." },
    summary: {
      en: "Purpose-built for investors — administrative and residential units engineered for yield, liquidity and fast exit.",
      ar: "مصمّم للمستثمرين — وحدات إدارية وسكنية هندّست لعائدٍ مرتفع وسيولة وخروج سريع.",
    },
    description: {
      en: [
        "Bait Al Watan was designed from day one as an investment district, with administrative and residential zoning that drives consistent demand from professionals and businesses.",
        "Zidan's projects here are planned around efficient, leasable layouts with controlled common-area costs, giving investors a clear path to rental income and capital appreciation.",
      ],
      ar: [
        "صُمّم بيت الوطن منذ اليوم الأول كمنطقة استثمارية، بتقسيم إداري وسكني يدفع طلباً ثابتاً من المهنيين والشركات.",
        "مشاريع زيدان هنا مخططة حول تصاميم قابلة للتأجير بكفاءة وبتكاليف خدمات مضبوطة، مانحةً المستثمر مساراً واضحاً نحو دخل إيجاري وزيادة رأس مالية.",
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
        "تقسيم يعطي الأولوية للمستثمر",
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
    tagline: { en: "Premium living, beautifully connected.", ar: "حياة راقية واتصال مثالي." },
    summary: {
      en: "A premium residential district known for its quality of life, wide roads and proximity to top schools and clubs.",
      ar: "منطقة سكنية راقية تُعرف بجودة حياتها وشوارعها الواسعة وقربها من أفضل المدارس والأندية.",
    },
    description: {
      en: [
        "Al Lotus is one of New Cairo's most desirable residential addresses — known for its quieter streets, larger units and excellent access to international schools, sporting clubs and retail.",
        "Our Lotus buildings emphasize privacy, generous natural light and refined finishing, making them ideal for families seeking a long-term home in a premium community.",
      ],
      ar: [
        "اللوتس أحد أكثر العناوين السكنية المرغوبة في القاهرة الجديدة — تشتهر بشوارعها الهادئة ووحداتها الواسعة ووصولها الممتاز إلى المدارس الدولية والأندية ومنافذ البيع.",
        "مبانينا في اللوتس تُولي اهتماماً للخصوصية والإضاءة الطبيعية الوفيرة والتشطيب الراقي، ما يجعلها مثالية للعائلات الباحثة عن بيت دائم في مجتمع راقٍ.",
      ],
    },
    district: { en: "Lotus District · New Cairo", ar: "حي اللوتس · القاهرة الجديدة" },
    status: "Available",
    unitTypes: [
      { en: "Residential Apartments", ar: "شقق سكنية" },
      { en: "Duplexes", ar: "دوبلكسات" },
    ],
    downPayment: { en: "From 10%", ar: "من 10%" },
    installment: { en: "Up to 7 years", ar: "حتى 7 سنوات" },
    delivery: { en: "Fully finished", ar: "تشطيب كامل" },
    highlights: {
      en: ["Premium, family-friendly district", "Close to schools & clubs", "Generous, light-filled layouts", "High-end finishing standards"],
      ar: ["منطقة راقية وملائمة للعائلات", "قريبة من المدارس والأندية", "تصاميم واسعة مليئة بالإضاءة", "معايير تشطيب راقية"],
    },
    accent: "#D9BC7A",
    featured: true,
  },
  {
    slug: "al-andalus",
    name: { en: "Al Andalus", ar: "الأندلس" },
    shortName: { en: "Andalus", ar: "الأندلس" },
    tagline: { en: "Balanced family living in a green setting.", ar: "حياة عائلية متوازنة في بيئة خضراء." },
    summary: {
      en: "A well-balanced residential district that blends calm, green surroundings with strong access to New Cairo's main arteries.",
      ar: "منطقة سكنية متوازنة تجمع بين الهدوء والبيئة الخضراء ووصول قوي إلى محاور القاهرة الجديدة الرئيسية.",
    },
    description: {
      en: [
        "Al Andalus offers a balanced lifestyle — quieter than the commercial core yet minutes from everything that matters. It is a favourite for families looking for value without compromising location.",
        "Zidan's Andalus projects deliver durable construction and practical layouts at an attractive entry point, with the same direct-execution quality standard applied everywhere.",
      ],
      ar: [
        "يقدّم الأندلس نمط حياة متوازناً — أهدأ من المركز التجاري وعلى بعد دقائق من كل ما يهم. وهو مفضّل للعائلات الباحثة عن قيمة دون التنازل عن الموقع.",
        "مشاريع زيدان في الأندلس تقدّم إنشاءً متيناً وتصاميم عملية بسعر دخول جذّاب، بنفس معيار الجودة في التنفيذ المباشر المطبّق في كل مكان.",
      ],
    },
    district: { en: "Andalus · New Cairo", ar: "الأندلس · القاهرة الجديدة" },
    status: "Available",
    unitTypes: [{ en: "Residential Apartments", ar: "شقق سكنية" }],
    downPayment: { en: "From 10%", ar: "من 10%" },
    installment: { en: "Up to 7 years", ar: "حتى 7 سنوات" },
    delivery: { en: "Semi / Fully finished", ar: "نصف / تشطيب كامل" },
    highlights: {
      en: ["Green, family-oriented setting", "Strong value-to-location ratio", "Practical, efficient layouts", "Direct, supervised execution"],
      ar: ["بيئة خضراء تركز على العائلة", "نسبة قيمة إلى موقع قوية", "تصاميم عملية فعّالة", "تنفيذ مباشر بإشراف"],
    },
    accent: "#C8A45C",
  },
  {
    slug: "gardenia-heights",
    name: { en: "Gardenia Heights", ar: "جاردينيا هايتس" },
    shortName: { en: "Gardenia", ar: "جاردينيا" },
    tagline: { en: "Elevated, green and calm.", ar: "مرتفعة وخضراء وهادئة." },
    summary: {
      en: "An elevated residential pocket with cooler micro-climate, open views and a relaxed pace of life.",
      ar: "جيب سكني مرتفع بمناخ أبرد وإطلالات مفتوحة وإيقاع حياة هادئ.",
    },
    description: {
      en: [
        "Gardenia Heights sits at a higher elevation, offering open views, greener surroundings and a noticeably calmer pace than denser districts.",
        "Our buildings here are designed to maximise light and views, with landscaped entrances that complement the area's natural character.",
      ],
      ar: [
        "تقع جاردينيا هايتس في ارتفاع أعلى، فتقدّم إطلالات مفتوحة وبيئة أكثر خضرة وإيقاعاً أهدأ بكثير من المناطق الأكثر كثافة.",
        "مبانينا هنا مصمّمة لتعظيم الإضاءة والإطلالات، مع مداخل مشجّرة تكمّل الطابع الطبيعي للمنطقة.",
      ],
    },
    district: { en: "Gardenia Heights · New Cairo", ar: "جاردينيا هايتس · القاهرة الجديدة" },
    status: "Available",
    unitTypes: [
      { en: "Residential Apartments", ar: "شقق سكنية" },
      { en: "Duplexes", ar: "دوبلكسات" },
    ],
    downPayment: { en: "From 10%", ar: "من 10%" },
    installment: { en: "Up to 7 years", ar: "حتى 7 سنوات" },
    delivery: { en: "Semi-finished", ar: "نصف تشطيب" },
    highlights: {
      en: ["Elevated, open views", "Greener, quieter setting", "Landscaped entrances", "Light-maximising layouts"],
      ar: ["إطلالات مفتوحة مرتفعة", "بيئة أكثر خضرة وهدوءاً", "مداخل مشجّرة", "تصاميم تعظّم الإضاءة"],
    },
    accent: "#B8924A",
  },
  {
    slug: "south-investors",
    name: { en: "South Investors", ar: "المستثمرين الجنوبيين" },
    shortName: { en: "South Investors", ar: "المستثمرين الجنوبيين" },
    tagline: { en: "Smart commercial yield.", ar: "عائد تجاري ذكي." },
    summary: {
      en: "A commercial and administrative corridor engineered for investors seeking yield and flexibility.",
      ar: "ممر تجاري وإداري هُندّس للمستثمرين الباحثين عن العائد والمرونة.",
    },
    description: {
      en: [
        "South Investors is positioned for commercial and administrative use, attracting businesses that need a credible New Cairo address with strong footfall potential.",
        "Zidan's units here are planned for flexibility and efficient use of space, with clear cost structures that make cashflow projections straightforward.",
      ],
      ar: [
        "يتموضع المستثمرين الجنوبيين للاستخدام التجاري والإداري، ويجذب الشركات التي تحتاج عنواناً موثوقاً في القاهرة الجديدة بإمكانات حركة قوية.",
        "وحدات زيدان هنا مخططة للمرونة والاستخدام الفعّال للمساحة، بهياكل تكلفة واضحة تجعل تقديرات التدفّق النقدي مباشرة.",
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
    delivery: { en: "Core & shell / Semi-finished", ar: "هيكل / نصف تشطيب" },
    highlights: {
      en: ["Commercial & administrative zoning", "Flexible, efficient unit plans", "Strong business demand", "Clear cost structures"],
      ar: ["تقسيم تجاري وإداري", "تصاميم وحدات مرنة فعّالة", "طلب أعمال قوي", "هياكل تكلفة واضحة"],
    },
    accent: "#D9BC7A",
  },
  {
    slug: "al-takmely",
    name: { en: "Al Takmely District", ar: "حي التكميلي" },
    shortName: { en: "Al Takmely", ar: "التكميلي" },
    tagline: { en: "The new-era growth zone.", ar: "منطقة نمط العصر الجديد." },
    summary: {
      en: "An emerging district with early-mover pricing and the infrastructure momentum that drives long-term appreciation.",
      ar: "منطقة صاعدة بأسعار دخول مبكرة وزخم بنية تحتية يدفع الزيادة طويلة الأمد.",
    },
    description: {
      en: [
        "Al Takmely (Al Hay El Takmily) is one of New Cairo's fastest-developing zones, where early buyers benefit from entry pricing ahead of full infrastructure maturity.",
        "It is a strategic pick for investors with a medium-to-long-term horizon who understand that value follows infrastructure.",
      ],
      ar: [
        "حي التكميلي أحد أسرع مناطق القاهرة الجديدة تطوّراً، حيث يستفيد المشترون الأوائل من أسعار دخول قبل اكتمال البنية التحتية.",
        "وهو اختيار استراتيجي للمستثمرين بأفق متوسط إلى طويل يدركون أن القيمة تتبع البنية التحتية.",
      ],
    },
    district: { en: "Al Takmely · New Cairo", ar: "حي التكميلي · القاهرة الجديدة" },
    status: "Coming Soon",
    unitTypes: [
      { en: "Residential Apartments", ar: "شقق سكنية" },
      { en: "Duplexes", ar: "دوبلكسات" },
    ],
    downPayment: { en: "From 10%", ar: "من 10%" },
    installment: { en: "Up to 9 years", ar: "حتى 9 سنوات" },
    delivery: { en: "Semi-finished", ar: "نصف تشطيب" },
    highlights: {
      en: ["Early-mover entry pricing", "Infrastructure-driven growth", "Long-horizon appreciation", "Extended payment plans"],
      ar: ["أسعار دخول مبكرة", "نمو مدفوع بالبنية التحتية", "زيادة طويلة الأمد", "خطط سداد ممتدة"],
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
      ar: "مركز القاهرة الجديدة الراسخ — اتصال لا يُضاهى وخدمات وعنوان مثبت يعرفه المشترون والمستأجرون.",
    },
    description: {
      en: [
        "The Fifth Settlement is the beating heart of New Cairo, with the densest network of services, retail, schools and main roads in the area.",
        "A Fifth Settlement address carries instant recognition and liquidity, making it a cornerstone of any Zidan portfolio.",
      ],
      ar: [
        "التجمّع الخامس هو قلب القاهرة الجديدة النابض، بأكثف شبكة خدمات وتجزئة ومدارس ومحاور في المنطقة.",
        "يحمل عنوان التجمّع الخامس اعترافاً وسيولة فورية، ما يجعله حجر الزاوية في أي محفظة لزيدان.",
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
    delivery: { en: "Semi / Fully finished", ar: "نصف / تشطيب كامل" },
    highlights: {
      en: ["Unmatched connectivity", "Dense services & retail", "Instantly recognised address", "High liquidity & demand"],
      ar: ["اتصال لا يُضاهى", "خدمات وتجزئة كثيفة", "عنوان معروف فوراً", "سيولة وطلب مرتفعان"],
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
