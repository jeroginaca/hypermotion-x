import type { Metadata } from "next";
import localFont from "next/font/local";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const mangoGrotesque = localFont({
  src: [
    { path: "./fonts/MangoGrotesque-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/MangoGrotesque-Medium.woff2",  weight: "500", style: "normal" },
    { path: "./fonts/MangoGrotesque-Bold.woff2",    weight: "700", style: "normal" },
  ],
  variable: "--font-mango-grotesque",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hypermotion X — Electrifying the Future",
  description: "The next generation electric supercar",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  let settings: any = null;
  try { settings = await client.fetch(siteSettingsQuery); } catch {}

  return (
    <html lang="en" className={mangoGrotesque.variable}>
      <body className="antialiased">
        <Navbar
          navLinks={settings?.navLinks ?? []}
          primaryCta={settings?.primaryCta}
          secondaryCta={settings?.secondaryCta}
        />
        {children}
      </body>
    </html>
  );
}
