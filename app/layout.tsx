import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import EntryGate from "@/components/EntryGate";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import PageTransition from "@/components/PageTransition";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const site = "https://satriz.club";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: "Satriz Club — coletivo criativo",
  description:
    "Satriz Club é um coletivo que cria software, editorial e moda sob uma marca só. Começa pelo estúdio que constrói produtos digitais de verdade.",
  keywords: [
    "Satriz Club",
    "estúdio criativo",
    "software house",
    "desenvolvimento web",
    "Next.js",
    "coletivo criativo",
  ],
  openGraph: {
    title: "Satriz Club — coletivo criativo",
    description:
      "Software, editorial e moda sob uma marca só. Entre pro club.",
    url: site,
    siteName: "Satriz Club",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Satriz Club — coletivo criativo",
    description:
      "Software, editorial e moda sob uma marca só. Entre pro club.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${bricolage.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="grain min-h-screen bg-ink font-sans text-bone">
        <EntryGate />
        <PageTransition>
          <Nav />
          {children}
          <Footer />
          <WhatsAppFab />
        </PageTransition>
      </body>
    </html>
  );
}
