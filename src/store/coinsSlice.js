import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	stats: {},
	coinList: {},
	isLoading: false,
	isDataFetched: false,
	error: "",
};

const coinSlice = createSlice({
	name: "coinStat",
	initialState,
	reducers: {
		setCoinStats(state, action) {
			state.stats = action.payload;
		},
		setCoinList(state, action) {
			state.coinList = action.payload;
		},
		setIsLoading(state, action) {
			state.isLoading = action.payload;
		},
		setIsDataFetched(state, action) {
			state.isDataFetched = action.payload;
		},
		setError(state, action) {
			state.error = action.payload;
		},
	},
});

export let fetchCryptoStats = () => {
	return async function (dispatch, getState) {
		const options = {
			method: "GET",
			url: "https://coinranking1.p.rapidapi.com/coins",
			params: {
				referenceCurrencyUuid: "yhjMzLPhuIDl",
				timePeriod: "24h",
				"tiers[0]": "1",
				orderBy: "marketCap",
				orderDirection: "desc",
				limit: "50",
				offset: "0",
			},
			headers: {
				"X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
				"X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
			},
		};

		dispatch(setIsLoading(true));
		axios
			.request(options)
			.then(function (response) {
				dispatch(setCoinStats(response.data.data.stats));
				dispatch(setCoinList(response.data.data.coins));
				dispatch(setIsLoading(false));
				dispatch(setIsDataFetched(true));
			})
			.catch(function (error) {
				dispatch(setIsLoading(false));
				dispatch(setError(error));
			});
	};
};

export const {
	setCoinStats,
	setCoinList,
	setIsLoading,
	setError,
	setIsDataFetched,
} = coinSlice.actions;
export default coinSlice.reducer;
