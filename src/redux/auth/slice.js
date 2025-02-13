import { createSlice } from '@reduxjs/toolkit';
import {
  apiGetCurrentUser,
  apiLogOutUser,
  apiSignInUser,
  apiSignUpUser,
  apiUpdateUserPhoto,
  apiUpdateUserProfile,
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
  name: 'auth',
  initialState: INITIAL_STATE,
  extraReducers: builder =>
    builder
      .addCase(apiSignUpUser.pending, handlePending)
      .addCase(apiSignUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.data;
      })
      .addCase(apiSignUpUser.rejected, handleRejected)

      .addCase(apiSignInUser.pending, handlePending)
      .addCase(apiSignInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = action.payload.data.accessToken;
      })
      .addCase(apiSignInUser.rejected, handleRejected)

      .addCase(apiLogOutUser.pending, handlePending)
      .addCase(apiLogOutUser.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addCase(apiLogOutUser.rejected, handleRejected)

      .addCase(apiGetCurrentUser.pending, state => {
        state.error = null;
        state.isRefreshing = true;
      })
      .addCase(apiGetCurrentUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.userData = action.payload.data;
      })
      .addCase(apiGetCurrentUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })

      .addCase(apiUpdateUserProfile.pending, handlePending)
      .addCase(apiUpdateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(apiUpdateUserProfile.rejected, handleRejected)

      .addCase(apiUpdateUserPhoto.pending, state => {
        state.isLoadingPhoto = true;
        state.error = null;
      })
      .addCase(apiUpdateUserPhoto.fulfilled, (state, action) => {
        state.isLoadingPhoto = false;
        state.userData.photo = action.payload.data.photo;
      })
      .addCase(apiUpdateUserPhoto.rejected, (state, action) => {
        state.isLoadingPhoto = false;
        state.error = action.payload;
      }),
});

export const authReducer = authSlice.reducer;
