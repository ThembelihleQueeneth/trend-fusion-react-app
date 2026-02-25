import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X } from "lucide-react"; // Added Menu and X icons
import { Link } from "react-router-dom";
import { useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSwitchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const navLinks = [
    { name: "Market", href: "#" },
    { name: "Trending", href: "#" },
    { name: "NFTs", href: "#" },
    { name: "Learn", href: "#" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 
                   backdrop-blur-xl bg-black/40 
                   border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-green-500/20 
                            flex items-center justify-center
                            border border-green-500/30
                            group-hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]
                            transition-all duration-300">
              <Zap className="h-5 w-5 text-green-400" />
            </div>
            <span className="text-xl font-bold tracking-wide text-white">
              TREND<span className="text-green-400">FUSION</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-10 text-sm font-medium">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className="text-gray-400 hover:text-green-400 transition-colors duration-300 cursor-text"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowLogin(true)}
              className="hidden sm:block px-5 py-2 text-sm 
                         text-gray-300 border border-white/10
                         rounded-full hover:border-green-400 hover:text-green-400
                         transition-all duration-300 cursor-pointer"
            >
              Log In
            </button>

            <button
              onClick={() => setShowRegister(true)}
              className="hidden sm:block px-6 py-2 text-sm font-semibold 
                         bg-green-500 text-black rounded-full 
                         shadow-[0_0_20px_rgba(34,197,94,0.6)]
                         hover:scale-105 hover:brightness-110
                         transition-all duration-300 cursor-pointer"
            >
              Sign Up
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-gray-300 p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 border-b border-white/10 overflow-hidden"
            >
              <div className="flex flex-col gap-4 p-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg text-gray-300 hover:text-green-400"
                  >
                    {link.name}
                  </Link>
                ))}
                <hr className="border-white/10 my-2" />
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => { setShowLogin(true); setIsMobileMenuOpen(false); }}
                    className="w-full py-3 text-center text-gray-300 border border-white/10 rounded-xl"
                  >
                    Log In
                  </button>
                  <button 
                    onClick={() => { setShowRegister(true); setIsMobileMenuOpen(false); }}
                    className="w-full py-3 text-center bg-green-500 text-black font-bold rounded-xl"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Modals remain the same */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
};

export default Navbar;