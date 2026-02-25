import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

import geckoOne from "../assets/gecko_one.jfif";
import geckoTwo from "../assets/gecko_two.jfif";
import geckoThree from "../assets/gecko_five.jfif";
import geckoFour from "../assets/gecko_four.jfif";
import geckoFive from "../assets/gecko_five.jfif";

const geckos = [
  { src: geckoOne, name: "GAMER GECKO", tag: "🎮 DEGEN", rarity: "RARE", accent: "#00ffe0", rank: "#1" },
  { src: geckoTwo, name: "COOL GECKO", tag: "😎 ALPHA", rarity: "EPIC", accent: "#ff6ef7", rank: "#2" },
  { src: geckoThree, name: "COZY GECKO", tag: "🧶 HODLER", rarity: "UNCOMMON", accent: "#ffe066", rank: "#3" },
  { src: geckoFour, name: "STREET GECKO", tag: "🔥 REBEL", rarity: "LEGENDARY", accent: "#ff4d4d", rank: "#4" },
  { src: geckoFive, name: "OG GECKO", tag: "👑 FOUNDER", rarity: "MYTHIC", accent: "#a78bfa", rank: "#5" },
];

const GeckoGallery = () => {
  return (
    <div className="relative min-h-screen bg-[#050508] overflow-x-hidden font-mono">
      {/* Background blobs */}
      <div className="fixed w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none bg-[rgba(0,255,200,0.03)] -top-[200px] -left-[200px]" />
      <div className="fixed w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none bg-[rgba(168,139,250,0.04)] bottom-0 -right-[100px]" />
      <div className="fixed w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none bg-[rgba(255,100,255,0.03)] top-[40%] left-[50%]" />

      {/* Header */}
      <motion.div
        className="text-center px-6 pt-20 pb-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-center gap-3 text-[0.7rem] tracking-[0.4em] text-cyan-300 uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#00ffe0]" />
          Collection · 2024
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#00ffe0]" />
        </div>

        <h1 className="font-bold text-white leading-[0.9] text-[clamp(4rem,10vw,8rem)]">
          MEET THE <br />
          <span className="text-transparent stroke-cyan-300">GECKOS</span>
        </h1>

        <p className="max-w-xl mx-auto mt-4 text-white/40 tracking-wider">
          The legendary crew behind TrendFusion. Each gecko carries its own crypto aura and market energy.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8 max-w-[1400px] mx-auto px-8 pb-24">
        {geckos.map((gecko, i) => (
          <GeckoCard key={gecko.name} gecko={gecko} index={i} />
        ))}
      </div>
    </div>
  );
};

const GeckoCard = ({ gecko, index }: { gecko: typeof geckos[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), {
    stiffness: 300,
    damping: 30,
  });

  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const rarityColors: Record<string, string> = {
    UNCOMMON: "#4ade80",
    RARE: "#60a5fa",
    EPIC: "#c084fc",
    LEGENDARY: "#fb923c",
    MYTHIC: "#f472b6",
  };

  const rarityColor = rarityColors[gecko.rarity] ?? gecko.accent;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-[1000px] "
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        whileHover={{
          boxShadow: `0 30px 80px -10px ${gecko.accent}40, 0 0 0 1px ${gecko.accent}30`,
        }}
        className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0e0e18] to-[#13131f] border border-white/10"
      >
        {/* Rarity stripe */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] z-10"
          style={{
            background: `linear-gradient(90deg, transparent, ${rarityColor}, ${gecko.accent}, transparent)`,
          }}
        />

        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={gecko.src}
            alt={gecko.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />

          {/* Rarity badge */}
          <div
            className="absolute top-3 left-3 px-3 py-1 text-[0.6rem] font-bold tracking-widest rounded-full backdrop-blur-md"
            style={{
              background: `${rarityColor}18`,
              border: `1px solid ${rarityColor}50`,
              color: rarityColor,
            }}
          >
            ◆ {gecko.rarity}
          </div>

          {/* Gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0e0e18] to-transparent" />
        </div>

        {/* Body */}
        <div className="relative p-6">
          <div className="absolute -top-5 right-5 text-[3.5rem] font-bold text-white/5 select-none">
            {gecko.rank}
          </div>

          <div
            className="inline-flex items-center gap-2 text-[0.65rem] font-bold tracking-widest px-3 py-1 rounded-full mb-2"
            style={{
              color: gecko.accent,
              border: `1px solid ${gecko.accent}40`,
              background: `${gecko.accent}10`,
            }}
          >
            {gecko.tag}
          </div>

          <div
            className="text-3xl font-bold text-white mb-3"
            style={{ textShadow: `0 0 40px ${gecko.accent}30` }}
          >
            {gecko.name}
          </div>

          <div className="flex justify-between border-t border-white/10 pt-3 text-xs">
            <Stat label="Floor" value="2.4 ETH" accent={gecko.accent} />
            <Stat label="Holders" value="1,337" />
            <Stat label="Rank" value={gecko.rank} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Stat = ({ label, value, accent }: any) => (
  <div className="flex flex-col gap-1">
    <span className="text-white/40 uppercase tracking-wider text-[0.6rem]">{label}</span>
    <span className="font-bold text-white/90" style={{ color: accent || undefined }}>
      {value}
    </span>
  </div>
);

export default GeckoGallery;