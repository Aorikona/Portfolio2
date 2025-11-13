# Guide de déploiement — DevPortfolio

## 🚀 Voir le portfolio en local

### Démarrage rapide

```bash
cd site
pnpm dev
```

Le portfolio sera accessible sur **http://localhost:3000**

### Build de production locale

Pour tester la version optimisée en local :

```bash
pnpm build
pnpm start
```

---

## 🌐 Déployer en ligne (Vercel — Recommandé)

### Option 1 : Déploiement automatique via GitHub

1. **Créer un dépôt GitHub** :
   ```bash
   git init
   git add .
   git commit -m "Initial commit: DevPortfolio"
   git remote add origin https://github.com/TON_USERNAME/devportfolio.git
   git push -u origin main
   ```

2. **Connecter à Vercel** :
   - Va sur [vercel.com](https://vercel.com)
   - Clique sur "Add New Project"
   - Importe ton dépôt GitHub
   - Vercel détecte automatiquement Next.js
   - Clique sur "Deploy"

3. **Variables d'environnement** (optionnel) :
   - Dans les paramètres du projet Vercel
   - Onglet "Environment Variables"
   - Ajoute `RESEND_API_KEY` si tu veux activer l'envoi d'emails

### Option 2 : Déploiement via CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Dans le dossier site/
cd site
vercel

# Suivre les instructions
# Puis pour la production :
vercel --prod
```

---

## 📦 Autres plateformes

### Netlify

1. Crée un compte sur [netlify.com](https://netlify.com)
2. Connecte ton dépôt GitHub
3. Configuration :
   - **Build command** : `pnpm build`
   - **Publish directory** : `.next`
   - **Node version** : `20.x`

### Railway

1. Crée un compte sur [railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub repo"
3. Railway détecte automatiquement Next.js

### Docker (auto-hébergement)

Crée un `Dockerfile` à la racine de `site/` :

```dockerfile
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

Puis dans `next.config.ts`, ajoute :

```typescript
const nextConfig: NextConfig = {
  output: 'standalone',
};
```

---

## ⚙️ Configuration requise

### Variables d'environnement (optionnel)

Crée un fichier `.env.local` dans `site/` :

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

Sans cette clé, le formulaire de contact fonctionnera mais n'enverra pas d'emails réels (mode mock).

### Pour obtenir une clé Resend

1. Va sur [resend.com](https://resend.com)
2. Crée un compte
3. Génère une API key
4. Ajoute-la dans `.env.local` (local) ou dans les variables d'environnement de ta plateforme (production)

---

## ✅ Checklist avant déploiement

- [ ] `pnpm build` s'exécute sans erreur
- [ ] `pnpm lint` passe sans erreur
- [ ] Le portfolio s'affiche correctement en local (`pnpm dev`)
- [ ] Les images/assets sont présents dans `public/`
- [ ] (Optionnel) Variable `RESEND_API_KEY` configurée
- [ ] Le README est à jour

---

## 🔗 URLs après déploiement

- **Vercel** : `https://ton-projet.vercel.app`
- **Netlify** : `https://ton-projet.netlify.app`
- **Railway** : `https://ton-projet.railway.app`

Tu peux aussi connecter un domaine personnalisé dans les paramètres de chaque plateforme.

---

## 🐛 Dépannage

### Erreur "Module not found"

```bash
cd site
rm -rf node_modules .next
pnpm install
pnpm build
```

### Erreur de build sur Vercel

Vérifie que `package.json` contient bien le script `build` et que toutes les dépendances sont listées.

### Le Spline 3D ne s'affiche pas

- Vérifie que l'URL de la scène Spline est correcte dans `src/components/spline/AvatarSpline.tsx`
- Assure-toi que la scène est publiée sur Spline (pas en mode draft)

---

## 📝 Notes

- Le portfolio est optimisé pour Vercel (Edge Functions, ISR)
- Les images sont optimisées automatiquement via `next/image`
- Le mode production est plus performant que le mode dev
- Pense à tester sur mobile après déploiement

