import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
	Navbar,
	Homepage,
	CryptoDetails,
	Cryptocurrencies,
	News,
	NotFound,
} from "./components";
import "./App.css";
import { useSelector } from "react-redux";

const App = () => {
	let { isDarkMode } = useSelector((state) => state.themeReducer);

	return (
		<>
			<Navbar />
			<main /* Margin set in Navbar CSS with media queries*/
				style={{
					backgroundColor: `${isDarkMode ? "black" : "white"}`,
					color: `${isDarkMode ? "white" : "black"}`,
				}}
			>
				<Routes>
					<Route path="/" element={<App />} />
					<Route index element={<Homepage />} />
					<Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
					<Route path="/news" element={<News isSimplified={false} />} />
					<Route path="/cryptocurrencies/:coinId" element={<CryptoDetails />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
		</>
	);
};

export default App;
