import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Outcome {
  name: string;
  price: number;
  point?: number;
}

interface Market {
  key: string;
  last_update: string;
  outcomes: Outcome[];
}

interface Bookmaker {
  key: string;
  title: string;
  last_update: string;
  markets: Market[];
}

export interface Match {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: Bookmaker[];
}

interface MatchesState {
  matches: Match[];
  loading: boolean;
  error: string | null;
}

const initialState: MatchesState = {
  matches: [],
  loading: false,
  error: null,
};

export const fetchMatches = createAsyncThunk(
  "matches/fetchMatches",
  async () => {
    const response = await axios.get(
      "https://api.the-odds-api.com/v4/sports/soccer_epl/odds",
      {
        params: {
          regions: "eu",
          markets: "h2h,spreads,totals",
          bookmakers: "pinnacle",
          apiKey: import.meta.env.VITE_ODD_API_KEY,
        },
      }
    );
    return response.data;
  }
);

const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.matches = action.payload;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch matches";
      });
  },
});

export default matchesSlice.reducer;
