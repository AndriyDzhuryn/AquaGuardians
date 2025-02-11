import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const authInstans = axios.create({
  baseURL: 'https://aqua-mind.onrender.com',
});

export const setToken = token => {
  authInstans.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  authInstans.defaults.headers.common.Authorization = '';
};

export const apiSignUpUser = createAsyncThunk(
  'auth/signupUser',
  async (formData, thunkApi) => {
    try {
      const { data } = await authInstans.post('auth/register', formData);
      setToken(data.token);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiSignInUser = createAsyncThunk(
  'auth/signinUser',
  async (formData, thunkApi) => {
    try {
      const { data } = await authInstans.post('auth/login', formData);
      console.log(data);
      setToken(data.token);
      return data;
    } catch (error) {
      console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiLogOutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkApi) => {
    try {
      const { data } = await authInstans.post('auth/logout');
      clearToken();
      return data;
    } catch (error) {
      console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiGetCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    let token = state.auth.token;

    if (!token) {
      return thunkApi.rejectWithValue('No token provided to refresh user');
    }

    if (token.startsWith('"') && token.endsWith('"')) {
      token = token.slice(1, -1);
    }

    try {
      setToken(token);
      const { data } = await authInstans.get('user');
      console.log(data);
      return data;
    } catch (error) {
      console.error(
        'Error fetching current user:',
        error.response?.data || error.message
      );
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiUpdateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (formData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No token provided to refresh user');
    }

    try {
      setToken(token);
      const { data } = await authInstans.patch(`/user`, formData);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const apiUpdateUserPhoto = createAsyncThunk(
  'auth/updatePhoto',
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('photo', file);

      const { data } = await authInstans.patch('user/photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
