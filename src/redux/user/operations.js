import { createAsyncThunk } from '@reduxjs/toolkit';

import { authInstans } from '../auth/operations.js';

export const apiGetCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async (_, thunkApi) => {
    try {
      const { data } = await authInstans.get('user');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiUpdateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (formData, thunkAPI) => {
    try {
      const { data } = await authInstans.patch(`/user`, formData);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const apiUpdateUserPhoto = createAsyncThunk(
  'user/updateUserPhoto',
  async (urlPhoto, thunkAPI) => {
    try {
      const { data } = await authInstans.patch(`/user/photo`, urlPhoto);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
