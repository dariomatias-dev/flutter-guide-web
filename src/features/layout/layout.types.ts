export interface NavLink {
  href: string;
  labelKey: "features" | "examples" | "catalog" | "screenshots" | "faq";
}

export interface FooterLink {
  href: string;
  labelKey: string;
  external?: boolean;
}

export interface FooterColumn {
  titleKey: "app" | "resources" | "openSource" | "support";
  links: FooterLink[];
}
