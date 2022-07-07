import React from "react";
import NotFoundImage from "../images/NotFound.png";
const NotFound = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				gap: "2rem",
			}}
		>
			<h1>The page you are looking for does not exist</h1>
			<img src={NotFoundImage} alt="Not Found" />
		</div>
	);
};

export default NotFound;
