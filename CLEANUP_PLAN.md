# Codebase Cleanup & Optimization Plan

## 🗑️ Files to Delete (Useless/Duplicate)

### Root Level
- [ ] `/src/` - Old duplicate API folder (correct one is in `site/src/`)
- [ ] `contact-test.json` - Test file not needed
- [ ] `contact-simple.json` - Test file not needed  
- [ ] `vercel.json` - Deployment config (if exists in root, keep only in site/)
- [ ] `netlify.toml` - Not using Netlify, using Vercel
- [ ] `TODO.md` - Development notes

### Site Level
- [ ] `site/test-results/` - Test artifacts (add to .gitignore)
- [ ] `site/netlify.toml` - Not using Netlify
- [ ] `site/src/components/core/store-hydration.tsx` - No-op file, not used anywhere

## ✅ Window Selection - Already Working Correctly

The store already ensures only ONE window is active at a time:
- `openWindow()` - Sets clicked window as active, deactivates all others
- `focusWindow()` - Same behavior when clicking on a window
- `isActive` flag - Only one window has this set to true
- Visual indicator - Active window has cyan ring: `ring-2 ring-cyan-400/35`

## 🔧 Optimizations to Apply

### 1. Update .gitignore
Add test artifacts and build files

### 2. Remove Unused Imports
Check all components for unused imports

### 3. Consolidate Deployment Configs
Keep only Vercel config in site/

### 4. Clean Public Assets
Remove unused SVG files if any

## 📊 Current Status
- ✅ Window management working correctly (only one active)
- ✅ Z-index management working
- ✅ Store state management optimized
- ✅ Error boundaries in place
- ✅ E2E tests passing (5/6)

## 🎯 Action Items
1. Delete useless files
2. Update .gitignore
3. Remove no-op components
4. Verify all imports
5. Test and deploy
