"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

interface FilterCategory {
  id: string;
  name: string;
  slug: string;
  count: number;
}

interface ProductFiltersProps {
  categories: FilterCategory[];
  activeCategory?: string;
  totalCount: number;
}

export function ProductFilters({
  categories,
  activeCategory,
  totalCount,
}: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function handleFilter(slug: string | null) {
    startTransition(() => {
      router.push(slug ? `${pathname}?category=${slug}` : pathname, {
        scroll: false,
      });
    });
  }

  const options = [
    { slug: null, name: "TODOS", count: totalCount },
    ...categories.map((c) => ({ slug: c.slug, name: c.name, count: c.count })),
  ];

  return (
    <div
      className={cn(
        "mb-10 flex items-stretch overflow-x-auto border-b border-border no-scrollbar transition-opacity duration-200",
        isPending && "pointer-events-none opacity-40"
      )}
      role="toolbar"
      aria-label="Filtrar produtos por categoria"
    >
      {options.map((option) => {
        const isActive =
          option.slug === null
            ? !activeCategory
            : activeCategory === option.slug;

        return (
          <button
            key={option.slug ?? "all"}
            type="button"
            onClick={() => handleFilter(option.slug)}
            aria-pressed={isActive}
            className={cn(
              "relative shrink-0 flex items-center gap-2 px-5 py-4 type-label tracking-[0.15em] transition-colors duration-150",
              isActive
                ? "text-foreground"
                : "text-foreground-muted hover:text-foreground"
            )}
          >
            {option.name}
            <span
              className={cn(
                "type-small tabular-nums transition-colors",
                isActive ? "text-foreground-muted" : "text-foreground-subtle"
              )}
            >
              ({option.count})
            </span>

            {/* Active underline */}
            {isActive && (
              <span
                className="absolute bottom-0 left-0 right-0 h-px bg-foreground"
                aria-hidden="true"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
