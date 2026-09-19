import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

import type * as NextNavigationModule from "next/navigation";

type NextNavigation = typeof NextNavigationModule;

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(private callback: IntersectionObserverCallback) {}

  observe = (target: Element) => {
    this.callback(
      [
        {
          isIntersecting: true,
          intersectionRatio: 1,
          target,
          boundingClientRect: target.getBoundingClientRect(),
        } as IntersectionObserverEntry,
      ],
      this,
    );
  };
  unobserve = () => {};
  disconnect = () => {};
  takeRecords = () => [];
}
vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

class MockResizeObserver implements ResizeObserver {
  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
}
vi.stubGlobal("ResizeObserver", MockResizeObserver);

vi.stubGlobal(
  "matchMedia",
  vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
);

vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<NextNavigation>()),
  usePathname: () => "/",
}));
