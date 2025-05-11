import type { BetMatch } from "../components/Table/Table-types";
import type { Match } from "../store/slices/matchesSlice";

export const transformMatchData = (match: Match): BetMatch | null => {
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
      h1:
        spreadsMarket?.outcomes.find((o) => o.name === match.home_team)
          ?.price || 0,
      h2:
        spreadsMarket?.outcomes.find((o) => o.name === match.away_team)
          ?.price || 0,
    },
  };
};
