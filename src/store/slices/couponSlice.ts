import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Selection {
  matchId: string;
  teams: string;
  selectedOdd: number;
  oddType: string;
}

interface CouponState {
  selections: Selection[];
  selectedOdds: { [key: string]: { oddType: string } };
}

const initialState: CouponState = {
  selections: [],
  selectedOdds: {},
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    toggleSelection: (
      state,
      action: PayloadAction<{
        matchId: string;
        teams: string;
        odd: number;
        oddType: string;
      }>
    ) => {
      const { matchId, teams, odd, oddType } = action.payload;

      // If clicking the same odd, remove it
      if (state.selectedOdds[matchId]?.oddType === oddType) {
        delete state.selectedOdds[matchId];
        state.selections = state.selections.filter(
          (s) => s.matchId !== matchId
        );
      } else {
        // Update or add new selection
        state.selectedOdds[matchId] = { oddType };

        const newSelection: Selection = {
          matchId,
          teams,
          selectedOdd: odd,
          oddType,
        };

        state.selections = [
          ...state.selections.filter((s) => s.matchId !== matchId),
          newSelection,
        ];
      }
    },
    removeSelection: (state, action: PayloadAction<string>) => {
      const matchId = action.payload;
      delete state.selectedOdds[matchId];
      state.selections = state.selections.filter((s) => s.matchId !== matchId);
    },
  },
});

export const { toggleSelection, removeSelection } = couponSlice.actions;
export default couponSlice.reducer;
