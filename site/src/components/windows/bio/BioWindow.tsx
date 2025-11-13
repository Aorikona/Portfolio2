"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { TIMELINE } from "@/data/timeline";

const SKILLS = [
  { label: "Next.js 14", level: "expert" },
  { label: "Spline / Three.js", level: "expert" },
  { label: "Framer Motion", level: "expert" },
  { label: "WebGL / GLSL", level: "advanced" },
  { label: "UX / UI Design", level: "advanced" },
  { label: "Creative Coding", level: "expert" },
];

const SOFT_SKILLS = [
  "Pédagogie",
  "Curiosité technologique",
  "Design systems",
  "Leadership produit",
  "Approche data-driven",
];

export const BioWindow = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeEvent = useMemo(() => TIMELINE[activeIndex], [activeIndex]);

  return (
    <div className="flex h-full flex-col gap-6 px-6 py-6">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-semibold text-white">
            Salut, moi c’est DevPortfolio 👋
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Développeur full stack passionné par les expériences immersives,
            j’allie design, narrative et performance. Mon objectif : concevoir
            des interfaces ultra-fluides, accessibles et mémorables, du concept
            à la mise en production.
          </p>
          <div className="mt-4 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4 text-sm text-cyan-100">
            🌌 Actuellement en mission pour studios XR, scale-ups et marques
            premium cherchant à élever leurs expériences web/3D.
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top,rgba(148,163,255,0.15),rgba(15,23,42,0.85))] p-6">
          <h4 className="text-sm uppercase tracking-[0.3em] text-slate-300">
            Compétences clés
          </h4>
          <ul className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-100">
            {SKILLS.map((skill) => (
              <li
                key={skill.label}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2"
              >
                {skill.label}
                <span className="text-xs uppercase tracking-[0.3em] text-cyan-200">
                  {skill.level}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex flex-1 flex-col gap-6 overflow-hidden rounded-3xl border border-white/8 bg-white/4 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h4 className="text-sm uppercase tracking-[0.3em] text-slate-300">
            Timeline interactive
          </h4>
          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-slate-200">
            {activeEvent.year}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:flex-row">
          <div className="flex flex-row gap-3 overflow-x-auto pb-4 lg:flex-col lg:overflow-x-visible lg:overflow-y-auto">
            {TIMELINE.map((event, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={clsx(
                    "relative rounded-2xl border px-4 py-3 text-left transition",
                    isActive
                      ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-100"
                      : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10",
                  )}
                >
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    {event.year}
                  </span>
                  <span className="mt-2 block text-sm font-semibold leading-tight text-white">
                    {event.title}
                  </span>
                </button>
              );
            })}
          </div>
          <motion.div
            key={activeEvent.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex-1 rounded-3xl border border-white/10 bg-slate-950/40 p-6"
          >
            <h5 className="text-lg font-semibold text-white">
              {activeEvent.title}
            </h5>
            <p className="mt-3 text-sm text-slate-300">
              {activeEvent.description}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              {activeEvent.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-3"
                >
                  <span className="mt-1 size-2 flex-none rounded-full bg-cyan-300" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="grid gap-4 rounded-3xl border border-white/10 bg-white/4 p-6 text-sm text-slate-200 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
            ADN & vision
          </h4>
          <p className="mt-3 leading-relaxed">
            Je crois en des expériences web qui racontent une histoire, tout en
            restant ultra performantes. Chaque projet est designé pour être
            performant, accessible et scénarisé, avec une attention obsessionnelle
            pour les micro-interactions.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
            Soft skills
          </h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {SOFT_SKILLS.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.3em]"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

