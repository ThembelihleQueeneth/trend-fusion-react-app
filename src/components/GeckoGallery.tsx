import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useRef } from "react";

import geckoOne from "../assets/gecko_one.jfif";
import geckoTwo from "../assets/gecko_two.jfif";
import geckoThree from "../assets/gecko_five.jfif";
import geckoFour from "../assets/gecko_four.jfif";
import geckoFive from "../assets/gecko_five.jfif";

const geckos = [
  { src: geckoOne,   name: "GAMER GECKO",  tag: "🎮 DEGEN",   rarity: "RARE",      accent: "#00ffe0", rank: "#1" },
  { src: geckoTwo,   name: "COOL GECKO",   tag: "😎 ALPHA",   rarity: "EPIC",      accent: "#ff6ef7", rank: "#2" },
  { src: geckoThree, name: "COZY GECKO",   tag: "🧶 HODLER",  rarity: "UNCOMMON",  accent: "#ffe066", rank: "#3" },
  { src: geckoFour,  name: "STREET GECKO", tag: "🔥 REBEL",   rarity: "LEGENDARY", accent: "#ff4d4d", rank: "#4" },
  { src: geckoFive,  name: "OG GECKO",     tag: "👑 FOUNDER", rarity: "MYTHIC",    accent: "#a78bfa", rank: "#5" },
];

