import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	amountDEC,
	amountINC,
	deleteItem,
	setCartAmount,
	setTotalAmount,
	setTotalItems,
	setTotalPrice,
} from "../reducers/cartSlice";

const CartDetails = ({ item }) => {
	const { totalAmount, totalPrice, totalItems } = useSelector(
		(store) => store.cart
	);

	const dispatch = useDispatch();
	const handleAmountChange = () => {
		dispatch(setCartAmount([item.id, item.amount]));
	};
	const handleINC = () => {
		dispatch(amountINC(item.id));
	};
	const handleDEC = () => {
		dispatch(amountDEC(item.id));
	};

	const handleDeleteItem = () => {
		dispatch(deleteItem(item.id));
	};
	useEffect(() => {
		handleAmountChange();
	}, [handleAmountChange, totalAmount, totalPrice]);

	useEffect(() => {
		dispatch(setTotalPrice());
		dispatch(setTotalItems());
	}, [item.price, totalAmount, totalItems]);
	return (
		<>
			{/* <div>{item.title}</div>
			<div className="item-image">
				<img src={item.img} alt="" />{" "}
			</div>
			<div className="item-amount-details">
				<div>${item.price.toLocaleString()}</div>
				<input
					type="number"
					value={item.amount}
					name="amount"
					onChange={handleAmountChange}
					className="item-number"
					readOnly
				/>
			</div>
			<div className="inc-dec">
				<button onClick={handleINC}>Add</button>
				<button onClick={handleDEC}>Reduce</button>
			</div>
			<button className="delete-item" onClick={handleDeleteItem}>
				Delete
			</button> */}

			{/* New Cart Design */}

			<tr className="cart-table-row">
				<td className="cart-table-products">
					<div className="cart-item-image">
						<img src={item.img} alt="" />
					</div>
					<div className="cart-products-right">
						<div>{item.title}</div>
						<button className="remove-item" onClick={handleDeleteItem}>
							Remove
						</button>
					</div>
				</td>
				<td className="cart-table-item">
					<div>${item.unitPrice.toLocaleString()}</div>
				</td>
				<td className="cart-table-item cart-item-quantity">
					<div>
						<button className="btn btn-left" onClick={handleDEC}>
							&minus;
						</button>
						<input
							type="number"
							value={item.amount}
							name="amount"
							onChange={handleAmountChange}
							className="item-number"
							readOnly
						/>
						<button className="btn btn-right" onClick={handleINC}>
							+
						</button>
					</div>
				</td>
				<td className="cart-table-item">
					<div>${item.price.toLocaleString()}</div>
				</td>
			</tr>
		</>
	);
};

export default CartDetails;
