import React from "react";

const Box = (props) => {
	return (
		<div
			className="drum-pad"
			id={props.button + "id"}
			style={{
				border: "1px solid black",
				borderRadius: "5px",
				width: "90px",
				height: "90px",
				background: props.currKey === props.button ? "black" : "white",
				color: props.currKey === props.button ? "white" : "black",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				transition: "all 100ms linear",
			}}
			onClick={async () => {
				props.setCurrKey(props.button);
				document.getElementById(props.button)?.play()
			}}
		>
			<audio
				src={props.sound}
				className="clip"
				id={props.button}
				onEnded={() => props.setCurrKey("")}
			></audio>
			<span>{props.button}</span>
		</div>
	);
};

export default Box;
