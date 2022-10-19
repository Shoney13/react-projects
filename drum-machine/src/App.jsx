import React, { useEffect, useState } from "react";

import heater_1 from "./assets/Heater-1.mp3";
import heater_2 from "./assets/Heater-2.mp3";
import heater_3 from "./assets/Heater-3.mp3";
import heater_4 from "./assets/Heater-4_1.mp3";
import clap from "./assets/Heater-6.mp3";
import Open_hh from "./assets/Dsc_Oh.mp3";
import kick_n_hat from "./assets/Kick_n_Hat.mp3";
import kick from "./assets/RP4_KICK_1.mp3";
import closed_hh from "./assets/Cev_H2.mp3";
import Box from "./components/Box";

const soundsArr = [
	(heater_1),
	(heater_2),
	(heater_3),
	(heater_4),
	(clap),
	(Open_hh),
	(kick_n_hat),
	(kick),
	(closed_hh),
];
const keysArr = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];

const getKeyName = (key) => {
	switch (key) {
		case "Q":
			return "Heater 1";
		case "W":
			return "Heater 2";
		case "E":
			return "Heater 3";
		case "A":
			return "Heater 4";
		case "S":
			return "Clap";
		case "D":
			return "Open-HH";
		case "Z":
			return "Kick-n'-hat";
		case "X":
			return "Kick";
		case "C":
			return "Closed-HH";

		default:
			return "";
	}
};

const App = () => {
	const [currKey, setCurrKey] = useState("");

	useEffect(() => {
		const onKeyDown = (event) => {
			if (keysArr.includes(event.key.toUpperCase()))
			document.getElementById(event.key.toUpperCase())?.play();
				setCurrKey(event.key.toUpperCase());
		};
		window.addEventListener("keydown", onKeyDown);


		return () => {
			window.removeEventListener("keydown", onKeyDown);
		};
	}, []);

	return (
		<div
			id="drum-machine"
			style={{
				width: "99vw",
				height: "97vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				overflow: "hidden",
				flexDirection: "column",
				gap: "5rem",
				background: 'linear-gradient(to right, #8e2de2, #4a00e0)'
			}}
		>
			<div
				id="display"
				style={{
					width: "135px",
					height: "50px",
					border: "1px solid black",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					color:'white', fontSize:'1.5rem',
					background: 'rgba( 255, 255, 255, 0.25 )',
					boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
					backdropFilter: 'blur( 4px )',
					borderRadius: '10px'
				}}
			>
				{getKeyName(currKey)}
			</div>
			<div
				style={{
					border: "1px solid black",
					borderRadius: "10px",
					width: "300px",
					height: "300px",
					padding: "10px",
					gap: "10px",
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
					alignItems: "center",
					background: 'linear-gradient(to right, #8e2de2, #4a00e0)',
					background: 'rgba( 255, 255, 255, 0.25 )',
					boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
					backdropFilter: 'blur( 4px )',
				}}
			>
				{keysArr.map((button, key) => (
					<Box
						{...{
							button,
							key,
							currKey,
							setCurrKey,
							sound: soundsArr[key],
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default App;
