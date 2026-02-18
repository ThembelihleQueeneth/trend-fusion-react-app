import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl text-foreground">
            TREND<span className="text-primary">FUSION</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-body text-sm">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Market</a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Trending</a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">NFTs</a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Learn</a>
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden sm:block px-4 py-2 text-sm font-body text-muted-foreground border border-border rounded-full hover:border-primary hover:text-primary transition-all">
            Log In
          </button>
          <button className="px-5 py-2 text-sm font-display bg-primary text-primary-foreground rounded-full neon-glow hover:brightness-110 transition-all">
            Sign Up
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
