import { getTranslations } from "next-intl/server";
import { Building2, DoorOpen, Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const t = await getTranslations("admin.dashboard");
  // Graceful: if the DB isn't configured/migrated yet, show zeros.
  let projectCount = 0;
  let unitCount = 0;
  try {
    [projectCount, unitCount] = await Promise.all([
      prisma.project.count(),
      prisma.unit.count(),
    ]);
  } catch {
    // DB not reachable — see docs/ADMIN_SETUP.md
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">{t("title")}</h1>
      <p className="mt-1 text-sm text-ink-400">{t("subtitle")}</p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={Building2} label={t("projects")} value={projectCount} href="/admin/projects" />
        <StatCard icon={DoorOpen} label={t("units")} value={unitCount} href="/admin/units" />
        <Link
          href="/admin/projects/new"
          className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 p-6 text-sm font-medium text-ink-300 transition-colors hover:border-gold-500/50 hover:text-gold-400"
        >
          <Plus className="h-4 w-4" /> {t("newProject")}
        </Link>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-white/10 bg-ink-900 p-6 transition-colors hover:border-gold-500/40"
    >
      <Icon className="h-6 w-6 text-gold-400" />
      <div className="mt-4 font-display text-4xl font-semibold">{value}</div>
      <div className="mt-1 text-sm text-ink-400">{label}</div>
    </Link>
  );
}
