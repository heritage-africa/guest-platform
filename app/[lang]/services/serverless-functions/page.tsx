import { ArrowLeft, CheckCircle2, Clock, Globe, Waves, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
import Navbar from "@/components/navbar";
import services from "@/utils/services";
import { getTranslations } from "next-intl/server";

const serviceId = "serverless-functions";
const service = services.find((service) => service.id === serviceId)!;

const features = [
  "Zero infrastructure management",
  "Automatic scaling",
  "Pay-per-execution pricing",
  "Event-driven architecture",
  "Integrated monitoring and logging",
  "Multi-language support"
];
const useCases = [
  "API backends",
  "Real-time file processing",
  "IoT data processing",
  "Scheduled tasks and automation"
];

const serverlessOptions = [
  {
    id: "event-driven",
    title: "Event-Driven Functions",
    description: "Functions triggered by events from various sources",
    icon: <Zap className="h-10 w-10 text-primary" />,
    features: [
      "Event-based triggers",
      "Multiple event sources",
      "Asynchronous processing",
      "Event filtering",
      "Retry policies",
      "Dead-letter queues"
    ]
  },
  {
    id: "http-functions",
    title: "HTTP Functions",
    description: "Functions exposed as HTTP endpoints for API development",
    icon: <Globe className="h-10 w-10 text-primary" />,
    features: [
      "RESTful API endpoints",
      "Authentication support",
      "Request validation",
      "CORS configuration",
      "Custom domains",
      "API gateway integration"
    ]
  },
  {
    id: "scheduled-functions",
    title: "Scheduled Functions",
    description: "Functions that run on a schedule for automated tasks",
    icon: <Clock className="h-10 w-10 text-primary" />,
    features: [
      "Cron-based scheduling",
      "Timezone support",
      "Execution history",
      "Failure notifications",
      "Concurrency control",
      "Timeout configuration"
    ]
  },
  {
    id: "stream-processing",
    title: "Stream Processing",
    description: "Functions for real-time data stream processing",
    icon: <Waves className="h-10 w-10 text-primary" />,
    features: [
      "Real-time data processing",
      "Stream partitioning",
      "Stateful processing",
      "Windowing operations",
      "Aggregation functions",
      "Stream analytics"
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
              {t("Serverless Functions Options")}
            </p>

            <div className="flex flex-row flex-wrap gap-4 mb-8">
              {serverlessOptions.map((option) => (
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
