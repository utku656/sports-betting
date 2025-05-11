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
    onOddSelect(match.id, odd, oddType);
  };

  return (
    <tr className="bet-bulletin-row">
      <td>{match.date}</td>
      <td>{match.teams}</td>
      <td
        className={`odd-cell ${isSelected("win") ? "selected" : ""}`}
        onClick={() => handleOddClick(match.odds.win, "win")}
      >
        {match.odds.win.toFixed(2)}
      </td>
      <td
        className={`odd-cell ${isSelected("draw") ? "selected" : ""}`}
        onClick={() => handleOddClick(match.odds.draw, "draw")}
      >
        {match.odds.draw.toFixed(2)}
      </td>
      <td
        className={`odd-cell ${isSelected("lose") ? "selected" : ""}`}
        onClick={() => handleOddClick(match.odds.lose, "lose")}
      >
        {match.odds.lose.toFixed(2)}
      </td>
      <td
        className={`odd-cell ${isSelected("under") ? "selected" : ""}`}
        onClick={() => handleOddClick(match.odds.under, "under")}
      >
        {match.odds.under.toFixed(2)}
      </td>
      <td
        className={`odd-cell ${isSelected("over") ? "selected" : ""}`}
        onClick={() => handleOddClick(match.odds.over, "over")}
      >
        {match.odds.over.toFixed(2)}
      </td>
      <td
        className={`odd-cell ${isSelected("firstHalf") ? "selected" : ""}`}
        onClick={() => handleOddClick(match.odds.firstHalf, "firstHalf")}
      >
        {match.odds.firstHalf.toFixed(2)}
      </td>
      <td
        className={`odd-cell ${isSelected("secondHalf") ? "selected" : ""}`}
        onClick={() => handleOddClick(match.odds.secondHalf, "secondHalf")}
      >
        {match.odds.secondHalf.toFixed(2)}
      </td>
    </tr>
  );
};

export default TableRow;
