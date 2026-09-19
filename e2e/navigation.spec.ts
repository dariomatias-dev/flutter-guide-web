import { expect, test } from "@playwright/test";

const githubUrl = "https://github.com/dariomatias-dev/flutter_guide_app";
const playStoreUrl = "https://play.google.com/store/apps/details?id=com.dariomatias.flutter_guide";
const portfolioUrl = "https://dariomatias-dev.com/";

test.describe("header and footer links", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("header links to GitHub and the Play Store", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop nav only; mobile uses the hamburger menu");

    const header = page.locator("header");

    await expect(header.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", githubUrl);
    await expect(header.getByRole("link", { name: "Get the app" })).toHaveAttribute(
      "href",
      playStoreUrl,
    );
  });

  test("header links to the page's own sections", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop nav only; mobile uses the hamburger menu");

    const nav = page.getByRole("navigation", { name: "Primary" });

    for (const [name, href] of [
      ["Features", "/#features"],
      ["Examples", "/#examples"],
      ["Catalog", "/#catalog"],
      ["Screenshots", "/#showcase"],
      ["FAQ", "/#faq"],
    ]) {
      await expect(nav.getByRole("link", { name })).toHaveAttribute("href", href);
    }
  });

  test("footer links to the privacy policy, the Play Store, and social profiles", async ({
    page,
  }) => {
    const footer = page.locator("footer");

    await expect(footer.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
      "href",
      "/privacy-policy",
    );
    await expect(footer.getByRole("link", { name: "Google Play" })).toHaveAttribute(
      "href",
      playStoreUrl,
    );
    await expect(footer.getByRole("link", { name: "Instagram" })).toHaveAttribute(
      "href",
      "https://www.instagram.com/dariomatias_dev/",
    );
    await expect(footer.getByRole("link", { name: "Dário Matias" })).toHaveAttribute(
      "href",
      portfolioUrl,
    );
  });

  test("serves English at the root, whatever language the browser asks for", async ({
    browser,
  }) => {
    const context = await browser.newContext({ locale: "pt-BR" });
    const page = await context.newPage();

    await page.goto("/");

    await expect(page).toHaveURL(/vercel\.app\/$|localhost:\d+\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Learn Flutter");

    await context.close();
  });

  test("switching back to English lands on the unprefixed page", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop header only; mobile lists languages in the menu");

    await page.goto("/pt-BR");
    await page.locator("header").getByRole("button", { name: "Idioma: Português" }).click();
    await page.getByRole("menuitem", { name: "English" }).click();

    await expect(page).toHaveURL(/vercel\.app\/$|localhost:\d+\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Learn Flutter");
  });

  test("header switches the page's language", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop header only; mobile lists languages in the menu");

    await page.locator("header").getByRole("button", { name: "Language: English" }).click();
    await page.getByRole("menuitem", { name: "Español" }).click();

    await expect(page).toHaveURL(/\/es$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Aprende Flutter");
  });
});

test.describe("skip link", () => {
  test("is the first focusable element and moves focus to the main content", async ({ page }) => {
    await page.goto("/");

    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Skip to content" });
    await expect(skipLink).toBeFocused();

    await skipLink.click();
    await expect(page.locator("#main-content")).toBeFocused();
  });
});

test.describe("mobile menu", () => {
  test("opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");

    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();

    await page.getByRole("button", { name: "Close menu" }).click();
    await expect(page.getByRole("button", { name: "Close menu" })).not.toBeVisible();
  });

  test("links to the page's own sections", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");

    await page.getByRole("button", { name: "Open menu" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog.getByRole("link", { name: "Screenshots" })).toHaveAttribute(
      "href",
      "/#showcase",
    );
    await expect(dialog.getByRole("link", { name: "Features" })).toHaveAttribute(
      "href",
      "/#features",
    );
    await expect(dialog.getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "/#faq");
  });

  test("opens as an accessible dialog, traps focus, and returns it on Escape", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");

    const openButton = page.getByRole("button", { name: "Open menu" });
    await openButton.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

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
    await expect(secondSlideDot).toHaveAttribute("aria-current", "true");

    await prevButton.click();
    await expect(secondSlideDot).not.toHaveAttribute("aria-current");
  });

  test("dot buttons meet the 24px minimum touch target size", async ({ page }) => {
    await page.goto("/");

    const box = await page.getByRole("button", { name: "Go to slide 1" }).boundingBox();

    expect(box?.width).toBeGreaterThanOrEqual(24);
    expect(box?.height).toBeGreaterThanOrEqual(24);
  });

  test("opens and closes the image viewer, with click and with Escape", async ({ page }) => {
    await page.goto("/");

    await page
      .getByRole("button", { name: "Enlarge screenshot: Home, with every component group" })
      .click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await page.getByRole("button", { name: "Close image viewer" }).click();
    await expect(dialog).not.toBeVisible();

    await page
      .getByRole("button", { name: "Enlarge screenshot: Home, with every component group" })
      .click();
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });

  test("traps focus while open and returns it to the slide on Escape", async ({ page }) => {
    await page.goto("/");

    const thumbnail = page.getByRole("button", {
      name: "Enlarge screenshot: Home, with every component group",
    });
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

test.describe("screenshot viewer", () => {
  test("closes on a click beside the screenshot, but not on the screenshot itself", async ({
    page,
  }) => {
    await page.goto("/");

    await page
      .getByRole("button", { name: "Enlarge screenshot: Home, with every component group" })
      .click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await dialog.getByRole("img").click();
    await expect(dialog).toBeVisible();

    await page.mouse.click(10, 10);
    await expect(dialog).not.toBeVisible();
  });
});

test.describe("FAQ", () => {
  test("expands a question", async ({ page }) => {
    await page.goto("/");

    const question = page.getByRole("button", {
      name: "Is FlutterGuide really free?",
    });
    const answer = page.getByText("There's no premium tier and no account", {
      exact: false,
    });

    await expect(answer).not.toBeVisible();
    await question.click();
    await expect(answer).toBeVisible();
  });

  test("shows a visible focus ring on keyboard focus", async ({ page }) => {
    await page.goto("/");

    const question = page.getByRole("button", {
      name: "Is FlutterGuide really free?",
    });
    await question.focus();

    await expect(async () => {
      const boxShadow = await question.evaluate((el) => getComputedStyle(el).boxShadow);
      expect(boxShadow).toContain("3px");
    }).toPass();
  });
});
