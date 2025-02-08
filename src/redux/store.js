import { configureStore } from '@reduxjs/toolkit';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authReducer } from './auth/slice.js';
import { waterMonthReducer } from './month/slice.js';
import { waterTodayReducer } from './today/slice.js';
import { waterReducer } from './water/slice.js';
import { waterRateReducer } from './waterRate/slice.js';

const authConfig = {
  key: 'authKey',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authConfig, authReducer),
    month: waterMonthReducer,
    today: waterTodayReducer,
    water: waterReducer,
    waterRate: waterRateReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
