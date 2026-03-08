import type { Metadata } from "next";
import { HeroSection } from "@/features/home/components/HeroSection";
import { FeaturedDropSection } from "@/features/home/components/FeaturedDropSection";
import { CategoryPreviewSection } from "@/features/home/components/CategoryPreviewSection";
import { NewsletterSection } from "@/features/home/components/NewsletterSection";

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
      <CategoryPreviewSection />
      <NewsletterSection />
    </>
  );
}
