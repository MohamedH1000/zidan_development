import type { Metadata } from "next";
export const dynamicParams = true;
// Force per-request rendering so `notFound()` can set a real HTTP 404 for
// unknown slugs — with static optimization, Next can't flip an already
// flushed 200 response, which was causing Google to see soft-404s.
export const dynamic = "force-dynamic";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Check, MapPin, BedDouble, Bath, Maximize, MessageCircle } from "lucide-react";
import type { Unit } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { Scene } from "@/components/visual/scene";
import { ProjectCard } from "@/components/sections/project-card";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getProjectBySlugFromDB, getProjectsFromDB } from "@/lib/db-content";
import { buildMetadata, getBreadcrumbJsonLd, getProjectJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { localizedPath } from "@/lib/i18n";
import { type Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/routing";

export async function generateStaticParams() {
  try {
    const projects = await prisma.project.findMany({ select: { slug: true } });
    return locales.flatMap((locale) => projects.map(({ slug }) => ({ locale, slug })));
  } catch {
    return [];
  }
}


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const activeLocale = locale as Locale;
  const project = await getProjectBySlugFromDB(slug, activeLocale);
  if (!project) return buildMetadata({ title: "Project not found", description: "", path: localizedPath(activeLocale, "/projects"), noIndex: true });
  const description = project.summary || project.tagline || "";
  const keywords = project.district
    ? [project.name, project.district, "New Cairo", "real estate", "Zidan Development"]
    : [project.name, "New Cairo", "real estate", "Zidan Development"];
  return buildMetadata({
    title: project.name,
    description,
    path: localizedPath(activeLocale, `/projects/${project.slug}`),
    image: project.images?.[0] ?? undefined,
    keywords,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const activeLocale = locale as Locale;
  const project = await getProjectBySlugFromDB(slug, activeLocale);
  if (!project) notFound();

  const [t, tNav, units, others] = await Promise.all([
    getTranslations("project"),
    getTranslations("nav"),
    prisma.unit.findMany({
      where: { project: { slug } },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }).catch(() => []),
    getProjectsFromDB(activeLocale).then((ps) => ps.filter((p) => p.slug !== project.slug).slice(0, 3)).catch(() => []),
  ]);

  const pickField = (ar: string | null, en: string | null) =>
    activeLocale === "ar" ? (ar || en || "") : (en || "");
  const whatsappNumber = (process.env.WHATSAPP_PHONE_NUMBER || siteConfig.contact.phone).replace(/\D/g, "");

  return (
    <>
      <JsonLd
        data={[
          getBreadcrumbJsonLd([
            { name: tNav("projects"), path: localizedPath(activeLocale, "/projects") },
            { name: project.name, path: localizedPath(activeLocale, `/projects/${project.slug}`) },
          ]),
          getProjectJsonLd({
            name: project.name,
            description: project.summary || project.tagline || "",
            path: localizedPath(activeLocale, `/projects/${project.slug}`),
            district: project.district || undefined,
            image: project.images?.[0] ?? undefined,
            status: project.status,
          }),
        ]}
      />
      <PageHero
        eyebrow={project.district || ""}
        title={project.name}
        description={project.tagline || ""}
        crumbs={[
          { label: tNav("projects"), href: localizedPath(activeLocale, "/projects") },
          { label: project.name },
        ]}
        sceneVariant="project"
      />

      <Section tone="light">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <Reveal direction="right">
              {project.images && project.images.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {project.images.slice(0, 4).map((img, i) => (
                    <div key={i} className={`relative overflow-hidden rounded-2xl shadow-lg ${i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={project.name} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-[0_40px_80px_-40px_rgba(0,0,0,0.45)]">
                  <Scene variant="project" accent={project.accent} showLabel={project.name} />
                </div>
              )}

              {project.description.length > 0 ? (
                <div className="mt-8 space-y-4 text-sm leading-relaxed text-ink-600 sm:text-base">
                  {project.description.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              ) : null}

              {project.highlights.length > 0 ? (
                <>
                  <h2 className="mt-10 font-display text-2xl font-semibold text-ink-900">{t("highlights")}</h2>
                  <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-sm text-ink-700">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-600">
                          <Check className="h-3 w-3" />
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {project.featuresLocation && project.featuresLocation.length > 0 ? (
                <>
                  <h2 className="mt-10 font-display text-2xl font-semibold text-ink-900">Location Features</h2>
                  <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {project.featuresLocation.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-ink-700">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-600">
                          <Check className="h-3 w-3" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {project.render3dUrl ? (
                <div className="mt-10">
                  <h2 className="font-display text-2xl font-semibold text-ink-900">3D Render</h2>
                  <div className="relative mt-4 aspect-video overflow-hidden rounded-2xl shadow-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={project.render3dUrl} alt={`${project.name} 3D render`} className="h-full w-full object-cover" />
                  </div>
                </div>
              ) : null}

              {project.mapLat != null && project.mapLng != null ? (
                <div className="mt-10">
                  <h2 className="font-display text-2xl font-semibold text-ink-900">Location</h2>
                  <div className="relative mt-4 aspect-video overflow-hidden rounded-2xl border border-ink-900/8 shadow-lg">
                    <iframe
                      src={`https://www.google.com/maps?q=${project.mapLat},${project.mapLng}&output=embed`}
                      className="h-full w-full"
                      loading="lazy"
                      title={`${project.name} map`}
                    />
                  </div>
                  <a
                    href={project.googleMapLink || `https://www.google.com/maps?q=${project.mapLat},${project.mapLng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-medium text-gold-700 underline"
                  >
                    Open in Google Maps ↗
                  </a>
                </div>
              ) : project.mapEmbed ? (
                <div className="mt-10">
                  <h2 className="font-display text-2xl font-semibold text-ink-900">Location</h2>
                  <div className="relative mt-4 aspect-video overflow-hidden rounded-2xl border border-ink-900/8 shadow-lg">
                    <iframe src={project.mapEmbed} className="h-full w-full" loading="lazy" title={`${project.name} map`} />
                  </div>
                  {project.googleMapLink ? (
                    <a href={project.googleMapLink} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-medium text-gold-700 underline">
                      Open in Google Maps ↗
                    </a>
                  ) : null}
                </div>
              ) : null}
            </Reveal>

            <Reveal direction="left">
              <aside className="sticky top-28 rounded-2xl border border-ink-900/8 bg-cream p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-ink-500">
                  <MapPin className="h-3.5 w-3.5 text-gold-600" />
                  {project.district || "—"}
                </div>
                <h2 className="mt-2 font-display text-3xl font-semibold text-ink-900">{project.name}</h2>
                {project.summary ? <p className="mt-2 text-sm text-ink-500">{project.summary}</p> : null}

                <dl className="mt-6 space-y-3 border-t border-ink-900/10 pt-6">
                  {project.projectAvailability ? <SpecRow label="Availability" value={project.projectAvailability} /> : null}
                  {project.propertyStatus ? <SpecRow label="Status" value={project.propertyStatus} /> : null}
                  {project.deliveryDate ? <SpecRow label="Delivery" value={project.deliveryDate} /> : null}
                  {project.downPayment ? <SpecRow label={t("specDown")} value={project.downPayment} /> : null}
                  {project.installment ? <SpecRow label={t("specInstallment")} value={project.installment} /> : null}
                  {project.delivery ? <SpecRow label={t("specDelivery")} value={project.delivery} /> : null}
                </dl>

                {project.unitTypes.length > 0 ? (
                  <div className="mt-6">
                    <div className="text-xs font-semibold uppercase tracking-wide text-ink-500">{t("unitTypes")}</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.unitTypes.map((type) => <Badge key={type} tone="gold">{type}</Badge>)}
                    </div>
                  </div>
                ) : null}

                <Link href="/contact" className={`${buttonVariants({ variant: "gold", size: "lg", className: "mt-8 w-full" })}`}>
                  {t("enquire", { name: project.shortName || project.name })}
                </Link>
              </aside>
            </Reveal>
          </div>
        </Container>
      </Section>

      {units.length > 0 ? (
        <Section tone="cream">
          <Container>
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-ink-900 sm:text-3xl">{t("availableUnits")}</h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {units.map((u: Unit) => (
                <Reveal key={u.id}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-900/8 bg-white shadow-[0_18px_50px_-42px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_34px_80px_-48px_rgba(0,0,0,0.55)]">
                    <Link href={`/projects/${project.slug}/units/${u.slug}`} className="block flex-1">
                      <div className="relative aspect-[16/10] overflow-hidden bg-cream">
                        {u.planImageUrl ? (
                          <Image
                            src={u.planImageUrl}
                            alt={`${u.slug} ${pickField(u.unitTypeAr, u.unitTypeEn)}`}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0">
                            <Scene variant="project" accent={project.accent} showLabel={u.slug} />
                          </div>
                        )}
                        <div className="absolute start-4 top-4">
                          <Badge tone={u.availability === "Available" ? "gold" : "neutral"}>{u.availability}</Badge>
                        </div>
                      </div>
                      <div className="p-6">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg font-semibold text-ink-900">{u.slug}</span>
                      <span className="rounded-full bg-gold-500/12 px-3 py-1 text-xs font-semibold text-gold-700">{t("viewDetails")}</span>
                    </div>
                    <p className="mt-1 text-sm text-ink-500">{pickField(u.unitTypeAr, u.unitTypeEn)}</p>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-ink-600">
                      <span className="flex items-center gap-1"><Maximize className="h-4 w-4 text-gold-600" />{u.area} m²</span>
                      {u.bedrooms > 0 ? <span className="flex items-center gap-1"><BedDouble className="h-4 w-4 text-gold-600" />{u.bedrooms}</span> : null}
                      {u.bathrooms > 0 ? <span className="flex items-center gap-1"><Bath className="h-4 w-4 text-gold-600" />{u.bathrooms}</span> : null}
                    </div>
                      </div>
                    </Link>
                    <div className="px-6 pb-6">
                      <a
                        href={buildWhatsappHref({
                          phone: whatsappNumber,
                          projectName: project.name,
                          unitSlug: u.slug,
                          unitType: pickField(u.unitTypeAr, u.unitTypeEn),
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-5 text-sm font-semibold text-ink-950 transition-colors hover:bg-gold-400"
                      >
                        <MessageCircle className="h-4 w-4" />
                        {t("whatsappUnit")}
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {others.length > 0 ? (
        <Section tone={units.length > 0 ? "light" : "cream"}>
          <Container>
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-ink-900 sm:text-3xl">{t("exploreOther")}</h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {others.map((other) => (
                <Reveal key={other.slug}>
                  <ProjectCard project={other} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <dt className="text-ink-500">{label}</dt>
      <dd className="font-semibold text-ink-900">{value}</dd>
    </div>
  );
}

function buildWhatsappHref({
  phone,
  projectName,
  unitSlug,
  unitType,
}: {
  phone: string;
  projectName: string;
  unitSlug: string;
  unitType: string;
}) {
  const text = encodeURIComponent(
    `Hello Zidan Development, I am interested in unit ${unitSlug} (${unitType}) at ${projectName}.`,
  );
  return `https://wa.me/${phone}?text=${text}`;
}
