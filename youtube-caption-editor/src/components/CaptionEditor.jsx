import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteCaptionDetail } from "../service/captionSlice";
const CaptionEditor = (props) => {
	const {
		setAddCaptionClicked,
		toggleUpdateCaption,
		videoId,
		language,
		duration,
	} = props;

	const prevCaptions = useSelector(
		(state) => state.captionList?.[videoId]?.[language]?.cues
	);

	// set add Caption to true useEffect in wavsurfer will pause the video and update time
	const handleClick = () => {

		setAddCaptionClicked(true);
		// toggleAddCaptionDetail();
	};

	return (
		<div>
			<Button onClick={handleClick} variant="outline-primary" ><i style={{color: '#0d6efd'}} className="fa-solid fa-plus"/>  CAPTION</Button>
			<div style={{ overflowY: "auto", height: "40vh" }}>
				{prevCaptions &&
					prevCaptions.map((caption) => {
						const { start, end, identifier, text } = caption;
						return (
							<CaptionBox
								max={duration}
								toggleUpdateCaption={toggleUpdateCaption}
								start={start}
								end={end}
								language={language}
								captionId={identifier}
								videoId={videoId}
								text={text}
								key={identifier}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default CaptionEditor;

const CaptionBox = (props) => {
	let {
		start,
		end,
		captionId,
		language,
		videoId,
		max,
		text,
		toggleUpdateCaption,
	} = props;

	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(deleteCaptionDetail({ captionId, language, videoId }));
	};

	const [startTime, setStartTime] = useState(start);
	const [endTime, setEndTime] = useState(end);
	const [caption, setCaption] = useState(text);
	const secondsToHours = (time) =>
		new Date(time * 1000).toUTCString().split(" ")[4];
	const hourstoSeconds = (time) =>
		time
			.split(":")
			.reverse()
			.reduce((prev, curr, i) => prev + curr * Math.pow(60, i), 0);
	const handleChange = (e) => {
		// if start time is greater than end time then update to endTime-1
		if (e.target.name === "start")
			setStartTime(
				hourstoSeconds(e.target.value) < endTime
					? hourstoSeconds(e.target.value)
					: endTime - 1
			);
		// if end time is less than start time then update to startTime +1
		if (e.target.name === "end")
			setEndTime(
				hourstoSeconds(e.target.value) > startTime
					? hourstoSeconds(e.target.value)
					: startTime + 1
			);
		if (e.target.name === "caption") setCaption(e.target.value);
	};

	useEffect(() => {
		toggleUpdateCaption({
			videoId,
			language,
			captionId,
			start: startTime,
			end: endTime,
			text: caption,
		});
	}, [startTime, endTime, caption]);


	// Updating captions between Language switch
	useEffect(() => {
		setStartTime(start);
		setEndTime(end);
		setCaption(text);
	}, [start, end, text]);

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "stretch",
				gap: "1rem",
				margin: "0.5rem",
			}}
		>
			<textarea
				cols="30"
				name="caption"
				value={caption}
				onChange={handleChange}
				placeholder="Enter caption..."
				style={{ padding: "0.5rem", border: "solid gray 2px", borderRadius: "7px" }}
			></textarea>
			<i
				className="fa-solid fa-trash"
				style={{ alignSelf: "center" }}
				onClick={handleDelete}
			/>
			<span
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "0.5rem",
				}}
			>
				<input
					type="time"
					name="start"
					step="1"
					value={secondsToHours(startTime)}
					max={secondsToHours(max)}
					onChange={handleChange}
					style={{
						border: "solid gray 2px",
						padding: "0.3rem",
						borderRadius: "7px",
					}}
				/>
				<input
					type="time"
					name="end"
					step="1"
					value={secondsToHours(endTime)}
					max={secondsToHours(max)}
					onChange={handleChange}
					style={{
						border: "solid gray 2px",
						padding: "0.3rem",
						borderRadius: "7px",
					}}
				/>
			</span>
		</div>
	);
};
