"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const activeImage = images[activeIndex];

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row-reverse md:gap-5 lg:gap-6">
      {/* ── Thumbnails (vertical on desktop, horizontal on mobile) ── */}
      {images.length > 1 && (
        <div className="order-2 flex gap-2 overflow-x-auto md:order-1 md:flex-col md:overflow-x-visible md:overflow-y-auto no-scrollbar">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}: ${img.alt}`}
              aria-pressed={i === activeIndex}
              className={cn(
                "relative shrink-0 overflow-hidden border transition-all duration-200",
                "w-16 h-20 md:w-20 md:h-24",
                i === activeIndex
                  ? "border-foreground"
                  : "border-border opacity-60 hover:opacity-100 hover:border-border-strong"
              )}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* ── Main image ── */}
      <div className="order-1 flex-1 md:order-2">
        <div
          className={cn(
            "relative overflow-hidden aspect-product bg-surface select-none",
            zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          )}
          onClick={() => setZoomed((z) => !z)}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setZoomed(false)}
          aria-label={zoomed ? "Click to zoom out" : "Click to zoom in"}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setZoomed((z) => !z)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute inset-0"
                animate={
                  zoomed
                    ? {
                        scale: 2.2,
                        x: `${(50 - mousePos.x) * 1.2}%`,
                        y: `${(50 - mousePos.y) * 1.2}%`,
                      }
                    : { scale: 1, x: 0, y: 0 }
                }
                transition={
                  zoomed
                    ? { duration: 0.05, ease: "linear" }
                    : { duration: 0.45, ease: [0.19, 1, 0.22, 1] }
                }
              >
                {activeImage && (
                  <Image
                    src={activeImage.url}
                    alt={`${productName} — ${activeImage.alt}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className="object-cover"
                    priority
                    draggable={false}
                  />
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Zoom hint — fades out once user has zoomed */}
          {!zoomed && images.length > 0 && (
            <span className="absolute bottom-3 right-3 type-label tracking-widest text-white/60 pointer-events-none text-[0.6rem]">
              + ZOOM
            </span>
          )}
        </div>

        {/* Mobile dot indicators */}
        {images.length > 1 && (
          <div className="mt-3 flex justify-center gap-1.5 md:hidden">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                className={cn(
                  "h-px w-6 transition-colors duration-200",
                  i === activeIndex ? "bg-foreground" : "bg-border-strong"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
