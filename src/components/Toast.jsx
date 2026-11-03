import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "../utils/helpers";

export default function Toast({ msg }) {
  return (
    <div className="toast-wrap" aria-live="polite">
      <AnimatePresence>
        {msg && (
          <motion.div
            key={msg}
            className="toast"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
