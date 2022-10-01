import trailer from "../assets/The Lord of the Rings.mp4";
import { useSelector } from "react-redux";

const webvtt = require("node-webvtt");

const LiveVideo = (props) => {
	const { videoId, language, setUpdateCurrentPosition } = props;
	const prevCaptions = useSelector(
		(state) => state.captionList?.[videoId]?.[language]
	);

	// Compiling data to webvtt format
	const compile = prevCaptions ? webvtt.compile(prevCaptions) : "";

	// Creating Object URL of the captions to use as source
	const blob = URL.createObjectURL(new Blob([compile], { type: "text/vtt" }));

	return (
		<video
			style={{
				display: "block",
				margin: "0 auto",
				width: "100%",
			}}
			src={trailer}
			type="video/mpeg"
			onSeeked={()=>setUpdateCurrentPosition(true)}
			controls
		>
			{compile && (
				<track
					label={language}
					kind="subtitles"
					srcLang={language}
					src={blob}
					default
				/>
			)}
		</video>
	);
};

export default LiveVideo;
