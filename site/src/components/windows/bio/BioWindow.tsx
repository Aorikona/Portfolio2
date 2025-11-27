"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

// Data adapted to the "Anoki AUFRERE" profile
const SKILLS = [
  { label: "HTML5 / CSS3", level: "expert" },
  { label: "JavaScript / React", level: "advanced" },
  { label: "Adobe Suite (Ps/Ai/Ae)", level: "expert" },
  { label: "Video Editing", level: "expert" },
  { label: "UX/UI Design", level: "advanced" },
  { label: "Web Integration", level: "expert" },
];

const SOFT_SKILLS = [
  "Creativity",
  "Teamwork",
  "Technical Rigor",
  "Project Management",
  "Adaptability",
];

const TIMELINE = [
  {
    id: 1,
    year: "2025 (Spring)",
    title: "Internship: Web Designer & Integrator",
    description:
      "Contributed to front-end development and integration of Figma mockups for a culture-oriented showcase website. Applied knowledge of accessibility and responsive design principles.",
    highlights: [
      "Integration of 5 main pages using HTML/CSS and React",
      "Accessibility optimization (WCAG)",
      "Direct collaboration with the UI/UX designer",
    ],
  },
  {
    id: 2,
    year: "2024 - 2026",
    title: "Education: MMI Degree (Multimedia and Internet Professions)",
    description:
      "Acquired fundamental skills in web development, graphic design, audiovisual production, and digital project management. Final year project focused on creating an interactive application.",
    highlights: [
      "Specialization in Web Development & Design",
      "Proficiency in Adobe tools (Photoshop, Illustrator, After Effects)",
      "Team-based tutored project (12 people) over 6 months",
    ],
  },
  {
    id: 3,
    year: "2023 (Summer)",
    title: "Freelance: Video Content Creation",
    description:
      "Produced short videos for local small and medium-sized enterprises (tutorials, product presentations). Managed production from filming to final editing and color grading.",
    highlights: [
      "Client relationship management and brief handling",
      "Advanced use of Premiere Pro and After Effects",
      "Improved narrative and audiovisual skills",
    ],
  },
];

export const BioWindow = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Using the local timeline
  const activeEvent = useMemo(() => TIMELINE[activeIndex], [activeIndex]);

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto px-6 py-6">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-semibold text-white">
            Hi, I'm Anoki 👋
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            MMI student with a dual passion for high-performance **Web Development** and immersive **Multimedia Design**. I combine the logic of code (HTML, CSS, JavaScript) with the creativity of graphic design and audiovisuals to create complete and aesthetic digital experiences. My goal is to find an internship where I can merge my technical and artistic skills.
          </p>
          <div className="mt-4 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4 text-sm text-cyan-100">
            🎨 Currently seeking an **apprenticeship** or **internship** as a **Front-end Developer / Integrator** with a strong UI/UX sensibility.
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top,rgba(148,163,255,0.15),rgba(15,23,42,0.85))] p-6">
          <h4 className="text-sm uppercase tracking-[0.3em] text-slate-300">
            Key Skills
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
            Timeline & Experience
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
            Approach & Values
          </h4>
          <p className="mt-3 leading-relaxed">
            I strive to always create projects that are not only functional but also **visually compelling**. My background in Graphic Design and Video allows me to approach web development with a sharp UI/UX perspective, ensuring pixel-perfect integration and a smooth user experience. Team and project management, learned in the MMI program, is key to my process.
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