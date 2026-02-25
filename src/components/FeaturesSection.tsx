import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for parallax safety
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  // Reduced gecko movement on mobile to keep it from flying off-screen
  const geckoY = useTransform(scrollYProgress, [0, 1], isMobile ? [40, -40] : [80, -80]);

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-black via-[#06110c] to-black"
    >
      {/* Background Glow - Adjusted size for mobile */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-1/4 right-[-100px] md:right-[-200px] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-green-500/10 blur-[80px] md:blur-3xl pointer-events-none"
      />

      {/* Floating Gecko - Positioned more safely for mobile */}
      <motion.div
        style={{ y: geckoY }}
        className="absolute left-[-40px] md:left-10 top-1/3 md:top-1/2 -translate-y-1/2 opacity-10 md:opacity-20 pointer-events-none"
      >
        <img
          src={geckoTwo}
          alt=""
          className="w-32 md:w-56 rounded-3xl rotate-[-10deg] filter grayscale contrast-125"
        />
      </motion.div>

      <div className="max-w-6xl mx-auto px-5 md:px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="px-4 py-1.5 md:px-5 md:py-2 rounded-full text-black font-bold text-[10px] md:text-sm 
                           bg-gradient-to-r from-green-400 to-lime-400
                           shadow-[0_0_20px_rgba(34,197,94,0.4)]">
              FEATURES
          </span>

          <h2 className="mt-6 md:mt-8 text-4xl md:text-7xl font-black tracking-tighter text-white">
            WHY{" "}
            <span className="bg-gradient-to-r from-green-400 to-lime-400 
                             bg-clip-text text-transparent 
                             drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              TRENDFUSION
            </span>
            ?
          </h2>
        </motion.div>

        {/* Feature Grid - Single col on mobile, 2 on tablet+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">

          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group p-6 md:p-8 rounded-[2rem] 
                         bg-white/[0.03] backdrop-blur-md 
                         border border-white/10 
                         hover:border-green-400/40
                         transition-all duration-500"
            >
              {/* Neon Hover Glow - Disabled blur on mobile for performance if needed */}
              <div className="absolute inset-0 rounded-[2rem] 
                              opacity-0 group-hover:opacity-100 
                              bg-gradient-to-r from-green-500/5 to-lime-400/5 
                              blur-xl transition duration-500" />

              <div className="relative z-10 flex flex-col items-start">
                {/* Icon Box */}
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl 
                                bg-green-500/10 
                                flex items-center justify-center mb-5 md:mb-6
                                group-hover:scale-110 group-hover:bg-green-500/20
                                transition-all duration-300">
                  <f.icon className="h-6 w-6 md:h-7 md:h-7 text-green-400" />
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">
                  {f.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-[280px] md:max-w-none">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;