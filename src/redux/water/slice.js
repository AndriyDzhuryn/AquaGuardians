import { createSlice } from '@reduxjs/toolkit';

import { addWater, deleteWater } from './operations';

const handlePending = state => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const waterSlice = createSlice({
  name: 'water',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(addWater.pending, handlePending)
      .addCase(addWater.rejected, handleRejected)
      .addCase(addWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(deleteWater.pending, handlePending)
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(e => e.id !== action.payload);
      })
      .addCase(deleteWater.rejected, handleRejected);
  },
});

export const waterReducer = waterSlice.reducer;
