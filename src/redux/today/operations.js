import { createAsyncThunk } from '@reduxjs/toolkit';

import { authInstans } from '../auth/operations.js';

// export const setToken = token => {
//   authInstans.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

export const apiGetTodayWater = createAsyncThunk(
  'today/todayWater',
  async (_, thunkAPI) => {
    // const state = thunkAPI.getState();
    // const token = state.auth.token;

    try {
      // setToken(token);
      const { data } = await authInstans.get('/today');
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
