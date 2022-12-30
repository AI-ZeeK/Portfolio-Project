import React from "react";
import shoe from "../assets/shoe.png";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleShopClick = () => {
		navigate("/auth");
	};
	let easeing = [0.6, -0.05, 0.01, 0.99];
	const firstName = {
		initial: {
			y: -10,
		},
		animate: {
			y: 0,

			transition: {
				delayChildren: 0.4,
				staggerChildren: 0.04,
				staggerDirection: -1,
			},
		},
	};
	const lastName = {
		initial: {
			y: 10,
		},
		animate: {
			y: 0,

			transition: {
				delayChildren: 0.4,
				staggerChildren: 0.04,
				staggerDirection: 1,
			},
		},
	};

	const transition = {
		duration: 1.4,
		ease: [0.5, 0.01, -0.05, 0.9],
	};
	const letter = {
		initial: {
			y: 100,
			x: "30vw",
			letterSpacing: "2px",
		},
		animate: {
			y: 0,
			x: 0,
			// letterSpacing: 3,

			// y: 100,
			// x: 0,
			// scale: 4.2,
			transition: { duration: 1, ...transition },
		},
	};
	return (
		<motion.div className="landing-section">
			<div
				className="landing-header"
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.3, ease: easeing }}>
				<motion.span
					className="letter-span"
					variants={firstName}
					initial="initial"
					animate="animate">
					<motion.span variants={letter}>F</motion.span>
					<motion.span variants={letter}>I</motion.span>
					<motion.span variants={letter}>N</motion.span>
					<motion.span variants={letter}>I</motion.span>
					<motion.span variants={letter}>T</motion.span>
					<motion.span variants={letter}>E</motion.span>
				</motion.span>
				{"  "}
				<motion.span
					className="letter-span"
					variants={lastName}
					initial="initial"
					animate="animate">
					<motion.span variants={letter}>F</motion.span>
					<motion.span variants={letter}>I</motion.span>
					<motion.span variants={letter}>Z</motion.span>
					<motion.span variants={letter}>Z</motion.span>
				</motion.span>
			</div>
			<div className="landing-body">
				<div className="image-box">
					<img src={shoe} alt="" />
				</div>
				<div className="landing-textarea">
					<h1>An Infinitely Better Shopping Experience</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi
						praesentium veritatis facilis tempore placeat temporibus eos nostrum
						quod doloribus numquam.!
					</p>
					<motion.button whileHover={{ scale: 1.1 }} onClick={handleShopClick}>
						Shop Now
					</motion.button>
				</div>
			</div>
			<div className="landing-footer">LandingPage</div>
		</motion.div>
	);
};

export default LandingPage;
