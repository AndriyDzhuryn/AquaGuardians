import { createAsyncThunk } from '@reduxjs/toolkit';
import { authInstans } from '../auth/operations';

export const updateWaterRate = createAsyncThunk(
  'waterRate/updateWaterRate',
  async (waterAmount, thunkAPI) => {
    try {
      const response = await authInstans.patch('/water-rate', waterAmount);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
