"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

export interface BreadcrumbItem {
  label?: string;
  labelEn?: string;
  labelAr?: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export default function Breadcrumbs({
  items,
  showHome = true,
  className = "",
}: BreadcrumbsProps) {
  const { language, t } = useLocale();

  const getItemLabel = (item: BreadcrumbItem) => {
    if (language === "ar") {
      return item.labelAr || item.label || item.labelEn || "";
    }
    return item.labelEn || item.label || item.labelAr || "";
  };

  // Full breadcrumbs list including Home
  const allItems = showHome
    ? [{ label: t.nav.home, href: "/" }, ...items]
    : items;

  // Schema.org BreadcrumbList JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: getItemLabel(item),
      item: item.href ? `https://www.fixar.in${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center gap-1.5 sm:gap-2 text-xs text-slate-500 dark:text-slate-400 flex-wrap ${className}`}
      >
        <ol className="flex items-center gap-1.5 sm:gap-2 flex-wrap list-none p-0 m-0">
          {allItems.map((item, idx) => {
            const isLast = idx === allItems.length - 1;
            const isHome = idx === 0 && showHome;

            return (
              <li key={idx} className="flex items-center gap-1.5 sm:gap-2">
                {idx > 0 && (
                  <ChevronRight
                    className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 rtl:rotate-180 shrink-0 select-none"
                    aria-hidden="true"
                  />
                )}

                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 hover:text-brand-blue dark:hover:text-brand-blue transition-colors font-medium whitespace-nowrap"
                  >
                    {isHome && <Home className="w-3.5 h-3.5 shrink-0" />}
                    <span>{getItemLabel(item)}</span>
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className="font-bold text-brand-orange dark:text-orange-400 whitespace-nowrap"
                  >
                    {getItemLabel(item)}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
