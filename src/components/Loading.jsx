import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loading = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-base-300 flex items-center justify-center z-50"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-32 h-32 flex items-center justify-center">
          <motion.div
            className="absolute w-32 h-32 border-4 border-green-400 rounded-full border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
          <motion.div
            className="absolute w-20 h-20 border-4 border-green-500 rounded-full border-b-transparent"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />

          <motion.div
            className="absolute w-12 h-12 border-4 border-green-600 rounded-full border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loading;
