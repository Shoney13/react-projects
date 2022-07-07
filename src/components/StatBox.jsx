import React from "react";
import { useSelector } from "react-redux";
import ScalaLoader from "react-spinners/ScaleLoader";
const StatBox = (props) => {
	let { loading } = useSelector((state) => state.coinsStat);
	let { isDarkMode } = useSelector((state) => state.themeReducer);
	return (
		<div
			style={{
				boxShadow: `rgba(99, 99, 99, 0.2) 0px 2px 8px 0px`,
				flex: "35%",
				minHeight: "7rem",
				display: "flex",
				justifyContent: "space-between",
				flexDirection: "column",
				padding: "1rem",
				alignItems: "center",
				maxWidth: "20rem",
				textAlign: "center",
				backgroundColor: `${isDarkMode ? "#121212" : "white"}`,
			}}
		>
			{" "}
			<span
				style={{
					fontSize: "1.5rem",
					color: "gray",
				}}
			>
				{props.name}
			</span>{" "}
			<span
				style={{
					fontSize: "3rem",
					fontWeight: "bold",
				}}
			>
				{loading ? <ScalaLoader color="#8a2be2" /> : props.value}
			</span>
		</div>
	);
};

export default StatBox;
