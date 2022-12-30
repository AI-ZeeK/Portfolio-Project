import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	isSignUp: false,
};

const appSlice = createSlice({
	name: "grey",
	initialState,
	reducers: {
		setIsSignUp: (state) => {
			state.isSignUp = !state.isSignUp;
		},
	},
});

export const { setIsSignUp } = appSlice.actions;

export default appSlice.reducer;
