"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { galleryImages } from "@/lib/gallery-images";
import { Lightbox } from "@/components/gallery/lightbox";

export function GalleryGrid() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {galleryImages.map((image, i) => (
          <motion.div
            key={image.src}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1, ease: "easeOut" }}
            className="mb-4 break-inside-avoid"
          >
            <button
              onClick={() => setSelected(i)}
              className="group relative block w-full overflow-hidden border-2 border-transparent transition-colors duration-300 hover:border-gold"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </button>
          </motion.div>
        ))}
      </div>

      <Lightbox
        images={galleryImages}
        index={selected}
        onClose={() => setSelected(null)}
        onNavigate={setSelected}
      />
    </>
  );
}
