import millify from "millify";
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const CryptoBox = (props) => {
	let { name, iconUrl, price, marketCap, change, uuid } = props;
	let { isDarkMode } = useSelector((state) => state.themeReducer);
	return (
		<NavLink to={`/cryptocurrencies/${uuid}`}>
			<div
				style={{
					display: "flex",
					flex: "20%",
					minWidth: "15rem",
					minHeight: "11rem",
					flexDirection: "column",
					justifyContent: "space-between",
					boxShadow: `rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px`,
					backgroundColor: `${isDarkMode ? "#121212" : "white"}`,
					color: `${isDarkMode ? "white" : "black"}`,
				}}
			>
				{/* Name And LOGO */}
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						padding: "1rem",
						borderBottom: "1px solid rgba(27, 31, 35, 0.15)",
					}}
				>
					{/* Name */}
					<span
						style={{
							fontSize: "1.5rem",
							fontWeight: 600,
							color: "#0001ef",
						}}
					>
						{name}
					</span>
					{/* Logo */}
					<img
						src={iconUrl}
						alt={name}
						style={{
							width: "40px",
						}}
					/>
				</div>

				{/* Price Market  */}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "0.7rem",
						padding: "1rem",
					}}
				>
					<span>
						Price: <span>{millify(price)}</span>
					</span>
					<span>
						Market Cap: <span>{millify(marketCap)}</span>
					</span>
					<span>
						Change: <span>{change}%</span>
					</span>
				</div>
			</div>
		</NavLink>
	);
};

export default CryptoBox;
