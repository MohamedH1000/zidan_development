import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

/**
 * Marketing chrome (site header + footer) for all public pages.
 * Admin pages live in the sibling (admin) group and get their own shell.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink-900 focus:px-5 focus:py-2 focus:text-sm focus:text-gold-400"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex flex-col">
        {children}
      </main>
      <Footer />
    </>
  );
}
