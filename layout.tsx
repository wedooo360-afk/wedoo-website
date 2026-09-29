import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import "@/styles/globals.css";
import { site } from "@/lib/site";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";
import TransitionProvider from "@/components/TransitionProvider";

const archivo = localFont({
  src: "./fonts/Archivo-Variable.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s / ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#f1f0eb",
  width: "device-width",
  initialScale: 1,
};

// Runs before paint: enables reveal states only when JS + motion are available.
const boot = `(function(){var d=document.documentElement;d.classList.add('js');if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('reduced');})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll>
          <TransitionProvider>
            <Header />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Contact />
            <CustomCursor />
          </TransitionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
