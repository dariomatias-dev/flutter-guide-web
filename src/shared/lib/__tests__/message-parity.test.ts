import { describe, expect, it } from "vitest";

import en from "../../../../messages/en.json";
import es from "../../../../messages/es.json";
import ptBR from "../../../../messages/pt-BR.json";

function collectKeys(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) return [prefix];
  if (value !== null && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) =>
      collectKeys(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
}

describe("message key parity", () => {
  const enKeys = collectKeys(en).sort();

  it("pt-BR has the same keys as en", () => {
    expect(collectKeys(ptBR).sort()).toEqual(enKeys);
  });

  it("es has the same keys as en", () => {
    expect(collectKeys(es).sort()).toEqual(enKeys);
  });
});
