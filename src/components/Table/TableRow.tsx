import React from "react";
import "../BetBulletin/BetBulletin.scss";
import type { TableRowProps } from "./Table-types";

const TableRow: React.FC<TableRowProps> = ({
  match,
  selectedOdd,
  onOddSelect,
}) => {
  const isSelected = (oddType: string) => {
    return (
      selectedOdd?.matchId === match.id && selectedOdd?.oddType === oddType
    );
  };

  const handleOddClick = (odd: number, oddType: string) => {
    if (odd !== 0) {
      onOddSelect(match.id, odd, oddType);
    }
  };

  return (
    <tr className="bet-bulletin-row">
      <td>{match.date}</td>
      <td>{match.teams}</td>
      <td
        className={`odd-cell ${isSelected("win") ? "selected" : ""}`}
        onClick={() => handleOddClick(match.odds.win, "win")}
        style={{ cursor: match.odds.win !== 0 ? "pointer" : "default" }}
      >
        {match.odds.win === 0 ? "-" : match.odds.win.toFixed(2)}
      </td>
      <td
        className={`odd-cell ${isSelected("draw") ? "selected" : ""}`}
        onClick={() => handleOddClick(match.odds.draw, "draw")}
        style={{ cursor: match.odds.draw !== 0 ? "pointer" : "default" }}
      >
        {match.odds.draw === 0 ? "-" : match.odds.draw.toFixed(2)}
      </td>
      <td
        className={`odd-cell ${isSelected("lose") ? "selected" : ""}`}
        onClick={() => handleOddClick(match.odds.lose, "lose")}
        style={{ cursor: match.odds.lose !== 0 ? "pointer" : "default" }}
      >
        {match.odds.lose === 0 ? "-" : match.odds.lose.toFixed(2)}
      </td>
      <td
        className={`odd-cell ${isSelected("under") ? "selected" : ""}`}
        onClick={() => handleOddClick(match.odds.under, "under")}
        style={{ cursor: match.odds.under !== 0 ? "pointer" : "default" }}
      >
        {match.odds.under === 0 ? "-" : match.odds.under.toFixed(2)}
      </td>
      <td
        className={`odd-cell ${isSelected("over") ? "selected" : ""}`}
        onClick={() => handleOddClick(match.odds.over, "over")}
        style={{ cursor: match.odds.over !== 0 ? "pointer" : "default" }}
      >
        {match.odds.over === 0 ? "-" : match.odds.over.toFixed(2)}
      </td>
      <td
        className={`odd-cell ${isSelected("h1") ? "selected" : ""}`}
        onClick={() => handleOddClick(match.odds.h1, "h1")}
        style={{ cursor: match.odds.h1 !== 0 ? "pointer" : "default" }}
      >
        {match.odds.h1 === 0 ? "-" : match.odds.h1.toFixed(2)}
      </td>
      <td
        className={`odd-cell ${isSelected("h2") ? "selected" : ""}`}
        onClick={() => handleOddClick(match.odds.h2, "h2")}
        style={{ cursor: match.odds.h2 !== 0 ? "pointer" : "default" }}
      >
        {match.odds.h2 === 0 ? "-" : match.odds.h2.toFixed(2)}
      </td>
    </tr>
  );
};

export default TableRow;
