import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
import Navbar from "@/components/navbar";
import services from "@/utils/services";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const serviceId = "database-as-a-service";
const service = services.find((service) => service.id === serviceId)!;

const features = [
  "Automated backups and point-in-time recovery",
  "High availability and failover",
  "Performance monitoring and optimization",
  "Automatic scaling",
  "Security and compliance",
  "24/7 expert support"
];

const useCases = [
  "Web and mobile applications",
  "E-commerce platforms",
  "Content management systems",
  "Business intelligence and analytics"
];

const databaseOptions = [
  {
    id: "mysql",
    title: "MySQL",
    description: "Fully managed MySQL database service",
    icon: "/db/mysql-logo.png"
  },
  {
    id: "postgresql",
    title: "PostgreSQL",
    description: "Fully managed PostgreSQL database service",
    icon: "/db/postgresql-logo.png"
  },
  {
    id: "mongodb",
    title: "MongoDB",
    description: "Fully managed MongoDB database service",
    icon: "/db/mongodb-logo.png"
  },
  {
    id: "mariadb",
    title: "MariaDB",
    description: "Fully managed MariaDB database service",
    icon: "/db/mariadb-logo.png"
  },
  {
    id: "redis",
    title: "Redis",
    description: "Fully managed Redis in-memory data store",
    icon: "/db/redis-logo.png"
  },
  {
    id: "elasticsearch",
    title: "Elasticsearch",
    description: "Fully managed Elasticsearch service for search and analytics",
    icon: "/db/elasticsearch-logo.png"
  }
];

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(serviceId);
  return { title: t("title") };
}

export default async function ServiceDetail() {
  const t = await getTranslations(serviceId);

  return (
    <div className="flex min-h-screen flex-col abstract-bg-alt">
      <Navbar />
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <Link
            href="/services"
            className="inline-flex items-center text-sm font-medium text-primary mb-6 hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("Back to Services")}
          </Link>

          <div className="flex flex-col md:flex-row gap-8 my-[50px]">
            <div className="flex items-center justify-center p-6 bg-gray-100 rounded-lg md:w-1/4">
              <service.Icon className="h-12 w-12 text-primary" />
            </div>
            <div className="md:w-3/4">
              <h1 className="text-3xl font-bold mb-4 text-foreground">{t("title")}</h1>
              <p className="text-lg text-foreground/50 mb-6">{t("longDescription")}</p>
              <Link href="/register">
                <Button className="bg-primary hover:bg-primary/90 text-white w-full">
                  {t("Access")} {t("title")}
                </Button>
              </Link>
            </div>
          </div>

          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="features">{t("Features")}</TabsTrigger>
              <TabsTrigger value="use-cases">{t("Use Cases")}</TabsTrigger>
            </TabsList>
            <TabsContent
              value="features"
              className="p-4 shadow-sm rounded-lg glass-bg-alt-2">
              <h3 className="text-xl font-light mb-4 hidden">{t("Key Features")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-gray-600">{t(feature)}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent
              value="use-cases"
              className="p-4 shadow-sm rounded-lg glass-bg-alt-2">
              <h3 className="text-xl font-light mb-4 hidden">{t("Common Use Cases")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {useCases.map((useCase, index) => (
                  <Card key={index} className="bg-white">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                        <span className="text-gray-700">{t(useCase)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/*  Section */}
          <div className="mt-12">
            <p className="text-lg text-foreground/80 mb-6">{t("Database Options")}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {databaseOptions.map((option) => (
                <Card
                  key={option.id}
                  className="glass-bg-alt-2 shadow-sm hover:shadow-md cursor-default transition-shadow duration-300">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center mb-3">
                      <div className="w-20 h-20 flex items-center justify-center mb-3">
                        <Image
                          src={option.icon || "/placeholder.svg"}
                          alt={option.title}
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      </div>
                      <h4 className="font-medium text-foreground">{option.title}</h4>
                      <p className="text-sm text-foreground/70 mt-2">
                        {option.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          {/*  */}
        </div>
      </main>
    </div>
  );
}
