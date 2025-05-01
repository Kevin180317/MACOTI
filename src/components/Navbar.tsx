import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const year = new Date().getFullYear();

  const listItems = [
    {
      id: 1,
      name: "Inicio",
      link: "/",
    },
    {
      id: 2,
      name: "Acerca de",
      link: "/about",
    },
    {
      id: 3,
      name: "Servicios",
      link: "/services",
    },
    {
      id: 4,
      name: "Contacto",
      link: "/contact",
    },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "100%" },
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-black border-b border-gray-300 shadow-md z-50">
      <div className="container-nav">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src="/logo.png" alt="Macoti Logo" title="Macoti Logo" />
          <span className="ml-2 text-xl font-bold">Macoti</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
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
            </div>

            {/* Footer */}
            <footer className="w-full py-4 bg-gray-100 text-center text-sm">
              <p className="text-gray-600">
                © {year} Macoti. Todos los derechos reservados.
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
