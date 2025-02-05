import { createSlice } from '@reduxjs/toolkit';

import { login, logout, refreshUser, register, updateUserProfile } from './operations.js';

const initialState = {
  user: {
    name: null,
    email: null,
    gender: null,
    photo: null,
    id: null,
  },
  loading: false,
  error: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};


const handlePending = state => {
  state.loading = true;
  state.error = null;
};


const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, handleRejected)

      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, handleRejected)

      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      .addCase(logout.rejected, handleRejected)

      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, handlePending)
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
    .addCase(updateUserProfile.rejected, handleRejected);
  },
});



export const authReducers = authSlice.reducer;
