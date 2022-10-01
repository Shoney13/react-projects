import "./App.css";
import { useRef, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import { useGetVideosListQuery } from "./service/youtubeSlice";
import VideoBox from "./components/VideoBox";
// import {videosList} from './VideoList'
function App() {
	const [search, setSearch] = useState("New Trailers");
	const handleSearch = () => {
		setSearch(input.current.value);
	};
  // tracking Input
	const input = useRef(null);

	// Fetching videos from search
	const { data, error, isLoading, isFetching } = useGetVideosListQuery(search);

  // Maping video in format and filter out duplicate, invalid videoId 
	const videosList = data?.contents
		.map((video) => video.video)
		.filter((video) => video?.videoId)
		.filter(
			(video, index, self) =>
				index === self.findIndex((t) => t.videoId === video.videoId)
		);

  if(error)
  return <><h1>Something Went Wrong</h1><p>{JSON.stringify(error)}</p></>
	return (
		<>
			<InputGroup
				style={{
					maxWidth: "25rem",
					width: "80%",
					margin: "1rem",
				}}
			>
				<Form.Control placeholder="New Trailers" aria-label="search" ref={input} />
				<Button variant="outline-secondary" onClick={handleSearch}>
					Search
				</Button>
			</InputGroup>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "stretch",
					flexWrap: "wrap",
					gap: "1rem",
					margin: "1rem",
				}}
			>
				{isLoading || isFetching ? (
					<Spinner animation="border" variant="danger" />
				) : (
					videosList?.map((video) => (
						<VideoBox key={video.videoId} details={video} />
					))
				)}
			</div>
		</>
	);
}

export default App;
