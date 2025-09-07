import { Building2, Hospital, Landmark, GraduationCap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Navbar from "@/components/navbar";
import { getLang, getTranslateFn, partners } from "@/utils/misc";
import services from "@/utils/services";
import { getTranslations } from "next-intl/server";
import PhysicalPosition from "@/components/PhysicalPosition";
import type { Metadata } from "next";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;

  const metadata = {
    en: {
      title: "Cloud Solutions for African Businesses | Heritage",
      description:
        "Discover Heritage's powerful cloud infrastructure designed for African businesses. ISO 27001 certified, data sovereignty, and enterprise-grade security. Get started today.",
      keywords:
        "cloud services Africa, African cloud infrastructure, data sovereignty, enterprise cloud, secure hosting, ISO 27001, PCI DSS compliance"
    },
    fr: {
      title: "Solutions Cloud pour Entreprises Africaines | Heritage",
      description:
        "Découvrez l'infrastructure cloud puissante d'Heritage conçue pour les entreprises africaines. Certifiée ISO 27001, souveraineté des données et sécurité de niveau entreprise.",
      keywords:
        "services cloud Afrique, infrastructure cloud africaine, souveraineté données, cloud entreprise, hébergement sécurisé, ISO 27001, conformité PCI DSS"
    }
  };

  const currentMeta = metadata[lang as keyof typeof metadata] || metadata.en;

  return {
    title: currentMeta.title,
    description: currentMeta.description,
    keywords: currentMeta.keywords,
    openGraph: {
      title: currentMeta.title,
      description: currentMeta.description,
      images: [
        {
          url: "/hero-img.png",
          width: 1200,
          height: 675,
          alt: "Heritage Cloud Platform Dashboard"
        }
      ]
    },
    twitter: {
      title: currentMeta.title,
      description: currentMeta.description,
      images: ["/hero-img.png"]
    }
  };
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}

