import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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

export const deleteWater = createAsyncThunk(
  'water/deleteWater',
  async (id, thunkApi) => {
    try {
      await axios.delete(`/water/${id}`);
      return id;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);
