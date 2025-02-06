import { createSlice } from '@reduxjs/toolkit';
import {
  apiGetCurrentUser,
  apiLogOutUser,
  apiSignInUser,
  apiSignUpUser,
  updateUserProfile,
} from './operations';

const INITIAL_STATE = {
  userData: null,
  isLoading: false,
  error: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  extraReducers: builder =>
    builder
      .addCase(apiSignUpUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiSignUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.userData = action.payload.user;
      })
      .addCase(apiSignUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(apiSignInUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiSignInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.userData = action.payload.user;
      })
      .addCase(apiSignInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(apiGetCurrentUser.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(apiGetCurrentUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.userData = action.payload;
      })
      .addCase(apiGetCurrentUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })

      .addCase(apiLogOutUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiLogOutUser.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addCase(apiLogOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
       state.userData = action.payload.user;
       state.isLoading = false;
      }).
      addCase(updateUserProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
  }),
});

export const authReducer = authSlice.reducer;
