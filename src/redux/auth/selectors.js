export const selectUser = state => state.auth.user;

export const selectLoading = state => state.auth.loading;

export const selectError = state => state.auth.error;

export const selectLogged = state => state.auth.isLoggedIn;

export const selectRefreshing = state => state.auth.isRefreshing;
