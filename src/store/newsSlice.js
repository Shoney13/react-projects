import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	newsList: [],
	isLoading: false,
	isDataFetched: false,
	error: "",
};

const newsSlice = createSlice({
	name: "newsList",
	initialState,
	reducers: {
		setNewsList(state, action) {
			state.newsList = action.payload;
			state.isLoading = false;
			state.isDataFetched = true;
		},
		setIsLoading(state, action) {
			state.isLoading = action.payload;
		},
		setIsDataFetched(state, action) {
			state.isDataFetched = action.payload;
		},
		setError(state, action) {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

export let fetchCryptoNews = () => {
	return async function (dispatch, getState) {
		const options = {
			method: "GET",
			url: "https://bing-news-search1.p.rapidapi.com/news/search?q=crypto&safeSearch=Off&textFormat=Raw&freshness=Day&count=25",
			headers: {
				"X-BingApis-SDK": "true",
				"X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
				"X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
			},
		};

		dispatch(setIsLoading(true));
		axios
			.request(options)
			.then(function (response) {
				// console.log(response.data.value);
				dispatch(setNewsList(response.data.value));
			})
			.catch(function (error) {
				dispatch(setError(error.message));
			});
	};
};

export const { setNewsList, setIsLoading, setIsDataFetched, setError } =
	newsSlice.actions;
export default newsSlice.reducer;
