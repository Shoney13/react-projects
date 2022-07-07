import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CryptoBox from "./CryptoBox";
import { fetchCryptoStats } from "../store/coinsSlice";
import GridLoader from "react-spinners/GridLoader";
import { NavLink } from "react-router-dom";

const Cryptocurrencies = (props) => {
	let { isSimplified } = props;
	let { isDarkMode } = useSelector((state) => state.themeReducer);
	let { coinList, isLoading, isDataFetched } = useSelector(
		(state) => state.coinsStat
	);

	const dispatch = useDispatch();

	useEffect(() => {
		setTimeout(() => {
			if (!isDataFetched) dispatch(fetchCryptoStats());
		}, 2000);
	}, [dispatch]);

	return (
		<div
			style={{
				backgroundColor: `${isDarkMode ? "black" : "white"}`,
				color: `${isDarkMode ? "white" : "black"}`,
				minHeight: `${isSimplified ? "" : "100vh"}`,
			}}
		>
			<h1
				style={{
					marginBottom: "1rem",
					marginTop: isSimplified ? "1rem" : "0",
				}}
			>
				Top {isSimplified ? "" : 50} Cryptocurrencies
			</h1>
			{isDataFetched && isSimplified && (
				<NavLink to="/cryptocurrencies">
					<h3 style={{ marginBottom: "1rem" }}>View More</h3>
				</NavLink>
			)}
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: "1rem",
					justifyContent: "center",
					alignItems: "stretch",
				}}
			>
				{isDataFetched ? (
					coinList
						.filter((cryptoCoin, idx) => {
							if (isSimplified && idx > 7) return false;
							return true;
						})
						.map((cryptoCoin) => {
							let { name, iconUrl, price, marketCap, change, uuid } = cryptoCoin;
							return (
								<CryptoBox
									key={uuid}
									uuid={uuid}
									name={name}
									iconUrl={iconUrl}
									price={price}
									marketCap={marketCap}
									change={change}
								/>
							);
						})
				) : (
					<GridLoader color="#8a2be2" />
				)}
			</div>
		</div>
	);
};

export default Cryptocurrencies;
