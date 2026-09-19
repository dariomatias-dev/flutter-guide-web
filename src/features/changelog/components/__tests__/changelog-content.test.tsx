import { render, screen, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";

import { ChangelogContent } from "@/features/changelog/components/changelog-content";
import { parseChangelog } from "@/features/changelog/lib/parse-changelog";
import { renderWithIntl } from "@/shared/lib/test-utils";

import ptBR from "../../../../../messages/pt-BR.json";
import { changelogFixture } from "../../lib/__tests__/fixture";

const releases = parseChangelog(changelogFixture);

describe("ChangelogContent", () => {
  it("renders every release, newest first, with its date", () => {
    renderWithIntl(<ChangelogContent releases={releases} />);

    const titles = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    expect(titles).toEqual(["v1.3.0", "v1.2.3", "v1.0.1", "v1.0.0"]);

    const latest = screen.getByRole("article", { name: "v1.3.0" });
    expect(within(latest).getByText("August 1, 2026")).toBeInTheDocument();
    expect(within(latest).getByText("Latest")).toBeInTheDocument();
  });

  it("groups entries under typed sections, with inline code", () => {
    renderWithIntl(<ChangelogContent releases={releases} />);

    const latest = screen.getByRole("article", { name: "v1.3.0" });
    const sections = within(latest).getAllByRole("heading", { level: 3 });
    expect(sections.map((h) => h.textContent)).toEqual(["Added", "Changed", "Fixed"]);
    expect(within(latest).getByText("PaginatedDataTable").tagName).toBe("CODE");
  });

  it("shows a release summary and links to its GitHub compare view", () => {
    renderWithIntl(<ChangelogContent releases={releases} />);

    expect(screen.getByText("Initial public release.")).toBeInTheDocument();
    const latest = screen.getByRole("article", { name: "v1.3.0" });
    expect(within(latest).getByRole("link", { name: /Compare changes/ })).toHaveAttribute(
      "href",
      "https://github.com/x/y/compare/v1.2.3...v1.3.0",
    );
  });

  it("lists every version in the side navigation, linking to its anchor", () => {
    renderWithIntl(<ChangelogContent releases={releases} />);

    const nav = screen.getByRole("navigation", { name: "Versions" });
    expect(within(nav).getAllByRole("link")).toHaveLength(4);
    expect(within(nav).getByRole("link", { name: /1\.3\.0/ })).toHaveAttribute("href", "#v1-3-0");
    expect(screen.getByText(/1\.3\.0/, { selector: "p.font-mono" })).toBeInTheDocument();
    expect(screen.getByText(/4 releases/)).toBeInTheDocument();
  });

  it("falls back to a link to GitHub when the changelog couldn't be loaded", () => {
    renderWithIntl(<ChangelogContent releases={null} />);

    expect(screen.getByText("The changelog couldn't be loaded right now.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Read it on GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/dariomatias-dev/flutter_guide_app/blob/main/CHANGELOG.md",
    );
    expect(screen.queryByRole("navigation", { name: "Versions" })).not.toBeInTheDocument();
  });

  it("titles an undated [Unreleased] entry without a version prefix", () => {
    renderWithIntl(
      <ChangelogContent
        releases={parseChangelog(`## [Unreleased]\n### Added\n- Soon\n${changelogFixture}`)}
      />,
    );

    expect(screen.getByRole("heading", { level: 2, name: "Unreleased" })).toBeInTheDocument();
    expect(screen.getByRole("article", { name: "v1.3.0" })).toHaveTextContent("Latest");
  });

  it("notes that release notes are in English on other locales", () => {
    render(
      <NextIntlClientProvider locale="pt-BR" messages={ptBR} timeZone="UTC">
        <ChangelogContent releases={releases} />
      </NextIntlClientProvider>,
    );

    expect(screen.getByText(/publicadas em inglês/)).toBeInTheDocument();
  });
});
