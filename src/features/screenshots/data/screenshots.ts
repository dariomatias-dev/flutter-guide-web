export interface Screenshot {
  src: string;
  key: string;
}

/** App screenshots from flutter_guide_app's scripts/screenshot.sh, in carousel order. */
export const screenshots: Screenshot[] = [
  { src: "/screenshots/01_home.png", key: "home" },
  { src: "/screenshots/02_catalog_elements.png", key: "elements" },
  { src: "/screenshots/03_catalog_uis.png", key: "uis" },
  { src: "/screenshots/04_elements_tab.png", key: "catalog" },
  { src: "/screenshots/05_component_detail.png", key: "preview" },
  { src: "/screenshots/06_component_code.png", key: "code" },
  { src: "/screenshots/07_packages_tab.png", key: "packages" },
  { src: "/screenshots/08_settings.png", key: "settings" },
  { src: "/screenshots/09_code_theme_selector.png", key: "codeThemes" },
];
