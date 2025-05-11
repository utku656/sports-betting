import React, { useState } from "react";
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
      <button
        className="minimize-button"
        style={{ display: selections.length > 0 ? "flex" : "none" }}
        onClick={toggleMinimize}
      >
        {isMinimized ? "↗" : "↙"}
      </button>
      <h3>Coupon</h3>
      <div className="coupon-selections">
        {selections.map((selection) => (
          <div key={selection.matchId} className="coupon-item">
            <div className="coupon-item-header">
              <span>{selection.teams}</span>
              <button
                className="remove-button"
                onClick={() => onRemoveSelection(selection.matchId)}
              >
                ×
              </button>
            </div>
            <div className="coupon-item-details">
              <span>{selection.selectedOdd.toFixed(2)}</span>
            </div>
          </div>
        ))}
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