export default async function Home({ params }: Props) {
  const { lang: langParam } = await params;
  const lang = getLang(langParam);

  const translate = getTranslateFn(lang);
  const t = await getTranslations();

  return (
    <div className="flex min-h-screen flex-col bg-white relative z-10">
      <Navbar />
      <div id="patterns-bg"></div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name":
              lang === "en"
                ? "Cloud Solutions for African Businesses"
                : "Solutions Cloud pour Entreprises Africaines",
            "description":
              lang === "en"
                ? "Powerful, scalable, and secure cloud infrastructure designed for African businesses."
                : "Infrastructure cloud puissante, évolutive et sécurisée conçue pour les entreprises africaines.",
            "url": `https://cloud.heritage.africa/${lang}`,
            "mainEntity": {
              "@type": "Service",
              "name": "Heritage Cloud Services",
              "provider": { "@type": "Organization", "name": "Heritage" },
              "serviceType": "Cloud Infrastructure",
              "areaServed": "Africa",
              "hasCredential": [
                {
                  "@type": "EducationalOccupationalCredential",
                  "name": "ISO 27001 Certification"
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  "name": "PCI DSS Compliance"
                }
              ]
            }
          })
        }}
      />

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mb-[-100px] sm:mb-[-175px] md:mb-[-250px] lg:mb-[-330px] xl:mb-[-365px]">
            <div className="flex flex-col items-center text-center">
              <div className="max-w-3xl mx-auto space-y-4 mb-8">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground">
                  {lang === "en" ? (
                    <>
                      <span className="gradient-text-primary animate-gradient-move">
                        Cloud
                      </span>{" "}
                      Solutions
                      <br />
                      for an{" "}
                      <span className="gradient-text-secondary animate-gradient-move">
                        Emerging
                      </span>{" "}
                      Continent
                    </>
                  ) : (
                    <>
                      Solutions{" "}
                      <span className="gradient-text-primary animate-gradient-move">
                        Cloud
                      </span>
                      <br />
                      pour un Continent en{" "}
                      <span className="gradient-text-secondary animate-gradient-move">
                        Émergence
                      </span>
                    </>
                  )}
                </h1>
                <p className="text-foreground/65 md:text-xl">
                  {translate({
                    en: "Powerful, scalable, and secure cloud infrastructure designed for African businesses.",
                    fr: "Une infrastructure cloud puissante, évolutive et sécurisée conçue pour les entreprises africaines."
                  })}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <a
                    href="https://origins.heritage.africa"
                    aria-label={translate({
                      en: "Access Heritage Cloud Platform",
                      fr: "Accéder à la plateforme cloud Heritage"
                    })}>
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-white w-full">
                      {translate({ en: "Access Cloud", fr: "Accéder au Cloud" })}
                    </Button>
                  </a>
                  <Link
                    href="/services"
                    aria-label={translate({
                      en: "Explore all Heritage cloud services",
                      fr: "Explorer tous les services cloud Heritage"
                    })}>
                    <Button
                      size="lg"
                      className="bg-white hover:bg-gray-100 text-black border border-gray-300 w-full">
                      {translate({ en: "Explore Services", fr: "Explorer nos services" })}
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="w-full max-w-5xl">
                <Image
                  src="/hero-img.png"
                  id="hero-img"
                  alt={
                    lang === "en"
                      ? "Heritage Cloud Platform Dashboard showing analytics, monitoring and cloud services management interface"
                      : "Tableau de bord de la plateforme cloud Heritage montrant l'analyse, la surveillance et l'interface de gestion des services cloud"
                  }
                  width={1200}
                  height={675}
                  className="rounded-lg shadow-xl border border-gray-700 border-r-gray-200"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-black">
          <div className="container px-4 md:px-6 mt-[90px] sm:mt-[100px] md:mt-[130px] lg:mt-[160px] xl:mt-[180px] mb-[-100px] sm:mb-[-120px] md:mb-[-170px] lg:mb-[-210px]">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white">
                  {translate({ en: "Our Cloud Services", fr: "Nos Services Cloud" })}
                </h2>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {translate({
                    en: "Comprehensive cloud solutions to power your business",
                    fr: "Des solutions cloud complètes pour dynamiser votre activité"
                  })}
                </p>
                <div className="pt-4">
                  <Link href="/services">
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      {translate({
                        en: "View All Services",
                        fr: "Afficher tous les services"
                      })}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 6).map(({ id, Icon }) => (
                <Card
                  key={id}
                  className="flex flex-col h-full relative z-10 bg-transparent border-none rounded-md overflow-hidden shadow-lg">
                  <div className="absolute inset-0 glass-bg -z-10"></div>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Icon className="text-primary" aria-hidden="true" />
                    <div className="grid gap-1">
                      <CardTitle className="text-white">{t(`${id}.title`)}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-gray-400">{t(`${id}.description`)}</p>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Link
                      href={`/services/${id}`}
                      className="w-full"
                      aria-label={`${translate({ en: "Learn more about", fr: "En savoir plus sur" })} ${t(`${id}.title`)}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-gray-300 hover:text-white">
                        {translate({ en: "Learn More", fr: "En savoir plus" })}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-[50px] w-full h-[200px] relative rounded-lg overflow-hidden shadow-md flex items-center">
              <div className="absolute inset-0 glass-bg-alt"></div>
              <div className="container px-4 md:px-6 relative z-10">
                <div className="text-center mb-[10px]">
                  <h2 className="text-2xl font-light text-black">
                    {translate({
                      en: "Powered By Leading Technologies",
                      fr: "Propulsé par des technologies de pointe"
                    })}
                  </h2>
                </div>
                <div className="flex justify-center items-center gap-4 md:gap-6 flex-nowrap overflow-x-auto py-4">
                  {partners.map((partner, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-28 h-16 flex items-center justify-center">
                      <Image
                        src={partner.logo || "/placeholder.svg"}
                        alt={`${partner.name} ${translate({ en: "technology partner logo", fr: "logo partenaire technologique" })}`}
                        width={partner.width}
                        height={partner.height}
                        className="object-contain max-h-14"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="solutions"
          className="w-full py-12 md:py-24 lg:py-32 bg-white"
          style={{
            boxShadow:
              "inset 0 3px 7px rgba(0, 0, 0, 0.2), inset 0 -3px 7px rgba(0, 0, 0, 0.2)"
          }}>
          <div className="container px-4 md:px-6 mt-[90px] md:mt-[80px] lg:mt-[40px]">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-foreground">
                  {translate({ en: "Industry Solutions", fr: "Solutions sectorielles" })}
                </h2>
                <p className="max-w-[900px] text-foreground/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {translate({
                    en: "Tailored cloud solutions for various industries",
                    fr: "Solutions cloud personnalisées pour divers secteurs d'activité"
                  })}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="h-8 w-8 text-primary" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-foreground">
                    {translate({ en: "Financial Services", fr: "Services financiers" })}
                  </h3>
                </div>
                <p className="text-foreground/70">
                  {translate({
                    en: "Secure, compliant cloud infrastructure for banking, insurance, and fintech companies.",
                    fr: "Infrastructure cloud sécurisée et conforme pour les banques, les compagnies d'assurance et les entreprises fintech."
                  })}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-2">
                  <Hospital className="h-8 w-8 text-primary" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-foreground">
                    {translate({ en: "Healthcare", fr: "Santé" })}
                  </h3>
                </div>
                <p className="text-foreground/70">
                  {translate({
                    en: "Solutions for healthcare providers and medical research.",
                    fr: "Solutions pour les prestataires de soins de santé et la recherche médicale."
                  })}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-2">
                  <Landmark className="h-8 w-8 text-primary" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-foreground">
                    {translate({ en: "Government", fr: "Gouvernement" })}
                  </h3>
                </div>
                <p className="text-foreground/70">
                  {translate({
                    en: "Secure and reliable cloud services for government agencies and public sector.",
                    fr: "Services cloud sécurisés et fiables pour les agences gouvernementales et le secteur public."
                  })}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-2">
                  <GraduationCap className="h-8 w-8 text-primary" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-foreground">
                    {translate({ en: "Education", fr: "Education" })}
                  </h3>
                </div>
                <p className="text-foreground/70">
                  {translate({
                    en: "Scalable solutions for educational institutions and e-learning platforms.",
                    fr: "Solutions évolutives pour les établissements d'enseignement et les plateformes d'apprentissage en ligne."
                  })}
                </p>
              </div>
            </div>
          </div>
        </section>

        <PhysicalPosition language={lang} />

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div id="compliance" className="flex justify-center items-center px-4">
              <div className="py-16 rounded-lg relative z-10">
                <div id="patterns-bg"></div>

                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-[50px]">
                  <p className="max-w-[800px] text-2xl font-light text-black">
                    {translate({
                      en: "Infrastructure and operations meeting international security and compliance standards",
                      fr: "Infrastructures et opérations conformes aux normes internationales de sécurité et de conformité"
                    })}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-[30px] md:flex-row lg:gap-x-[50px]">
                  <div className="w-[200px] flex items-center justify-center">
                    <Image
                      src="/iso27001.webp"
                      alt="ISO 27001 Information Security Management certification logo"
                      width={125}
                      height={125}
                    />
                  </div>
                  <div className="w-[200px] flex flex-col items-center justify-center">
                    <Image
                      src="/iso27017.webp"
                      alt="ISO 27017 Cloud Security certification logo"
                      width={125}
                      height={125}
                    />
                  </div>
                  <div className="w-[200px] flex items-center justify-center">
                    <Image
                      src="/iso27018.webp"
                      alt="ISO 27018 Privacy in Cloud Computing certification logo"
                      width={125}
                      height={125}
                    />
                  </div>
                  <div className="w-[200px] flex items-center justify-center">
                    <Image
                      src="/pci-dss-1.png"
                      alt="PCI DSS Payment Card Industry Data Security Standard compliance logo"
                      width={150}
                      height={150}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
