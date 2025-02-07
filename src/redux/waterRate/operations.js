import { createAsyncThunk } from '@reduxjs/toolkit';

import { authInstans } from '../auth/operations.js';

export const apiGetWaterRate = createAsyncThunk(
  'water-rate/getWaterRate',
  async (_, thunkAPI) => {
    try {
      const { data } = await authInstans.get('/water-rate');
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const editWaterRate = createAsyncThunk(
  'water-rate/editWaterRate',
  async (updateWaterRate, thunkAPI) => {
    try {
      const { data } = await authInstans.patch(`/water-rate`, updateWaterRate);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
