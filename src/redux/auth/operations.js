import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const authInstans = axios.create({
  baseURL: 'https://connections-api.goit.global/',
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
      const { data } = await authInstans.post('users/signup', formData);
      setToken(data.token);
      // console.log(data);
      return data;
    } catch (error) {
      // console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiSignInUser = createAsyncThunk(
  'auth/signinUser',
  async (formData, thunkApi) => {
    try {
      const { data } = await authInstans.post('users/login', formData);
      // console.log(data);
      setToken(data.token);
      return data;
    } catch (error) {
      // console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiGetCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkApi.rejectWithValue('No token provided to refresh user');
    }

    try {
      setToken(token);
      const { data } = await authInstans.get('/users/current');
      // console.log(data);
      return data;
    } catch (error) {
      // console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiLogOutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkApi) => {
    try {
      const { data } = await authInstans.post('users/logout');
      // console.log(data);
      clearToken();
      return data;
    } catch (error) {
      // console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);


export const updateUserProfile = createAsyncThunk(
  'auth/updateProfile',
  async (formData, thunkAPI) => {
    try {


      const state = thunkAPI.getState();
      const token = state.auth.token;
      const id = state.auth.id
      setToken(token);


      
      formData.forEach((value, key) => console.log(key, value));
      console.log('Base URL:', authInstance.defaults.baseURL); 
      console.log('Token:', token);  
      

      const { data } = await authInstance.patch(`/users/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return data;
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
