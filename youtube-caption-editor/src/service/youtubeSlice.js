import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
	"X-RapidAPI-Host": process.env.REACT_APP_RAPIDAPI_HOST,
	"X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
};

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const youtubeApi = createApi({
	reducerPath: "youtubeApi",
	baseQuery: fetchBaseQuery({ baseUrl: 'https://youtube138.p.rapidapi.com' }),
	endpoints: (builder) => ({
		getVideosList: builder.query({
			query: (q) => ({...createRequest("/search/"),params: {q:q||'new trailers', hl: 'en', gl: 'US'}}),
		}),
		getVideoDetails: builder.query({
			query: (id) => ({...createRequest(`/video/details/`),params: {id, hl: 'en', gl: 'US'},}),
		}),
	}),
});

export const {
    useGetVideoDetailsQuery,
    useGetVideosListQuery,
} =youtubeApi