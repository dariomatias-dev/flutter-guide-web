import { getChangelog } from "@/features/changelog/lib/get-changelog";

import { WhatsNewContent } from "./whats-new-content";

/** Fetches the changelog and previews its latest releases. */
export const WhatsNewSection = async () => <WhatsNewContent releases={await getChangelog()} />;
