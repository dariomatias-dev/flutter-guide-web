export type ChangeType = "added" | "changed" | "deprecated" | "removed" | "fixed" | "security";

export interface ReleaseSection {
  type: ChangeType;
  items: string[];
}

export interface Release {
  version: string;
  date: string | null;
  summary: string[];
  sections: ReleaseSection[];
  compareUrl?: string | null;
}
