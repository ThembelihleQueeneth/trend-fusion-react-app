import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const MarqueeSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Slower & smoother horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const items = [
    "BITCOIN",
    "ETHEREUM",
    "SOLANA",
    "CARDANO",
    "POLYGON",
    "AVALANCHE",
    "CHAINLINK",
    "POLKADOT",
    "COSMOS",
    "NEAR",
  ];

  return (
    <section
      ref={ref}
      className="relative py-14 overflow-hidden border-y border-white/10 bg-black"
    >
      {/* Fade edges (professional marquee look) */}
      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Glow background strip */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5 blur-2xl" />

      <motion.div
        style={{ x }}
        className="flex gap-16 whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-extrabold 
                       text-5xl md:text-7xl 
                       tracking-wider 
                       bg-gradient-to-r 
                       from-green-400 via-lime-400 to-green-500
                       bg-clip-text text-transparent
                       opacity-20
                       hover:opacity-100
                       hover:drop-shadow-[0_0_25px_rgba(34,197,94,0.6)]
                       transition-all duration-300 cursor-default"
          >
            {item}
            <span className="mx-8 text-green-400/30">•</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
};

export default MarqueeSection;
