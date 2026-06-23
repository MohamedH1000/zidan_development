"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { ProjectArea } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Scene } from "@/components/visual/scene";
import { cn } from "@/lib/utils";

export function ProjectCard({ project }: { project: ProjectArea }) {
  const t = useTranslations("project");
  const statusLabel = t(`status.${project.status}`);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-900/8 bg-white shadow-[0_18px_40px_-30px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-500/40 hover:shadow-[0_34px_70px_-34px_rgba(0,0,0,0.5)]"
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <div className="absolute inset-0 scale-105 transition-transform duration-700 group-hover:scale-110">
          <Scene variant="project" accent={project.accent} showLabel={project.shortName} />
        </div>
        <div className="absolute start-4 top-4 z-10">
          <span className="rounded-full bg-gold-500/15 px-3 py-1 text-xs font-medium text-gold-700">
            {statusLabel}
          </span>
        </div>
        <div className="absolute end-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-900 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-ink-500">
          <MapPin className="h-3.5 w-3.5 text-gold-600" />
          {project.district}
        </div>
        <h3 className="mt-2 font-display text-2xl font-semibold text-ink-900">{project.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{project.summary}</p>

        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-ink-900/8 pt-4 text-center">
          <Spec label={t("specDown")} value={project.downPayment} />
          <Spec label={t("specInstallment")} value={project.installment} />
          <Spec label={t("specDelivery")} value={project.delivery} />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.unitTypes.slice(0, 2).map((type) => (
            <Badge key={type} tone="gold">
              {type}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[0.65rem] font-medium uppercase tracking-wide text-ink-500">{label}</div>
      <div className={cn("mt-0.5 text-sm font-semibold text-ink-900")}>{value}</div>
    </div>
  );
}
