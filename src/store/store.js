import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "./coinsSlice";
import newsReducer from "./newsSlice";
import coinDetailReducer from "./coinDetailSlice";
import themeReducer from "./themeSlice";
const store = configureStore({
	reducer: {
		coinsStat: coinsReducer,
		news: newsReducer,
		coinDetail: coinDetailReducer,
		themeReducer,
	},
});

export default store;
