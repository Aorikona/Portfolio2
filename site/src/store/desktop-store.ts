import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { DOCK_ORDER, WINDOW_CONFIGS, type WindowId } from "@/constants/windows";

type WindowState = {
  id: WindowId;
  isOpen: boolean;
  isActive: boolean;
  zIndex: number;
  accent: string;
  title: string;
  description: string;
};

type DesktopState = {
  windows: Record<WindowId, WindowState>;
  activeWindow: WindowId | null;
  nextZ: number;
  bioAnimationPending: boolean;
  dockItems: WindowId[];
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  toggleWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  setBioAnimationPending: (value: boolean) => void;
  reset: () => void;
};

const createInitialWindowState = (): Record<WindowId, WindowState> => {
  return DOCK_ORDER.reduce((acc, id) => {
    const config = WINDOW_CONFIGS[id];
    acc[id] = {
      id,
      isOpen: id === "projects",
      isActive: id === "projects",
      zIndex: id === "projects" ? 1 : 0,
      accent: config.accent,
      title: config.label,
      description: config.description,
    };
    return acc;
  }, {} as Record<WindowId, WindowState>);
};

export const useDesktopStore = create<DesktopState>()(
  devtools(
    (set, get) => ({
      windows: createInitialWindowState(),
      activeWindow: "projects",
      nextZ: 2,
      bioAnimationPending: false,
      dockItems: DOCK_ORDER,
      openWindow: (id) => {
        set((state) => ({
          windows: {
            ...Object.fromEntries(
              (Object.entries(state.windows) as [WindowId, WindowState][]).map(([key, win]) => {
                if (key === id) {
                  return [
                    key,
                    {
                      ...win,
                      isOpen: true,
                      isActive: true,
                      zIndex: state.nextZ,
                    },
                  ];
                }
                // Close all other windows (single window mode)
                return [
                  key,
                  {
                    ...win,
                    isOpen: false,
                    isActive: false,
                    zIndex: 0,
                  },
                ];
              }),
            ),
          },
          activeWindow: id,
          nextZ: state.nextZ + 1,
        }));
      },
      closeWindow: (id) =>
        set((state) => {
          const windows = { ...state.windows };
          windows[id] = { ...windows[id], isOpen: false, isActive: false, zIndex: 0 };

          const remainingActive = Object.values(windows)
            .filter((win) => win.isOpen)
            .sort((a, b) => b.zIndex - a.zIndex)[0]?.id;

          return {
            windows,
            activeWindow: remainingActive ?? null,
          };
        }),
      toggleWindow: (id) => {
        const { windows } = get();
        if (windows[id]?.isOpen) {
          get().closeWindow(id);
        } else {
          get().openWindow(id);
        }
      },
      focusWindow: (id) =>
        set((state) => ({
          windows: Object.fromEntries(
            (Object.entries(state.windows) as [WindowId, WindowState][]).map(([key, win]) => {
              if (key === id) {
                return [
                  key,
                  {
                    ...win,
                    isActive: true,
                    isOpen: true,
                    zIndex: state.nextZ,
                  },
                ];
              }

              return [key, { ...win, isActive: false }];
            }),
          ) as Record<WindowId, WindowState>,
          activeWindow: id,
          nextZ: state.nextZ + 1,
        })),
      setBioAnimationPending: (value) =>
        set(() => ({
          bioAnimationPending: value,
        })),
      reset: () =>
        set(() => ({
          windows: createInitialWindowState(),
          activeWindow: "projects",
          nextZ: 2,
          bioAnimationPending: false,
        })),
    }),
    { name: "desktop-store" },
  ),
);

export const useOpenWindows = () =>
  useDesktopStore((state) =>
    Object.values(state.windows)
      .filter((win) => win.isOpen)
      .sort((a, b) => a.zIndex - b.zIndex),
  );

export type { WindowState, DesktopState };
