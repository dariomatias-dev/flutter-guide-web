import { splitInlineCode } from "@/features/changelog/lib/parse-changelog";

/** A changelog entry, with its `backtick` spans rendered as code. */
export const EntryText = ({ text }: { text: string }) => (
  <>
    {splitInlineCode(text).map((part, index) =>
      part.code ? (
        <code
          key={index}
          className="bg-paper-muted text-heading rounded px-1 py-0.5 font-mono text-[0.85em]"
        >
          {part.text}
        </code>
      ) : (
        <span key={index}>{part.text}</span>
      ),
    )}
  </>
);
