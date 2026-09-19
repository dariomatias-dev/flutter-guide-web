"use client";

import { useEffect } from "react";

const SELECTOR = ".reveal:not(.is-visible)";

/** Reveals `.reveal` elements the first time they scroll into view. */
export const RevealObserver = () => {
  useEffect(() => {
    const pending = new Set<Element>();

    const reveal = (element: Element) => {
      element.classList.add("is-visible");
      pending.delete(element);
      observer.unobserve(element);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) reveal(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    const track = (element: Element) => {
      if (pending.has(element)) return;
      pending.add(element);
      observer.observe(element);
    };

    const trackWithin = (root: ParentNode) => {
      if (root instanceof Element && root.matches(SELECTOR)) track(root);
      root.querySelectorAll(SELECTOR).forEach(track);
    };

    let frame = 0;
    const revealPassed = () => {
      frame = 0;
      for (const element of pending) {
        if (element.getBoundingClientRect().bottom < 0) reveal(element);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(revealPassed);
    };

    trackWithin(document);
    window.addEventListener("scroll", onScroll, { passive: true });

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) trackWithin(node);
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
};
