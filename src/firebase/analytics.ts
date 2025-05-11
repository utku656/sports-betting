import { logEvent } from "firebase/analytics";
import { analytics } from "./config";

export const logMatchDetailEvent = (matchId: string, teams: string) => {
  logEvent(analytics, "match_detail_view", {
    match_id: matchId,
    teams: teams,
    timestamp: new Date().toISOString(),
  });
};

export const logAddToCardEvent = (
  matchId: string,
  teams: string,
  oddType: string,
  odd: number
) => {
  logEvent(analytics, "add_to_card", {
    match_id: matchId,
    teams: teams,
    odd_type: oddType,
    odd_value: odd,
    timestamp: new Date().toISOString(),
  });
};

export const logRemoveFromCardEvent = (matchId: string, teams: string) => {
  logEvent(analytics, "remove_from_card", {
    match_id: matchId,
    teams: teams,
    timestamp: new Date().toISOString(),
  });
};
