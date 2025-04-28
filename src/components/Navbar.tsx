import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/logo.jpg"
            alt="Macoti Logo"
            title="Macoti Logo"
            className="h-10 w-10"
          />
          <span className="ml-2 text-xl font-bold">Macoti</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {listItems.map((item) => (
            <motion.a
              key={item.id}
              href={item.link}
              className="hover:text-gray-400 transition-colors"
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

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-gray-700"
        >
          <ul className="flex flex-col items-center space-y-4 py-4">
            {listItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.link}
                  className="text-white hover:text-gray-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </nav>
  );
}

export default Navbar;
