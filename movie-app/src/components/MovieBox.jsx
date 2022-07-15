import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
const MovieBox = (props) => {
	const {
		name,
		image,
		rating: { average: rating },
	} = props.data.show;

	const [imageLoaded, setImageLoaded] = useState(false);
	return (
		<div
			style={{
				display: "flex",
				flex: "25%",
				maxWidth: "15rem",
				minWidth: "10rem",
				flexDirection: "column",
				justifyContent: "center",
				position: "relative",
				borderRadius: "10px",
				boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
				padding: "10px",
				textAlign: "center",
			}}
		>
			{imageLoaded || (
				<div
					style={{
						height: "330px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{" "}
					<Spinner animation="border" role="status" />
				</div>
			)}
			<img
				src={
					image?.original
						? image.original
						: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
				}
				alt={name}
				onLoad={() => {
					setImageLoaded(true);
				}}
				style={{
					height: "330px",
					objectFit: "cover",
					display: imageLoaded ? "block" : "none",
				}}
			/>
			<span
				style={{
					fontSize: "1.2rem",
				}}
			>
				{name}
			</span>
			<div
				style={{
					position: "absolute",
					top: "1rem",
					right: "1rem",
					backgroundColor: rating ? (rating > 7 ? "#29a645" : "#ffc006") : "#dd3544",
					padding: "0.5rem",
					borderRadius: "10px",
				}}
			>
				{rating || "N/A"}
			</div>
		</div>
	);
};

export default MovieBox;
