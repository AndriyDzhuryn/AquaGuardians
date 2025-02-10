import { createAsyncThunk } from '@reduxjs/toolkit';

import { authInstans } from '../auth/operations.js';

export const getWater = createAsyncThunk(
  'water/getWater',
  async (_, thunkAPI) => {
    try {
      const { data } = await authInstans.get('/water');

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addWater = createAsyncThunk(
  'water/addWater',
  async (water, thunkAPI) => {
    try {

      const { _id: userId } = thunkAPI.getState().auth.user;
      const response = await authInstans.post('/water/', {
        date: water.date,
        volume: water.volume,
        userId,
      });
      // return response.data
      console.log(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateWater = createAsyncThunk(
  'water/updateWater',
  async ({ id, water }, thunkAPI) => {
    try {
      const response = await authInstans.patch(`/water/${id}`, water);

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
