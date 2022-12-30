import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../reducers/appSlice";
import cartReducer from "../reducers/cartSlice";

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		app: appReducer,
	},
});
