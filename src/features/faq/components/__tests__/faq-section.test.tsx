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

    // Not toBeVisible(): the item's whileInView entrance animation leaves
    // it at opacity: 0 in jsdom (see e2e/navigation.spec.ts for the real
    // browser check).
    expect(await screen.findByText(answer)).toBeInTheDocument();
    expect(questionButton).toHaveAttribute("aria-expanded", "true");
  });
});
