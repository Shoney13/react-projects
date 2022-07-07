import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isDarkMode: false,
};

const themeSlice = createSlice({
	name: "themeReducer",
	initialState,
	reducers: {
		changeTheme(state, action) {
			return { isDarkMode: !state.isDarkMode };
		},
	},
});

export const toggleTheme = () => {
	return function (dispatch) {
		dispatch(changeTheme());
	};
};

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
