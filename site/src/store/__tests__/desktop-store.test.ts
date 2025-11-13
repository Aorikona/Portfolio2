import { act } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useDesktopStore } from "@/store/desktop-store";

describe("useDesktopStore", () => {
  beforeEach(() => {
    useDesktopStore.getState().reset();
  });

  it("ouvre la fenêtre projets par défaut", () => {
    const state = useDesktopStore.getState();
    expect(state.windows.projects.isOpen).toBe(true);
    expect(state.activeWindow).toBe("projects");
  });

  it("ouvre une fenêtre et met à jour le focus", () => {
    act(() => {
      useDesktopStore.getState().openWindow("videos");
    });

    const state = useDesktopStore.getState();
    expect(state.windows.videos.isOpen).toBe(true);
    expect(state.activeWindow).toBe("videos");
    expect(state.windows.videos.isActive).toBe(true);
  });

  it("ferme une fenêtre via toggle", () => {
    act(() => {
      useDesktopStore.getState().openWindow("videos");
      useDesktopStore.getState().toggleWindow("videos");
    });

    const state = useDesktopStore.getState();
    expect(state.windows.videos.isOpen).toBe(false);
  });
});

