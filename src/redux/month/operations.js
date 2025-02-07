import { createAsyncThunk } from '@reduxjs/toolkit';

import { authInstans } from '../auth/operations.js';

export const apiGetMonthWater = createAsyncThunk(
  'month/monthWater',
  async ({ year, month }, thunkAPI) => {
    try {
      const response = await authInstans.get(`/month/${year}/${month}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
