import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { RevealObserver } from "@/shared/components/reveal-observer";

describe("RevealObserver", () => {
  it("marks every .reveal element visible once it's in view", () => {
    render(
      <>
        <div className="reveal" data-testid="a" />
        <div className="reveal" data-testid="b" />
        <div data-testid="c" />
        <RevealObserver />
      </>,
    );

    expect(document.querySelector('[data-testid="a"]')).toHaveClass("is-visible");
    expect(document.querySelector('[data-testid="b"]')).toHaveClass("is-visible");
    expect(document.querySelector('[data-testid="c"]')).not.toHaveClass("is-visible");
  });
});

describe("RevealObserver with elements added later", () => {
  it("reveals .reveal elements mounted after it, without a navigation", async () => {
    render(<RevealObserver />);

    const late = document.createElement("section");
    late.innerHTML = '<div class="reveal" data-testid="late"></div>';
    document.body.append(late);

    await waitFor(() => {
      expect(document.querySelector('[data-testid="late"]')).toHaveClass("is-visible");
    });
    late.remove();
  });
});

describe("RevealObserver with elements out of view", () => {
  it("reveals elements already scrolled past, but not ones still below", () => {
    class BelowAndAboveObserver {
      constructor(private callback: IntersectionObserverCallback) {}
      observe = (target: Element) => {
        const isAbove = target.getAttribute("data-testid") === "above";
        this.callback(
          [
            {
              target,
              isIntersecting: false,
              boundingClientRect: { bottom: isAbove ? -10 : 900 } as DOMRectReadOnly,
            } as IntersectionObserverEntry,
          ],
          this as unknown as IntersectionObserver,
        );
      };
      unobserve = () => {};
      disconnect = () => {};
    }
    const setupObserver = globalThis.IntersectionObserver;
    vi.stubGlobal("IntersectionObserver", BelowAndAboveObserver);

    render(
      <>
        <div className="reveal" data-testid="above" />
        <div className="reveal" data-testid="below" />
        <RevealObserver />
      </>,
    );

    expect(document.querySelector('[data-testid="above"]')).toHaveClass("is-visible");
    expect(document.querySelector('[data-testid="below"]')).not.toHaveClass("is-visible");

    vi.stubGlobal("IntersectionObserver", setupObserver);
  });
});

describe("RevealObserver with mutations", () => {
  it("doesn't re-observe an element that's moved while still pending, and ignores non-element mutations", async () => {
    const observeSpy = vi.fn();
    class SilentObserver {
      observe = observeSpy;
      unobserve = () => {};
      disconnect = () => {};
    }
    const setupObserver = globalThis.IntersectionObserver;
    vi.stubGlobal("IntersectionObserver", SilentObserver);

    render(<RevealObserver />);

    const moved = document.createElement("div");
    moved.className = "reveal";
    moved.dataset.testid = "moved";
    const originalParent = document.createElement("section");
    originalParent.append(moved);
    document.body.append(originalParent);

    await waitFor(() => expect(observeSpy).toHaveBeenCalledTimes(1));

    const newParent = document.createElement("section");
    document.body.append(newParent);
    newParent.append(moved);
    document.body.append(document.createTextNode("just some text"));

    await waitFor(() => expect(observeSpy).toHaveBeenCalledTimes(1));

    originalParent.remove();
    newParent.remove();
    vi.stubGlobal("IntersectionObserver", setupObserver);
  });
});

describe("RevealObserver after a scroll jump", () => {
  it("reveals elements carried above the viewport without ever crossing it", async () => {
    class SilentObserver {
      observe = () => {};
      unobserve = () => {};
      disconnect = () => {};
    }
    const setupObserver = globalThis.IntersectionObserver;
    vi.stubGlobal("IntersectionObserver", SilentObserver);

    render(
      <>
        <div className="reveal" data-testid="jumped-over" />
        <div className="reveal" data-testid="still-below" />
        <RevealObserver />
      </>,
    );

    const place = (testId: string, bottom: number) =>
      vi
        .spyOn(document.querySelector(`[data-testid="${testId}"]`)!, "getBoundingClientRect")
        .mockReturnValue({ bottom } as DOMRect);
    place("jumped-over", -200);
    place("still-below", 1400);

    fireEvent.scroll(window);

    await waitFor(() => {
      expect(document.querySelector('[data-testid="jumped-over"]')).toHaveClass("is-visible");
    });
    expect(document.querySelector('[data-testid="still-below"]')).not.toHaveClass("is-visible");

    vi.stubGlobal("IntersectionObserver", setupObserver);
  });
});

describe("RevealObserver's scroll handling", () => {
  it("coalesces scroll events into a single frame", () => {
    const rafSpy = vi.spyOn(window, "requestAnimationFrame");
    render(<RevealObserver />);

    fireEvent.scroll(window);
    fireEvent.scroll(window);

    expect(rafSpy).toHaveBeenCalledTimes(1);
    rafSpy.mockRestore();
  });
});
