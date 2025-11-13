"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { Download } from "lucide-react";
import {
  PROJECTS,
  PROJECT_FILTERS,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { ProjectCard } from "@/components/windows/projects/ProjectCard";

const ALL_FILTER: ProjectCategory | "All" = "All";

export const ProjectsWindow = () => {
  const [activeFilter, setActiveFilter] = useState<typeof ALL_FILTER>(ALL_FILTER);

  const projects = useMemo(() => {
    if (activeFilter === ALL_FILTER) return PROJECTS;
    return PROJECTS.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const handleFilterChange = (filter: typeof ALL_FILTER) => () =>
    setActiveFilter(filter);

  return (
    <div className="grid h-full grid-cols-1 gap-8 px-6 py-6 lg:grid-cols-[minmax(200px,0.25fr)_1fr]">
      <aside className="flex flex-col gap-6">
        <div>
          <h3 className="text-sm uppercase tracking-[0.3em] text-slate-400">
            Navigation
          </h3>
          <ul className="mt-4 flex flex-col gap-2">
            {[ALL_FILTER, ...PROJECT_FILTERS].map((filter) => (
              <li key={filter}>
                <button
                  type="button"
                  onClick={handleFilterChange(filter)}
                  className={clsx(
                    "w-full rounded-2xl border border-white/5 px-4 py-3 text-left text-sm font-medium tracking-wide transition",
                    activeFilter === filter
                      ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-200"
                      : "hover:border-white/10 hover:bg-white/5",
                  )}
                  aria-pressed={activeFilter === filter}
                >
                  {filter === ALL_FILTER ? "Tous les projets" : filter}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-5">
          <h4 className="text-sm font-semibold text-cyan-200">
            Besoin d’un CV ?
          </h4>
          <p className="mt-2 text-sm text-slate-300">
            Téléchargez la version PDF compacte ou contactez-moi pour une
            version détaillée.
          </p>
          <a
            href="/cv-devportfolio.pdf"
            download
            className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-cyan-400/90 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300"
          >
            <Download className="size-4" />
            Télécharger le CV
          </a>
        </div>
      </aside>
      <div className="grid grid-cols-1 gap-6 overflow-y-auto pr-1 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project: Project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

