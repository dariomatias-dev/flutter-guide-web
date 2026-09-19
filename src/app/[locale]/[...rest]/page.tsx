import { notFound } from "next/navigation";

/** Any subpath under a valid locale that doesn't match a real page lands here. */
export default function CatchAll(): never {
  notFound();
}
