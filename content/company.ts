import type { Locale } from "@/i18n/routing";
import type { LocalizedString, LocalizedStringList } from "@/lib/i18n";
import { pick, pickList } from "@/lib/i18n";
import type { ValueItem } from "@/types";

const source = {
  name: { en: "Zidan Development", ar: "زيدان للتطوير العقاري" } as LocalizedString,
  tagline: { en: "Development that narrates reality", ar: "تطور يحكي الواقع" } as LocalizedString,
  taglineAr: "تطور يحكي الواقع",

  heroHeadline: {
    en: ["Building Value.", "Creating Landmarks."],
    ar: ["نبني القيمة.", "ونصنع المعالم."],
  } as LocalizedStringList,

  heroSubtitle: {
    en: "An Egyptian real estate developer crafting lasting value across New Cairo's most strategic districts — through intelligent planning, precise execution and uncompromising quality.",
    ar: "مطوّر عقاري مصري يصنع قيمةً دائمة في أكثر مناطق القاهرة الجديدة استراتيجية — عبر تخطيط ذكي وتنفيذ دقيق وجودة لا تقبل المساومة.",
  } as LocalizedString,

  whoWeAre: {
    en: [
      "Zidan Development is an Egyptian real estate development company built on a clear vision: to create lasting value through intelligent planning, precise execution, and uncompromising quality.",
      "With a focused presence in New Cairo's most strategic districts — including Al Narges, Bait Al Watan, Al Andalus, Lotus, Gardenia Heights and Al Hay El Takmily — we carefully select locations that combine investment strength with real lifestyle potential.",
      "We are not just developers — we are owners and direct executors of our projects. This integrated model lets us maintain full control over quality, timelines and delivery standards, so every project reflects our commitment to excellence.",
      "Every project we deliver is the result of thoughtful architectural planning, functional layouts, premium finishing standards and strict construction supervision. We believe true development goes beyond buildings — it is about shaping environments where families grow, investments appreciate, and communities thrive.",
    ],
    ar: [
      "زيدان للتطوير شركة مصرية للتطوير العقاري قائمة على رؤية واضحة: خلق قيمة دائمة من خلال التخطيط الذكي والتنفيذ الدقيق والجودة التي لا تقبل المساومة.",
      "بحضور مركّز في أكثر مناطق القاهرة الجديدة استراتيجية — بما فيها النرجس وبيت الوطن والأندلس واللوتس وجاردينيا هايتس والحي التكميلي — نختار بعناية مواقع تجمع بين القوة الاستثمارية والإمكانات الحقيقية للحياة.",
      "نحن لسنا مجرد مطوّرين — نحن ملاك ومنفّذون مباشرون لمشاريعنا. هذا النموذج المتكامل يتيح لنا السيطرة الكاملة على الجودة والمواعيد ومعايير التسليم، ليعكس كل مشروع التزامنا بالتميّز.",
      "كل مشروع نسلّمه هو نتاج تخطيط معماري مدروس وتصاميم وظيفية ومعايير تشطيب راقية وإشراف إنشائي صارم. نؤمن أن التطوير الحقيقي يتجاوز المباني — إنه صناعة بيوات تنمو فيها الأسر وتتضاعف فيها الاستثمارات وتزدهر فيها المجتمعات.",
    ],
  } as LocalizedStringList,

  mission: {
    title: { en: "Our Mission", ar: "مهمتنا" } as LocalizedString,
    body: {
      en: "To develop high-quality real estate projects in New Cairo that combine intelligent planning, disciplined execution and sustainable investment value — while maintaining transparency and long-term client relationships.",
      ar: "تطوير مشاريع عقارية عالية الجودة في القاهرة الجديدة تجمع بين التخطيط الذكي والتنفيذ المنضبط والقيمة الاستثمارية المستدامة — مع الحفاظ على الشفافية وعلاقات طويلة الأمد مع عملائنا.",
    } as LocalizedString,
  },

  vision: {
    title: { en: "Our Vision", ar: "رؤيتنا" } as LocalizedString,
    body: {
      en: "To become one of the most trusted and recognized real estate developers in Egypt by setting consistent standards of quality, integrity and controlled growth in every project we deliver.",
      ar: "أن نصبح أحد أكثر المطوّرين العقاريين موثوقيةً واعترافاً في مصر، عبر وضع معايير ثابتة للجودة والنزاهة والنمو المنضبط في كل مشروع نسلّمه.",
    } as LocalizedString,
  },

  // Keyword groups shown as floating tags on the home "Excellence" section.
  pillars: {
    en: [
      ["Quality", "Integrity", "Sustainability", "Transparency"],
      ["Reliability", "Commitment", "Innovation", "Trust"],
      ["Excellence", "Precision", "Quality", "Trust"],
    ],
    ar: [
      ["الجودة", "النزاهة", "الاستدامة", "الشفافية"],
      ["الموثوقية", "الالتزام", "الابتكار", "الثقة"],
      ["التميّز", "الدقة", "الجودة", "الثقة"],
    ],
  } as { en: string[][]; ar: string[][] },

  socialProof: {
    headline: { en: "Trusted across New Cairo", ar: "موثوقون في كل القاهرة الجديدة" } as LocalizedString,
    subtext: {
      en: "Zidan units are not subject to the Social Housing Initiative — they are built for buyers who value direct execution, clear terms and lasting quality.",
      ar: "وحدات زيدان لا تخضع لمبادرة الإسكان الاجتماعي — فهي مبنية للمشترين الذين يقدّرون التنفيذ المباشر والشروط الواضحة والجودة الدائمة.",
    } as LocalizedString,
  },
} as const;

