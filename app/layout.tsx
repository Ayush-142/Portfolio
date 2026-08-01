import type { Metadata } from "next";
import { Spectral, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { profile } from "@/content/profile";
import "./globals.css";

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    document.documentElement.setAttribute("data-theme", theme);
    var meta = document.getElementById("theme-color-meta");
    if (!meta) {
      meta = document.createElement("meta");
      meta.id = "theme-color-meta";
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", theme === "dark" ? "#101317" : "#edeef0");
  } catch (e) {}
})();
`;

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["600"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: profile.name,
  description: profile.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spectral.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <head>
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <header className="mx-auto w-full max-w-180 px-6 pt-8">
          <Nav />
        </header>
        <main className="mx-auto w-full max-w-180 flex-1 px-6 py-8">
          {children}
        </main>
        <div className="mx-auto w-full max-w-180 px-6">
          <Footer />
        </div>
      </body>
    </html>
  );
}
