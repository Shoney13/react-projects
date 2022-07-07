import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
import "./Navbar.css";
function Navbar() {
	const dispatch = useDispatch();
	let { isDarkMode } = useSelector((state) => state.themeReducer);
	// dispatch(toggleTheme())

	return (
		<header>
			<nav>
				<div
					style={{
						backgroundColor: "black",
						height: "4rem",
						display: "flex",
						padding: "0.5rem 1rem",
						gap: "0.5rem",
						position: "fixed",
						width: "100%",
					}}
				>
					<img
						src={logo}
						style={{
							color: "white",
						}}
						alt="Cryptomaniacs Logo"
					/>
					<span
						style={{
							alignSelf: "center",
						}}
					>
						<NavLink
							style={{
								color: "white",
								fontSize: "2rem",
							}}
							to="/"
						>
							CryptoManiac
						</NavLink>
					</span>
				</div>
				<div className="sidebar">
					<ul>
						<li>
							<NavLink to="/">
								<i className="fa-solid fa-house-chimney fa-3x" /> <span>Home</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/cryptocurrencies">
								<i className="fa-brands fa-bitcoin fa-3x" />{" "}
								<span>Cryptocurrencies</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/news">
								<i className="fa-solid fa-newspaper fa-3x" /> <span>News</span>
							</NavLink>
						</li>
						<li
							onClick={() => {
								dispatch(toggleTheme());
							}}
						>
							<i className={`fa-solid fa-${isDarkMode ? "moon" : "sun"} fa-3x`} />
							<span>Change Theme</span>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
}

export default Navbar;
