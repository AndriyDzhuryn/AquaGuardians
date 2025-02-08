import { createAsyncThunk } from '@reduxjs/toolkit';

import { authInstans } from '../auth/operations.js';

export const addWater = createAsyncThunk(
  'water/addWater',
  async (water, thunkAPI) => {
    try {
      const response = await authInstans.post('/water/', water);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
