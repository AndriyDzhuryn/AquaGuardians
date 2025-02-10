import { createAsyncThunk } from '@reduxjs/toolkit';
import { authInstans } from '../auth/operations.js';

export const updateWaterRate = createAsyncThunk(
  'waterRate/updateWaterRate',
  async (waterAmount, thunkAPI) => {
    try {
      const response = await authInstans.patch('/user/water-rate', waterAmount);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
