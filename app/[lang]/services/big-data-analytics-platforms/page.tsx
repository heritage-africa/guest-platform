import {
  ArrowLeft,
  CheckCircle2,
  Database,
  FolderTree,
  LineChart,
  Server
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
import Navbar from "@/components/navbar";
import services from "@/utils/services";
import { getTranslations } from "next-intl/server";

const serviceId = "big-data-analytics-platforms";
const service = services.find((service) => service.id === serviceId)!;

const features = [
  "Scalable data processing",
  "Real-time and batch analytics",
  "Data warehousing and lake solutions",
  "Advanced analytics and visualization",
  "Machine learning integration",
  "Data governance and security"
];
const useCases = [
  "Customer analytics",
  "Operational intelligence",
  "Risk and fraud detection",
  "IoT data processing"
];

const platformOptions = [
  {
    id: "data-processing",
    title: "Data Processing Cluster",
    description: "Scalable cluster for batch processing of large datasets",
    icon: <Server className="h-10 w-10 text-primary" />,
    features: [
      "Distributed processing",
      "Batch workloads",
      "ETL pipelines",
      "Data transformation",
      "Scalable storage"
    ]
  },
  {
    id: "real-time-analytics",
    title: "Real-time Analytics",
    description: "Platform for processing and analyzing data in real-time",
    icon: <LineChart className="h-10 w-10 text-primary" />,
    features: [
      "Stream processing",
      "Real-time dashboards",
      "Event processing",
      "Anomaly detection",
      "Low-latency queries"
    ]
  },
  {
    id: "data-warehouse",
    title: "Data Warehouse",
    description: "Enterprise data warehouse for business intelligence and analytics",
    icon: <Database className="h-10 w-10 text-primary" />,
    features: [
      "Columnar storage",
      "High-performance queries",
      "Data modeling",
      "BI tool integration",
      "Historical analysis"
    ]
  },
  {
    id: "data-lake",
    title: "Data Lake",
    description: "Centralized repository for storing structured and unstructured data",
    icon: <FolderTree className="h-10 w-10 text-primary" />,
    features: [
      "Schema-on-read",
      "Support for all data types",
      "Data cataloging",
      "Data governance",
      "Integration with analytics tools"
    ]
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
            <p className="text-lg text-foreground/80 mb-6">
              {t("Big Data Platform Options")}
            </p>

            <div className="flex flex-row flex-wrap gap-4 mb-8">
              {platformOptions.map((option) => (
                <Card
                  key={option.id}
                  className="glass-bg-alt-2 shadow-sm hover:shadow-md cursor-default transition-shadow duration-300 flex-1 min-w-[200px]">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center">
                      <div className="mb-3">{option.icon}</div>
                      <h4 className="font-medium text-lg text-center mb-2">
                        {option.title}
                      </h4>
                      <p className="text-sm text-foreground/70 mb-3 text-center">
                        {option.description}
                      </p>
                      <div className="text-sm mb-3 w-full">
                        <h5 className="font-medium mb-2">{t("Key Features")}:</h5>
                        <ul className="space-y-1">
                          {option.features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
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
