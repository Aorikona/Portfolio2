import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  company: z.string().optional(),
  subject: z.string(),
  message: z.string(),
});

const resend =
  process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.length > 10
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const data = contactSchema.parse(payload);

    if (process.env.NODE_ENV === "test") {
      return NextResponse.json({ status: "mocked" });
    }

    if (!resend) {
      console.warn(
        "RESEND_API_KEY manquant. Message enregistré en mémoire uniquement.",
        data,
      );

      return NextResponse.json(
        {
          status: "queued",
          message:
            "Clé RESEND absente. Aucun email n’a été envoyé mais la requête est enregistrée côté serveur.",
        },
        { status: 202 },
      );
    }

    await resend.emails.send({
      from: "DevPortfolio <contact@devportfolio.studio>",
      to: "hello@devportfolio.studio",
      subject: `[Portfolio] ${data.subject}`,
      reply_to: data.email,
      text: `
Nouvelle demande depuis le portfolio
------------------------------------

Nom: ${data.name}
Email: ${data.email}
Organisation: ${data.company ?? "—"}
Sujet: ${data.subject}

Message:
${data.message}
`,
    });

    return NextResponse.json(
      { status: "success", message: "Message envoyé avec succès" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erreur contact API:", error);
    return NextResponse.json(
      { status: "error", message: "Impossible d’envoyer le message." },
      { status: 400 },
    );
  }
}

