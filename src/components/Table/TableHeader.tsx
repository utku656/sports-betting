import React from "react";
import "../BetBulletin/BetBulletin.scss";

const TableHeader: React.FC = () => {
  return (
    <thead className="bet-bulletin-header">
      <tr>
        <th>Date</th>
        <th>Teams</th>
        <th>1</th>
        <th>X</th>
        <th>2</th>
        <th>Under</th>
        <th>Over</th>
        <th>1H</th>
        <th>2H</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
