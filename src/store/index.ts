import { configureStore } from '@reduxjs/toolkit';
import type { ThunkAction, Action } from '@reduxjs/toolkit';
import couponReducer from './slices/couponSlice';
import matchesReducer from './slices/matchesSlice';

export const store = configureStore({
  reducer: {
    coupon: couponReducer,
    matches: matchesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
