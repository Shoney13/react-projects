import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	coinDetail: {},
	isLoading: false,
	isDataFetched: false,
	error: "",
};

const coinDetailSlice = createSlice({
	name: "coin",
	initialState,
	reducers: {
		setCoinDetail(state, action) {
			state.coinDetail = action.payload;
			state.isLoading = false;
			state.isDataFetched = true;
		},
		setIsLoading(state, action) {
			state.isLoading = action.payload;
		},
		setError(state, action) {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

export let fetchCryptoDetail = (coinId) => {
	return async function (dispatch, getState) {
		const options = {
			method: "GET",
			url: `https://coinranking1.p.rapidapi.com/coin/${coinId}`,
			params: { referenceCurrencyUuid: "yhjMzLPhuIDl", timePeriod: "24h" },
			headers: {
				"X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
				"X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
			},
		};
		dispatch(setIsLoading(true));
		axios
			.request(options)
			.then(function (response) {
				dispatch(setCoinDetail(response.data.data.coin));
			})
			.catch(function (error) {
				console.error(error.message);
				// dispatch(setError(error));
			});
	};
};

export const { setCoinDetail, setIsLoading, setError } =
	coinDetailSlice.actions;
export default coinDetailSlice.reducer;
