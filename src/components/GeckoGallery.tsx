import { motion } from "framer-motion";
import { useState } from "react";
import geckoOne from "../assets/gecko_one.jfif";
import geckoTwo from "../assets/gecko_two.jfif";
import geckoThree from "../assets/gecko_five.jfif";
import geckoFour from "../assets/gecko_four.jfif";
import geckoFive from "../assets/gecko_five.jfif";

const geckos = [
  { src: geckoOne, name: "GAMER GECKO", tag: "🎮 DEGEN" },
  { src: geckoTwo, name: "COOL GECKO", tag: "😎 ALPHA" },
  { src: geckoThree, name: "COZY GECKO", tag: "🧶 HODLER" },
  { src: geckoFour, name: "STREET GECKO", tag: "🔥 REBEL" },
  { src: geckoFive, name: "OG GECKO", tag: "👑 FOUNDER" },
];

const GeckoGallery = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      
      {/* 🔥 Animated background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 blur-[140px] rounded-full animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="sticker-badge text-sm">🦎 THE SQUAD</span>

          <h2 className="font-display text-5xl md:text-7xl mt-6 text-foreground tracking-tight">
            MEET THE{" "}
            <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
              GECKOS
            </span>
          </h2>

          <p className="text-muted-foreground mt-6 max-w-xl mx-auto text-lg">
            The legendary crew behind TrendFusion. Each gecko carries its own
            crypto aura and market energy.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-10 perspective-1000">
          {geckos.map((gecko, i) => (
            <GeckoCard key={gecko.name} gecko={gecko} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const GeckoCard = ({ gecko, index }: any) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;

    setRotate({
      x: -(y - midY) / 12,
      y: (x - midX) / 12,
    });
  };

  const reset = () => setRotate({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.7 }}
      whileHover={{ scale: 1.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{
        transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
      className="relative group transition-transform duration-200 ease-out"
    >
      {/* Neon border glow */}
      <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-md transition duration-500" />

      {/* Glass card */}
      <div className="relative w-52 md:w-60 rounded-3xl overflow-hidden backdrop-blur-xl bg-card/60 border border-white/10 shadow-2xl">

        {/* Image */}
        <div className="aspect-square overflow-hidden">
          <img
            src={gecko.src}
            alt={gecko.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out"
          />
        </div>

        {/* Info */}
        <div className="p-4 text-center">
          <h3 className="font-display text-sm tracking-wider text-foreground">
            {gecko.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {gecko.tag}
          </p>
        </div>
      </div>

      {/* Floating badge */}
      <motion.div
        className="absolute -top-4 -right-4"
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3,
        }}
      >
        <div className="px-3 py-1 text-[10px] rounded-full bg-primary/20 backdrop-blur-md border border-primary/40 text-primary font-semibold shadow-lg">
          {gecko.tag}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GeckoGallery;
