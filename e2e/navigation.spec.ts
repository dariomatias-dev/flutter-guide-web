import { expect, test } from "@playwright/test";

const githubUrl = "https://github.com/dariomatias-dev/flutter_guide_app";
const playStoreUrl = "https://play.google.com/store/apps/details?id=com.dariomatias.flutter_guide";
const portfolioUrl = "https://dariomatias-dev.com/";

test.describe("header and footer links", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("header links to privacy policy, GitHub and the Play Store", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
      "href",
      "/privacy-policy",
    );

    await expect(page.getByRole("link", { name: "View on GitHub" })).toHaveAttribute(
      "href",
      githubUrl,
    );

    await expect(page.getByRole("link", { name: "Download App" })).toHaveAttribute(
      "href",
      playStoreUrl,
    );
  });

  test("footer links to the author's portfolio", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Dário Matias" })).toHaveAttribute(
      "href",
      portfolioUrl,
    );
  });
});

test.describe("mobile menu", () => {
  test("opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");

    await page.getByRole("button", { name: "Open menu" }).click();
    // The mobile menu duplicates the header's nav links; scope to the one
    // rendered inside the open menu, not the (hidden) desktop nav.
    await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();

    await page.getByRole("button", { name: "Close menu" }).click();
    await expect(page.getByRole("button", { name: "Close menu" })).not.toBeVisible();
  });

  test("opens as an accessible dialog, traps focus, and returns it on Escape", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");

    const openButton = page.getByRole("button", { name: "Open menu" });
    await openButton.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Tabbing through the whole menu should never leave the dialog.
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press("Tab");
      await expect(dialog.locator(":focus")).toHaveCount(1);
    }

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(openButton).toBeFocused();
  });
});

test.describe("screenshots carousel", () => {
  test("advances and goes back", async ({ page }) => {
    await page.goto("/");

    const nextButton = page.getByRole("button", { name: "Next screenshot" });
    const prevButton = page.getByRole("button", {
      name: "Previous screenshot",
    });
    const secondSlideDot = page.getByRole("button", { name: "Go to slide 2" });

    await expect(prevButton).toBeDisabled();

    await nextButton.click();
    await expect(secondSlideDot).toHaveClass(/bg-blue-500/);

    await prevButton.click();
    await expect(secondSlideDot).not.toHaveClass(/bg-blue-500/);
  });

  test("opens and closes the image viewer, with click and with Escape", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "View screenshot 1", exact: true }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await page.getByRole("button", { name: "Close Image Viewer" }).click();
    await expect(dialog).not.toBeVisible();

    await page.getByRole("button", { name: "View screenshot 1", exact: true }).click();
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });

  test("traps focus while open and returns it to the thumbnail on Escape", async ({ page }) => {
    await page.goto("/");

    const thumbnail = page.getByRole("button", { name: "View screenshot 1", exact: true });
    await thumbnail.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    for (let i = 0; i < 5; i++) {
      await page.keyboard.press("Tab");
      await expect(dialog.locator(":focus")).toHaveCount(1);
    }

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(thumbnail).toBeFocused();
  });
});

test.describe("FAQ", () => {
  test("expands a question", async ({ page }) => {
    await page.goto("/");

    const question = page.getByRole("button", {
      name: "Is the app completely free?",
    });
    const answer = page.getByText("Yes, FlutterGuide is free and open-source", {
      exact: false,
    });

    await expect(answer).not.toBeVisible();
    await question.click();
    await expect(answer).toBeVisible();
  });

  test("shows a visible focus ring on keyboard focus", async ({ page }) => {
    await page.goto("/");

    const question = page.getByRole("button", {
      name: "Is the app completely free?",
    });
    await question.focus();

    await expect(async () => {
      const boxShadow = await question.evaluate((el) => getComputedStyle(el).boxShadow);
      expect(boxShadow).toContain("3px");
    }).toPass();
  });
});
