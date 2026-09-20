import { fireEvent, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Header } from "@/features/layout/components/header";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("Header", () => {
  it("links to the page's own sections", () => {
    renderWithIntl(<Header />);

    const nav = screen.getByRole("navigation", { name: "Primary" });
    const links = within(nav)
      .getAllByRole("link")
      .map((link) => [link.textContent, link.getAttribute("href")]);
    expect(links).toEqual([
      ["Features", "/#features"],
      ["Examples", "/#examples"],
      ["Catalog", "/#catalog"],
      ["Screenshots", "/#showcase"],
      ["FAQ", "/#faq"],
    ]);
  });

  it("links to GitHub and the Play Store", () => {
    renderWithIntl(<Header />);

    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/dariomatias-dev/flutter_guide_app",
    );
    expect(screen.getByRole("link", { name: "Get the app" })).toHaveAttribute(
      "href",
      "https://play.google.com/store/apps/details?id=com.dariomatias.flutter_guide",
    );
  });

  it("turns solid once the page scrolls", () => {
    renderWithIntl(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("bg-transparent");

    Object.defineProperty(window, "scrollY", { value: 200, configurable: true });
    fireEvent.scroll(window);
    expect(header).not.toHaveClass("bg-transparent");

    Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
    fireEvent.scroll(window);
    expect(header).toHaveClass("bg-transparent");
  });

  it("opens and closes the mobile menu", async () => {
    const user = userEvent.setup();
    renderWithIntl(<Header />);

    expect(screen.queryByRole("button", { name: "Close menu" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("button", { name: "Close menu" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close menu" }));
    expect(screen.queryByRole("button", { name: "Close menu" })).not.toBeInTheDocument();
  });

  it("opens the mobile menu as an accessible dialog and closes it with Escape", async () => {
    const user = userEvent.setup();
    renderWithIntl(<Header />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes the mobile menu after navigating to one of its links", async () => {
    const user = userEvent.setup();
    renderWithIntl(<Header />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const dialog = screen.getByRole("dialog");
    await user.click(within(dialog).getByRole("link", { name: "Screenshots" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("underlines the nav link of the section in view, and only nav-linked ones", () => {
    const main = document.createElement("main");
    main.innerHTML = '<section id="hero"></section><section id="catalog"></section>';
    document.body.append(main);

    renderWithIntl(<Header />);

    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(within(nav).getByRole("link", { name: "Catalog" })).toHaveAttribute(
      "aria-current",
      "true",
    );
    expect(within(nav).getByRole("link", { name: "Features" })).not.toHaveAttribute("aria-current");

    main.remove();
  });

  it("doesn't move the underline for a section that isn't in view", () => {
    class NeverIntersecting {
      constructor(private callback: IntersectionObserverCallback) {}
      observe = (target: Element) => {
        this.callback(
          [{ target, isIntersecting: false } as IntersectionObserverEntry],
          this as unknown as IntersectionObserver,
        );
      };
      unobserve = () => {};
      disconnect = () => {};
    }
    const setupObserver = globalThis.IntersectionObserver;
    vi.stubGlobal("IntersectionObserver", NeverIntersecting);

    const main = document.createElement("main");
    main.innerHTML = '<section id="hero"></section>';
    document.body.append(main);

    renderWithIntl(<Header />);

    const nav = screen.getByRole("navigation", { name: "Primary" });
    for (const link of within(nav).getAllByRole("link")) {
      expect(link).not.toHaveAttribute("aria-current");
    }

    main.remove();
    vi.stubGlobal("IntersectionObserver", setupObserver);
  });

  it("offers a language picker, and a language list in the mobile menu", async () => {
    const user = userEvent.setup();
    renderWithIntl(<Header />);

    expect(screen.getByRole("button", { name: "Language: English" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("navigation", { name: "Language" })).toBeInTheDocument();
  });

  it("drops both language pickers when told to", async () => {
    const user = userEvent.setup();
    renderWithIntl(<Header showLocaleMenu={false} />);

    expect(screen.queryByRole("button", { name: /^Language/ })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.queryByRole("navigation", { name: "Language" })).not.toBeInTheDocument();
  });
});
