import { useEffect, useState, useRef } from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import MovieBox from "./components/MovieBox";
import { useGetShowsListQuery } from "./service/movieSlice";
import { useNavigate } from "react-router-dom";
function App() {
	const [search, setSearch] = useState("all");
	let {
		data: movieList,
		isError,
		isLoading,
		isFetching,
	} = useGetShowsListQuery(search);
	// console.log(movieList);

	const handleSearch = () => {
		setSearch(input.current.value);
	};

	const input = useRef(null);

	let navigate = useNavigate();
	if (isError) {
		navigate("/error");
	}
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<h1>ShowsDB</h1>
			{isLoading || isFetching ? (
				<Spinner animation="border" role="status" />
			) : (
				<>
					<InputGroup
						style={{
							maxWidth: "25rem",
							width: "80%",
						}}
					>
						<Form.Control placeholder="All" aria-label="search" ref={input} />
						<Button
							variant="outline-secondary"
							id="button-addon2"
							onClick={handleSearch}
						>
							Search
						</Button>
					</InputGroup>
					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							gap: "1rem",
							justifyContent: "center",
							alignItems: "stretch",
							margin: "1rem",
						}}
					>
						{movieList.length ? (
							movieList.map((movie) => (
								<Link
									to={`/show/${movie.show.id}`}
									style={{ textDecoration: "none", color: "black" }}
									key={movie.show.id}
								>
									<MovieBox data={movie} />
								</Link>
							))
						) : (
							<h1>Nothing Found</h1>
						)}
					</div>
				</>
			)}
		</div>
	);
}

export default App;
