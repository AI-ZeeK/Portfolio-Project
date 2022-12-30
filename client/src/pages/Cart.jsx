import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartDetails from "../components/CartDetails";
import { clearCart, handleSuccess } from "../reducers/cartSlice";

const Cart = () => {
	const { cart, totalAmount, totalPrice, totalItems } = useSelector(
		(store) => store.cart
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	if (!cart.length) {
		navigate("/");
	}
	const handleClearCart = () => {
		dispatch(clearCart());
	};
	let text;
	const handleCheckout = () => {
		dispatch(handleSuccess(cart));
	};

	return (
		<div className="cart-section">
			<div className="cart-page">
				{!cart.length ? (
					<div className="no-items">No Item in Cart</div>
				) : (
					<div className="cart-section-items cart-full-width">
						<table className="cart-table">
							<thead className="cart-table-head">
								<tr className="cart-table-row">
									<th>PRODUCT</th>
									<th>PRICE</th>
									<th>QUANTITY</th>
									<th>TOTAL</th>
								</tr>
							</thead>
							<tbody className="cart-table-body">
								{cart.map((item) => (
									<CartDetails key={item.id} item={item} />
								))}
							</tbody>
						</table>

						<table className="cart-table">
							<thead className="cart-table-head2">
								<tr className="cart-table-row">
									<th>Total Selections</th>
									<th>Total Items</th>
									<th>Sub Total</th>
								</tr>
							</thead>
							<tbody className="cart-table-body2">
								<tr className="cart-table-row">
									<td>
										{totalAmount} Selection{totalAmount <= 1 ? "" : "s"}
									</td>
									<td>
										{totalItems} item{totalItems <= 1 ? "" : "s"}
									</td>
									<td>
										<p>${totalPrice.toLocaleString()} </p>
									</td>
								</tr>
							</tbody>
						</table>
						<div className="check-section">
							<div className="btn-block">
								<button className="btn" onDoubleClick={handleClearCart}>
									Clear Cart
								</button>
							</div>
							<div className={`btn-block ${16 ? "yes" : "no"}`}>
								<button className="btn" onClick={handleCheckout}>
									Checkout
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
			{/* {cart.length ? (
				<div className="cart-purchase">
					<div className="totals">
						<label htmlFor=""> Selections: </label>
						<p>
							{totalAmount} Selection{totalAmount <= 1 ? "" : "s"}
						</p>
					</div>
					<div className="totals">
						<label htmlFor=""> Items: </label>
						<p>
							{totalItems} item{totalItems <= 1 ? "" : "s"}
						</p>
					</div>
					<div className="totals">
						<label htmlFor="">Total: </label>
						<p>${totalPrice.toLocaleString()} </p>
					</div>
					<div className="purchase-section">
						<button className="purchase-btn" onClick={handleCheckout}>
							Checkout
						</button>
					</div>
					<div className="clear-cart-section">
						<button className="clear-cart-btn" onDoubleClick={handleClearCart}>
							Clear Cart
						</button>
					</div>
				</div>
			) : (
				""
			)} */}
		</div>
	);
};

export default Cart;
