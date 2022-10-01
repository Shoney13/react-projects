import React, { useEffect, useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";
import CursorPlugin from "wavesurfer.js/dist/plugin/wavesurfer.cursor.min";
import wavesurfer from "wavesurfer.js";
import { useSelector } from "react-redux";

const WaveSurfer = (props) => {
	const wavesurferRef = useRef(null);
	const timelineRef = useRef(null);
	let {
		playing,
		setPlaying,
		setCurrentPosition,
		toggleUpdateCaption,
		addCaptionClicked,
		videoId,
		language,
		setDuration,
		updateCurrentPosition,
		setUpdateCurrentPosition,
	} = props;
	// fetch file url from the context
	const fileURL = document.querySelector("video");

	// crate an instance of the wavesurfer
	const [wavesurferObj, setWavesurferObj] = useState();

	const prevCaptions = useSelector(
		(state) => state.captionList?.[videoId]?.[language]?.cues
	);

	const [zoom, setZoom] = useState(50); // to control the zoom level of the waveform

	// create the waveform inside the correct component
	useEffect(() => {
		if (wavesurferRef.current && !wavesurferObj) {
			setWavesurferObj(
				wavesurfer.create({
					container: "#waveform",
					scrollParent: true,
					autoCenter: true,
					cursorColor: "gray",
					loopSelection: true,
					waveColor: "white",
					progressColor: "gray",
					splitChannels: false,
					backend: "MediaElement",
					mediaType: "video",
					mediaControls: true,
					responsive: true,
					plugins: [
						TimelinePlugin.create({
							container: "#wave-timeline",
							primaryColor: "white",
							secondaryColor: "gray",
							primaryFontColor: "white",
							secondaryFontColor: "gray",
						}),
						RegionsPlugin.create({}),
						CursorPlugin.create({
							showTime: true,
							opacity: 0.75,
							width: "1px",
							customShowTimeStyle: {
								"background-color": "rgba(0, 0, 0,0.5)",
								color: "#fff",
								padding: "2px",
								"font-size": "10px",
							},
						}),
					],
					xhr: {
						cache: "default",
						mode: "no-cors",
						method: "GET",
						credentials: "include",
						headers: [
							{ key: "cache-control", value: "no-cache" },
							{ key: "pragma", value: "no-cache" },
						],
					},
				})
			);
		}
	}, [wavesurferRef, wavesurferObj]);

	// once the file URL is ready, load the file to produce the waveform
	useEffect(() => {
		if (fileURL && wavesurferObj) {
			wavesurferObj.load(fileURL);
		}
	}, [fileURL, wavesurferObj]);

	// pausing and playing through parents
	useEffect(() => {
		if (wavesurferObj) playing ? wavesurferObj.play() : wavesurferObj.pause();
	}, [playing, wavesurferObj]);

	useEffect(() => {
		if (wavesurferObj) {
			// once audio starts playing, set the state variable to true
			wavesurferObj.on("play", () => {
				setPlaying(true);
			});

			// once audio stops playing, set the state variable to false
			wavesurferObj.on("finish", () => {
				setPlaying(false);
			});

			// on pause
			wavesurferObj.on("pause", () => {
				setCurrentPosition(wavesurferObj.getCurrentTime());
				setPlaying(false);
			});
			// When Clicked on the waveform
			wavesurferObj.on("seek", () => {
				setCurrentPosition(wavesurferObj.getCurrentTime());
			});
			// updating  caption area
			wavesurferObj.on("region-update-end", (e) => {
				const { end, start, id: captionId } = e;
				toggleUpdateCaption({
					videoId,
					language,
					captionId,
					start,
					end,
				});
			});
			// saving duration
			wavesurferObj.on("ready", () => {
				setDuration(wavesurferObj.getDuration());
			});
		}
	}, [wavesurferObj]);

	// set zoom level of the wavesurfer object, whenever the zoom variable in state is changed
	useEffect(() => {
		if (wavesurferObj) wavesurferObj.zoom(zoom);
	}, [zoom, wavesurferObj]);

	// if addCaptionClicked is true

	useEffect(() => {
		if (addCaptionClicked) wavesurferObj.pause();
	}, [addCaptionClicked]);

	useEffect(() => {
		if (wavesurferObj) setCurrentPosition(wavesurferObj.getCurrentTime());
		setUpdateCurrentPosition(false);
	}, [updateCurrentPosition]);

	// if language or prevCaption changes update wavesurfer
	useEffect(() => {
		if (wavesurferObj) {
			wavesurferObj.clearRegions();
			if (prevCaptions) {
				prevCaptions.forEach((caption) => {
					const { start, end, identifier: id } = caption;
					wavesurferObj.addRegion({
						start,
						end,
						id,
						color: "hsla(216, 98%, 52%, 0.4)",
					});
					// wavesurferObj.seekTo(end/wavesurferObj.getDuration())
				});
			}
		}
	}, [language, prevCaptions, wavesurferObj]);

	const handleZoomSlider = (e) => {
		setZoom(e.target.value);
	};

	return (
		<section>
			<div
				style={{ display: "flex", gap: "1rem", width: "20%", minWidth: '15rem' , alignItems: "center", marginLeft: 'auto', }}
			>
				<i className="fa-solid fa-magnifying-glass-minus" />
				<Form.Range max={100} onChange={handleZoomSlider} value={zoom} />
				<i className="fa-solid fa-magnifying-glass-plus" />
			</div>
			<div ref={wavesurferRef} id="waveform" />
			<div ref={timelineRef} id="wave-timeline" />
		</section>
	);
};

export default WaveSurfer;
