import {
  Database,
  Server,
  Shield,
  Cpu,
  HardDrive,
  Code,
  Layers,
  ActivityIcon,
  Grid
} from "lucide-react";
import { DEFAULT_LANG } from "./constants";

export const cl = (
  ...classNames: Array<string | { [key: string]: boolean | undefined } | undefined>
): string => {
  return classNames
    .map((className) => {
      if (typeof className === "undefined") return undefined;
      if (typeof className === "string") return className;

      const [key, condition] = Object.entries(className)[0];
      if (!condition) return undefined;

      return key;
    })
    .filter((val) => val)
    .join(" ");
};

export function getLang(langParam?: string) {
  return langParam === "en" || langParam === "fr" ? langParam : DEFAULT_LANG;
}

export function getTranslateFn(lang: "en" | "fr") {
  return function (strings: { en: string; fr: string }): string {
    return strings[lang];
  };
}

export const partners = [
  { name: "Red Hat", logo: "/redhat.png", width: 100, height: 50 },
  { name: "Dell", logo: "/dell.png", width: 100, height: 50 },
  {
    name: "IBM LinuxOne",
    logo: "/linuxone.png",
    width: 120, // Increased size for IBM LinuxONE
    height: 60
  },
  { name: "HPE", logo: "/hpe.png", width: 110, height: 55 },
  { name: "Cisco", logo: "/cisco.png", width: 100, height: 50 },
  { name: "Veeam", logo: "/veeam.png", width: 100, height: 50 },
  { name: "Fortinet", logo: "/fortinet.png", width: 100, height: 50 },
  { name: "ELK", logo: "/elk.png", width: 100, height: 50 }
];

export function stringToBool(string?: string) {
  if (!string) return false;
  string = string.trim();

  if (string === "false") return false;
  if (string === "0") return false;
  if (string === "no") return false;

  return true;
}

export async function forwardRegistrationData(
  endpoint: string,
  body: Record<string, string | undefined>
) {
  const result = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  console.log(`Forwarding registration completed with status: ${result.status}`);
}

// Subscribe

// export async function forwardSubscriptionData(
//   endpoint: string,
//   body: Record<string, string | undefined>
// ) {
//   const result = await fetch(endpoint, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body)
//   });
//   console.log(`Forwarding subscription completed with status: ${result.status}`);
// }
