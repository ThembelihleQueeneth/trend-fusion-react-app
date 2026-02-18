import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import geckoOne from "../assets/gecko_one.jfif";

const Footer = () => {
  return (
    <footer className="bg-black text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-600/20 blur-[120px] rounded-full" />
      </div>

      {/* ================= CTA ================= */}
      <section className="py-28 relative">

        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute right-[10%] top-[20%] opacity-30 pointer-events-none"
        >
          <img
            src={geckoOne}
            alt=""
            className="w-28 md:w-36 rounded-2xl"
          />
        </motion.div>

        <div className="container mx-auto px-6 text-center">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
              START{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                TRACKING
              </span>
              <br />
              TODAY
            </h2>

            <p className="text-gray-400 mt-6 max-w-md mx-auto">
              Join millions of users who trust TrendFusion for real-time crypto insights.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 inline-flex items-center gap-3 px-10 py-4 rounded-full 
              bg-gradient-to-r from-purple-600 to-pink-600 
              hover:from-purple-500 hover:to-pink-500 
              transition-all duration-300 shadow-lg"
            >
              GET STARTED
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-white/10" />

      {/* ================= LINKS ================= */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-500" />
            <span className="font-semibold tracking-wide">
              TREND<span className="text-purple-500">FUSION</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex gap-8 text-sm text-gray-400">
            {["Privacy", "Terms", "API", "Discord"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-white transition"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-500 text-center md:text-right">
            © 2026 TrendFusion. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
