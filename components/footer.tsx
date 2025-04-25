"use client";

import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { FC, useState, FormEvent, Fragment, ChangeEvent } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getLang, getTranslateFn } from "@/utils/misc";
import Link from "next/link";

export default function Footer() {
  const langParam = useParams().lang as string | undefined;
  const lang = getLang(langParam);
  const translate = getTranslateFn(lang);

  return (
    <div className="relative footer">
      <div className="bg-black/90 absolute left-0 right-0 top-0 bottom-0 -z-10"></div>
      <div className="max-w-[1200px] mx-auto flex flex-col gap-y-[50px] lg:flex-row justify-between lg:gap-x-[100px] md:gap-x-[70px] p-[20px]">
        <div className="max-w-[300px] flex flex-col gap-x-1">
          <p className="text-xl text-white font-semibold mb-2">
            {translate({ en: "Subscribe", fr: "S'abonner" })}
          </p>
          <Subscribe />
        </div>
        <div className="max-w-[210px] flex flex-col gap-x-1">
          <p className="text-xl text-white font-semibold mb-2">
            {translate({ en: "Navigate", fr: "Naviguer" })}
          </p>
          <FooterLink href="/" title={translate({ en: "Home", fr: "Acceuil" })} />
          <FooterLink
            href="/services"
            title={translate({ en: "Services", fr: "Services" })}
          />
          <FooterLink href="/about" title={translate({ en: "About", fr: "À propos" })} />
          <FooterLink
            href="/register"
            title={translate({ en: "Register", fr: "S'inscrire" })}
          />
        </div>
        <div className="max-w-[210px] flex flex-col gap-x-1">
          <p className="text-xl text-white font-semibold mb-2">Info</p>
          <p className="text-white">
            <span className="font-semibold">
              {translate({ en: "Address ", fr: "Adresse " })}{" "}
            </span>
            {"165 virage, Rte de l'Aeroport, Dakar, Senegal"}
          </p>
          <p className="text-white">
            <span className="font-semibold">
              {translate({ en: "Phone ", fr: "Telephone " })}{" "}
            </span>
            +221 338208383
          </p>
        </div>
        <div className="max-w-[250px] flex flex-col gap-y-2 text-center justify-center">
          <a href="https://heritage.africa" target="_blank" rel="noopener noreferrer">
            <Image alt="heritage-logo" src="/primary.svg" width={250} height={70} />
          </a>
          <p className="text-white text-sm">
            &copy; 2025 Heritage Africa. All rights reserved.
          </p>
        </div>
      </div>
      <div className="h-[65px] w-full bg-black/10 ">
        <div className="max-w-[1200px] mx-auto flex items-center text-sm gap-[20px] p-[10px]">
          <a href="https://www.accel-tech.net" target="_blank" rel="noopener noreferrer">
            <Image alt="accel-tech" src="/accel-logo.png" width={167} height={50} />
          </a>
          <a
            href="https://www.accel-tech.net"
            target="_blank"
            className="text-white/90 hover:text-white/100">
            {translate({ en: "About", fr: "À propos" })}
          </a>
          <a
            href="https://www.accel-tech.net"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/90 hover:text-white/100">
            {translate({ en: "Services", fr: "Services" })}
          </a>
          <a
            href="https://www.accel-tech.net"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/90 hover:text-white/100">
            {translate({ en: "News", fr: "Nouveautés" })}
          </a>
        </div>
      </div>
    </div>
  );
}

const Subscribe: FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [fields, setFields] = useState({ email: "" });

  const langParam = useParams().lang as string | undefined;
  const lang = getLang(langParam);
  const translate = getTranslateFn(lang);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isLoading) return;
    setLoading(true);
    fetch("/api/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields)
    })
      .then(console.log)
      .catch(console.error)
      .finally(() => {
        setLoading(false);
        setSubscribed(true);
      });
  }

  return (
    <div className="flex flex-col justify-center gap-y-2 relative">
      {!subscribed ? (
        <Fragment>
          <p className="text-gray-100">
            {translate({
              en: "Stay up to date on the Heritage Project.",
              fr: "Restez informé(e) des actualités du Projet Heritage."
            })}
          </p>
          <form className="flex gap-x-1 w-full" onSubmit={handleSubmit}>
            <Input
              variant="dark"
              value={fields.email}
              type="email"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFields({ ...fields, email: e.target.value })
              }
              placeholder="example@email.com"
              required
            />
            <Button
              label={translate({ en: "Subscribe", fr: "S'abonner" })}
              isLoading={isLoading}
            />
          </form>
        </Fragment>
      ) : (
        <p className="text-gray-100">
          {translate({
            en: "Thanks for subcribing to the Heritage Project.",
            fr: "Merci de vous être abonné au Projet Héritage."
          })}
        </p>
      )}
    </div>
  );
};

function FooterLink(props: { title: string; href: string }) {
  return (
    <Link
      href={props.href}
      className="text-lg text-gray-100 hover:text-white cursor-pointer">
      {props.title}
    </Link>
  );
}
