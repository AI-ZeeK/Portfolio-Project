import express from "express";
const router = express.Router();
import Stripe from "stripe";
const stripe = Stripe("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

router.post("/create-checkout-session", async (req, res) => {
	const { CheckCart } = await req.body;

	let line_items = CheckCart.map((item) => {
		return {
			price_data: {
				currency: "usd",
				product_data: {
					name: item.title,
					images: [item.img],
					metadata: {
						id: item.id,
					},
				},
				unit_amount: parseFloat(item.unitPrice) * 100,
			},
			quantity: item.amount,
		};
	});
	try {
		const session = await stripe.checkout.sessions.create({
			line_items,
			mode: "payment",
			success_url: `${process.env.CLIENT_URL}/success`,
			cancel_url: `${process.env.CLIENT_URL}/cart`,
		});

		res.status(201).json({ url: session.url });
	} catch (error) {
		console.log(error.message, error);
		res
			.status(404)
			.json({ message: error, new0ne: "greerm", message2: CheckCart });
	}
});

export default router;
