"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

// Données adaptées au profil "Anoki AUFRERE"
const SKILLS = [
  { label: "HTML5 / CSS3", level: "expert" },
  { label: "JavaScript / React", level: "advanced" },
  { label: "Suite Adobe (Ps/Ai/Ae)", level: "expert" },
  { label: "Montage Vidéo", level: "expert" },
  { label: "Design UX/UI", level: "advanced" },
  { label: "Intégration Web", level: "expert" },
];

const SOFT_SKILLS = [
  "Créativité",
  "Travail d'équipe",
  "Rigueur technique",
  "Gestion de projet",
  "Adaptabilité",
];

const TIMELINE = [
  {
    id: 1,
    year: "2025 (Printemps)",
    title: "Stage : Concepteur Web & Intégrateur",
    description:
      "Contribution au développement front-end et à l'intégration de maquettes Figma pour un site vitrine orienté culture. Mise en pratique des connaissances en accessibilité et responsive design.",
    highlights: [
      "Intégration de 5 pages principales en HTML/CSS et React",
      "Optimisation de l'accessibilité (WCAG)",
      "Collaboration directe avec le designer UI/UX",
    ],
  },
  {
    id: 2,
    year: "2024 - 2026",
    title: "Formation : BUT Métiers du Multimédia et de l'Internet (MMI)",
    description:
      "Acquisition de compétences fondamentales en développement web, design graphique, audiovisuel et gestion de projet numérique. Projet de fin d'année axé sur la création d'une application interactive.",
    highlights: [
      "Spécialisation en Développement Web & Design",
      "Maîtrise des outils Adobe (Photoshop, Illustrator, After Effects)",
      "Projet tutoré en équipe (12 personnes) sur 6 mois",
    ],
  },
  {
    id: 3,
    year: "2023 (Été)",
    title: "Freelance : Création de Contenu Vidéo",
    description:
      "Réalisation de vidéos courtes pour des PME locales (tutoriels, présentations produits). Gestion de la production, du tournage au montage final et à l'étalonnage.",
    highlights: [
      "Gestion de la relation client et des briefs",
      "Utilisation avancée de Première Pro et After Effects",
      "Amélioration des compétences narratives et audiovisuelles",
    ],
  },
];

export const BioWindow = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Utilisation de la timeline locale
  const activeEvent = useMemo(() => TIMELINE[activeIndex], [activeIndex]);

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto px-6 py-6">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-semibold text-white">
            Salut, moi c’est Anoki 👋
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Étudiant en MMI avec une double passion pour le **Développement Web** performant et le **Design Multimédia** immersif. Je combine la logique du code (HTML, CSS, JavaScript) avec la créativité du graphisme et de l'audiovisuel pour créer des expériences numériques complètes et esthétiques. Mon objectif est de trouver un stage où je peux allier mes compétences techniques et artistiques.
          </p>
          <div className="mt-4 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4 text-sm text-cyan-100">
            🎨 Actuellement à la recherche d'une **alternance** ou d'un **stage** en tant que **Développeur Front-end / Intégrateur** avec une forte sensibilité UI/UX.
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
            Parcours & Expérience
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
            Approche & Valeurs
          </h4>
          <p className="mt-3 leading-relaxed">
            Je m'efforce de toujours créer des projets qui ne sont pas seulement fonctionnels, mais aussi **visuellement percutants**. Mon background en Design Graphique et Vidéo me permet d'aborder le développement web avec une perspective UI/UX aiguisée, garantissant une intégration pixel-perfect et une expérience utilisateur fluide. La gestion d'équipe et de projet, apprise en MMI, est clé dans mon processus.
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