import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LocaleSwitcher } from "@/features/layout/components/locale-switcher";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("LocaleSwitcher", () => {
  it("links the current page to each locale, named in its own language", () => {
    renderWithIntl(<LocaleSwitcher />);

    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Português" })).toHaveAttribute("href", "/pt-BR");
    expect(screen.getByRole("link", { name: "Español" })).toHaveAttribute("href", "/es");
    expect(screen.getByRole("link", { name: "Español" })).toHaveAttribute("lang", "es");
  });

  it("marks the active locale", () => {
    renderWithIntl(<LocaleSwitcher />);

    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("link", { name: "Português" })).not.toHaveAttribute("aria-current");
  });
});
