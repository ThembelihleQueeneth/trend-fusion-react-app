import { motion } from "framer-motion";
import geckoOne from "../assets/gecko_one.jfif";
import geckoTwo from "../assets/gecko_two.jfif";
import geckoThree from "../assets/gecko_five.jfif";
import geckoFour from "../assets/gecko_four.jfif";
import geckoFive from "../assets/gecko_five.jfif";

const geckos = [
  { src: geckoOne, name: "GAMER GECKO", tag: "🎮 DEGEN", rotate: -3 },
  { src: geckoTwo, name: "COOL GECKO", tag: "😎 ALPHA", rotate: 2 },
  { src: geckoThree, name: "COZY GECKO", tag: "🧶 HODLER", rotate: -2 },
  { src: geckoFour, name: "STREET GECKO", tag: "🔥 REBEL", rotate: 3 },
  { src: geckoFive, name: "OG GECKO", tag: "👑 FOUNDER", rotate: -1 },
];

const GeckoGallery = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="sticker-badge">🦎 THE SQUAD</span>
          <h2 className="font-display text-4xl md:text-6xl text-foreground mt-6">
            MEET THE <span className="text-gradient-neon">GECKOS</span>
          </h2>
          <p className="text-muted-foreground font-body mt-4 max-w-lg mx-auto">
            The legendary crew behind TrendFusion. Each gecko brings unique vibes to the crypto space.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {geckos.map((gecko, i) => (
            <motion.div
              key={gecko.name}
              initial={{ opacity: 0, y: 50, rotate: gecko.rotate * 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: gecko.rotate }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, type: "spring", bounce: 0.3 }}
              whileHover={{ scale: 1.08, rotate: 0, y: -10 }}
              className="relative group cursor-pointer"
            >
              <div className="w-40 md:w-52 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-xl shadow-primary/10 group-hover:border-primary/70 group-hover:shadow-primary/30 transition-all duration-300">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={gecko.src}
                    alt={gecko.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-3 bg-card/80 backdrop-blur-sm">
                  <div className="font-display text-xs text-foreground">{gecko.name}</div>
                </div>
              </div>
              <motion.div
                className="absolute -top-3 -right-3 z-10"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              >
                <span className="sticker-badge text-[10px]">{gecko.tag}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GeckoGallery;
