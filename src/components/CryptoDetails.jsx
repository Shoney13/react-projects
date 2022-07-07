import React, { useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCryptoDetail } from "../store/coinDetailSlice";
import GridLoader from "react-spinners/GridLoader";
import millify from "millify";
const CryptoDetails = () => {
	const { coinId } = useParams();
	let { isDarkMode } = useSelector((state) => state.themeReducer);
	let dispatch = useDispatch();
	let { isDataFetched, isLoading, coinDetail } = useSelector(
		(state) => state.coinDetail
	);
	let {
		name,
		description,
		price,
		marketCap,
		["24hVolume"]: volume,
		rank,
		allTimeHigh,
		links,
	} = useSelector((state) => state.coinDetail.coinDetail);

	useEffect(() => {
		dispatch(fetchCryptoDetail(coinId));
	}, [dispatch]);

	console.log(coinDetail);

	// let {description}=useSelector(state=>state.coinDetail)

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{isDataFetched ? (
				isLoading ? (
					<GridLoader color="#8a2be2" />
				) : (
					<div>
						<div>
							<h1
								style={{
									textAlign: "center",
									fontSize: "2.5rem",
								}}
							>{`${name} Value Statistics`}</h1>
							<p
								style={{
									textAlign: "center",
								}}
							>{`An overview showing the stats of ${name}.`}</p>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
								}}
							>
								<StatBar
									name="Price"
									value={price}
									symbolNames="fa-solid fa-dollar-sign"
								/>
								<StatBar
									name="Rank"
									value={rank}
									symbolNames="fa-solid fa-ranking-star"
								/>
								<StatBar
									name="24h Volume"
									value={volume}
									symbolNames="fa-solid fa-layer-group"
								/>
								<StatBar
									name="Market Cap"
									value={marketCap}
									symbolNames="fa-solid fa-sack-dollar"
								/>
								<StatBar
									name="All Time High"
									value={allTimeHigh.price}
									symbolNames="fa-solid fa-money-bill-trend-up"
								/>
							</div>
						</div>
						<div
							style={{
								maxWidth: "800px",
								margin: "auto",
							}}
						>
							<h2
								style={{
									margin: "1rem",
								}}
							>{`About ${name}`}</h2>
							{HTMLReactParser(description)}
							<h2
								style={{
									margin: "1rem",
								}}
							>
								Links
							</h2>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
								}}
							>
								{links.map((link) => (
									<LinksBar type={link.type} url={link.url} name={link.name} />
								))}
							</div>
						</div>
					</div>
				)
			) : (
				<GridLoader color="#8a2be2" />
			)}
		</div>
	);
};

export default CryptoDetails;

const StatBar = (props) => {
	let { name, value, symbolNames } = props;
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				padding: "1rem",
				margin: "0.5rem",
				boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
				fontSize: "1.5rem",
				maxWidth: "400px",
				width: "100%",
			}}
		>
			<span>
				<i className={symbolNames} /> {name}
			</span>{" "}
			<span>{millify(value)}</span>
		</div>
	);
};

const LinksBar = (props) => {
	let { type, name, url } = props;
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				padding: "1rem",
				margin: "0.5rem",
				boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
				fontSize: "1.5rem",
				maxWidth: "400px",
				width: "100%",
			}}
		>
			<span>
				<i
					className={`fa-${type === "website" ? "solid" : "brands"} fa-${
						type === "website" ? "globe" : type
					}`}
				/>{" "}
				{type}
			</span>{" "}
			<a href={url}>{name}</a>
		</div>
	);
};
