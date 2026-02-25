import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import geckoOne from "../assets/gecko_one.jfif";
import geckoTwo from "../assets/gecko_two.jfif";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const coinY = useTransform(scrollYProgress, [0, 1], [0, -80]); // Reduced for mobile
  const coinRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={ref}
      className="relative min-h-[110vh] md:min-h-[120vh] overflow-hidden pt-20 md:pt-24 bg-[#020403]"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#06110c] via-[#020403] to-black" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] md:w-[900px] h-[300px] md:h-[900px] rounded-full bg-green-500/10 blur-[80px] md:blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center justify-center min-h-[85vh]">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 md:mb-8"
        >
          <span className="px-4 py-1.5 md:px-5 md:py-2 rounded-full text-black font-bold text-[10px] md:text-sm 
                           bg-gradient-to-r from-green-400 to-lime-400
                           shadow-[0_0_20px_rgba(34,197,94,0.4)]">
             #1 CRYPTO TRACKER
          </span>
        </motion.div>

        {/* Giant Text Block */}
        <div className="relative w-full flex flex-col items-center">

          {/* TRACK */}
          <motion.h1
            style={{ y: textY }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-black text-[16vw] md:text-[13vw] leading-[0.85] tracking-tighter text-white text-center"
          >
            TRACK
          </motion.h1>

          {/* THE NEXT */}
          <motion.h1
            style={{ y: textY }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-20 font-black text-[16vw] md:text-[13vw] leading-[0.85] tracking-tighter
                       bg-gradient-to-r from-green-400 to-lime-500 bg-clip-text text-transparent
                       drop-shadow-[0_0_15px_rgba(34,197,94,0.3)] text-center"
          >
            THE NEXT
          </motion.h1>

          {/* Floating Coin - Adjusted positioning to not cover text on mobile */}
          <motion.div
            style={{ y: coinY, rotate: coinRotate }}
            className="absolute -top-[5%] right-[2%] md:top-[10%] md:right-[5%] z-30"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.7, type: "spring" }}
              className="relative w-[80px] sm:w-[120px] md:w-[240px] lg:w-[300px] aspect-square 
                         rounded-full bg-gradient-to-br from-green-400 to-green-600 
                         flex items-center justify-center 
                         shadow-[0_0_40px_rgba(34,197,94,0.5)] md:shadow-[0_0_80px_rgba(34,197,94,0.6)]"
            >
              <div className="absolute inset-0 rounded-full blur-2xl md:blur-3xl opacity-50 bg-green-500 scale-125" />
              <span className="text-white text-3xl sm:text-5xl md:text-8xl font-bold relative z-10">₿</span>
            </motion.div>
          </motion.div>

          {/* BIG COIN */}
          <motion.h1
            style={{ y: textY }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-black text-[16vw] md:text-[13vw] leading-[0.85] tracking-tighter text-white text-center"
          >
            BIG C<span className="text-green-400">●</span>IN
          </motion.h1>

          {/* Floating Stickers - Hidden or resized for smaller screens */}
          <motion.img
            src={geckoOne}
            className="absolute -top-10 left-0 w-14 md:w-28 rounded-xl border border-green-400/30 md:block hidden"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          />
          <motion.img
            src={geckoTwo}
            className="absolute bottom-0 right-0 w-12 md:w-24 rounded-xl border border-lime-400/30 opacity-50 md:opacity-100"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
          />
        </div>

        {/* Sub Content */}
        <motion.div
          style={{ y, opacity }}
          className="mt-10 md:mt-16 flex flex-col items-center gap-6 px-4"
        >
          <p className="text-sm md:text-lg text-gray-400 max-w-md md:max-w-xl text-center leading-relaxed">
            Real-time crypto data and trending tokens fused into one powerful dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-black font-bold rounded-full shadow-lg hover:scale-105 transition-all w-full sm:w-auto">
              EXPLORE MARKET <ArrowRight className="h-4 w-4" />
            </button>
            <button className="flex items-center justify-center gap-2 px-8 py-4 border border-green-400/30 text-green-400 rounded-full hover:bg-green-400/5 transition-all w-full sm:w-auto">
              <Sparkles className="h-4 w-4" /> Watch Demo
            </button>
          </div>

          {/* Stats - Grid for mobile, Flex for desktop */}
          <div className="grid grid-cols-2 md:flex gap-6 md:gap-12 mt-8 md:mt-12">
            {[
              { label: "Coins", value: "14K+" },
              { label: "Users", value: "2.5M" },
              { label: "Markets", value: "800+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl md:text-3xl font-bold text-green-400">{stat.value}</div>
                <div className="text-[10px] md:text-sm uppercase tracking-widest text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;