import User from "../models/authModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const registerRoute = async (req, res) => {
	try {
		const { name, email, password, confirmPassword } = req.body;
		// Checck if all information is present
		if (!email || !password || !name || !confirmPassword) {
			return res
				.status(400)
				.json({ message: "Please fill in all information" });
		}
		// Check if  the provided passwords matches
		if (password !== confirmPassword) {
			return res.status(400).json({ message: "passwords do not Match" });
		}
		// Check if Email already exists in database
		const existingUser = await User.findOne({ email });
		// What to returbn if email exists
		if (existingUser) {
			return res.status(400).json({ message: "User already Exists" });
		}

		//  generate slat for password
		const salt = await bcrypt.genSalt(12);
		// hash the password
		const hashedPassword = await bcrypt.hash(password, salt);
		// Create User
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		if (user) {
			return res.status(201).json({
				_id: user.id,
				name: user.name,
				email: user.email,
				token: generateToken(user._id),
			});
		}
	} catch (error) {
		console.log(error, "error");
		return res.status(400).json({ message: error });
	}
};

export const loginRoute = async (req, res) => {
	try {
		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			return res.status(400).json({ message: "Email not Registered" });
		}

		if (
			existingUser &&
			(await bcrypt.compare(password, existingUser.password))
		) {
			return res.status(201).json({
				_id: existingUser.id,
				name: existingUser.name,
				email: existingUser.email,
				token: generateToken(existingUser._id),
			});
		}
	} catch (error) {
		console.log(error, "error");
		return res.status(400).json({ message: error });
	}
};
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};