export function getCompany(locale: Locale) {
  return {
    name: pick(source.name, locale),
    taglineAr: source.taglineAr,
    tagline: pick(source.tagline, locale),
    heroHeadline: pickList(source.heroHeadline, locale),
    heroSubtitle: pick(source.heroSubtitle, locale),
    whoWeAre: pickList(source.whoWeAre, locale),
    mission: { title: pick(source.mission.title, locale), body: pick(source.mission.body, locale) },
    vision: { title: pick(source.vision.title, locale), body: pick(source.vision.body, locale) },
    pillars: source.pillars[locale] ?? source.pillars.en,
    socialProof: { headline: pick(source.socialProof.headline, locale), subtext: pick(source.socialProof.subtext, locale) },
  };
}

const valuesSource = [
  {
    id: "professionalism",
    index: "01",
    title: { en: "Professionalism", ar: "الاحترافية" } as LocalizedString,
    description: {
      en: "We operate with disciplined standards in planning, execution and client service — ensuring accountability and consistent outcomes across every project.",
      ar: "نعمل وفق معايير منضبطة في التخطيط والتنفيذ وخدمة العملاء — لضمان المساءلة ونتائج متّسقة في كل مشروع.",
    } as LocalizedString,
  },
  {
    id: "innovation",
    index: "02",
    title: { en: "Innovation", ar: "الابتكار" } as LocalizedString,
    description: {
      en: "We evolve with the market by adopting modern design thinking, efficient layouts and development strategies that meet real client needs.",
      ar: "نتطوّر مع السوق عبر تبنّي تفكير تصميمي حديث وتصاميم فعّالة واستراتيجيات تطوير تلبّي احتياجات العملاء الحقيقية.",
    } as LocalizedString,
  },
  {
    id: "quality",
    index: "03",
    title: { en: "Quality", ar: "الجودة" } as LocalizedString,
    description: {
      en: "Quality is our benchmark — from structural integrity to finishing standards. Every detail is carefully supervised to deliver durable, high-value properties.",
      ar: "الجودة هي معيارنا — من سلامة الهيكل إلى معايير التشطيب. كل تفصيل يخضع لإشراف دقيق لنسلّم عقارات متينة عالية القيمة.",
    } as LocalizedString,
  },
] as const;

export function getValues(locale: Locale): ValueItem[] {
  return valuesSource.map((value) => ({
    id: value.id,
    index: value.index,
    title: pick(value.title, locale),
    description: pick(value.description, locale),
  }));
}

const chairmanSource = {
  name: "Eng. Refaat Zidan",
  nameAr: "م. رفعت زيدان",
  role: { en: "CEO & Founder", ar: "الرئيس التنفيذي والمؤسس" } as LocalizedString,
  signature: { en: "Refaat Zidan", ar: "رفعت زيدان" } as LocalizedString,
  message: {
    en: [
      "At Zidan Development, we focus on building with purpose. Our work is centered in New Cairo and the Fifth Settlement, where we deliver carefully planned residential and administrative projects that respond to modern market needs.",
      "We believe that quality is not an option — it is a standard. Through direct supervision and disciplined execution, we ensure consistent delivery, clear communication and transparency across every stage.",
      "Looking ahead, our ambition is to expand strategically while establishing Zidan Development as a trusted brand in Egypt's real estate sector — recognized for quality, integrity and transparency.",
    ],
    ar: [
      "في زيدان للتطوير، نركّز على البناء بهدف واضح. يتمحور عملنا في القاهرة الجديدة والتجمّع الخامس، حيث نسلّم مشاريع سكنية وإدارية مدروسة تستجيب لاحتياجات السوق العصري.",
      "نؤمن أن الجودة ليست خياراً — بل معيار. من خلال الإشراف المباشر والتنفيذ المنضبط، نضمن تسليماً متّسقاً وتواصلاً واضحاً وشفافية في كل مرحلة.",
      "ونظرًا إلى المستقبل، طموحنا هو التوسّع الاستراتيجي مع ترسيخ زيدان للتطوير كعلامة موثوقة في القطاع العقاري المصري — تُعرف بالجودة والنزاهة والشفافية.",
    ],
  } as LocalizedStringList,
} as const;

export function getChairman(locale: Locale) {
  return {
    name: locale === "ar" ? chairmanSource.nameAr : chairmanSource.name,
    role: pick(chairmanSource.role, locale),
    signature: pick(chairmanSource.signature, locale),
    message: pickList(chairmanSource.message, locale),
  };
}
