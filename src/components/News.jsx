import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoNews } from "../store/newsSlice";
import NewsBox from "./NewsBox";
import CircleLoader from "react-spinners/CircleLoader";
import { NavLink } from "react-router-dom";
const News = (props) => {
	let { isSimplified } = props;

	const dispatch = useDispatch();
	const { isLoading, newsList, isDataFetched } = useSelector(
		(state) => state.news
	);
	let { isDarkMode } = useSelector((state) => state.themeReducer);
	useEffect(() => {
		setTimeout(() => {
			if (!isDataFetched) dispatch(fetchCryptoNews());
		}, 2000);
	}, [dispatch]);

	// useSelector((state) => console.log(state));

	return (
		<div
			style={{
				minHeight: `${isSimplified ? "" : "100vh"}`,
			}}
		>
			<h1 style={{ marginBottom: "1rem", marginTop: isSimplified ? "1rem" : "0" }}>
				Top Cryptocurrency News
			</h1>
			{isDataFetched && isSimplified && (
				<NavLink to="/news">
					<h3 style={{ marginBottom: "1rem" }}>View More</h3>
				</NavLink>
			)}
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: "2rem",
					justifyContent: "center",
					alignItems: "stretch",
				}}
			>
				{isDataFetched ? (
					newsList
						.filter((news, idx) => {
							if (isSimplified && idx > 4) return false;
							return news.image;
						})
						.map((news, idx) => {
							let {
								description,
								name,
								url: newsUrl,
								image: {
									thumbnail: { contentUrl: imageUrl },
								},
							} = news;

							return (
								<NewsBox
									key={idx}
									description={description}
									name={name}
									newsUrl={newsUrl}
									imageUrl={imageUrl}
								/>
							);
						})
				) : (
					<CircleLoader color="#8a2be2" />
				)}
			</div>
		</div>
	);
};

export default News;
