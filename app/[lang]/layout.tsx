import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Footer from "@/components/footer";
import type { Metadata } from "next";

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;

  const baseUrl = "https://cloud.heritage.africa";
  const currentUrl = `${baseUrl}/${lang}`;

  const metadata = {
    en: {
      title: "Heritage - Cloud Solutions for African Businesses",
      description:
        "Powerful, scalable, and secure cloud infrastructure designed for African businesses. Enterprise-grade cloud services with data sovereignty and 24/7 support."
    },
    fr: {
      title: "Heritage - Solutions Cloud pour les Entreprises Africaines",
      description:
        "Infrastructure cloud puissante, évolutive et sécurisée conçue pour les entreprises africaines. Services cloud de niveau entreprise avec souveraineté des données et support 24/7."
    }
  };

  const currentMeta = metadata[lang as keyof typeof metadata] || metadata.en;

  return {
    title: currentMeta.title,
    description: currentMeta.description,
    alternates: {
      canonical: currentUrl,
      languages: {
        "en": `${baseUrl}/en`,
        "fr": `${baseUrl}/fr`,
        "x-default": `${baseUrl}/en`
      }
    },
    openGraph: {
      title: currentMeta.title,
      description: currentMeta.description,
      url: currentUrl,
      locale: lang === "fr" ? "fr_FR" : "en_US",
      alternateLocale: lang === "fr" ? "en_US" : "fr_FR"
    },
    twitter: { title: currentMeta.title, description: currentMeta.description }
  };
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ lang: locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { lang } = await params;

  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  // Script pour définir la langue côté client
  const langScript = `document.documentElement.lang = '${lang}';`;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: langScript }} />
      <NextIntlClientProvider>
        {children}
        <Footer />
      </NextIntlClientProvider>
    </>
  );
}
