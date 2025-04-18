import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LANG, LANG_COOKIE } from "./utils/constants";

export function middleware(request: NextRequest) {
  let initialLang: "fr" | "en" | undefined;
  const cookieLang = request.cookies.get(LANG_COOKIE)?.value;

  if (!!cookieLang && (cookieLang === "fr" || cookieLang === "en")) {
    initialLang = cookieLang!;
    console.log("We have a cookie language, and its " + cookieLang);
  }

  if (!initialLang) {
    const defaultBrowserLanguage = request.headers.get("accept-language");
    if (
      !!defaultBrowserLanguage &&
      (defaultBrowserLanguage === "fr" || defaultBrowserLanguage === "en")
    ) {
      initialLang = defaultBrowserLanguage;
      console.log(
        "We have a default browser language, and its " + defaultBrowserLanguage
      );
    }
  }

  if (!initialLang) {
    initialLang = DEFAULT_LANG;
    console.log("No cookie language and no default browser language");
  }

  return NextResponse.redirect(
    new URL("/" + initialLang + request.nextUrl.pathname, request.url + "/")
  );
}

// // See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/about", "/contact", "/services", "/services/:id"]
};
