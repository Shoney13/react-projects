import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tvMazeApi = createApi({
	reducerPath: "tvMazeApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.tvmaze.com" }),
	endpoints: (builder) => ({
		getShowsList: builder.query({
			query: (search = "all") => ({ url: "/search/shows", params: { q: search } }),
		}),
		getShow: builder.query({
			query: (search) => ({ url: `/shows/${search}` }),
		}),
	}),
});

export const { useGetShowsListQuery, useGetShowQuery } = tvMazeApi;
