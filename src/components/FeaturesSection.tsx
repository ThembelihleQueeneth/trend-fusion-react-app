import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Rocket, Eye, Zap, Globe } from "lucide-react";
import geckoTwo from "../assets/gecko_two.jfif";

const features = [
  {
    icon: Eye,
    title: "REAL-TIME TRACKING",
    desc: "Live price updates across 14,000+ coins with zero delay.",
  },
  {
    icon: Zap,
    title: "INSTANT ALERTS",
    desc: "Get notified when your watched coins hit your target price.",
  },
  {
    icon: Globe,
    title: "GLOBAL COVERAGE",
    desc: "Data from 800+ exchanges worldwide, aggregated and verified.",
  },
  {
    icon: Rocket,
    title: "EARLY TRENDS",
    desc: "Spot trending tokens before they blow up on social media.",
  },
];

const FeaturesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const geckoY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Parallax background element */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -top-20 right-0 w-96 h-96 rounded-full opacity-10 parallax-layer"
        aria-hidden
      >
        <div className="w-full h-full rounded-full" style={{ background: "var(--gradient-glow)" }} />
      </motion.div>

      {/* Floating gecko decoration */}
      <motion.div
        style={{ y: geckoY }}
        className="absolute -left-10 md:left-8 top-1/2 -translate-y-1/2 z-0 opacity-20 md:opacity-30 pointer-events-none"
      >
        <img src={geckoTwo} alt="" className="w-32 md:w-48 rounded-3xl rotate-[-12deg]" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="sticker-badge">🚀 FEATURES</span>
          <h2 className="font-display text-4xl md:text-6xl text-foreground mt-6">
            WHY <span className="text-gradient-neon">TRENDFUSION</span>?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bento-item group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:neon-glow transition-all">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground font-body">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
