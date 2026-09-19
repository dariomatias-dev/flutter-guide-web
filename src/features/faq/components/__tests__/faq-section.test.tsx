import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { FaqSection } from "@/features/faq/components/faq-section";
import { faqs } from "@/features/faq/data/faqs";
import { renderWithIntl } from "@/shared/lib/test-utils";

import messages from "../../../../../messages/en.json";

describe("FaqSection", () => {
  it("renders every question", () => {
    renderWithIntl(<FaqSection />);

    for (const faq of faqs) {
      const question = messages.Faq.items[faq.key as keyof typeof messages.Faq.items].question;
      expect(screen.getByRole("button", { name: question })).toBeInTheDocument();
    }
  });

  it("expands a question to reveal its answer", async () => {
    const user = userEvent.setup();
    renderWithIntl(<FaqSection />);

    const [first] = faqs;
    const { question, answer } = messages.Faq.items[first.key as keyof typeof messages.Faq.items];
    const questionButton = screen.getByRole("button", { name: question });

    expect(screen.queryByText(answer)).not.toBeInTheDocument();
    await user.click(questionButton);

    expect(await screen.findByText(answer)).toBeInTheDocument();
    expect(questionButton).toHaveAttribute("aria-expanded", "true");
  });

  it("links to GitHub issues for anything not covered", () => {
    renderWithIntl(<FaqSection />);

    expect(screen.getByRole("link", { name: /Ask on GitHub/ })).toHaveAttribute(
      "href",
      "https://github.com/dariomatias-dev/flutter_guide_app/issues",
    );
  });
});
