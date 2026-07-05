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
      ar: "من الفكرة إلى حجر الأساس: كيف ترتقي الهوية بقيمة العقار",
    },
    excerpt: {
      en: "Why a developer's identity — not just square metres — decides whether a building becomes a landmark or just another address.",
      ar: "لماذا تحدد هوية المطوّر — وليس عدد الأمتار فقط — ما إذا كان المبنى سيصبح علامة مميزة أم مجرد عنوان آخر.",
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
        "المبنى خرسانة وزجاج وحجر. أما العلامة المميزة فهي شيء أعمق — لحظة يكتسب فيها المبنى معنى يتجاوز مواده. والفرق بينهما نادراً ما يكون الميزانية وحدها، بل الهوية التي تقف وراء التصميم والتنفيذ.",
        "في زيدان للتطوير نتعامل مع الهوية كجزء من بنية المشروع، لا كزخرفة تُضاف في النهاية. واجهة «حجر زيدان»، والمدخل الرخامي، والمصعد الأوروبي — كلها قرارات تبدأ منذ مرحلة الفكرة، قبل أن يتحول التصميم إلى واقع.",
        "تظهر الهوية الراقية في تفاصيل يشعر بها المشتري قبل أن يصفها: اتساع الممرات، جودة الإضاءة في آخر النهار، وهدوء الجدران المعزولة جيداً. هذه هي العلامات الهادئة لمطوّر يعرف ماذا يبني.",
        "في القاهرة الجديدة، حيث تتعدد الاختيارات، تصبح الهوية عاملاً مهماً في حماية القيمة. فالمشتري والمستأجر يميزان المبنى المدروس عن المبنى العادي — والسوق يقدّر هذا الفرق مع الوقت.",
        "هذا هو الوعد الذي نحافظ عليه مع كل حجر أساس: أن يبقى ما نبنيه بعد سنوات واضح الجودة ومدروس التفاصيل — لا مجرد مبنى تقليدي.",
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
      ar: "القاهرة الجديدة في 2026: أين تتشكل موجة القيمة القادمة؟",
    },
    excerpt: {
      en: "Established districts and emerging zones each tell a different story. Here is how to read the map of New Cairo this year.",
      ar: "لكل منطقة في القاهرة الجديدة قصة مختلفة بين المناطق الراسخة والمناطق الصاعدة. إليك كيف تقرأ الخريطة هذا العام.",
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
        "القاهرة الجديدة ليست سوقاً واحداً — بل مجموعة من الأسواق الصغيرة، كل منطقة فيها تمر بمرحلة نضج مختلفة. وقراءة الخريطة بشكل صحيح هي أهم أداة للمشتري في 2026.",
        "تقدّم المناطق الراسخة مثل النرجس والتجمّع الخامس ميزة نادرة: طلباً مثبتاً. البنية التحتية مكتملة، والخدمات متوفرة، وسيولة إعادة البيع قوية. هنا تدفع مقابل قدر أكبر من اليقين، وهو خيار يستحقه كثير من المشترين.",
        "في المقابل، توجد مناطق النمو مثل حي التكميلي والمناطق المجاورة، حيث ما زالت البنية التحتية في مرحلة التطور. أسعار الدخول أقل، وخطط السداد أطول، والقيمة ترتفع تدريجياً مع اكتمال الطرق والخدمات. هنا يجد المستثمر متوسط وطويل الأجل فرصاً مختلفة.",
        "الخطأ هو التعامل مع القصتين كأنهما واحدة. الوحدة المناسبة للسكن يجب أن تعطي الأولوية للتسليم وراحة الحياة اليومية؛ أما وحدة الاستثمار فتعطي الأولوية للطلب ومرونة إعادة البيع وهيكل السداد.",
        "دورنا أن نوضح هذه الاختيارات قبل أن تلتزم — الموقع الدقيق، والطرق القريبة، والجدول الزمني الواقعي — حتى يطابق العنوان الذي تختاره الهدف الذي تريده.",
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
      ar: "اختيار الوحدة المناسبة يبدأ من السؤال الصحيح. إطار مختصر للفصل بين القرارين.",
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
        "أكثر الأخطاء شيوعاً في عقارات القاهرة الجديدة هو خلط سؤالين مختلفين: «أين أريد أن أسكن؟» و«ما الذي يمكن أن ترتفع قيمته؟». قد تكون الإجابة واحدة أحياناً، لكنها ليست كذلك دائماً.",
        "إذا كنت تشتري للسكن، فالأولوية تكون لثبات موعد التسليم، وجودة التشطيب، وراحة الحياة اليومية: المدارس، والعيادات، وزمن التنقل، وطبيعة الشارع ليلاً. هذه التفاصيل تشكل يومك بالكامل.",
        "أما إذا كنت تشتري للاستثمار، فالأولوية تكون لقوة الطلب ومرونة إعادة البيع وهيكل خطة السداد. الأسئلة هنا أكثر عملية: من سيؤجر أو يشتري هذه الوحدة مني؟ ومتى؟",
        "وجود إطار واضح يمنع عاطفة قرار السكن من التأثير على قرار الاستثمار. حدّد الهدف أولاً، ثم اترك هذا الهدف يصفّي المناطق وأنواع الوحدات وشروط السداد.",
        "عندما تستطيع تلخيص هدفك في جملة واحدة، تصبح القائمة المناسبة أكثر وضوحاً.",
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
      ar: "ما الذي يجب مراجعته قبل حجز وحدة في التجمّع الخامس",
    },
    excerpt: {
      en: "A practical checklist of the documents, dates and details that protect you before you sign anything.",
      ar: "قائمة عملية بالمستندات والتواريخ والتفاصيل التي يجب التأكد منها قبل التوقيع.",
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
        "حجز وحدة خطوة مهمة ومليئة بالحماس — ولهذا تحتاج إلى قائمة مراجعة واضحة. قبل أن توقّع، اجعل التفاصيل التالية مكتوبة ومحددة.",
        "تأكّد أن تاريخ التسليم مذكور في العقد، مع شروط الاستلام وإجراءات المعاينة. عبارة «العام القادم» شفهياً لا تكفي؛ البند المؤرّخ هو الالتزام الحقيقي.",
        "راجع مواصفات التشطيب — نصف تشطيب أو تشطيب كامل — وصولاً إلى الأرضيات والدهانات والأبواب والألمنيوم والسباكة. يجب أن تكون المواصفات مكتوبة، لا مجرد وعود في بروشور.",
        "قارن جدول السداد بتدفقاتك المالية الحقيقية: القيمة، وتكرار القسط، والإجمالي. لا تنظر إلى السعر المعلن فقط، بل إلى إجمالي الالتزام.",
        "أخيراً، اسأل مبكراً عن التسجيل ورسوم الصيانة وقواعد إعادة البيع. الإجابات الواضحة من البداية هي التي يمكنك الاعتماد عليها لاحقاً.",
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
