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

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -20]);

  const cardBase =
    "rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl p-6 hover:scale-[1.02] transition-all duration-500";

  return (
    <section ref={ref} className="py-28 bg-black text-white relative overflow-hidden">

      {/* 🌌 Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-600/20 blur-[140px] rounded-full" />
      </div>

      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs uppercase tracking-widest text-purple-400">
            ⚡ Live Data
          </span>

          <h2 className="text-5xl md:text-7xl font-bold mt-6">
            MARKET{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              PULSE
            </span>
          </h2>

          <p className="text-gray-400 mt-6 max-w-lg mx-auto">
            Everything you need. One dashboard. Zero noise.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[220px]">

          {/* Trending */}
          <motion.div
            className={`${cardBase} md:col-span-2 md:row-span-2 flex flex-col`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6 text-purple-400">
              <Flame className="h-5 w-5" />
              <h3 className="font-semibold tracking-wide">TRENDING NOW</h3>
            </div>

            <div className="flex flex-col gap-4">
              {coins.map((coin) => (
                <div
                  key={coin.symbol}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
                      {coin.icon}
                    </div>
                    <div>
                      <div className="font-semibold">{coin.name}</div>
                      <div className="text-xs text-gray-400">{coin.symbol}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold">{coin.price}</div>
                    <div
                      className={`text-xs flex items-center gap-1 ${
                        coin.up ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {coin.up ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {coin.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Market Cap */}
          <motion.div
            style={{ y: y1 }}
            className={`${cardBase} flex flex-col justify-between`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <div className="flex items-center gap-2 text-purple-400">
              <PieChart className="h-5 w-5" />
              <span className="text-sm">MARKET CAP</span>
            </div>

            <div>
              <div className="text-3xl font-bold">$3.2T</div>
              <div className="text-sm text-green-400 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> +1.8% today
              </div>
            </div>
          </motion.div>

          {/* Volume */}
          <motion.div
            style={{ y: y2 }}
            className={`${cardBase} flex flex-col justify-between`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <div className="flex items-center gap-2 text-pink-400">
              <BarChart3 className="h-5 w-5" />
              <span className="text-sm">24H VOLUME</span>
            </div>

            <div>
              <div className="text-3xl font-bold">$142B</div>
              <div className="text-sm text-gray-400">
                across 800+ exchanges
              </div>
            </div>
          </motion.div>

          {/* Mascot */}
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <img
              src={geckoThree}
              alt="Gecko mascot"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-4 left-4 text-sm bg-purple-500/20 px-3 py-1 rounded-full backdrop-blur-md">
              🦎 MASCOT
            </div>
          </motion.div>

          {/* Fear & Greed */}
          <motion.div
            className={`${cardBase} lg:col-span-2 flex items-center justify-between`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <div>
              <div className="flex items-center gap-2 text-yellow-400 mb-2">
                <Star className="h-5 w-5" />
                <span className="text-sm">FEAR & GREED INDEX</span>
              </div>

              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                72
              </div>

              <div className="text-gray-400 mt-2">
                Market sentiment: Greed 🟢
              </div>
            </div>

            <div className="hidden sm:flex w-32 h-32 rounded-full border border-purple-500/30 items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center text-xl font-bold text-purple-400">
                72
              </div>
            </div>
          </motion.div>

          {/* Logo Card */}
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-xl group"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <img
              src={geckoFive}
              alt="Gecko"
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition duration-700"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-4 left-4 text-xs bg-purple-500/20 px-3 py-1 rounded-full backdrop-blur-md">
              🦎 POWERED BY GECKO
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
