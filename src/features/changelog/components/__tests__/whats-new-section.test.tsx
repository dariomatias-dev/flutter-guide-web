import { screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { WhatsNewSection } from "@/features/changelog/components/whats-new-section";
import { renderWithIntl } from "@/shared/lib/test-utils";

import { changelogFixture } from "../../lib/__tests__/fixture";

describe("WhatsNewSection", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the fetched changelog's latest releases", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(async () => new Response(changelogFixture));

    renderWithIntl(await WhatsNewSection());

    expect(screen.getByRole("heading", { name: "v1.3.0" })).toBeInTheDocument();
  });
});
