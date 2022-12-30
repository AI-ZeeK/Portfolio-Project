import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartItems from "../CartDetails";
import axios from "axios";

// const API = axios.create({ baseURL: `http://localhost:5000` });

const URL = "http://localhost:5000";
export const handleSuccess = createAsyncThunk("/post", async (CheckCart) => {
	try {
		// let response = await axios.post(`${URL}/create-checkout-session`, {
		// 	CheckCart,
		// });

		const POST_URL = `${URL}/create-checkout-session`;
		const response = await axios.post(POST_URL, { CheckCart });
		if (response.data.url) {
			return (window.location.href = response.data.url);
		}
		console.log("green", CheckCart, response.data.url);
	} catch (error) {
		console.log(error.message, "error Message");
	}
});

// Get the saved items in cart
const item =
	localStorage.getItem("cartItems") !== null
		? JSON.parse(localStorage.getItem("cartItems"))
		: [];
// Get the saved amount of items in cart
const Amount = localStorage.getItem("cartAmount");
const initialState = {
	cartDetails: {},
	cartItems,
	cart: item,
	totalAmount: 0,
	totalItems: 0,
	totalPrice: 0,
};

const cartSlice = createSlice({
	name: "grey",
	initialState,
	reducers: {
		setCartAmount: (state, { payload }) => {
			let [cartid, itemAmount] = payload;
			state.cart.map((item) => {
				if (item.id === cartid) {
					item.amount = itemAmount < 1 ? (itemAmount = 1) : itemAmount;
					item.price = item.unitPrice * itemAmount;
				}
			});
			//   SET cart on local storage

			localStorage.setItem(
				"cartItems",
				JSON.stringify(state.cart.map((item) => item))
			);
		},
		amountINC: (state, { payload }) => {
			state.cart.map((item) => {
				if (item.id === payload) {
					if (item.amount >= 40) return;
					item.amount += 1;
				}
			});
			//   SET cart on local storage

			localStorage.setItem(
				"cartItems",
				JSON.stringify(state.cart.map((item) => item))
			);
		},
		amountDEC: (state, { payload }) => {
			state.cart.map((item) => {
				if (item.id === payload) {
					item.amount -= 1;
				}
			});
			//   SET cart on local storage

			localStorage.setItem(
				"cartItems",
				JSON.stringify(state.cart.map((item) => item))
			);
		},
		setItemAmount: (state, { payload }) => {
			let [cartid, itemAmount] = payload;
			state.cartItems.map((item) => {
				if (item.id === cartid) {
					item.amount =
						itemAmount < 1 || itemAmount > 20 ? (itemAmount = 1) : itemAmount;
					item.price = item.unitPrice * item.amount;
				}
			});
		},
		setCart: (state, { payload }) => {
			let [cartId, itemPayload, itemAmount] = payload;
			// Search tha cart array for existing cart item before add
			let X = state.cart.find((item) => item.id === cartId);
			X
				? // if cartitem exists simply increment tha amount
				  state.cart.map((item) => {
						if (X.id === item.id)
							item.amount = parseInt(item.amount) + parseInt(itemAmount);
						console.log(item.id, "cart map");
				  })
				: //   If cartitem doesn't exist , push it in
				  (state.cart = [...state.cart, itemPayload]);
			console.log(state.cart, typeof state.cart, X);

			//   SET cart on local storage

			localStorage.setItem(
				"cartItems",
				JSON.stringify(state.cart.map((item) => item))
			);

			// return;
		},
		setTotalAmount: (state, { payload }) => {
			state.totalAmount = state.cart.length;
			//   SET cart on local storage

			localStorage.setItem(
				"cartAmount",
				JSON.stringify((state.totalAmount = state.cart.length))
			);
		},
		setTotalItems: (state, { payload }) => {
			let sum = 0;

			state.cart.forEach((item) => {
				sum += parseFloat(item.amount);
			});
			state.totalItems = parseFloat(sum);
		},
		setTotalPrice: (state, { payload }) => {
			let sum = 0;

			state.cart.forEach((item) => {
				sum += parseFloat(item.price);
			});
			state.totalPrice = parseFloat(sum);
		},
		deleteItem: (state, { payload }) => {
			state.cart = state.cart.filter((item) => item.id !== payload);
			state.totalAmount = state.cart.length;
			state.totalPrice;

			//   SET cart on local storage

			localStorage.setItem(
				"cartItems",
				JSON.stringify(state.cart.map((item) => item))
			);
		},
		clearCart: (state) => {
			state.cart = [];
			state.totalAmount = 0;
			console.log("pressed");
			//   SET cart on local storage

			localStorage.setItem(
				"cartItems",
				JSON.stringify((state.cart = []), (state.totalAmount = 0))
			);
		},
	},
});

export const {
	setItemAmount,
	setCart,
	setCartAmount,
	setTotalAmount,
	setTotalPrice,
	setTotalItems,
	clearCart,
	deleteItem,
	amountINC,
	amountDEC,
} = cartSlice.actions;

export default cartSlice.reducer;
