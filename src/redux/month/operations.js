import { createAsyncThunk } from '@reduxjs/toolkit';

import { authInstans } from '../auth/operations.js';

export const apiGetMonthWater = createAsyncThunk(
  'month/monthWater',
  async ({ year, month }, thunkAPI) => {
    try {
      const { data } = await authInstans.get(`/month/${year}/${month}`);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
