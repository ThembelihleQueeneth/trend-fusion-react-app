import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, TrendingDown, Flame, Star, BarChart3, PieChart } from "lucide-react";
import geckoThree from "../assets/gecko_three.jfif";
import geckoFive from "../assets/gecko_five.jfif";

const coins = [
  { name: "Bitcoin", symbol: "BTC", price: "$97,432", change: "+2.4%", up: true, icon: "₿" },
  { name: "Ethereum", symbol: "ETH", price: "$3,821", change: "+1.8%", up: true, icon: "Ξ" },
  { name: "Solana", symbol: "SOL", price: "$198.50", change: "+5.2%", up: true, icon: "◎" },
  { name: "Cardano", symbol: "ADA", price: "$0.892", change: "-1.1%", up: false, icon: "₳" },
];

const BentoGrid = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -30]);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
    }),
  };

  return (
    <section ref={ref} className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="sticker-badge mb-4">⚡ LIVE DATA</span>
          <h2 className="font-display text-4xl md:text-6xl text-foreground mt-6">
            MARKET <span className="text-gradient-neon">PULSE</span>
          </h2>
          <p className="text-muted-foreground font-body mt-4 max-w-lg mx-auto">
            Everything you need. One dashboard. Zero noise.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {/* Trending Coins - spans 2 cols, 2 rows */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bento-item md:col-span-2 md:row-span-2 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4">
              <Flame className="h-5 w-5 text-primary" />
              <h3 className="font-display text-lg text-foreground">TRENDING NOW</h3>
            </div>
            <div className="flex-1 flex flex-col gap-3">
              {coins.map((coin) => (
                <div
                  key={coin.symbol}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-display text-primary text-lg">
                      {coin.icon}
                    </div>
                    <div>
                      <div className="font-body font-semibold text-foreground">{coin.name}</div>
                      <div className="text-xs text-muted-foreground font-body">{coin.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-body font-semibold text-foreground">{coin.price}</div>
                    <div className={`text-xs font-body flex items-center gap-1 ${coin.up ? 'text-primary' : 'text-destructive'}`}>
                      {coin.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {coin.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Market Cap */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ y: y1 }}
            className="bento-item parallax-layer flex flex-col justify-between"
          >
            <div className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-lime" />
              <span className="font-display text-sm text-foreground">MARKET CAP</span>
            </div>
            <div>
              <div className="font-display text-3xl text-foreground">$3.2T</div>
              <div className="text-sm text-primary font-body flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> +1.8% today
              </div>
            </div>
          </motion.div>

          {/* 24h Volume */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ y: y2 }}
            className="bento-item parallax-layer flex flex-col justify-between"
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-cyber" />
              <span className="font-display text-sm text-foreground">24H VOLUME</span>
            </div>
            <div>
              <div className="font-display text-3xl text-foreground">$142B</div>
              <div className="text-sm text-primary font-body">across 800+ exchanges</div>
            </div>
          </motion.div>

          {/* Gecko mascot card */}
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bento-item relative overflow-hidden flex items-end p-0"
          >
            <img src={geckoThree} alt="TrendFusion Gecko mascot" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="relative z-10 p-4">
              <span className="sticker-badge text-[10px]">🦎 MASCOT</span>
            </div>
          </motion.div>

          {/* Fear & Greed - spans 2 cols */}
          <motion.div
            custom={4}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bento-item lg:col-span-2 flex items-center gap-6"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-accent" />
                <span className="font-display text-sm text-foreground">FEAR & GREED INDEX</span>
              </div>
              <div className="font-display text-5xl text-gradient-neon">72</div>
              <div className="text-sm text-muted-foreground font-body mt-1">Market sentiment: Greed 🟢</div>
            </div>
            <div className="hidden sm:block">
              <div className="w-32 h-32 rounded-full border-4 border-primary/30 flex items-center justify-center relative">
                <div className="w-24 h-24 rounded-full border-4 border-primary/60 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-display text-xl text-primary">72</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Gecko logo card */}
          <motion.div
            custom={5}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bento-item relative overflow-hidden flex items-center justify-center p-0 group"
          >
            <img src={geckoFive} alt="Gecko logo" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-background/30" />
            <div className="relative z-10">
              <span className="sticker-badge text-[10px]">🦎 POWERED BY GECKO</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
