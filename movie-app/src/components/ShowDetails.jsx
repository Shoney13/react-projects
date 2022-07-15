import React, { useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { useGetShowQuery } from "../service/movieSlice";
import { Link, useNavigate } from "react-router-dom";
import BookShowModal from "./BookShowModal";
const ShowDetails = () => {
	const { id } = useParams();
	let { data, isError, isLoading, isFetching } = useGetShowQuery(id);
	let navigate = useNavigate();

	const [showBookShowModal, setShowBookShowModal] = useState(false);
	if (isLoading || isFetching)
		return (
			<div className="d-flex justify-content-center">
				<Spinner animation="border" role="status" />
			</div>
		);
	const {
		name,
		image,
		rating,
		summary,
		genres,
		externals: { imdb },
	} = data;

	if (isError) {
		navigate("/error");
	}
	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					padding: "1rem",
					gap: "1rem",
					maxWidth: "50rem",
					margin: "auto",
				}}
			>
				<span
					style={{
						alignSelf: "flex-start",
					}}
				>
					<Link to="/">Go Back</Link>
				</span>
				<h1>{name}</h1>
				<img
					src={
						image?.original
							? image.original
							: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
					}
					alt={name}
					style={{
						maxWidth: "15rem",
						height: "100%",
					}}
				/>
				<div>
					{genres.map((genre) => (
						<span
							style={{
								border: "2px solid gray",
								borderRadius: "5px",
								padding: "5px",
								margin: "5px",
							}}
						>
							{genre}
						</span>
					))}
				</div>
				<div>
					<i className="fa-solid fa-star" style={{ color: "gold" }} />{" "}
					<span>{rating.average ? rating.average : "N/A"}</span>
				</div>
				<Button
					variant="outline-primary"
					onClick={() => setShowBookShowModal(!showBookShowModal)}
				>
					Book Show
				</Button>
				{parse(summary)}
				{imdb ? (
					<span>
						More Information:{" "}
						<a
							target="_blank"
							href={`https://www.imdb.com/title/${imdb}`}
							rel="noreferrer"
						>
							IMDb
						</a>
					</span>
				) : (
					""
				)}
			</div>
			{showBookShowModal && (
				<BookShowModal
					show={showBookShowModal}
					name={name}
					handleShowBookShowModal={() => setShowBookShowModal(!showBookShowModal)}
				/>
			)}
		</>
	);
};

export default ShowDetails;
