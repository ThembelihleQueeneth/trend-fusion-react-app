import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const MarqueeSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const items = [
    "BITCOIN", "ETHEREUM", "SOLANA", "CARDANO", "POLYGON",
    "AVALANCHE", "CHAINLINK", "POLKADOT", "COSMOS", "NEAR",
  ];

  return (
    <section ref={ref} className="py-8 border-y border-border overflow-hidden">
      <motion.div style={{ x }} className="flex gap-8 whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-display text-3xl md:text-5xl text-muted-foreground/20 hover:text-primary transition-colors cursor-default"
          >
            {item} •
          </span>
        ))}
      </motion.div>
    </section>
  );
};

export default MarqueeSection;
