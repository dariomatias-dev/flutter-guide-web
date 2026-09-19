/** Renderers for the `<hl>` tag in section titles, for next-intl's `t.rich`. */
export const highlightOnDark = (chunks: React.ReactNode) => (
  <span className="text-brand-300">{chunks}</span>
);

export const highlightOnLight = (chunks: React.ReactNode) => (
  <span className="text-brand-600">{chunks}</span>
);
