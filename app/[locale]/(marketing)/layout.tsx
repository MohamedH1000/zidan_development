import { getLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingContact } from "@/components/layout/floating-contact";
import { ScrollToTop } from "@/components/layout/scroll-to-top";

/**
 * Marketing chrome (site header + footer) for all public pages.
 * Admin pages live in the sibling (admin) group and get their own shell.
 *
 * Fetches DB projects here (server-side) so the Header dropdown can show the
 * actual projects added by the admin without a client-side fetch.
 */
export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = (await getLocale()) as "en" | "ar";

  let navProjects: { slug: string; name: string }[] = [];
  try {
    const rows = await prisma.project.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      select: { slug: true, nameEn: true, nameAr: true },
    });
    navProjects = rows.map((p) => ({
      slug: p.slug,
      name: locale === "ar" ? (p.nameAr || p.nameEn) : p.nameEn,
    }));
  } catch {
    // DB unreachable — dropdown shows "View all" only
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink-900 focus:px-5 focus:py-2 focus:text-sm focus:text-gold-400"
      >
        Skip to content
      </a>
      <Header projects={navProjects} />
      <main id="main" className="flex flex-col">
        {children}
      </main>
      <Footer />
      <FloatingContact />
      <ScrollToTop />
    </>
  );
}
