import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoStats } from "../store/coinsSlice";
import StatBox from "./StatBox";
import millify from "millify";
import PropagateLoader from "react-spinners/PropagateLoader";
import News from "./News";
import Cryptocurrencies from "./Cryptocurrencies";
const Homepage = () => {
	let { stats, isLoading, isDataFetched } = useSelector(
		(state) => state.coinsStat
	);
	let { isDarkMode } = useSelector((state) => state.themeReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		setTimeout(() => {
			if (!isDataFetched) dispatch(fetchCryptoStats());
		}, 2000);
	}, [dispatch]);

	let {
		total,
		total24hVolume,
		totalCoins,
		totalExchanges,
		totalMarketCap,
		totalMarkets,
	} = stats;
	return (
		<div style={{}}>
			<h1
				style={{
					marginBottom: "1rem",
				}}
			>
				Global Crypto Stats
			</h1>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: "1rem",
					justifyContent: "center",
				}}
			>
				{!isDataFetched ? (
					<PropagateLoader color="#8a2be2" />
				) : (
					<>
						<StatBox name="Total Cryptocurrencies" value={total} />
						<StatBox name="Total Coins" value={millify(totalCoins)} />
						<StatBox name="Total Exchanges" value={millify(totalExchanges)} />
						<StatBox name="Total Markets" value={millify(totalMarkets)} />
						<StatBox name="24h Volume" value={millify(total24hVolume)} />
						<StatBox name="Total Market Cap" value={millify(totalMarketCap)} />
					</>
				)}
			</div>
			<News isSimplified={true} />
			<Cryptocurrencies isSimplified={true} />
		</div>
	);
};

export default Homepage;
