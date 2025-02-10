import { createSlice } from '@reduxjs/toolkit';
import {
  apiGetCurrentUser,
  apiLogOutUser,
  apiSignInUser,
  apiSignUpUser,
  apiUpdateUserPhoto,
  apiUpdateUserProfile,
  // updateUserProfile,
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
        // state.token = action.payload.token;
        state.userData = action.payload.data;
      })
      .addCase(apiSignUpUser.rejected, handleRejected)

      .addCase(apiSignInUser.pending, handlePending)
      .addCase(apiSignInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = action.payload.data.accessToken;
        // state.userData = action.payload.user;
      })
      .addCase(apiSignInUser.rejected, handleRejected)

      .addCase(apiLogOutUser.pending, handlePending)
      .addCase(apiLogOutUser.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addCase(apiLogOutUser.rejected, handleRejected)

      .addCase(apiGetCurrentUser.pending, state => {
    
        state.error = null;
      })
      .addCase(apiGetCurrentUser.fulfilled, (state, action) => {
    
        state.isLoggedIn = true;
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

      .addCase(apiUpdateUserPhoto.pending, handlePending)
      .addCase(apiUpdateUserPhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData.photo = action.payload.data.photo;
      })
      .addCase(apiUpdateUserPhoto.rejected, handleRejected),

  // .addCase(updateUserProfile.pending, handlePending)
  // .addCase(updateUserProfile.fulfilled, (state, action) => {
  //   state.userData = action.payload.user;
  //   state.isLoading = false;
  // })
  // .addCase(updateUserProfile.rejected, handleRejected),
});

export const authReducer = authSlice.reducer;
