import { useState } from "react";
import "@stripe/stripe-js";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./App.scss";
import "./output.css";
import Cart from "./pages/Cart";
import CartItems from "./components/CartItems";
import Navbar from "./components/Navbar";
import CheckoutSuccess from "./components/CheckoutSuccess";
import Auth from "./pages/Auth";
import LandingPage from "./pages/LandingPage";

function App() {
	return (
		<div className="overflow">
			{/* <Navbar /> */}
			<main className="main">
				<Routes>
					<Route exact path="/auth" element={<Auth />} />
					<Route exact path="/" element={<LandingPage />} />
					<Route path="/app" element={<Navbar />} />
					{/* <Route path="/app"  /> */}
					<Route path="/app/carts" />

					<Route path="/app/cart" element={<Cart />} />
					<Route
						path="/app/create-checkout-session"
						element={<CheckoutSuccess />}
					/>
					{/* </Route> */}
					<Route exact path="*" element={<h1>Not Found</h1>} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
