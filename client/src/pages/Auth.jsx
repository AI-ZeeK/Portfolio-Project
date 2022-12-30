import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import regBg from "../assets/reg.jpg";
import { CiUser, CiLock, CiFacebook } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setIsSignUp } from "../reducers/appSlice";
import SocialLogin from "./auth/SocialLogin";
// import FacebookLogin from "react-facebook-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

const Auth = () => {
	const { isSignUp } = useSelector((store) => store.app);
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const clientId =
		"105747698090-npvdijmffr5mdnvhl6imbonsru8876it.apps.googleusercontent.com";
	const handleSubmit = (e) => {
		e.preventDefault();
		navigate("/app");
	};
	const componentClicked = () => {
		console.log("nre vlick");
	};
	const responseFacebook = (res) => {
		console.log(res);
		const { name, email } = res;
		console.log(name, email);
	};
	const switchMode = () => {
		dispatch(setIsSignUp());
	};

	useEffect(() => {
		const initClient = () => {
			gapi.client.init({
				clientId: clientId,
				plugin_name: "chat",
			});
		};
		gapi.load("client:auth2", initClient);
	});
	const googleSuccess = (res) => {
		console.log("success:", res, res.profileObj);
		const { email, name, imageUrl } = res.profileObj;
		console.log(email, name, imageUrl);
	};
	const googleFailure = (err) => {
		console.log("failed:", err);
	};
	return (
		<div className="auth-sect">
			<div className="auth-page">
				<div className="form-box">
					<form
						onSubmit={handleSubmit}
						action="
					"
						className="form-div">
						<div className="form-head">
							<h1>{isSignUp ? "Create Account" : "Welcome Back"}</h1>
							<small>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							</small>
						</div>
						{isSignUp && (
							<div className="sign-box">
								<div className="input-box">
									{/* <label for="">User: </label> */}
									<input type="text" placeholder="First Name" />
									<CiUser className="user-icon" />
								</div>
								<div className="input-box">
									{/* <label for="">User: </label> */}
									<input type="text" placeholder="Last Name" />
									<CiUser className="user-icon" />
								</div>
							</div>
						)}

						<div className="input-box">
							{/* <label for="">User: </label> */}
							<input type="email" placeholder="Email" />
							<CiUser className="user-icon" />
						</div>
						<div className="input-box">
							{/* <label for="">Password: </label> */}
							<input type="password" placeholder="Password" />
							<CiLock className="user-icon" />
						</div>
						{isSignUp && (
							<div className="input-box">
								{/* <label for="">Password: </label> */}
								<input type="password" placeholder="Confirm Password" />
								<CiLock className="user-icon" />
							</div>
						)}

						<div className="forgot-sect">
							<div className="check">
								<input type="checkbox" />
								<p> Remember Me?</p>
							</div>
							{isSignUp ? (
								""
							) : (
								<Link to="/" className="link">
									forgot password?
								</Link>
							)}
						</div>
						<div className="btn-box">
							<button className="btn">{isSignUp ? "Sign Up" : "Login"}</button>
						</div>
					</form>
					<div className="auth-sep">
						<h1>Or</h1>
					</div>
					<div className="social-login">
						<div className="social-btn">
							<GoogleLogin
								clientId={clientId}
								onSuccess={googleSuccess}
								onFailure={googleFailure}
								cookiePolicy="single_host_origin"
								render={(renderProps) => (
									<button
										className="google-btn btn"
										onClick={renderProps.onClick}>
										<span>{isSignUp ? "Sign Up" : "Login"} with Google</span>{" "}
										<FcGoogle className="icon" />
									</button>
								)}
							/>
						</div>
						<div className="social-btn">
							<FacebookLogin
								appId={891229685226697}
								autoLoad={false}
								callback={responseFacebook}
								fields="name,email,picture"
								render={(renderProps) => (
									<button
										className="facebook-btn btn"
										onClick={renderProps.onClick}>
										<span>{isSignUp ? "Sign Up" : "Login"} Facebook</span>{" "}
										<CiFacebook className="icon" />
									</button>
								)}
							/>
						</div>

						<div className="switch-box">
							<span>
								{isSignUp ? (
									<>
										Already have an account?{" "}
										<span className="switch" onClick={switchMode}>
											Sign In
										</span>
									</>
								) : (
									<>
										Don't have an account?{" "}
										<span className="switch" onClick={switchMode}>
											Sign up
										</span>
									</>
								)}
							</span>
						</div>
					</div>
				</div>
				<div className="img-box">
					<img src={regBg} alt="" />
				</div>
			</div>
		</div>
	);
};

export default Auth;
