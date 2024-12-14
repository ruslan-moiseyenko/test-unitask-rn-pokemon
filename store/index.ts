import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { pokemonApi } from "@/store/api";
import pokemonReducer from "@/store/pokemonSlice";

const rootReducer = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  pokemon: pokemonReducer
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["pokemon"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    }).concat(pokemonApi.middleware)
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
