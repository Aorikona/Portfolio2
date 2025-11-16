"use client";

import { useState, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { Send, Terminal, Link } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Prénom trop court."),
  email: z.string().email("Email invalide."),
  company: z.string().optional(),
  subject: z
    .string()
    .min(3, "Sujet requis.")
    .max(60, "Sujet trop long."),
  message: z.string().min(10, "Un peu plus de contexte serait parfait."),
});

type ContactInput = z.infer<typeof contactSchema>;

export const ContactWindow = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [logLines, setLogLines] = useState<string[]>([
    "booting contact-terminal v3.1",
    "connecting to devportfolio://contact",
    "ready. tapez votre message ou utilisez le terminal interactif.",
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const pushLog = (line: string) =>
    setLogLines((prev) => [...prev, `${new Date().toLocaleTimeString()} — ${line}`]);

  const onSubmit = async (values: ContactInput) => {
    try {
      setStatus("loading");
      pushLog(`envoi en cours…`);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setStatus("success");
      reset();
      pushLog("message envoyé avec succès. À très vite !");
    } catch (error) {
      console.error(error);
      setStatus("error");
      pushLog("erreur lors de l’envoi. Essayez le fallback mailto.");
    }
  };

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto px-6 py-6">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-3xl border border-lime-400/20 bg-black/70 p-5 font-mono text-sm text-lime-200"
      >
        <div className="flex items-center gap-2 text-lime-300">
          <Terminal className="size-5" />
          <span>devportfolio@contact-terminal:~$</span>
        </div>
        <div className="mt-4 space-y-1">
          {logLines.map((line, index) => (
            <div key={`${line}-${index}`} className="text-lime-200">
              {line}
            </div>
          ))}
        </div>
      </motion.div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid flex-1 grid-cols-1 gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-100 lg:grid-cols-[2fr_1fr]"
      >
        <div className="flex flex-col gap-4">
          <Field
            label="Nom & prénom"
            placeholder="Ada Lovelace"
            error={errors.name?.message}
            {...register("name")}
          />
          <Field
            label="Email"
            placeholder="ada@futurelab.io"
            error={errors.email?.message}
            {...register("email")}
          />
          <Field
            label="Organisation"
            placeholder="Future Lab Studio"
            error={errors.company?.message}
            {...register("company")}
          />
          <Field
            label="Sujet"
            placeholder="Lancement d’un portfolio immersif"
            error={errors.subject?.message}
            {...register("subject")}
          />
          <Field
            as="textarea"
            label="Message"
            placeholder="Expliquez-moi votre besoin, budget, délais…"
            rows={5}
            error={errors.message?.message}
            {...register("message")}
          />
          <div className="mt-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={status === "loading"}
              className={clsx(
                "inline-flex items-center gap-2 rounded-2xl border border-cyan-400/40 bg-cyan-400/20 px-5 py-3 font-semibold text-cyan-100 transition",
                status === "loading"
                  ? "cursor-progress opacity-70"
                  : "hover:border-cyan-300/60 hover:bg-cyan-400/30",
              )}
            >
              <Send className="size-4" />
              {status === "loading"
                ? "Envoi en cours..."
                : status === "success"
                  ? "Message envoyé ✔"
                  : "Envoyer"}
            </button>
            <a
              href="mailto:hello@devportfolio.studio"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/10"
            >
              <Link className="size-4" />
              Fallback mailto
            </a>
          </div>
        </div>

        <aside className="flex flex-col justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 p-5">
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-slate-300">
              Disponibilités
            </h4>
            <p className="mt-2 text-sm text-slate-200">
              Prochain créneau mission : <strong>Janvier 2026</strong>
              <br />
              Projet court / workshop : <strong>dès Décembre 2025</strong>
            </p>
            <p className="mt-4 text-xs text-slate-400">
              Temps de réponse moyen : moins de 24h.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-center text-xs text-slate-300">
            <QRCodeSVG
              value="https://devportfolio.studio/contact"
              size={136}
              bgColor="transparent"
              fgColor="#4dd0e1"
              level="Q"
              className="rounded-xl border border-cyan-400/20 bg-black/70 p-2"
            />
            <span>Scannez pour enregistrer la vCard.</span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
            <p className="font-semibold text-slate-200">
              API intégrée (Resend)
            </p>
            <p className="mt-2">
              Les messages sont relayés via un endpoint Edge sécurisé. Ajoutez
              votre clé <code>RESEND_API_KEY</code> pour activer l’envoi de mails.
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
};

type FieldProps = {
  label: string;
  placeholder?: string;
  error?: string;
  rows?: number;
  as?: "input" | "textarea";
};

const Field = ({
  label,
  placeholder,
  error,
  rows,
  as = "input",
  ...rest
}: FieldProps & InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const isTextarea = as === "textarea";

  return (
    <label className="flex flex-col gap-2 text-sm text-slate-200">
      <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
        {label}
      </span>
      {isTextarea ? (
        <textarea
          placeholder={placeholder}
          rows={rows}
          className={clsx(
            "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/70 focus:outline-none focus:ring-2 focus:ring-cyan-400/30",
            error && "border-pink-400/50 focus:ring-pink-400/30",
          )}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          placeholder={placeholder}
          className={clsx(
            "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/70 focus:outline-none focus:ring-2 focus:ring-cyan-400/30",
            error && "border-pink-400/50 focus:ring-pink-400/30",
          )}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && <span className="text-xs text-pink-300">{error}</span>}
    </label>
  );
};

