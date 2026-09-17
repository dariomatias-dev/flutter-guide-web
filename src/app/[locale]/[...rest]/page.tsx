import { notFound } from "next/navigation";

// Any subpath under a valid locale that doesn't match a real page lands
// here. Without this catch-all, Next.js's automatic 404 for an unmatched
// route bypasses the nested `not-found.tsx` and falls back to its
// generic, unstyled default — this route exists purely to force that
// nested boundary to render instead.
export default function CatchAll(): never {
  notFound();
}
