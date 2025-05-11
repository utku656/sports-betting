import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import TableHeader from "../Table/TableHeader";
import TableRow from "../Table/TableRow";
import Coupon from "../Coupon/Coupon";
import {
  toggleSelection,
  removeSelection,
} from "../../store/slices/couponSlice";
import { fetchMatches } from "../../store/slices/matchesSlice";
import {
  logMatchDetailEvent,
  logAddToCartEvent,
  logRemoveFromCartEvent,
} from "../../firebase/analytics";

import type { Match } from "../../store/slices/matchesSlice";
import type { BetMatch } from "./Bulletin-types";
import SearchBar from "../SearchBar/SearchBar";
import "./BetBulletin.scss";

const transformMatchData = (match: Match): BetMatch | null => {
  const bookmaker = match.bookmakers[0];
  if (!bookmaker) return null;
  const h2hMarket = bookmaker.markets?.find((m) => m.key === "h2h");
  const totalsMarket = bookmaker.markets?.find((m) => m.key === "totals");
  const spreadsMarket = bookmaker.markets?.find((m) => m.key === "spreads");

  return {
    id: match.id,
    date: new Date(match.commence_time).toLocaleString(),
    teams: `${match.home_team} vs ${match.away_team}`,
    odds: {
      win:
        h2hMarket?.outcomes.find((o) => o.name === match.home_team)?.price || 0,
      draw: h2hMarket?.outcomes.find((o) => o.name === "Draw")?.price || 0,
      lose:
        h2hMarket?.outcomes.find((o) => o.name === match.away_team)?.price || 0,
      under: totalsMarket?.outcomes.find((o) => o.name === "Under")?.price || 0,
      over: totalsMarket?.outcomes.find((o) => o.name === "Over")?.price || 0,
      firstHalf:
        spreadsMarket?.outcomes.find((o) => o.name === match.home_team)
          ?.price || 0,
      secondHalf:
        spreadsMarket?.outcomes.find((o) => o.name === match.away_team)
          ?.price || 0,
    },
  };
};

const BetBulletinTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const { selections, selectedOdds } = useAppSelector((state) => state.coupon);
  const { matches, loading, error } = useAppSelector((state) => state.matches);

  useEffect(() => {
    dispatch(fetchMatches());
  }, [dispatch]);

  const handleOddSelect = (matchId: string, odd: number, oddType: string) => {
    const apiMatch = matches.find((m) => m.id === matchId);
    if (!apiMatch) return;
    const match = transformMatchData(apiMatch);
    if (match) {
      dispatch(
        toggleSelection({
          matchId,
          teams: match.teams,
          odd,
          oddType,
        })
      );
      logAddToCartEvent(matchId, match.teams, oddType, odd);
      logMatchDetailEvent(matchId, match.teams);
    }
  };

  const handleRemoveSelection = (matchId: string) => {
    const apiMatch = matches.find((m) => m.id === matchId);
    if (!apiMatch) return;
    const match = transformMatchData(apiMatch);
    if (match) {
      dispatch(removeSelection(matchId));
      logRemoveFromCartEvent(matchId, match.teams);
    }
  };

  return (
    <>
      <SearchBar onSearch={setSearchQuery} />
      <div className="bet-bulletin-container">
        <div className="bet-bulletin-content">
          <table className="bet-bulletin-table">
            <TableHeader />
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9}>Loading matches...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={9}>Error: {error}</td>
                </tr>
              ) : (
                matches
                  .filter((apiMatch) => {
                    const query = searchQuery.toLowerCase();
                    return (
                      apiMatch.home_team.toLowerCase().includes(query) ||
                      apiMatch.away_team.toLowerCase().includes(query)
                    );
                  })
                  .map((apiMatch) => {
                    const match = transformMatchData(apiMatch);
                    if (!match) return null;
                    return (
                      <TableRow
                        key={match.id}
                        match={match}
                        selectedOdd={
                          selectedOdds[match.id]
                            ? { matchId: match.id, ...selectedOdds[match.id] }
                            : null
                        }
                        onOddSelect={handleOddSelect}
                      />
                    );
                  })
              )}
            </tbody>
          </table>
          <div className="coupon-container">
            <Coupon
              selections={selections}
              onRemoveSelection={handleRemoveSelection}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BetBulletinTable;
