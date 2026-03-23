import type { Metadata } from "next";
import { HeroSection } from "@/features/home/components/HeroSection";
import { FeaturedDropSection } from "@/features/home/components/FeaturedDropSection";
import { ImpactBannerSection } from "@/features/home/components/ImpactBannerSection";
import { LookbookSection } from "@/features/home/components/LookbookSection";
import { CategoryGridSection } from "@/features/home/components/CategoryGridSection";
import { NewsletterSection } from "@/features/home/components/NewsletterSection";

// Home page uses only static data — pre-render once and never revalidate.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Schar — limited streetwear drops. Shop the latest collection before it sells out.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedDropSection />
      <ImpactBannerSection />
      <LookbookSection />
      <CategoryGridSection />
      <NewsletterSection />
    </>
  );
}
