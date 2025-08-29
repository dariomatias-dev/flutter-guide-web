"use client";

import { LinkButton } from "../link-button";
import { playStoreUrl } from "@/constants/constants";

export const PlayStoreButton = () => {
  return (
    <LinkButton href={playStoreUrl} className="h-auto">
      Download on Google Play
    </LinkButton>
  );
};
