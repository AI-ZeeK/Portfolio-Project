import { Modal } from "@mui/material";
import React from "react";
import { setItemAmount } from "../reducers/cartSlice";

const ModalPage = ({
	newItem,
	handleCancel,
	modalAddToCart,
	modItem,
	modal,
}) => {
	return (
		<>
			<div className={modal ? ` modal-page active` : "modal-page"}>
				<div className={modal ? "modal active" : "modal"} id="modalArea">
					<div className="display-message">
						You Double Clicked on {newItem}{" "}
					</div>
					<div className="display-message">Price: ${modItem.price}</div>
					<div className="display-message">
						Amount: {modItem.amount} item{modItem.amount <= 1 ? "" : "s"}
					</div>
					<div className="proceed">
						<button className="delete-item" onClick={handleCancel}>
							{" "}
							Cancel?
						</button>
						<button
							className="add-to-cart"
							onClick={() => modalAddToCart(modItem.id)}>
							Add to Cart?
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ModalPage;
