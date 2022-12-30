import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setCart,
	setTotalAmount,
	setTotalItems,
	setTotalPrice,
} from "../reducers/cartSlice";
import CartItem from "./cartItem/CartItem";
import ModalPage from "./ModalPage";

const CartItems = () => {
	const { cartItems } = useSelector((store) => store.cart);
	const dispatch = useDispatch();
	const [newItem, setNewItem] = useState("");
	const [modItem, setModItem] = useState("");
	const [modal, setModal] = useState(false);
	const handleDoubleClick = (value) => {
		let mod = cartItems.find((element) => element.id === value);

		if (mod) {
			setModal(true);
			setNewItem(mod.title);
			setModItem(mod);
		} else {
			setModal(false);
			setNewItem("");
		}
		console.log(newItem);
	};
	const handleCancel = () => {
		setModal(false);
	};

	const modalAddToCart = (value) => {
		let mod = cartItems.find((element) => element.id === value);

		mod && dispatch(setCart([mod.id, mod, mod.amount]));
		mod && dispatch(setTotalAmount());
		mod && dispatch(setTotalPrice());
		mod && dispatch(setTotalItems());

		setModal(false);
	};

	return (
		<>
			{cartItems.map((item) => (
				<CartItem
					key={item.id}
					item={item}
					handleDoubleClick={handleDoubleClick}
				/>
			))}

			<ModalPage
				newItem={newItem}
				handleCancel={handleCancel}
				modalAddToCart={modalAddToCart}
				modItem={modItem}
				modal={modal}
			/>
		</>
	);
};

export default CartItems;
