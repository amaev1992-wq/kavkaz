import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteConfig.siteUrl,
    siteName: "Кавказ-Автогаз — франшиза",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    // TODO: добавьте OG-изображение (реальное фото станции, 1200×630)
    // в public/images/og.jpg и раскомментируйте:
    // images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1E1E1E",
};

// Structured data: только достоверные сведения о компании,
// без рейтингов, отзывов и количества франчайзи.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Кавказ-Автогаз",
  url: siteConfig.mainSiteUrl,
  foundingDate: "2006",
  description:
    "Сеть автогазозаправочных станций «Кавказ-Автогаз». Оптовые поставки СУГ, собственная логистика и розничная сеть АГЗС/АЗС. Франшиза АГЗС.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
