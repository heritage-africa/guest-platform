import {
  ArrowLeft,
  Building,
  CheckCircle2,
  Database,
  Server,
  Shield
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
import Navbar from "@/components/navbar";
import services from "@/utils/services";
import { getTranslations } from "next-intl/server";

const serviceId = "openshift-clusters";
const service = services.find((service) => service.id === serviceId)!;

const features = [
  "Fully managed OpenShift clusters",
  "Automated cluster provisioning",
  "Integrated CI/CD pipelines",
  "Advanced networking and security",
  "Multi-cluster management",
  "Enterprise support"
];
const useCases = [
  "Containerized application deployment",
  "Hybrid cloud environments",
  "Microservices architecture",
  "DevOps transformation"
];

const clusterOptions = [
  {
    id: "starter-cluster",
    title: "Starter Cluster",
    description: "Small OpenShift cluster for development and testing",
    icon: <Server className="h-10 w-10 text-primary" />,
    features: [
      "3 worker nodes",
      "Basic monitoring and logging",
      "Standard networking",
      "Single availability zone",
      "Shared control plane",
      "Email support during business hours"
    ]
  },
  {
    id: "standard-cluster",
    title: "Standard Cluster",
    description: "Medium-sized cluster for production workloads",
    icon: <Database className="h-10 w-10 text-primary" />,
    features: [
      "5+ worker nodes",
      "Advanced monitoring and logging",
      "Enhanced networking with SDN",
      "Multi-availability zone deployment",
      "Dedicated control plane",
      "24/7 standard support"
    ]
  },
  {
    id: "enterprise-cluster",
    title: "Enterprise Cluster",
    description: "Large cluster with high availability for mission-critical applications",
    icon: <Building className="h-10 w-10 text-primary" />,
    features: [
      "10+ worker nodes",
      "Enterprise monitoring and logging",
      "Advanced networking with service mesh",
      "Multi-region deployment",
      "Dedicated control plane with HA",
      "24/7 premium support with SLAs"
    ]
  },
  {
    id: "dedicated-cluster",
    title: "Dedicated Cluster",
    description: "Single-tenant cluster with dedicated resources",
    icon: <Shield className="h-10 w-10 text-primary" />,
    features: [
      "Custom node configuration",
      "Isolated infrastructure",
      "Dedicated hardware",
      "Custom networking options",
      "Enhanced security controls",
      "Dedicated support team"
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
              {t("OpenShift Cluster Configuration Options")}{" "}
            </p>

            <div className="flex flex-row flex-wrap gap-4 mb-8">
              {clusterOptions.map((option) => (
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
