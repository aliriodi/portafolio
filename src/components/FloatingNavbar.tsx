"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

type Props = {
  brand: string;
};

export default function FloatingNavbar({ brand }: Props) {
  const locale = useLocale();
  const pathname = usePathname();
  const isSpanish = locale === "es";

  const routes = [
    {
      href: "/",
      label: isSpanish ? "Inicio" : "Home",
    },
    {
      href: "/web-development",
      label: isSpanish ? "Desarrollo web" : "Web development",
    },
    {
      href: "/electrical-engineering",
      label: isSpanish ? "Ingeniería eléctrica" : "Electrical engineering",
    },
  ];

  return (
    <header className="floating-navbar">
      <Link href="/" className="floating-brand">
        {/* {brand} */}
      </Link>

      <nav
        className="floating-links"
        aria-label={isSpanish ? "Navegación principal" : "Main navigation"}
      >
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            aria-current={pathname === route.href ? "page" : undefined}
          >
            {route.label}
          </Link>
        ))}
      </nav>

      <details className="language-dropdown">
        <summary aria-label={isSpanish ? "Elegir idioma" : "Choose language"}>
          <img
            src={`https://flagcdn.com/w40/${isSpanish ? "ve" : "us"}.png`}
            width={24}
            height={16}
            alt=""
          />

          <span>{isSpanish ? "ES" : "EN"}</span>
          <span className="language-chevron" aria-hidden="true">⌄</span>
        </summary>

        <ul className="language-options">
          <li>
            <Link
              href={pathname}
              locale="en"
              hrefLang="en"
              lang="en"
              aria-current={locale === "en" ? "true" : undefined}
              onClick={(event) => {
                event.currentTarget.closest("details")?.removeAttribute("open");
              }}
            >
              <img
                src="https://flagcdn.com/w40/us.png"
                width={24}
                height={16}
                alt=""
              />
              English
            </Link>
          </li>

          <li>
            <Link
              href={pathname}
              locale="es"
              hrefLang="es"
              lang="es"
              aria-current={locale === "es" ? "true" : undefined}
              onClick={(event) => {
                event.currentTarget.closest("details")?.removeAttribute("open");
              }}
            >
              <img
                src="https://flagcdn.com/w40/ve.png"
                width={24}
                height={16}
                alt=""
              />
              Español
            </Link>
          </li>
        </ul>
      </details>
    </header>
  );
}