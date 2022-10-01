import { configureStore } from "@reduxjs/toolkit";

import { youtubeApi } from "./youtubeSlice";
import captionListReducer from "./captionSlice";

export const store= configureStore({
	reducer: {
		[youtubeApi.reducerPath]: youtubeApi.reducer,
		captionList: captionListReducer,
	},
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(youtubeApi.middleware),
});


store.subscribe(()=>{
    localStorage.setItem('captionData', JSON.stringify(store.getState()));
})