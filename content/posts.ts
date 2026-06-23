import type { Locale } from "@/i18n/routing";
import type { LocalizedString, LocalizedStringList } from "@/lib/i18n";
import { pick, pickList } from "@/lib/i18n";
import type { BlogPost } from "@/types";

interface PostSource {
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedStringList;
  category: LocalizedString;
  author: LocalizedString;
  date: string;
  readingTime: { en: string; ar: string };
  tags: string[];
  featured?: boolean;
}

const source: PostSource[] = [
  {
    slug: "concept-to-cornerstone",
    title: {
      en: "From concept to cornerstone: elevating real estate through refined identity",
      ar: "من الفكرة إلى حجر الأساس: الارتقاء بالعقار عبر هوية راقية",
    },
    excerpt: {
      en: "Why a developer's identity — not just square metres — decides whether a building becomes a landmark or just another address.",
      ar: "لماذا تحدّد هوية المطوّر — لا الأمتار المربعة فقط — ما إذا كان المبنى سيصبح معلماً أم مجرد عنوان آخر.",
    },
    content: {
      en: [
        "A building is concrete, glass and stone. A landmark is something else entirely — it is the moment a structure earns a meaning that outlasts its materials. The difference between the two is rarely the budget. It is the identity behind it.",
        "At Zidan Development, we treat identity as a structural element, not decoration. The signature Zidan Stone façade, the marble entrance, the European elevator — none of these are features we add at the end. They are decisions made at the concept stage, when the building is still a set of intentions.",
        "Refined identity shows up in the details buyers feel before they can name them: the proportions of a hallway, the quality of light at 4pm, the hush of a well-insulated wall. These are the quiet signatures of a developer who plans.",
        "In New Cairo, where supply is abundant, identity is what protects value. Buyers and tenants can tell a thoughtfully conceived building from a speculative one — and the market prices that difference over time.",
        "That is the promise we keep with every cornerstone: that what we build will read, years from now, as obviously considered — never generic.",
      ],
      ar: [
        "المبنى خرسانة وزجاج وحجر. أما المعلم فهو شيء آخر تماماً — لحظة يكتسب فيها المبنى معنى يفوق مواده. والفرق بينهما نادراً ما يكون الميزانية، بل الهوية الكامنة وراءه.",
        "في زيدان للتطوير نتعامل مع الهوية كعنصر إنشائي لا كزخرفة. واجهة «حجر زيدان»، المدخل الرخامي، المصعد الأوروبي — ليست إضافات نضعها في النهاية، بل قرارات تُتخذ في مرحلة الفكرة حين يكون المبنى مجرد نوايا.",
        "تظهر الهوية الراقية في تفاصيل يشعر بها المشتري قبل أن يسمّيها: نسب الممرات، جودة الإضاءة عند الرابعة عصراً، هدوء جدار معزول جيداً. هذه توقيعات هادئة لمطوّر يخطّط.",
        "في القاهرة الجديدة حيث يكثر العرض، الهوية هي ما يحمي القيمة. فالمشترون والمستأجرون يميّزون المبنى المدروس عن المضاربي — والسوق يسعّر هذا الفرق مع الوقت.",
        "هذا الوعد نحافظ عليه مع كل حجر أساس: أن يُقرأ ما نبنيه بعد سنوات على أنه مدروس بوضوح — لا نمطي أبداً.",
      ],
    },
    category: { en: "Brand", ar: "الهوية" },
    author: { en: "Zidan Development", ar: "زيدان للتطوير" },
    date: "2026-01-29",
    readingTime: { en: "5 min read", ar: "5 دقائق قراءة" },
    tags: ["luxury", "brand", "design"],
    featured: true,
  },
  {
    slug: "new-cairo-2026",
    title: {
      en: "New Cairo in 2026: where the next wave of value is being created",
      ar: "القاهرة الجديدة في 2026: أين تُصنع الموجة القادمة للقيمة",
    },
    excerpt: {
      en: "Established districts and emerging zones each tell a different story. Here is how to read the map of New Cairo this year.",
      ar: "تروي المناطق الراسخة والمناطق الصاعدة قصصاً مختلفة. إليك كيف تقرأ خريطة القاهرة الجديدة هذا العام.",
    },
    content: {
      en: [
        "New Cairo is not a single market — it is a mosaic of micro-markets, each at a different stage of maturity. Reading the map correctly is the single biggest lever for a buyer in 2026.",
        "Established districts like Al Narges and the Fifth Settlement offer something scarce: proven demand. The infrastructure is complete, the services are dense, and resale liquidity is strong. You pay for certainty, and for many buyers that trade is worth it.",
        "Then there are the growth zones — Al Takmely and adjacent areas — where infrastructure is still maturing. Entry pricing is lower, payment plans are longer, and the upside follows the roads and services as they arrive. This is where medium and long-horizon investors find asymmetry.",
        "The mistake is treating these two stories as interchangeable. A unit chosen for living should prioritise delivery and daily convenience; a unit chosen for investment should prioritise demand, resale flexibility and payment structure.",
        "Our role is to make the trade-offs explicit before you commit — the exact location, the nearby roads, the realistic timeline — so the address you choose matches the outcome you want.",
      ],
      ar: [
        "القاهرة الجديدة ليست سوقاً واحداً — بل موزاييك من الأسواق المصغّرة، كلٌّ في مرحلة نضج مختلفة. وقراءة الخريطة بشكل صحيح هي أكبر رافعة للمشتري في 2026.",
        "تقدّم المناطق الراسخة كالنرجس والتجمّع الخامس شيئاً نادراً: طلباً مثبتاً. البنية التحتية مكتملة، الخدمات كثيفة، وسيولة إعادة البيع قوية. تدفع ثمن اليقين، ولكثير من المشترين تستحق هذه الصفقة.",
        "ثمة مناطق النمو — حي التكميلي والمناطق المجاورة — حيث لا تزال البنية التحتية تنضج. أسعار الدخول أقل، خطط السداد أطول، والعائد يتبع الطرق والخدمات عند وصولها. هنا يجد المستثمرون متوسطو وطويلو الأمد فرصاً غير متماثلة.",
        "والخطأ معاملة القصتين باعتبارهما قابلتين للتبديل. الوحدة المختارة للسكن يجب أن تعطي الأولوية للتسليم وراحة الحياة اليومية؛ والوحدة للاستثمار تعطي الأولوية للطلب ومرونة إعادة البيع وهيكل السداد.",
        "دورنا أن نجعل المقايضات صريحة قبل التزامك — الموقع الدقيق، الطرق القريبة، الجدول الزمني الواقعي — حتى يطابق العنوان الذي تختاره النتيجة التي تريدها.",
      ],
    },
    category: { en: "Market", ar: "السوق" },
    author: { en: "Zidan Development", ar: "زيدان للتطوير" },
    date: "2026-02-12",
    readingTime: { en: "6 min read", ar: "6 دقائق قراءة" },
    tags: ["market", "investment", "New Cairo"],
  },
  {
    slug: "living-vs-investment",
    title: {
      en: "Buying for living vs. investment: a decision framework",
      ar: "الشراء للسكن مقابل الاستثمار: إطار لاتخاذ القرار",
    },
    excerpt: {
      en: "The right unit depends on the question you are answering. A short framework to keep the two decisions apart.",
      ar: "الوحدة الصحيحة تعتمد على السؤال الذي تجيب عنه. إطار موجز لفصل القرارين.",
    },
    content: {
      en: [
        "The most common mistake in New Cairo real estate is mixing two very different questions: 'Where do I want to live?' and 'What will grow in value?' They can have the same answer — but often they do not.",
        "If you are buying to live, optimise for delivery certainty, finishing quality and daily convenience: schools, clinics, the commute, the feel of the street at night. These shape your life every single day.",
        "If you are buying to invest, optimise for demand depth, resale flexibility and payment-plan structure. The questions are colder: who will rent or buy this from me, and on what timeline?",
        "A clear framework keeps the emotions of one decision from contaminating the other. Decide the goal first, then let the goal filter the districts, the unit types and the payment terms.",
        "When you can state your objective in one sentence, the right shortlist tends to write itself.",
      ],
      ar: [
        "أكثر الأخطاء شيوعاً في عقارات القاهرة الجديدة هو خلط سؤالين مختلفين: «أين أريد أن أسكن؟» و«ما الذي ستنمو قيمته؟». قد يكون الجواب واحداً — لكنه غالباً ليس كذلك.",
        "إذا كنت تشتري للسكن، حسّن لليقين في التسليم وجودة التشطيب وراحة الحياة اليومية: المدارس والعيادات والتنقل ومزاج الشارع ليلاً. هذه تشكّل حياتك كل يوم.",
        "وإذا كنت تشتري للاستثمار، حسّن لعمق الطلب ومرونة إعادة البيع وهيكل خطة السداد. الأسئلة هنا أبرد: من سيؤجر أو يشتري هذه مني، وفي أي مدة؟",
        "إطار واضح يمنع عواطف أحد القرارين من التسرّب إلى الآخر. حدّد الهدف أولاً، ثم دع الهدف يصفّي المناطق وأنواع الوحدات وشروط السداد.",
        "حين تستطيع صياغة هدفك في جملة واحدة، تميل القائمة الصحيحة إلى كتابة نفسها.",
      ],
    },
    category: { en: "Guides", ar: "أدلة" },
    author: { en: "Zidan Development", ar: "زيدان للتطوير" },
    date: "2026-03-04",
    readingTime: { en: "4 min read", ar: "4 دقائق قراءة" },
    tags: ["guides", "investment"],
  },
  {
    slug: "verify-before-booking",
    title: {
      en: "What to verify before booking a unit in the Fifth Settlement",
      ar: "ما الذي يجب التحقق منه قبل حجز وحدة في التجمّع الخامس",
    },
    excerpt: {
      en: "A practical checklist of the documents, dates and details that protect you before you sign anything.",
      ar: "قائمة عملية بالمستندات والتواريخ والتفاصيل التي تحميك قبل التوقيع.",
    },
    content: {
      en: [
        "Booking a unit is exciting — and that is exactly why it deserves a clear-headed checklist. Emotion and fine print are a bad combination. Before you sign, make these explicit.",
        "Confirm the delivery date is written into the contract, along with handover conditions and the inspection process. A verbal 'next year' is not a commitment; a dated clause is.",
        "Read the finishing specifications — semi-finished versus fully finished — down to floors, paint, doors, aluminum and plumbing. Expect them in writing, not in a brochure.",
        "Map the payment schedule against your real cashflow: amount, frequency and total. Compare total cashflow, not just the headline price.",
        "Finally, ask about registration, maintenance fees and resale rules up front. The answers that arrive easily tend to be the ones you can rely on later.",
      ],
      ar: [
        "حجز وحدة أمر مثير — ولهذا تماماً يستحق قائمة واضحة. فالعاطفة والبنود الدقيقة مزيج سيّئ. قبل أن توقّع، اجعل الآتي صريحاً.",
        "تأكّد أن تاريخ التسليم مكتوب في العقد، مع شروط الاستلام وإجراءات المعاينة. «العام القادم» شفهياً ليس التزاماً؛ البند المؤرّخ هو الالتزام.",
        "اقرأ مواصفات التشطيب — نصف تشطيب مقابل تشطيب كامل — وصولاً إلى الأرضيات والدهانات والأبواب والألمنيوم والسباكة. توقّعها كتابةً لا في بروشور.",
        "طبّق جدول السداد على تدفّقك النقدي الحقيقي: المبلغ والتكرار والإجمالي. قارن إجمالي التدفّق النقدي لا السعر الإعلاني فقط.",
        "أخيراً، اسأل مبكراً عن التسجيل ورسوم الصيانة وقواعد إعادة البيع. الإجابات التي تأتي بسهولة تميل إلى أن تكون موثوقة لاحقاً.",
      ],
    },
    category: { en: "Guides", ar: "أدلة" },
    author: { en: "Zidan Development", ar: "زيدان للتطوير" },
    date: "2026-03-18",
    readingTime: { en: "5 min read", ar: "5 دقائق قراءة" },
    tags: ["guides", "contracts"],
  },
];

function resolve(post: PostSource, locale: Locale): BlogPost {
  return {
    slug: post.slug,
    title: pick(post.title, locale),
    excerpt: pick(post.excerpt, locale),
    content: pickList(post.content, locale),
    category: pick(post.category, locale),
    author: pick(post.author, locale),
    date: post.date,
    readingTime: post.readingTime[locale],
    tags: post.tags,
    featured: post.featured,
  };
}

export function getPosts(locale: Locale): BlogPost[] {
  return source.map((post) => resolve(post, locale));
}

/** Stable slug list — used by generateStaticParams and the sitemap. */
export const postSlugs: string[] = source.map((post) => post.slug);

export function getPostBySlug(slug: string, locale: Locale): BlogPost | undefined {
  const post = source.find((p) => p.slug === slug);
  return post ? resolve(post, locale) : undefined;
}

export function getFeaturedPost(locale: Locale): BlogPost | undefined {
  const post = source.find((p) => p.featured) ?? source[0];
  return post ? resolve(post, locale) : undefined;
}
