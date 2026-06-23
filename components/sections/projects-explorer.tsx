"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import type { ProjectArea } from "@/types";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-card";

const FILTERS = ["all", "Available", "Under Construction", "Coming Soon"] as const;
type Filter = (typeof FILTERS)[number];

export function ProjectsExplorer({ projects }: { projects: ProjectArea[] }) {
  const t = useTranslations("pages.projects");
  const tProject = useTranslations("project");
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.status === filter)),
    [filter, projects],
  );

  const labelFor = (key: Filter) =>
    key === "all" ? t("filters.all") : tProject(`status.${key}`);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {FILTERS.map((value) => {
          const active = filter === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              aria-pressed={active}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active ? "text-ink-950" : "text-ink-600 hover:text-ink-900",
              )}
            >
              {active ? (
                <motion.span
                  layoutId="projects-filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-gold-500"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                />
              ) : null}
              {labelFor(value)}
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
