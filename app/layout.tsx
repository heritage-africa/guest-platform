import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://cloud.heritage.africa"),
  title: {
    default: "Heritage - Cloud Solutions for African Businesses",
    template: "%s | Heritage"
  },
  description:
    "Powerful, scalable, and secure cloud infrastructure designed for African businesses. Enterprise-grade cloud services, data sovereignty, and 24/7 support.",
  keywords: [
    "cloud services",
    "African cloud",
    "data sovereignty",
    "enterprise cloud",
    "secure hosting",
    "cloud infrastructure",
    "African businesses",
    "compliance",
    "ISO 27001",
    "PCI DSS"
  ],
  authors: [{ name: "Heritage Team" }],
  creator: "Heritage",
  publisher: "Heritage",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "fr_FR",
    url: "https://cloud.heritage.africa",
    siteName: "Heritage",
    title: "Heritage - Cloud Solutions for African Businesses",
    description:
      "Powerful, scalable, and secure cloud infrastructure designed for African businesses.",
    images: [
      {
        url: "/hero-img.png",
        width: 1200,
        height: 675,
        alt: "Heritage Cloud Platform Dashboard"
      }
    ]
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      "index": true,
      "follow": true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },

  alternates: {
    canonical: "https://cloud.heritage.africa",
    languages: {
      en: "https://cloud.heritage.africa/en",
      fr: "https://cloud.heritage.africa/fr"
    }
  },
  category: "technology"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Heritage",
              "url": "https://cloud.heritage.africa",
              "logo": "https://cloud.heritage.africa/accel-logo.png",
              "description": "Cloud solutions for African businesses",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "SN",
                "addressLocality": "Dakar"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "contact@heritage.africa"
              },

              "offers": {
                "@type": "Service",
                "serviceType": "Cloud Infrastructure Services",
                "areaServed": "Africa"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
