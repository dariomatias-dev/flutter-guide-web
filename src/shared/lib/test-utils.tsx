import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import messages from "../../../messages/en.json";

import type { RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";

// Wraps `render` with the same `NextIntlClientProvider` the real app tree
// provides, so components using `useTranslations()` work in tests without
// each test file wiring its own provider.
export const renderWithIntl = (ui: ReactElement, options?: RenderOptions) =>
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>,
    options,
  );
