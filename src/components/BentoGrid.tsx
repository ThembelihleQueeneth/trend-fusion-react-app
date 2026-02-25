import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  TrendingUp,
  TrendingDown,
  Flame,
  Star,
  BarChart3,
  PieChart,
} from "lucide-react";
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

  // Reduced parallax for mobile to prevent jitter
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -20]);
  const y2 = useTransform(scrollYProgress, [0, 1], [60, -10]);

  const cardBase =
    "rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl p-5 md:p-6 hover:bg-white/[0.08] transition-all duration-500";

  return (
    <section ref={ref} className="py-16 md:py-28 bg-black text-white relative overflow-hidden">
      
      {/* 🌌 Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-64 md:w-96 h-64 md:h-96 bg-purple-600/10 blur-[100px] md:blur-[140px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-64 md:w-96 h-64 md:h-96 bg-pink-600/10 blur-[100px] md:blur-[140px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-purple-400 font-bold">
            ⚡ Live Data
          </span>

          <h2 className="text-4xl md:text-7xl font-black mt-4">
            MARKET{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              PULSE
            </span>
          </h2>

          <p className="text-gray-400 mt-4 text-sm md:text-base max-w-md mx-auto px-4">
            Everything you need. One dashboard. Zero noise.
          </p>
        </motion.div>

        {/* Grid System */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-min md:auto-rows-[220px]">

          {/* Trending - Takes full width on mobile, 2x2 on desktop */}
          <motion.div
            className={`${cardBase} sm:col-span-2 lg:row-span-2 flex flex-col`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6 text-purple-400">
              <Flame className="h-5 w-5 fill-purple-400/20" />
              <h3 className="font-bold text-sm tracking-widest">TRENDING NOW</h3>
            </div>

            <div className="flex flex-col gap-3">
              {coins.map((coin) => (
                <div
                  key={coin.symbol}
                  className="flex items-center justify-between p-3 md:p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold group-hover:scale-110 transition-transform">
                      {coin.icon}
                    </div>
                    <div>
                      <div className="font-bold text-sm md:text-base">{coin.name}</div>
                      <div className="text-[10px] md:text-xs text-gray-500">{coin.symbol}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-sm md:text-base">{coin.price}</div>
                    <div className={`text-[10px] md:text-xs flex items-center justify-end gap-1 ${coin.up ? "text-green-400" : "text-red-400"}`}>
                      {coin.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {coin.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Market Cap - Moves with scroll only on desktop for better mobile UX */}
          <motion.div
            style={{ y: typeof window !== 'undefined' && window.innerWidth > 768 ? y1 : 0 }}
            className={`${cardBase} flex flex-col justify-between min-h-[160px] md:min-h-0`}
          >
            <div className="flex items-center gap-2 text-purple-400 font-bold">
              <PieChart className="h-5 w-5" />
              <span className="text-xs tracking-widest uppercase">Market Cap</span>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black">$3.2T</div>
              <div className="text-xs text-green-400 flex items-center gap-1 font-medium">
                <TrendingUp className="h-3 w-3" /> +1.8% today
              </div>
            </div>
          </motion.div>

          {/* Volume */}
          <motion.div
            style={{ y: typeof window !== 'undefined' && window.innerWidth > 768 ? y2 : 0 }}
            className={`${cardBase} flex flex-col justify-between min-h-[160px] md:min-h-0`}
          >
            <div className="flex items-center gap-2 text-pink-400 font-bold">
              <BarChart3 className="h-5 w-5" />
              <span className="text-xs tracking-widest uppercase">24H Volume</span>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black">$142B</div>
              <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-tighter">Across 800+ exchanges</div>
            </div>
          </motion.div>

          {/* Mascot - Hidden or smaller on mobile to save space */}
          <motion.div className="relative rounded-3xl overflow-hidden shadow-xl aspect-video md:aspect-auto">
            <img src={geckoThree} alt="Mascot" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 text-[10px] font-bold bg-purple-500/30 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
              🦎 MASCOT
            </div>
          </motion.div>

          {/* Fear & Greed - Spans full row on mobile for readability */}
          <motion.div className={`${cardBase} sm:col-span-2 flex items-center justify-between`}>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-yellow-400 mb-2 font-bold">
                <Star className="h-4 w-4 fill-yellow-400/20" />
                <span className="text-xs tracking-widest uppercase">Fear & Greed Index</span>
              </div>
              <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                72
              </div>
              <div className="text-xs md:text-sm text-gray-400 font-medium">
                Market sentiment: <span className="text-green-400">Greed 🟢</span>
              </div>
            </div>

            <div className="hidden xs:flex w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-dashed border-purple-500/20 items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-purple-500/10 flex items-center justify-center text-xl font-black text-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                72
              </div>
            </div>
          </motion.div>

          {/* Logo Card */}
          <motion.div className="relative rounded-3xl overflow-hidden shadow-xl group aspect-square md:aspect-auto">
            <img src={geckoFive} alt="Gecko" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition duration-700" />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-black/60" />
            <div className="absolute bottom-3 left-3 text-[10px] font-bold bg-white/10 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
              🦎 POWERED BY GECKO
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;