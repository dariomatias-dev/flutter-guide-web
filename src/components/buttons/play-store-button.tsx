"use client";

import { playStoreUrl } from "@/constants/constants";

import { LinkButton } from "../link-button";

export const PlayStoreButton = () => {
  return (
    <LinkButton href={playStoreUrl} className="h-auto">
      Download on Google Play
    </LinkButton>
  );
};
