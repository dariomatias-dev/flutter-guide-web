import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { LocaleMenu } from "@/features/layout/components/locale-menu";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("LocaleMenu", () => {
  it("shows the current language and opens a menu with every locale", async () => {
    const user = userEvent.setup();
    renderWithIntl(<LocaleMenu />);

    const trigger = screen.getByRole("button", { name: "Language: English" });
    expect(trigger).toHaveTextContent("English");

    trigger.focus();
    await user.keyboard("{Enter}");

    const items = screen.getAllByRole("menuitem");
    expect(items.map((item) => item.textContent)).toEqual(["English", "Português", "Español"]);
    expect(screen.getByRole("menuitem", { name: "Português" })).toHaveAttribute("href", "/pt-BR");
    expect(screen.getByRole("menuitem", { name: "Español" })).toHaveAttribute("lang", "es");
  });

  it("marks the active locale", async () => {
    const user = userEvent.setup();
    renderWithIntl(<LocaleMenu />);

    screen.getByRole("button", { name: "Language: English" }).focus();
    await user.keyboard("{Enter}");

    expect(screen.getByRole("menuitem", { name: "English" })).toHaveAttribute(
      "aria-current",
      "true",
    );
    expect(screen.getByRole("menuitem", { name: "Português" })).not.toHaveAttribute("aria-current");
  });

  it("opens from the keyboard and closes with Escape", async () => {
    const user = userEvent.setup();
    renderWithIntl(<LocaleMenu />);

    screen.getByRole("button", { name: "Language: English" }).focus();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("menu")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
