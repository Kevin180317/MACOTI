import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEn, setIsEn] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      setIsEn(path.startsWith("/en"));
    }
  }, []);

  const getTranslatedPath = () => {
    if (typeof window === "undefined") return "/";

    const currentPath = window.location.pathname;

    if (currentPath.startsWith("/en")) {
      // Cambiar a español quitando /en
      const spanishPath = currentPath.replace(/^\/en/, "") || "/";
      return spanishPath.endsWith("/") ? spanishPath : spanishPath + "/";
    } else {
      // Cambiar a inglés agregando /en
      const englishPath = currentPath === "/" ? "/en/" : `/en${currentPath}`;
      return englishPath.endsWith("/") ? englishPath : englishPath + "/";
    }
  };

  const listItems = isEn
    ? [
        { id: 1, name: "Home", link: "/en/" },
        { id: 2, name: "About", link: "/en/acerca-de/" },
        { id: 3, name: "Services", link: "/en/servicios/" },
        { id: 4, name: "Projects", link: "/en/proyectos/" },
        { id: 5, name: "Blogs", link: "/en/blogs/" },
        { id: 6, name: "Contact", link: "/en/contacto/" },
      ]
    : [
        { id: 1, name: "Inicio", link: "/" },
        { id: 2, name: "Acerca de", link: "/acerca-de/" },
        { id: 3, name: "Servicios", link: "/servicios/" },
        { id: 4, name: "Proyectos", link: "/proyectos/" },
        { id: 5, name: "Blogs", link: "/blogs/" },
        { id: 6, name: "Contacto", link: "/contacto/" },
      ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLanguage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsEn((prev) => !prev);
  };

  const handleLanguageAnimationComplete = () => {
    if (isAnimating) {
      const newPath = getTranslatedPath();
      window.location.href = newPath;
    }
  };

  const menuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "100%" },
  };

  const LanguageToggle = (
    <button
      onClick={toggleLanguage}
      disabled={isAnimating}
      aria-label="Toggle language"
      className="relative w-16 h-8 rounded-full bg-gray-300 cursor-pointer focus:outline-none"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className="absolute top-1 left-1 w-6 h-6 rounded-full bg-yellow-400 shadow-lg"
        animate={{ x: isEn ? 32 : 0 }}
        onAnimationComplete={handleLanguageAnimationComplete}
      />
      <span
        className={`absolute left-2 top-2 text-xs font-semibold select-none ${
          !isEn ? "text-black" : "text-gray-500"
        }`}
      >
        ES
      </span>
      <span
        className={`absolute right-2 top-2 text-xs font-semibold select-none ${
          isEn ? "text-black" : "text-gray-500"
        }`}
      >
        EN
      </span>
    </button>
  );

  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-black border-b border-gray-300 shadow-md z-50">
      <div className="container-nav flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <a href={isEn ? "/en/" : "/"} className="flex items-center">
          <img src="/logo.png" alt="Macoti Logo" title="Macoti Logo" />
          <span className="ml-2 text-xl font-bold">MACOTI</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {listItems.map((item) => (
            <motion.a
              key={item.id}
              href={item.link}
              className="animacion-hover-nav"
              whileHover={{ scale: 1.1 }}
            >
              {item.name}
            </motion.a>
          ))}

          {/* Language Toggle */}
          <div className="ml-6">{LanguageToggle}</div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-white text-black z-50 flex flex-col items-center justify-between"
          >
            {/* Close Button */}
            <div className="w-full flex justify-end p-4">
              <button
                onClick={toggleMenu}
                aria-label="Close Menu"
                className="text-black text-2xl"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex flex-col items-center mt-10 space-y-6">
              {listItems.map((item) => (
                <motion.a
                  key={item.id}
                  href={item.link}
                  className="text-2xl font-semibold animacion-hover-nav"
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1, color: "#FFD700" }}
                >
                  {item.name}
                </motion.a>
              ))}

              {/* Language Toggle in Mobile */}
              <div className="mt-6">{LanguageToggle}</div>
            </div>

            {/* Footer */}
            <footer className="w-full py-4 bg-gray-100 text-center text-sm">
              <p className="text-gray-600">
                © {year} Macoti.{" "}
                {isEn
                  ? "All rights reserved."
                  : "Todos los derechos reservados."}
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
