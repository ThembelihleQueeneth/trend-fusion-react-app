import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import geckoOne from "../assets/gecko_one.jfif";

const Footer = () => (
  <footer className="border-t border-border">
    {/* CTA Section */}
    <section className="py-24 relative overflow-hidden">
      {/* Floating gecko in CTA */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [8, 12, 8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[5%] md:right-[10%] top-[15%] z-0 opacity-25 md:opacity-40 pointer-events-none"
      >
        <img src={geckoOne} alt="" className="w-24 md:w-36 rounded-2xl" />
      </motion.div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="sticker-badge mb-6">💚 IT'S FREE</span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mt-6 mb-6">
            START <span className="text-gradient-neon">TRACKING</span>
            <br />
            TODAY
          </h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto mb-8">
            Join 2.5M+ users who trust TrendFusion for real-time crypto intelligence.
          </p>
          <button className="group inline-flex items-center gap-2 px-10 py-5 font-display text-sm bg-primary text-primary-foreground rounded-full neon-glow hover:brightness-110 transition-all">
            GET STARTED FREE
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>

    {/* Footer links */}
    <div className="container mx-auto px-6 py-8 border-t border-border">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          <span className="font-display text-sm text-foreground">
            TREND<span className="text-primary">FUSION</span>
          </span>
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground font-body">
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-primary transition-colors">API</a>
          <a href="#" className="hover:text-primary transition-colors">Discord</a>
        </div>
        <div className="text-xs text-muted-foreground font-body">
          © 2026 TrendFusion. Powered by CoinGecko API.
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
