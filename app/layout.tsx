import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import rawData from "@/data/templates.json";
import type { CyberSecurityTemplateData } from "@/types/templates.types";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], fallback: ["Arial", "sans-serif"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "600", "700", "800"], fallback: ["Arial", "sans-serif"], variable: "--font-jakarta" });

const templateData: CyberSecurityTemplateData = rawData;
const sectionData = templateData.categories.CyberSecurity.sections;
const commonData = templateData.common;
const headerData = sectionData.Header?.variants?.CyberSecurityHeader1;

const fontVariables = {
  "--font-primary": commonData.theme.fonts.primary,
  "--font-heading": commonData.theme.fonts.heading,
} as CSSProperties;

export const metadata: Metadata = {
  title: commonData.metadata.title,
  description: commonData.metadata.description,
  icons: {
    icon: commonData.metadata.icon,
    shortcut: commonData.metadata.icon,
    apple: commonData.metadata.icon,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={commonData.metadata.lang}
      style={fontVariables}
      data-scroll-behavior="smooth"
      // Root font size: 16px, and from 1024px up it follows the 1440px design (1rem = 1/90 of the screen, at most 16px),
      // so 1024px shows exactly the 1440px layout, only smaller. Every size on the page is in rem, so it all scales together.
      // Header and footer links scroll smoothly to their section on this one page. Everything clickable gets the pointer.
      className={`${inter.variable} ${jakarta.variable} h-full text-[16px] lg:text-[length:min(16px,calc(100vw/90))] scroll-smooth antialiased [&_:where(a[href],button:not(:disabled),select,summary,[role=button])]:cursor-pointer motion-reduce:scroll-auto motion-reduce:[&_*]:!duration-[0.01ms]`}
    >
      <body className="min-h-full bg-[var(--color-bg-backdrop)] font-sans text-[var(--color-text)] selection:bg-[var(--color-primary)] selection:text-[var(--color-white)]">
        {/*
          The whole site sits in one frame, at most 1920px wide and centred. Up to 1920px it fills the screen, so
          nothing changes; on wider screens or when the browser is zoomed out the page stays in the middle with
          equal space on both sides instead of stretching.
          --section-gap is the same space above and below every section: 4.5rem on phones and tablets, 6rem on
          desktop (96px at 1440px; it scales with the page, see the font size above).
        */}
        <div className="mx-auto flex min-h-screen w-full max-w-[120rem] flex-col overflow-x-clip bg-[var(--color-bg-main)] [--section-gap:4.5rem] lg:[--section-gap:6rem]">
          <Header data={headerData} company={commonData.company} />
          {children}
          <ScrollReveal />
          <Footer data={commonData.Footer} company={commonData.company} links={headerData?.navLinks} />
        </div>
      </body>
    </html>
  );
}
