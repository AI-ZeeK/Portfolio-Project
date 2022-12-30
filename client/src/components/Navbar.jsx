import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { setTotalAmount } from "../reducers/cartSlice";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
const Navbar = () => {
	const [checked, setChecked] = useState(true);
	const handleCheck = (e) => {
		// if (e.target.checked === true) {
		// 	setChecked(false);
		// } else {
		// 	setChecked(true);
		// }
		setChecked((prev) => !prev);
		console.log(e.target.checked);
		console.log(checked);
	};

	const body = document.body;
	checked ? body.classList.remove("dark") : body.classList.add("dark");

	const { totalAmount } = useSelector((store) => store.cart);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setTotalAmount());
	}, [totalAmount]);
	return (
		<div className="navbar">
			<div className="check-box" onClick={handleCheck}>
				{!checked ? (
					<DarkModeIcon className="icon-mode" />
				) : (
					<LightModeIcon className="icon-mode" />
				)}
			</div>
			<Link className="header-text" to="/app">
				Lorem Project{" "}
			</Link>
			<Link to="/app/cart" className="cart-icon-detail">
				<ShoppingCartCheckoutIcon style={{ fontSize: "2rem" }} />
				{totalAmount >= 1 ? (
					<div className="total-amount">{totalAmount}</div>
				) : (
					""
				)}
			</Link>
		</div>
	);
};

export default Navbar;
