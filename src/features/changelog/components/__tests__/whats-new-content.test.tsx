import { render, screen, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";

import { WhatsNewContent } from "@/features/changelog/components/whats-new-content";
import { parseChangelog } from "@/features/changelog/lib/parse-changelog";
import { renderWithIntl } from "@/shared/lib/test-utils";

import ptBR from "../../../../../messages/pt-BR.json";
import { changelogFixture } from "../../lib/__tests__/fixture";

const releases = parseChangelog(changelogFixture);

describe("WhatsNewContent", () => {
  it("previews the three newest releases, marking the latest", () => {
    renderWithIntl(<WhatsNewContent releases={releases} />);

    const versions = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(versions).toEqual(["v1.3.0", "v1.2.3", "v1.0.1"]);
    expect(screen.getAllByText("Latest")).toHaveLength(1);
  });

  it("shows the first entries with their type, and links to the rest", () => {
    renderWithIntl(<WhatsNewContent releases={releases} />);

    const latest = screen.getByRole("heading", { name: "v1.3.0" }).closest("article")!;
    expect(within(latest).getAllByRole("listitem")).toHaveLength(3);
    expect(within(latest).getAllByText("Added")).toHaveLength(2);
    expect(within(latest).getByRole("link", { name: "+2 more changes" })).toHaveAttribute(
      "href",
      "/changelog#v1-3-0",
    );
  });

  it("links to the full changelog page", () => {
    renderWithIntl(<WhatsNewContent releases={releases} />);

    expect(screen.getByRole("link", { name: /Full changelog/ })).toHaveAttribute(
      "href",
      "/changelog",
    );
  });

  it("falls back to GitHub when the changelog couldn't be loaded", () => {
    renderWithIntl(<WhatsNewContent releases={null} />);

    expect(screen.getByRole("link", { name: "Read it on GitHub" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 3 })).not.toBeInTheDocument();
  });

  it("shows a release's summary when it lists no entries", () => {
    renderWithIntl(
      <WhatsNewContent releases={parseChangelog("## [0.1.0] - 2024-01-01\nFirst build.\n")} />,
    );

    expect(screen.getByText("First build.")).toBeInTheDocument();
  });

  it("notes that release notes are in English on other locales", () => {
    render(
      <NextIntlClientProvider locale="pt-BR" messages={ptBR} timeZone="UTC">
        <WhatsNewContent releases={releases} />
      </NextIntlClientProvider>,
    );

    expect(screen.getByText(/publicadas em inglês/)).toBeInTheDocument();
  });
});
