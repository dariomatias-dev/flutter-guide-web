import { siteDescription, siteName } from "@/shared/lib/site";

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: siteName,
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#101214",
    theme_color: "#101214",
    icons: [
      {
        src: "/flutter_guide_icon.png",
        sizes: "900x900",
        type: "image/png",
      },
    ],
  };
}
