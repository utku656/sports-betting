export interface BetMatch {
  id: string;
  date: string;
  teams: string;
  odds: {
    win: number;
    draw: number;
    lose: number;
    under: number;
    over: number;
    firstHalf: number;
    secondHalf: number;
  };
}

export interface TableRowProps {
  match: BetMatch;
  selectedOdd: { matchId: string; oddType: string } | null;
  onOddSelect: (matchId: string, odd: number, oddType: string) => void;
}
