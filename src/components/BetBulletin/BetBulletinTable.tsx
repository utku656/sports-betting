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
  logAddToCardEvent,
  logRemoveFromCardEvent,
} from "../../firebase/analytics";
import SearchBar from "../SearchBar/SearchBar";
import "./BetBulletin.scss";
import { transformMatchData } from "../../utils/helpers";

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
      logAddToCardEvent(matchId, match.teams, oddType, odd);
      logMatchDetailEvent(matchId, match.teams);
    }
  };

  const handleRemoveSelection = (matchId: string) => {
    const apiMatch = matches.find((m) => m.id === matchId);
    if (!apiMatch) return;
    const match = transformMatchData(apiMatch);
    if (match) {
      dispatch(removeSelection(matchId));
      logRemoveFromCardEvent(matchId, match.teams);
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
