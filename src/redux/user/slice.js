import { createSlice } from '@reduxjs/toolkit';

import {
  apiGetCurrentUser,
  apiUpdateUserProfile,
  apiUpdateUserPhoto,
} from './operations.js';

const INITIAL_STATE = {
  userData: null,
  isLoading: false,
  error: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  extraReducers: builder =>
    builder
      .addCase(apiGetCurrentUser.pending, handlePending)
      .addCase(apiGetCurrentUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.userData = action.payload;
      })
      .addCase(apiGetCurrentUser.rejected, handleRejected)

      .addCase(apiUpdateUserProfile.pending, handlePending)
      .addCase(apiUpdateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(apiUpdateUserProfile.rejected, handleRejected)

      .addCase(apiUpdateUserPhoto.pending, handlePending)
      .addCase(apiUpdateUserPhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(apiUpdateUserPhoto.rejected, handleRejected),
});

export const authReducer = authSlice.reducer;
