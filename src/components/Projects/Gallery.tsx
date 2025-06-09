import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images: string[] = Array.from(
  { length: 17 },
  (_, i) => `/bento/${i + 1}.jpeg`
);

const getBentoClass = (index: number): string => {
  const pattern = index % 12;

  switch (pattern) {
    case 0:
      return "col-span-2 row-span-1";
    case 1:
    case 2:
      return "col-span-1 row-span-2";
    case 3:
      return "col-span-2 row-span-1";
    case 4:
    case 9:
      return "col-span-1 row-span-1";
    case 5:
    case 6:
    case 7:
    case 10:
      return "col-span-1 row-span-1";
    case 8:
    case 11:
      return "col-span-2 row-span-2";
    default:
      return "col-span-1 row-span-1";
  }
};

type Language = "es" | "en";

type Texts = {
  [key in Language]: {
    title: string;
    subtitle: string;
    imageAlt: string;
    totalImages: string;
    imageCount: string;
    of: string;
    closeHint: string;
  };
};

const texts: Texts = {
  es: {
    title: "Mis Proyectos",
    subtitle:
      "Una colección de trabajos realizados para mis clientes con dedicación y creatividad",
    imageAlt: "Proyecto",
    totalImages: "proyectos realizados",
    imageCount: "Proyecto",
    of: "de",
    closeHint: "Toca fuera para cerrar",
  },
  en: {
    title: "My Projects",
    subtitle:
      "A collection of works created for my clients with dedication and creativity",
    imageAlt: "Project",
    totalImages: "completed projects",
    imageCount: "Project",
    of: "of",
    closeHint: "Tap outside to close",
  },
};

export default function ProjectGallery() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [language, setLanguage] = useState<Language>("es");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      if (path.startsWith("/en/")) {
        setLanguage("en");
      } else {
        setLanguage("es");
      }
    }
  }, []);

  const currentTexts = texts[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Puedes usar currentTexts.title y subtitle aquí si quieres */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[140px] md:auto-rows-[180px] gap-3 md:gap-4">
          {images.map((src, index) => (
            <motion.div
              key={index}
              className={`${getBentoClass(
                index
              )} group relative overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-slate-100 to-slate-200`}
              whileHover={{ scale: 1.02, z: 10 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(src)}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div className="absolute inset-0 p-2">
                <img
                  src={src}
                  alt={`${currentTexts.imageAlt} ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                  style={{ objectPosition: "center" }}
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl md:rounded-3xl" />

              <motion.div
                className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-800 text-xs md:text-sm font-bold px-2 md:px-3 py-1 rounded-full shadow-lg border border-white/50"
                initial={{ scale: 0, rotate: -10 }}
                animate={{
                  scale: hoveredIndex === index ? 1 : 0,
                  rotate: hoveredIndex === index ? 0 : -10,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                #{index + 1}
              </motion.div>

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                  {getBentoClass(index).includes("2") ? "📏" : "📐"}
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

              <div className="absolute inset-0 rounded-2xl md:rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 text-slate-500 text-sm">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-slate-300"></div>
            <span>
              {images.length} {currentTexts.totalImages}
            </span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-slate-300"></div>
          </div>
        </motion.div>

        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
              onClick={() => setSelected(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="relative max-w-6xl w-full"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.7, opacity: 0, rotateX: 15 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                exit={{ scale: 0.7, opacity: 0, rotateX: 15 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <motion.button
                  className="absolute -top-16 right-0 bg-white/10 hover:bg-red-500/20 border border-white/20 hover:border-red-500/30 text-white p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-110 group"
                  onClick={() => setSelected(null)}
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className="w-5 h-5 group-hover:text-red-400 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>

                <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-slate-200 via-white to-slate-100 p-3">
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-inner">
                    <img
                      src={selected}
                      alt={`${currentTexts.imageAlt} Preview`}
                      className="w-full max-h-[75vh] object-contain"
                    />
                  </div>
                </div>

                <motion.div
                  className="absolute -bottom-16 left-0 right-0 flex justify-between items-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-2xl border border-white/20">
                    <p className="text-sm font-medium">
                      {currentTexts.imageCount} {images.indexOf(selected) + 1}{" "}
                      {currentTexts.of} {images.length}
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-2xl border border-white/20">
                    <p className="text-sm">{currentTexts.closeHint}</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
