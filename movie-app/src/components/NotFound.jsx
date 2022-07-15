import React from "react";
import NotFoundImage from "../assets/NotFound.png";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
	let navigate = useNavigate();
	setTimeout(() => {
		navigate("/");
	}, 2000);
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				gap: "2rem",
				height: "100vh",
			}}
		>
			<h1>The page you are looking for does not exist</h1>
			<img src={NotFoundImage} alt="Not Found" />
			<span>Redirecting...</span>
		</div>
	);
};

export default NotFound;
