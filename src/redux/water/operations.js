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
      const response = await authInstans.post('/water', water);
      // const { _id: userId } = thunkAPI.getState().auth.userData;
      // const response = await authInstans.post('/water/', {
      //   date: water.date,
      //   volume: water.volume,
      //   userId,
      // });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateWater = createAsyncThunk(
  'water/updateWater',
  async ({ water, id }, thunkAPI) => {
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
      console.log('Deleting water with ID:', id);
      await authInstans.delete(`/water/${id}`);
      return id;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);
