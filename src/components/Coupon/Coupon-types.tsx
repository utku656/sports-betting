export interface Selection {
  matchId: string;
  teams: string;
  selectedOdd: number;
  oddType: string;
}

export interface CouponProps {
  selections: Selection[];
  onRemoveSelection: (matchId: string) => void;
}
