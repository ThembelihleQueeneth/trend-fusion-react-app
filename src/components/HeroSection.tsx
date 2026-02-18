import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import geckoOne from "../assets/gecko_one.jfif";
import geckoTwo from "../assets/gecko_two.jfif";
import geckoFour from "../assets/gecko_four.jfif";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const coinY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const coinRotate = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden pt-20">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full opacity-15"
          style={{ background: "var(--gradient-glow)" }}
        />
        <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-primary animate-pulse-neon" />
        <div className="absolute top-40 right-20 w-1 h-1 rounded-full bg-lime animate-pulse-neon" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 rounded-full bg-cyber animate-pulse-neon" style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center min-h-[90vh]">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <span className="sticker-badge text-sm">🔥 #1 CRYPTO TRACKER</span>
        </motion.div>

        {/* Giant overlapping text block */}
        <div className="relative w-full flex flex-col items-center">
          {/* Line 1: TRACK */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative z-10"
          >
            <h1 className="font-display text-[15vw] md:text-[14vw] lg:text-[12vw] leading-[0.85] text-foreground tracking-tight text-center">
              TRACK
            </h1>
          </motion.div>

          {/* Line 2: THE NEXT — coin overlaps here */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative z-20"
          >
            <h1 className="font-display text-[15vw] md:text-[14vw] lg:text-[12vw] leading-[0.85] text-gradient-neon tracking-tight text-center -mt-2 md:-mt-4">
              THE NEXT
            </h1>

            {/* Coin overlapping the text */}
            <motion.div
              style={{ y: coinY, rotate: coinRotate }}
              className="absolute -right-4 md:right-[5%] lg:right-[10%] -top-[40%] md:-top-[60%] z-30 pointer-events-none"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.3, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.7, type: "spring", bounce: 0.4 }}
              >
                <div className="absolute inset-0 rounded-full opacity-40 blur-3xl scale-150" style={{ background: "var(--gradient-glow)" }} />
                
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Line 3: BIG COIN */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="relative z-10"
          >
            <h1 className="font-display text-[15vw] md:text-[14vw] lg:text-[12vw] leading-[0.85] text-foreground tracking-tight text-center -mt-2 md:-mt-4">
              BIG C<span className="text-primary">●</span>IN
            </h1>
          </motion.div>

          {/* Floating gecko stickers scattered around text */}
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [12, 8, 12] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[0%] left-[0%] md:left-[5%] z-40"
          >
            <div className="relative">
              <img src={geckoOne} alt="Gecko gamer" className="w-16 md:w-24 rounded-2xl border-2 border-primary/50 shadow-lg shadow-primary/20 object-cover" />
              <span className="absolute -bottom-2 -right-2 sticker-badge text-[10px]">📈 GAMER</span>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0], rotate: [-6, -10, -6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[15%] left-[3%] md:left-[10%] z-40"
          >
            <span className="sticker-badge text-xs">💎 HODL</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0], rotate: [5, 10, 5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-[5%] right-[0%] md:right-[3%] z-40"
          >
            <div className="relative">
              <img src={geckoTwo} alt="Gecko cool" className="w-16 md:w-24 rounded-2xl border-2 border-cyber/50 shadow-lg shadow-cyber/20 object-cover" />
              <span className="absolute -bottom-2 -left-2 sticker-badge text-[10px]">🚀 LFG</span>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0], rotate: [-3, 3, -3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[8%] right-[5%] md:right-[12%] z-40"
          >
            <div className="relative">
              <img src={geckoFour} alt="Gecko street art" className="w-14 md:w-20 rounded-2xl border-2 border-lime/50 shadow-lg shadow-lime/20 object-cover" />
              <span className="absolute -top-2 -right-2 sticker-badge text-[10px]">⚡ WAGMI</span>
            </div>
          </motion.div>
        </div>

        {/* Sub content below giant text */}
        <motion.div
          style={{ y, opacity }}
          className="mt-8 md:mt-12 flex flex-col items-center gap-6 relative z-10"
        >
          <p className="text-base md:text-lg text-muted-foreground font-body max-w-lg text-center">
            Real-time crypto data, trending tokens, and market insights — all fused into one clean dashboard.
          </p>

          <div className="flex items-center gap-4">
            <button className="group flex items-center gap-2 px-8 py-4 font-display text-sm bg-primary text-primary-foreground rounded-full neon-glow hover:brightness-110 transition-all">
              EXPLORE MARKET
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center gap-2 px-6 py-4 font-body text-sm border border-border text-foreground rounded-full hover:border-primary transition-all">
              <Sparkles className="h-4 w-4 text-primary" />
              Watch Demo
            </button>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex gap-8 mt-6"
          >
            {[
              { label: "Coins Tracked", value: "14K+" },
              { label: "Daily Users", value: "2.5M" },
              { label: "Markets", value: "800+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-2xl text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground font-body">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
