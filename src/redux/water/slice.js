import { createSlice } from '@reduxjs/toolkit';

import { getWater, addWater, updateWater, deleteWater } from './operations.js';

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
      .addCase(getWater.pending, handlePending)
      .addCase(getWater.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
      })
      .addCase(getWater.rejected, handleRejected)

      .addCase(addWater.pending, handlePending)
      .addCase(addWater.rejected, handleRejected)
      .addCase(addWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = [...state.items, action.payload];
      })

      .addCase(updateWater.pending, handlePending)
      .addCase(updateWater.rejected, handleRejected)
      .addCase(updateWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const index = state.items.findIndex(
          item => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      .addCase(deleteWater.pending, handlePending)
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = state.items.filter(e => e.id !== action.payload.data);
      })
      .addCase(deleteWater.rejected, handleRejected);
  },
});

export const waterReducer = waterSlice.reducer;
