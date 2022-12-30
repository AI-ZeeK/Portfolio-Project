// Initializing dotenv for my environment variables
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import colors from "colors";
import stripeRoute from "./routes/stripe.js";
import authRoute from "./routes/authRoutes.js";
import connectDB from "./config/DB.js";
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use("/", stripeRoute);
app.use("/auth", authRoute);
app.listen(PORT, () =>
	console.log(`Server running on http://localhost:${PORT}`.bgMagenta)
);
