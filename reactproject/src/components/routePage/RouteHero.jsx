import { motion } from "framer-motion";
import "./RouteHero.css";

const RouteHero = () => {
  return (
    <section className="route-hero">

      {/* Floating Glow Effects */}
      <div className="glow glow1"></div>
      <div className="glow glow2"></div>

      <div className="route-hero-content">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Explore Our Premium Routes
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Comfortable, reliable and affordable intercity travel.
          Choose your destination and travel with confidence.
        </motion.p>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          ↓ Scroll Down
        </motion.div>

      </div>
    </section>
  );
};

export default RouteHero;
