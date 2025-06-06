import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Language = "es" | "en";

type AboutImageProps = {
  images: string[];
  interval?: number;
};

const imageVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

const texts: Record<
  Language,
  {
    altPrefix: string;
    closeButton: string;
    nextButton: string;
    prevButton: string;
  }
> = {
  es: {
    altPrefix: "Imagen sobre nosotros",
    closeButton: "Cerrar galería",
    nextButton: "Siguiente imagen",
    prevButton: "Imagen anterior",
  },
  en: {
    altPrefix: "About image",
    closeButton: "Close gallery",
    nextButton: "Next image",
    prevButton: "Previous image",
  },
};

export default function AboutImage({
  images,
  interval = 3000,
}: AboutImageProps) {
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
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

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const openModal = () => {
    setModalIndex(index);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const nextImage = () => setModalIndex((modalIndex + 1) % images.length);
  const prevImage = () =>
    setModalIndex((modalIndex - 1 + images.length) % images.length);

  const currentTexts = texts[language];

  return (
    <>
      {/* Imagen rotatoria principal */}
      <div
        className="relative w-full h-[500px] rounded-lg overflow-hidden bg-gray-300 cursor-pointer"
        onClick={openModal}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            openModal();
          }
        }}
        aria-label={`${currentTexts.altPrefix} ${index + 1}`}
      >
        <AnimatePresence>
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={`${currentTexts.altPrefix} ${index + 1}`}
            className="absolute top-0 left-0 w-full h-full object-cover"
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
      </div>

      {/* Modal galería */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
            aria-modal="true"
            role="dialog"
            aria-label="Gallery modal"
          >
            <div
              className="relative w-full max-w-4xl h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[modalIndex]}
                alt={`${currentTexts.altPrefix} ${modalIndex + 1}`}
                className="max-h-full max-w-full object-contain rounded-lg"
              />

              {/* Botones de navegación */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-80"
                aria-label={currentTexts.prevButton}
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-80"
                aria-label={currentTexts.nextButton}
              >
                ›
              </button>

              {/* Botón cerrar */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white text-2xl font-bold bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-80"
                aria-label={currentTexts.closeButton}
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
