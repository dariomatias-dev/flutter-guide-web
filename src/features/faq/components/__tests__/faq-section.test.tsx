import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { FaqSection } from "@/features/faq/components/faq-section";
import { faqs } from "@/features/faq/data/faqs";

describe("FaqSection", () => {
  it("renders every question", () => {
    render(<FaqSection />);

    for (const faq of faqs) {
      expect(screen.getByRole("button", { name: faq.question })).toBeInTheDocument();
    }
  });

  it("expands a question to reveal its answer", async () => {
    const user = userEvent.setup();
    render(<FaqSection />);

    const [first] = faqs;
    const question = screen.getByRole("button", { name: first.question });

    expect(screen.queryByText(first.answer)).not.toBeInTheDocument();
    await user.click(question);

    // Not toBeVisible(): the item's whileInView entrance animation leaves
    // it at opacity: 0 in jsdom (see e2e/navigation.spec.ts for the real
    // browser check).
    expect(await screen.findByText(first.answer)).toBeInTheDocument();
    expect(question).toHaveAttribute("aria-expanded", "true");
  });
});
