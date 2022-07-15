import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { tvMazeApi } from "./movieSlice";

export const store = configureStore({
	reducer: {
		[tvMazeApi.reducerPath]: tvMazeApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(tvMazeApi.middleware),
});

setupListeners(store.dispatch);
