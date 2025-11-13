"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { clsx } from "clsx";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-4 text-slate-100 transition hover:border-cyan-300/60 hover:bg-white/10">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: project.coverGradient }}
        />
        {project.cover && (
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 320px, 100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-slate-900/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
          {project.category}
        </span>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        <header className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-white">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-slate-300">{project.excerpt}</p>
          </div>
          <motion.span
            initial={false}
            animate={{ rotate: 0 }}
            className="rounded-xl border border-white/10 bg-white/10 p-2 text-slate-100"
          >
            <ArrowUpRight className="size-5" />
          </motion.span>
        </header>
        <footer className="flex flex-wrap gap-2 text-xs text-slate-300">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={clsx(
                "rounded-full border border-white/10 bg-white/5 px-3 py-1 uppercase tracking-[0.2em]",
                "text-[10px] text-slate-300",
              )}
            >
              {tag}
            </span>
          ))}
        </footer>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
        <span>{project.year}</span>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-cyan-200 transition hover:text-cyan-100"
        >
          Voir le cas
          <ArrowUpRight className="size-3" />
        </button>
      </div>
    </article>
  );
};

