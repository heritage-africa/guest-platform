"use client";

import { useRef, useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface PhysicalPositionProps {
  language?: "en" | "fr";
}

const PhysicalPosition = ({ language = "en" }: PhysicalPositionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(sectionRef, { threshold: 0.3 });

  const [, /*hoveredCountry*/ setHoveredCountry] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    content: string;
    x: number;
    y: number;
  }>({ visible: false, content: "", x: 0, y: 0 });

  const translations = {
    en: {
      title: "African Data Sovereignty",
      subtitle:
        "Your data stays in Africa, under African governance, with world-class security standards. Experience the power of local infrastructure with global capabilities.",
      datacenters: "Datacenters",
      populationCovered: "Population Covered",
      averageLatency: "Average Latency",
      uptimeSLA: "Uptime SLA",
      dataSovereignty: "Data Sovereignty",
      dataSovereigntyDesc:
        "Your data never leaves African soil, ensuring full compliance with local regulations",
      ultraLowLatency: "Ultra-Low Latency",
      ultraLowLatencyDesc: "Sub-20ms response times across our African network",
      localGovernance: "Local Governance",
      localGovernanceDesc: "African-owned infrastructure with local support teams",
      costEfficient: "Cost Efficient",
      costEfficientDesc: "No international data transfer fees or currency fluctuations",
      africanOwned: "African Owned",
      africanOwnedDesc: "100% African infrastructure",
      dataSovereigntyBadge: "Data Sovereignty",
      dataSovereigntyBadgeDesc: "Your data, your continent"
    },
    fr: {
      title: "Souveraineté des Données Africaines",
      subtitle:
        "Vos données restent en Afrique, sous gouvernance africaine, avec des standards de sécurité de classe mondiale. Découvrez la puissance d'une infrastructure locale avec des capacités mondiales.",
      datacenters: "Centres de Données",
      populationCovered: "Population Couverte",
      averageLatency: "Latence Moyenne",
      uptimeSLA: "SLA Disponibilité",
      dataSovereignty: "Souveraineté des Données",
      dataSovereigntyDesc:
        "Vos données ne quittent jamais le sol africain, garantissant une conformité totale avec les réglementations locales",
      ultraLowLatency: "Latence Ultra-Faible",
      ultraLowLatencyDesc: "Temps de réponse inférieurs à 20ms sur notre réseau africain",
      localGovernance: "Gouvernance Locale",
      localGovernanceDesc:
        "Infrastructure appartenant à l'Afrique avec équipes de support locales",
      costEfficient: "Économique",
      costEfficientDesc:
        "Aucuns frais de transfert de données internationaux ou fluctuations de devises",
      africanOwned: "Propriété Africaine",
      africanOwnedDesc: "Infrastructure 100% africaine",
      dataSovereigntyBadge: "Souveraineté des Données",
      dataSovereigntyBadgeDesc: "Vos données, votre continent"
    }
  };

  const t = translations[language];

  const datacenters = [
    {
      id: "senegal",
      name: "Sénégal",
      city: "Dakar",
      latency: "< 15ms",
      population: "16M",
      coordinates: [200, 180] // Position sur la carte
    },
    {
      id: "cote-divoire",
      name: "Côte d'Ivoire",
      city: "Abidjan",
      latency: "< 20ms",
      population: "26M",
      coordinates: [280, 280]
    },
    {
      id: "cameroon",
      name: "Cameroun",
      city: "Douala",
      latency: "< 18ms",
      population: "27M",
      coordinates: [420, 320]
    },
    {
      id: "congo",
      name: "Congo",
      city: "Brazzaville",
      latency: "< 25ms",
      population: "5.5M",
      coordinates: [440, 380]
    }
  ];

  type Country = (typeof datacenters)[0];

  const handleCountryHover = (country: Country, event: React.MouseEvent) => {
    setHoveredCountry(country.id);
    setTooltip({
      visible: true,
      content: `🏢 <strong>${country.city}, ${country.name}</strong><br/>⚡ Latence: ${country.latency}<br/>👥 Population: ${country.population}<br/>✅ Datacenter Heritage actif`,
      x: event.clientX + 10,
      y: event.clientY - 10
    });
  };

  const handleMouseLeave = () => {
    setHoveredCountry(null);
    setTooltip({ ...tooltip, visible: false });
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 bg-black text-white relative overflow-hidden"
      style={{
        backgroundImage: "url(/abstract-bg.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}>
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">{t.title}</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Stats Grid EN HAUT avec glass effect */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { number: "4", label: t.datacenters },
            { number: "74M+", label: t.populationCovered },
            { number: "< 20ms", label: t.averageLatency },
            { number: "99.9%", label: t.uptimeSLA }
          ].map((stat, index) => (
            <div
              key={index}
              className="flex flex-col h-full relative z-10 bg-transparent border-none rounded-md overflow-hidden shadow-lg">
              <div className="absolute inset-0 glass-bg -z-10"></div>
              <div className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {isIntersecting ? stat.number : "0"}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content - Carte et Avantages AU MÊME NIVEAU */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-8">
          {/* Colonne GAUCHE : Carte Google Maps Embed */}
          <div className="space-y-8">
            {/* Carte Google Maps simple et efficace */}
            <div className="relative z-10 bg-transparent border-none rounded-lg overflow-hidden shadow-lg">
              <div className="absolute inset-0 glass-bg -z-10"></div>
              <div className="p-8">
                <div className="relative w-full h-96 rounded-lg overflow-hidden bg-gray-900">
                  {/* Google Maps avec coordonnées centrées sur l'Afrique de l'Ouest */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15076906.488876823!2d3.2901!3d7.9527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sfr!4v1709123456789!5m2!1sfr!2sfr"
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: "8px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Carte des datacenters Heritage en Afrique"
                  />

                  {/* Overlay avec markers Heritage */}
                  <div className="absolute inset-0 pointer-events-none">
                    {datacenters.map((datacenter, index) => (
                      <div
                        key={datacenter.id}
                        className="absolute pointer-events-auto"
                        style={{
                          top: `${25 + index * 15}%`,
                          left: `${30 + index * 8}%`
                        }}>
                        <div
                          className="w-10 h-10 bg-primary border-3 border-white rounded-full flex items-center justify-center text-white font-bold shadow-lg cursor-pointer transform hover:scale-110 transition-transform duration-200"
                          onMouseEnter={(e) => handleCountryHover(datacenter, e)}
                          onMouseLeave={handleMouseLeave}>
                          🏢
                        </div>
                        <div className="text-white text-xs mt-1 text-center font-semibold bg-black/70 px-2 py-1 rounded">
                          {datacenter.city}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 text-center text-sm text-gray-400">
                  {/*🌍 Carte interactive - Survolez les markers Heritage pour plus d'infos*/}
                </div>
              </div>
            </div>

            {/* Badges repositionnés EN BAS de la carte */}
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { icon: "🌍", title: t.africanOwned, desc: t.africanOwnedDesc },
                {
                  icon: "🛡️",
                  title: t.dataSovereigntyBadge,
                  desc: t.dataSovereigntyBadgeDesc
                }
              ].map((badge, index) => (
                <div
                  key={index}
                  className="flex flex-col h-full relative z-10 bg-transparent border-none rounded-md overflow-hidden shadow-lg">
                  <div className="absolute inset-0 glass-bg -z-10"></div>
                  <div className="p-6 text-center min-w-[160px] hover:-translate-y-2 transition-all duration-300">
                    <div className="text-3xl mb-3">{badge.icon}</div>
                    <div className="font-semibold mb-2 text-white">{badge.title}</div>
                    <div className="text-sm text-gray-400">{badge.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne DROITE : Avantages */}
          <div className="space-y-6">
            {[
              { icon: "🛡️", title: t.dataSovereignty, desc: t.dataSovereigntyDesc },
              { icon: "⚡", title: t.ultraLowLatency, desc: t.ultraLowLatencyDesc },
              { icon: "🔒", title: t.localGovernance, desc: t.localGovernanceDesc },
              { icon: "💰", title: t.costEfficient, desc: t.costEfficientDesc }
            ].map((advantage, index) => (
              <div
                key={index}
                className="flex flex-col h-full relative z-10 bg-transparent border-none rounded-md overflow-hidden shadow-lg">
                <div className="absolute inset-0 glass-bg -z-10"></div>
                <div className="flex items-start gap-4 p-6 hover:bg-white/5 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 text-primary">
                    {advantage.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">{advantage.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {advantage.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="fixed bg-black/95 text-white px-4 py-3 rounded-lg border border-primary/30 text-sm z-50 pointer-events-none shadow-xl"
          style={{ left: tooltip.x, top: tooltip.y }}
          dangerouslySetInnerHTML={{ __html: tooltip.content }}
        />
      )}
    </section>
  );
};

export default PhysicalPosition;
