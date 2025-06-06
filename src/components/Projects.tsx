import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Language = "es" | "en";

const projects = [
  { video: "/video2.mp4" },
  { video: "/video3.mp4" },
  { video: "/video4.mp4" },
];

const texts: Record<
  Language,
  {
    title: string;
    subtitle: string;
    videoAlt: string;
    closeButton: string;
  }
> = {
  es: {
    title: "Nuestros Proyectos",
    subtitle:
      "Explore algunos de los increíbles proyectos en los que hemos trabajado. Cada uno refleja nuestra pasión por la calidad visual y técnica.",
    videoAlt: "Proyecto",
    closeButton: "Cerrar",
  },
  en: {
    title: "Our Projects",
    subtitle:
      "Explore some of the incredible projects we have worked on. Each one reflects our passion for visual and technical quality.",
    videoAlt: "Project",
    closeButton: "Close",
  },
};

export default function Proyectos() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>("es");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      if (path.startsWith("/en/")) {
        setLanguage("en");
        window.localStorage.setItem("language", "en");
      } else {
        const savedLanguage = window.localStorage.getItem("language");
        if (savedLanguage === "es" || savedLanguage === "en") {
          setLanguage(savedLanguage);
        } else {
          setLanguage("es");
        }
      }
    }
  }, []);

  const currentTexts = texts[language];

  return (
    <main className="container mx-auto px-4 py-10">
      {/* Sección de encabezado */}
      <section className="text-start mb-10 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900">
          {currentTexts.title}
        </h1>
        <p className="text-gray-600 mt-2 text-lg">{currentTexts.subtitle}</p>
      </section>

      {/* Grid de videos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="rounded-xl overflow-hidden shadow-lg cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedVideo(project.video)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setSelectedVideo(project.video);
              }
            }}
            aria-label={`${currentTexts.videoAlt} ${index + 1}`}
          >
            <video
              src={project.video}
              className="w-full h-[320px] object-cover rounded-xl"
              muted
              autoPlay
              loop
              playsInline
              aria-hidden="true"
            />
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4 py-8"
            onClick={() => setSelectedVideo(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              {/* Botón cerrar */}
              <button
                className="absolute -top-10 right-0 text-white text-4xl font-bold hover:text-red-400 transition"
                onClick={() => setSelectedVideo(null)}
                aria-label={currentTexts.closeButton}
              >
                &times;
              </button>

              <video
                src={selectedVideo}
                controls
                autoPlay
                className="w-full max-h-[80vh] rounded-lg shadow-2xl"
                aria-label={`${
                  currentTexts.videoAlt
                } ${currentTexts.closeButton.toLowerCase()}`}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
