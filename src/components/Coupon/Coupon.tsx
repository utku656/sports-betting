import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Coupon.scss";
import type { CouponProps } from "./Coupon-types";

const Coupon: React.FC<CouponProps> = ({ selections, onRemoveSelection }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const calculateTotalOdd = () => {
    return selections.reduce(
      (total, selection) => total * selection.selectedOdd,
      1
    );
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`coupon ${isMinimized ? "minimized" : ""}`}>
      <motion.button 
        className="minimize-button" 
        style={{ display: selections.length > 0 ? "flex" : "none" }}
        onClick={toggleMinimize}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMinimized ? "↗" : "↙"}
      </motion.button>
      <h3>Coupon</h3>
      <div className="coupon-selections">
        <AnimatePresence>
          {selections.map((selection) => (
            <motion.div
              key={selection.matchId}
              className="coupon-item"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ 
                opacity: 0, 
                x: -100,
                transition: { duration: 0.3 }
              }}
              layout
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                opacity: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="coupon-item-header"
                layout
              >
                <span>{selection.teams}</span>
                <motion.button
                  className="remove-button"
                  onClick={() => onRemoveSelection(selection.matchId)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.button>
              </motion.div>
              <motion.div 
                className="coupon-item-details"
                layout
              >
                <span>{selection.selectedOdd.toFixed(2)}</span>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {selections.length > 0 && (
        <div className="coupon-total">
          <span>Total Odd:</span>
          <span>{calculateTotalOdd().toFixed(2)}</span>
        </div>
      )}
    </div>
  );
};

export default Coupon;
