import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";

/** Plus Jakarta Sans, exposed as `--font-jakarta`. */
export const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
