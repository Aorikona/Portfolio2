# Stabilize DevPortfolio and Local-Only Run

Goal: Fix hydration/infinite loop issues, simplify Zustand store usage, and provide a clean local-only workflow (no Vercel/Netlify required).

## Completed

- Store hydration cleanup
  - Removed persist middleware usage:
    - site/src/components/core/store-hydration.tsx: replaced with no-op component (no more useDesktopStore.persist.rehydrate()).
  - Verified Providers does not import StoreHydration:
    - site/src/components/core/providers.tsx: OK.

- Zustand selector stabilization
  - WindowStack: Avoid derived array in selector; select `windows` map and derive via `useMemo`:
    - site/src/components/desktop/WindowStack.tsx: updated.
  - Background and 3D components:
    - site/src/components/desktop/BackgroundImage.tsx: uses primitive boolean selector (safe).
    - site/src/components/spline/AvatarSpline.tsx: uses primitive boolean selector; heavy 3D dynamically loaded with `ssr: false` (safe).
  - DesktopDock: uses simple selector `state.dockItems` (safe).

- Dev ergonomics
  - next.config.ts: set `reactStrictMode: false` to reduce effect double-invocations during stabilization. Keep TS build tolerant (`ignoreBuildErrors: true`).
  - package.json scripts:
    - dev:local: `next dev -p 5173`
    - start:local: `next start -p 5173`
    - preview: `pnpm build && pnpm start -p 5173`

- Build and local production run
  - `pnpm build`: succeeded.
  - `pnpm start -p 5173`: running at http://localhost:5173.

## Validation Checklist

- [ ] Open http://localhost:5173 in a browser.
- [ ] Browser console shows no errors (no hydration mismatch, no infinite loops).
- [ ] Window operations (open/close/focus via Dock) behave correctly.
- [ ] Background fades correctly with open windows.
- [ ] 3D Spline loads with fallback and pointer-follow; no continuous re-renders.

## Notes

- `app/page.tsx` is client-only via dynamic import of DesktopShell (`ssr: false`) to eliminate SSR/store mismatch.
- No persist middleware used in the store (`site/src/store/desktop-store.ts` is simple `create<DesktopState>`).
- Once stable, consider re-enabling `reactStrictMode: true` and `typescript.ignoreBuildErrors: false`.

## Optional Next Steps

- Self-host (no Vercel/Netlify): use Dockerfile from DEPLOY.md and run behind Nginx/Traefik on a VPS.
- Reintroduce persistence carefully (e.g., `zustand/middleware/persist`) only after stabilizing and test hydration thoroughly.
- Add E2E validations for window interactions to prevent regressions.
