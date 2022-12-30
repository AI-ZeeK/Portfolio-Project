import React from "react";
import FacebookLogin from "react-facebook-login";

const responseFacebook = (response) => {
	console.log(response, "message");
};
const SocialLogin = () => {
	const componentClicked = () => {
		console.log("nre vlick");
	};
	return (
		<>
			<FacebookLogin
				appId={891229685226697}
				autoLoad={false}
				fields="name,email,picture"
				onClick={componentClicked}
				callback={responseFacebook}
			/>
		</>
	);
};

export default SocialLogin;
