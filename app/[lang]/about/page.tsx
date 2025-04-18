import { Globe, Award, Rocket } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/navbar";

import { Metadata } from "next";
import { getLang, getTranslateFn } from "@/utils/misc";

export const metadata: Metadata = { title: "About" };

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}

export default async function About({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langParam } = await params;
  const lang = getLang(langParam);

  const translate = getTranslateFn(lang);

  const teamMembers = [
    {
      name: "Jane Smith",
      role: "CEO & Founder",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Jane has over 20 years of experience in cloud computing and enterprise technology. She founded Heritage Cloud with a vision to provide African businesses with world-class cloud infrastructure."
    },
    {
      name: "John Doe",
      role: "CTO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "John brings extensive technical expertise with a background in distributed systems and cloud architecture. He leads our technical strategy and innovation."
    },
    {
      name: "Sarah Johnson",
      role: "COO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Sarah oversees our day-to-day operations, ensuring we deliver exceptional service to all our customers. She has a strong background in operational excellence."
    },
    {
      name: "Michael Chen",
      role: "VP of Engineering",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Michael leads our engineering teams, bringing over 15 years of experience in building scalable cloud platforms and infrastructure."
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div id="patterns-bg" className="!fixed"></div>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground">
                    {translate({
                      en: "About Heritage Cloud",
                      fr: "A propos du Cloud Heritage"
                    })}
                  </h1>
                  <p className="max-w-[600px] text-foreground/70 md:text-xl">
                    {translate({
                      en: "Empowering African businesses with world-class cloud infrastructure and services.",
                      fr: "Donnons aux entreprises africaines les moyens de réussir grâce à une infrastructure et des services cloud de classe mondiale."
                    })}
                  </p>
                </div>
                <p className="text-foreground/50">
                  {translate({
                    en: "Heritage Cloud was founded with a vision to provide African businesses with the same level of cloud infrastructure and services available to enterprises around the world. We believe that access to cutting-edge technology is essential for innovation and growth in today's digital economy.",
                    fr: "Heritage Cloud a été fondé avec la vision de fournir aux entreprises africaines le même niveau d'infrastructure et de services cloud disponibles pour les entreprises du monde entier. Nous croyons que l'accès aux technologies de pointe est essentiel pour l'innovation et la croissance dans l'économie numérique actuelle."
                  })}
                </p>
                <p className="text-foreground/50">
                  {translate({
                    en: "Our team of experienced professionals is dedicated to delivering reliable, secure, and scalable cloud solutions that meet the unique needs of businesses across the continent.",
                    fr: "Notre équipe de professionnels expérimentés est dédiée à la fourniture de solutions cloud fiables, sécurisées et évolutives qui répondent aux besoins uniques des entreprises à travers le continent."
                  })}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/rack-img.png"
                  alt="Heritage Rack"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-black">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white">
                {translate({
                  en: "Our Mission & Values",
                  fr: "Notre Mission & Nos Valeurs"
                })}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-dark-gray border-gray-800">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <Globe className="h-12 w-12 text-primary mb-2" />
                    <h3 className="text-xl font-bold text-white">
                      {translate({ en: "Our Mission", fr: "Notre Mission" })}
                    </h3>
                    <p className="text-gray-400">
                      {translate({
                        en: "To accelerate digital transformation across Africa by providing world-class cloud infrastructure and services that enable businesses to innovate and grow.",
                        fr: "Accélérer la transformation numérique en Afrique en fournissant une infrastructure et des services cloud de classe mondiale qui permettent aux entreprises d'innover et de croître."
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-dark-gray border-gray-800">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <Award className="h-12 w-12 text-primary mb-2" />
                    <h3 className="text-xl font-bold text-white">
                      {translate({ en: "Our Vision", fr: "Notre Vision" })}
                    </h3>
                    <p className="text-gray-400">
                      {translate({
                        en: "To be the leading cloud provider in Africa, recognized for excellence, innovation, and commitment to customer success.",
                        fr: "Devenir le principal fournisseur de cloud en Afrique, reconnu pour l'excellence, l'innovation et l'engagement envers le succès de nos clients."
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-dark-gray border-gray-800">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <Rocket className="h-12 w-12 text-primary mb-2" />
                    <h3 className="text-xl font-bold text-white">
                      {translate({ en: "Our Values", fr: "Nos Valeurs" })}
                    </h3>
                    <p className="text-gray-400">
                      {translate({
                        en: "Excellence, Innovation, Integrity, Customer Focus, and Collaboration guide everything we do at Heritage Cloud.",
                        fr: "Excellence, Innovation, Intégrité, Orientation client et Collaboration guident toutes nos actions chez Heritage Cloud."
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-dark-gray hidden">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white">
                {translate({
                  en: "Our Leadership Team",
                  fr: "Notre Équipe de Direction"
                })}
              </h2>
              <p className="max-w-[600px] mx-auto mt-3 text-gray-300">
                {translate({
                  en: "Meet the experienced professionals leading Heritage Cloud",
                  fr: "Découvrez les professionnels expérimentés qui dirigent Heritage Cloud"
                })}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={160}
                      height={160}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-gray-400">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 ">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">
                  {translate({ en: "Join Our Team", fr: "Rejoignez Notre Équipe" })}
                </h2>
                <p className="max-w-[600px] text-foreground/70">
                  {translate({
                    en: " We're always looking for talented individuals to join our team. Check out our current openings.",
                    fr: "Nous sommes toujours à la recherche de personnes talentueuses pour rejoindre notre équipe. Consultez nos offres d'emploi actuelles."
                  })}
                </p>
                <div className="pt-4">
                  <a
                    target="_blank"
                    href="mailto:support@heritage.africa?subject=Let's Join Forces!">
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      {translate({ en: "Join forces", fr: "Nous rejoindre" })}
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
