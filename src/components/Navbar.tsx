import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
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

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium">
          <Link to="/market" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
            Market
          </Link>
          <Link to="/trending" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
            Trending
          </Link>
          <Link to="/nfts" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
            NFTs
          </Link>
          <Link to="/learn" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
            Learn
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">

          <button className="hidden sm:block px-5 py-2 text-sm 
                             text-gray-300 border border-white/10
                             rounded-full 
                             hover:border-green-400 hover:text-green-400
                             transition-all duration-300">
            Log In
          </button>

          <button className="px-6 py-2 text-sm font-semibold 
                             bg-green-500 text-black 
                             rounded-full 
                             shadow-[0_0_20px_rgba(34,197,94,0.6)]
                             hover:scale-105 hover:brightness-110
                             transition-all duration-300">
            Sign Up
          </button>

        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
