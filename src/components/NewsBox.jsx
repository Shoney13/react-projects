import React from "react";
import { useSelector } from "react-redux";
const NewsBox = (props) => {
	let { description, name, newsUrl, imageUrl } = props;
	let { isDarkMode } = useSelector((state) => state.themeReducer);
	return (
		<div
			style={{
				display: "flex",
				flex: "31%",
				minWidth: "370px",
				flexDirection: "column",
				gap: "1rem",
				boxShadow: `rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px`,
				padding: "1rem",
				backgroundColor: `${isDarkMode ? "#121212" : "white"}`,
				color: `${isDarkMode ? "white" : "black"}`,
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					flex: "25%",
					gap: "1rem",
					width: "100%",
					justifyContent: "space-between",
				}}
			>
				<span
					style={{
						fontWeight: "bold",
						fontSize: "1.2rem",
					}}
				>
					<a
						style={{
							color: `${isDarkMode ? "white" : "black"}`,
						}}
						href={newsUrl}
					>
						{name}
					</a>
				</span>
				<img src={imageUrl} alt="" />
			</div>
			<div>
				<a
					style={{
						color: `${isDarkMode ? "white" : "black"}`,
					}}
					href={newsUrl}
				>
					{description}
				</a>
			</div>
		</div>
	);
};

export default NewsBox;
