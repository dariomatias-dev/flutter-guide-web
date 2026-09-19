import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import messages from "../../../messages/en.json";

import type { RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";

export const renderWithIntl = (ui: ReactElement, options?: RenderOptions) =>
  render(
    <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
      {ui}
    </NextIntlClientProvider>,
    options,
  );
