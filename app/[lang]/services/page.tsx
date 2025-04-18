import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/navbar";
import services from "@/utils/services";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Metadata } from "next";
import { LucideProps } from "lucide-react";
import { getLang, getTranslateFn } from "@/utils/misc";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = { title: "Services" };

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}

export default async function Services({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = getLang(langParam);

  const translate = getTranslateFn(lang);
  const t = await getTranslations();

  return (
    <div className="flex min-h-screen flex-col abstract-bg-alt">
      {/* <div id="patterns-bg"></div> */}

      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter md:text-5xl">
                  {translate({ en: "Our Cloud Services", fr: "Nos Services Cloud" })}
                </h1>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {translate({
                    en: "Comprehensive cloud solutions to power your business",
                    fr: "Des solutions cloud complètes pour dynamiser votre activité"
                  })}
                </p>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full mb-4">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8 relative bg-transparent z-10 overflow-hidden">
                <div className="absolute inset-0 glass-bg-alt-2 -z-10"></div>
                <TabsTrigger value="all">
                  {translate({ en: "All", fr: "Tous" })}
                </TabsTrigger>
                <TabsTrigger value="compute">
                  {translate({ en: "Compute", fr: "Calcul" })}
                </TabsTrigger>
                <TabsTrigger value="storage">
                  {translate({ en: "Storage", fr: "Stockage" })}
                </TabsTrigger>
                <TabsTrigger value="data">
                  {translate({ en: "Data & AI", fr: "Données & IA" })}
                </TabsTrigger>
                <TabsTrigger value="applications">
                  {translate({ en: "Applications", fr: "Applications" })}
                </TabsTrigger>
                <TabsTrigger value="security">
                  {translate({ en: "Security", fr: "Sécurité" })}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      id={service.id}
                      Icon={service.Icon}
                      title={t(`${service.id}.title`)}
                      description={t(`${service.id}.description`)}
                    />
                  ))}
                </div>
              </TabsContent>

              {["compute", "storage", "data", "applications", "security"].map(
                (category) => (
                  <TabsContent value={category} className="w-full" key={category}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {services
                        .filter((service) => service.category === category)
                        .map((service) => (
                          <ServiceCard
                            key={service.id}
                            id={service.id}
                            Icon={service.Icon}
                            title={t(`${service.id}.title`)}
                            description={t(`${service.id}.description`)}
                          />
                        ))}
                    </div>
                  </TabsContent>
                )
              )}
            </Tabs>
          </div>
        </section>

        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">
                  {translate({ en: "Ready to Get Started?", fr: "Prêt à commencer ?" })}
                </h2>
                <p className="max-w-[600px] text-gray-800">
                  {translate({
                    en: "Contact our team to learn more about our cloud services and how they can benefit your business.",
                    fr: "Échangez avec notre équipe pour découvrir les avantages de nos services cloud pour votre entreprise."
                  })}
                </p>
                <div className="pt-4">
                  <a
                    href="mailto:support@heritage.africa?subject=Cloud Service Enquiry"
                    target="_blank">
                    <Button className="bg-primary hover:bg-primary/90">
                      {translate({ en: "Contact Sales", fr: "Nous contacter" })}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ServiceCard({
  id,
  title,
  description,
  Icon
}: {
  id: string;
  title: string;
  description: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}) {
  return (
    <Link href={`/services/${id}`}>
      <Card className="flex flex-col h-full relative z-10 border-none shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadows duration-300">
        <div className="absolute inset-0 glass-bg-alt-2 -z-10"></div>
        <CardHeader className="flex flex-row items-center gap-4">
          <Icon className="text-primary" />
          <div className="grid gap-1">
            <CardTitle className="font-normal">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-gray-600">{description}</p>
        </CardContent>
        {/* <CardFooter className="pt-2">
                          <Link href={`/services/${id}`} className="w-full">
                            <Button className="w-full bg-primary hover:bg-primary/90">
                              Learn More
                            </Button>
                          </Link>
                        </CardFooter> */}
      </Card>
    </Link>
  );
}