// ─── Inject global styles ─────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=Rajdhani:wght@300;500;700&display=swap');

  .gecko-wrap {
    background: #050508;
    min-height: 100vh;
    font-family: 'Space Mono', monospace;
    overflow-x: hidden;
    position: relative;
  }

  /* Scanline overlay */
  .gecko-wrap::before {
    content: '';
    position: fixed;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,255,200,0.015) 2px,
      rgba(0,255,200,0.015) 4px
    );
    pointer-events: none;
    z-index: 100;
  }

  /* Noise grain */
  .gecko-wrap::after {
    content: '';
    position: fixed;
    inset: -200%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.4;
    pointer-events: none;
    z-index: 99;
    animation: grain 0.8s steps(2) infinite;
  }

  @keyframes grain {
    0%, 100% { transform: translate(0, 0); }
    25%       { transform: translate(-2%, -3%); }
    50%       { transform: translate(1%, 2%); }
    75%       { transform: translate(3%, -1%); }
  }

  .gecko-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem 6rem;
  }

  .card-shell {
    perspective: 1000px;
    cursor: pointer;
  }

  .card-inner {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    background: linear-gradient(145deg, #0e0e18, #13131f);
    border: 1px solid rgba(255,255,255,0.06);
    transform-style: preserve-3d;
    transition: box-shadow 0.3s ease;
    will-change: transform;
  }

  .card-inner:hover .hologram-overlay {
    opacity: 1;
  }

  /* Holographic shimmer on hover */
  .hologram-overlay {
    position: absolute;
    inset: 0;
    opacity: 0;
    background: linear-gradient(
      135deg,
      rgba(255,255,255,0) 0%,
      rgba(0,255,200,0.06) 25%,
      rgba(255,100,255,0.06) 50%,
      rgba(255,220,0,0.06) 75%,
      rgba(255,255,255,0) 100%
    );
    background-size: 400% 400%;
    animation: holo-shift 3s ease infinite;
    pointer-events: none;
    z-index: 10;
    transition: opacity 0.3s ease;
  }

  @keyframes holo-shift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .card-image-wrap {
    position: relative;
    aspect-ratio: 1 / 1;
    overflow: hidden;
  }

  .card-image-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .card-inner:hover .card-image-wrap img {
    transform: scale(1.08);
  }

  /* Gradient fade over image bottom */
  .card-image-wrap::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 50%;
    background: linear-gradient(to top, #0e0e18, transparent);
    pointer-events: none;
  }

  /* Rarity stripe at top */
  .rarity-stripe {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    z-index: 5;
  }

  .card-body {
    padding: 1.25rem 1.5rem 1.5rem;
    position: relative;
  }

  .card-rank {
    position: absolute;
    top: -20px;
    right: 1.25rem;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 3.5rem;
    line-height: 1;
    color: rgba(255,255,255,0.04);
    letter-spacing: -2px;
    user-select: none;
  }

  .card-tag-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    padding: 4px 10px;
    border-radius: 100px;
    border: 1px solid;
    margin-bottom: 0.6rem;
  }

  .card-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2rem;
    letter-spacing: 0.05em;
    color: #fff;
    line-height: 1;
    margin-bottom: 0.8rem;
  }

  .card-stats {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid rgba(255,255,255,0.06);
    padding-top: 0.75rem;
    gap: 1rem;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .stat-label {
    font-size: 0.58rem;
    letter-spacing: 0.12em;
    color: rgba(255,255,255,0.3);
    text-transform: uppercase;
  }

  .stat-value {
    font-size: 0.75rem;
    font-weight: 700;
    color: rgba(255,255,255,0.85);
    letter-spacing: 0.05em;
  }

  .title-block {
    text-align: center;
    padding: 5rem 2rem 3rem;
    position: relative;
  }

  .title-eyebrow {
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.4em;
    color: rgba(0,255,200,0.7);
    text-transform: uppercase;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  .title-eyebrow::before,
  .title-eyebrow::after {
    content: '';
    width: 40px;
    height: 1px;
    background: rgba(0,255,200,0.4);
  }

  .title-main {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(4rem, 10vw, 8rem);
    line-height: 0.9;
    letter-spacing: 0.02em;
    color: #fff;
    margin-bottom: 1.25rem;
  }

  .title-main span {
    -webkit-text-stroke: 1px rgba(0,255,200,0.6);
    color: transparent;
  }

  .title-sub {
    font-family: 'Rajdhani', sans-serif;
    font-size: 1rem;
    color: rgba(255,255,255,0.35);
    letter-spacing: 0.08em;
    max-width: 520px;
    margin: 0 auto;
    line-height: 1.7;
  }

  /* Background blobs */
  .bg-blob {
    position: fixed;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
  }

  .glow-dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #00ffe0;
    box-shadow: 0 0 10px #00ffe0, 0 0 20px #00ffe0;
    animation: pulse-dot 2s ease-in-out infinite;
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
`;

// ─── Main Gallery ─────────────────────────────────────────────────────────────
const GeckoGallery = () => {
  return (
    <>
      <style>{STYLES}</style>
      <div className="gecko-wrap">
        {/* Background atmosphere */}
        <div className="bg-blob" style={{ width: 600, height: 600, background: "rgba(0,255,200,0.03)", top: -200, left: -200 }} />
        <div className="bg-blob" style={{ width: 500, height: 500, background: "rgba(168,139,250,0.04)", bottom: 0, right: -100 }} />
        <div className="bg-blob" style={{ width: 300, height: 300, background: "rgba(255,100,255,0.03)", top: "40%", left: "50%" }} />

        {/* Header */}
        <motion.div
          className="title-block"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="title-eyebrow">
            <span className="glow-dot" />
            Collection · 2024
            <span className="glow-dot" />
          </div>
          <h1 className="title-main">
            MEET THE<br /><span>GECKOS</span>
          </h1>
          <p className="title-sub">
            The legendary crew behind TrendFusion. Each gecko carries its own crypto aura and market energy.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="gecko-grid">
          {geckos.map((gecko, i) => (
            <GeckoCard key={gecko.name} gecko={gecko} index={i} />
          ))}
        </div>
      </div>
    </>
  );
};

// ─── Gecko Card ───────────────────────────────────────────────────────────────
const GeckoCard = ({ gecko, index }: { gecko: typeof geckos[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 300, damping: 30 });

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
    UNCOMMON:  "#4ade80",
    RARE:      "#60a5fa",
    EPIC:      "#c084fc",
    LEGENDARY: "#fb923c",
    MYTHIC:    "#f472b6",
  };

  const rarityColor = rarityColors[gecko.rarity] ?? gecko.accent;

  return (
    <motion.div
      className="card-shell"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      style={{ transformStyle: "preserve-3d" }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="card-inner"
        style={{
          rotateX,
          rotateY,
          boxShadow: `0 0 0 0 transparent`,
        }}
        whileHover={{
          boxShadow: `0 30px 80px -10px ${gecko.accent}40, 0 0 0 1px ${gecko.accent}30`,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Rarity stripe */}
        <div
          className="rarity-stripe"
          style={{ background: `linear-gradient(90deg, transparent, ${rarityColor}, ${gecko.accent}, transparent)` }}
        />

        {/* Holographic overlay */}
        <div className="hologram-overlay" />

        {/* Image */}
        <div className="card-image-wrap">
          <img src={gecko.src} alt={gecko.name} />

          {/* Rarity badge */}
          <motion.div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: `${rarityColor}18`,
              border: `1px solid ${rarityColor}50`,
              borderRadius: 100,
              padding: "3px 10px",
              fontSize: "0.6rem",
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              letterSpacing: "0.15em",
              color: rarityColor,
              backdropFilter: "blur(8px)",
              zIndex: 5,
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            ◆ {gecko.rarity}
          </motion.div>
        </div>

        {/* Body */}
        <div className="card-body">
          <div className="card-rank">{gecko.rank}</div>

          {/* Tag pill */}
          <div
            className="card-tag-pill"
            style={{
              color: gecko.accent,
              borderColor: `${gecko.accent}40`,
              background: `${gecko.accent}10`,
            }}
          >
            {gecko.tag}
          </div>

          {/* Name */}
          <div className="card-name" style={{ textShadow: `0 0 40px ${gecko.accent}30` }}>
            {gecko.name}
          </div>

          {/* Stats row */}
          <div className="card-stats">
            <div className="stat-item">
              <span className="stat-label">Floor</span>
              <span className="stat-value" style={{ color: gecko.accent }}>2.4 ETH</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Holders</span>
              <span className="stat-value">1,337</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Rank</span>
              <span className="stat-value">{gecko.rank}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GeckoGallery;