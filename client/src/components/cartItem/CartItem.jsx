import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
	setCart,
	setItemAmount,
	setTotalAmount,
	setTotalItems,
	setTotalPrice,
} from "../../reducers/cartSlice";
import ModalPage from "../ModalPage";

const CartItem = ({ item, handleDoubleClick }) => {
	const dispatch = useDispatch();
	const handleAmountChange = (e) => {
		dispatch(setItemAmount([item.id, e.target.value]));
	};
	// console.log(cartItems, typeof cartItems);

	const handleAddCart = () => {
		dispatch(setCart([item.id, item, item.amount]));
		dispatch(setTotalAmount());
		dispatch(setTotalPrice());
		dispatch(setTotalItems());
	};

	return (
		<>
			<div key={item.id} className="cart-items">
				<div style={{ textTransform: "capitalize" }}>{item.title}</div>
				<div
					className="item-image"
					onDoubleClick={() => handleDoubleClick(item.id)}>
					<img src={item.img} alt="" loading="lazy" />{" "}
				</div>

				<div className="item-amount-details">
					<div>${item.price.toLocaleString()}</div>
					<input
						type="number"
						value={item.amount}
						name="amount"
						onChange={handleAmountChange}
						className="item-number"
					/>
				</div>
				<button onClick={handleAddCart} className="add-to-cart">
					Add to Cart
				</button>
			</div>
		</>
	);
};
export default CartItem;
