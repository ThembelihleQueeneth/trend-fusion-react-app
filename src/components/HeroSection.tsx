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
  const coinY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const coinRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={ref}
      className="relative min-h-[120vh] overflow-hidden pt-24 bg-[#020403]"
    >
      {/* Deep Green Radial Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#06110c] via-[#020403] to-black" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-green-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center min-h-[90vh]">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="px-5 py-2 rounded-full text-black font-semibold text-sm 
                           bg-gradient-to-r from-green-400 to-lime-400
                           shadow-[0_0_20px_rgba(34,197,94,0.6)]">
            🔥 #1 CRYPTO TRACKER
          </span>
        </motion.div>

        {/* Giant Text Block */}
        <div className="relative w-full flex flex-col items-center">

          {/* TRACK */}
          <motion.h1
            style={{ y: textY }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-extrabold text-[18vw] md:text-[15vw] lg:text-[13vw]
                       leading-[0.82] tracking-[-0.04em] text-white text-center"
          >
            TRACK
          </motion.h1>

          {/* THE NEXT */}
          <motion.h1
            style={{ y: textY }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-20
                       font-extrabold text-[18vw] md:text-[15vw] lg:text-[13vw]
                       leading-[0.82] tracking-[-0.04em]
                       bg-gradient-to-r from-green-400 to-lime-500
                       bg-clip-text text-transparent
                       drop-shadow-[0_0_25px_rgba(34,197,94,0.4)]
                       text-center -mt-4"
          >
            THE NEXT
          </motion.h1>

          {/* Floating Coin */}
          <motion.div
            style={{ y: coinY, rotate: coinRotate }}
            className="absolute top-[15%] right-[10%] z-30"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.7, type: "spring" }}
              className="relative w-[180px] md:w-[260px] lg:w-[320px] aspect-square 
                         rounded-full bg-gradient-to-br from-green-400 to-green-600 
                         flex items-center justify-center 
                         shadow-[0_0_80px_rgba(34,197,94,0.6)]"
            >
              <div className="absolute inset-0 rounded-full 
                              blur-3xl opacity-60 
                              bg-green-500 scale-150" />
              <span className="text-white text-5xl md:text-7xl font-bold relative z-10">
                ₿
              </span>
            </motion.div>
          </motion.div>

          {/* BIG COIN */}
          <motion.h1
            style={{ y: textY }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-extrabold text-[18vw] md:text-[15vw] lg:text-[13vw]
                       leading-[0.82] tracking-[-0.04em]
                       text-white text-center -mt-4"
          >
            BIG C<span className="text-green-400">●</span>IN
          </motion.h1>

          {/* Floating Stickers */}

          <motion.img
            src={geckoOne}
            className="absolute top-[5%] left-[5%] w-20 md:w-28 rounded-2xl border-2 border-green-400/50 shadow-lg"
            animate={{ y: [0, -12, 0], rotate: [8, 12, 8] }}
            transition={{ repeat: Infinity, duration: 4 }}
          />

          <motion.img
            src={geckoTwo}
            className="absolute top-[10%] right-[3%] w-20 md:w-28 rounded-2xl border-2 border-lime-400/50 shadow-lg"
            animate={{ y: [0, 10, 0], rotate: [-8, -12, -8] }}
            transition={{ repeat: Infinity, duration: 5 }}
          />

          <motion.img
            src={geckoFour}
            className="absolute bottom-[10%] right-[15%] w-16 md:w-24 rounded-2xl border-2 border-green-400/50 shadow-lg"
            animate={{ y: [0, 8, 0], rotate: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 6 }}
          />
        </div>

        {/* Sub Content */}
        <motion.div
          style={{ y, opacity }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <p className="text-lg text-gray-400 max-w-xl text-center">
            Real-time crypto data, trending tokens, and market insights —
            all fused into one powerful dashboard.
          </p>

          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-8 py-4 
                               bg-green-500 text-black font-semibold
                               rounded-full 
                               shadow-[0_0_25px_rgba(34,197,94,0.6)]
                               hover:scale-105 transition-all">
              EXPLORE MARKET
              <ArrowRight className="h-4 w-4" />
            </button>

            <button className="flex items-center gap-2 px-6 py-4 
                               border border-green-400/30 
                               text-green-400 rounded-full 
                               hover:border-green-400 transition-all">
              <Sparkles className="h-4 w-4" />
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-8">
            {[
              { label: "Coins Tracked", value: "14K+" },
              { label: "Daily Users", value: "2.5M" },
              { label: "Markets", value: "800+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
