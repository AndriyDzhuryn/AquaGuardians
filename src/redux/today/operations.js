import { createAsyncThunk } from '@reduxjs/toolkit';

import { authInstans } from '../auth/operations.js';

export const apiGetTodayWater = createAsyncThunk(
  'today/todayWater',
  async (_, thunkAPI) => {
    try {
      const { data } = await authInstans.get('/water/today');
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
