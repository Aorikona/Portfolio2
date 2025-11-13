# DevPortfolio — Bureau immersif

Ce projet Next.js 14 met en scène un portfolio interactif prenant la forme d’un bureau Windows minimaliste. Il exploite Spline pour l’avatar 3D, framer-motion pour les transitions, ainsi qu’une orchestration de fenêtres flottantes pilotées par Zustand.

## Stack

- **Next.js 14 (App Router)** & TypeScript
- **Tailwind CSS v4** pour le design système
- **Zustand** pour gérer l’état du bureau
- **Framer Motion** pour les animations et transitions
- **Spline** pour l’avatar 3D (avec fallback WebGL)
- **React Query** pour le feed vidéo infini
- **Playwright & Vitest** pour les tests

## Scripts

```bash
pnpm dev           # Lance le bureau en mode développement
pnpm build         # Build de production
pnpm start         # Démarre le serveur de production
pnpm lint          # Analyse statique ESLint
pnpm test          # Tests unitaires Vitest (jsdom)
pnpm test:coverage # Rapport de couverture
pnpm test:e2e      # Tests end-to-end Playwright (démarre dev server)
```

## Structure

```
src/
  app/            # Layout App Router & API contact
  components/     # UI (desktop, fenêtres, spline, utilitaires)
  data/           # Données statiques (projets, vidéos, timeline)
  hooks/          # Hooks personnalisés (pointer, feed vidéo…)
  store/          # Zustand (gestion des fenêtres)
```

## Fonctions clés

- **Fenêtres flottantes** : `FloatingWindow` fournit un chrome commun avec focus/z-index et transitions.
- **Dock** : `DesktopDock` + `DockButton` permettent d’ouvrir/focus chaque appli, avec animation Bio différée.
- **Vidéothèque** : `VideosWindow` utilise `react-virtuoso` pour virtualiser un feed type TikTok.
- **Bio** : `BioWindow` propose timeline interactive, compétences et storytelling.
- **Contact** : `ContactWindow` simule un terminal avec formulaire Zod + API `/api/contact` (Resend).

## Tests

- **Unitaires** : exemple sur `useDesktopStore` (`src/store/__tests__`).
- **E2E** : `e2e/desktop.spec.ts` vérifie l’ouverture des fenêtres et le flux contact.

> ⚠️ Ajoutez `RESEND_API_KEY` dans votre `.env.local` pour activer l’envoi réel des emails. Sans clé, l’API retourne un 202 simulé.

## Déploiement

- Optimisé pour Vercel : `pnpm build` produit un bundle compatible edge.
- Pensez à exécuter `npx playwright install` en CI avant `pnpm test:e2e`.

## Roadmap suggérée

- Mode mobile dédié (dock transformé en bottom bar).
- Switch dark/light (design tokens supplémentaires).
- Localisation multi-langue (ex. `next-intl`).
- Ajout d’un blog MDX et d’une section analytics.
- Service worker (offline) et cache assets via `next-pwa`.
