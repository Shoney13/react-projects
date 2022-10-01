import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addCaptionDetail, updateCaptionDetail } from "../service/captionSlice";
import CaptionEditor from "./CaptionEditor";
import LiveVideo from "./LiveVideo";
import WaveSurfer from "./WaveSurfer";

const EditVideoModal = (props) => {
	const { show, handleShowEditVideoModal, videoId } = props;
	const handleClose = () => handleShowEditVideoModal();
	const dispatch = useDispatch();

	// current position of peek
	const [currentPosition, setCurrentPosition] = useState(0);

	// to Update the current position used in video seeking
	const [updateCurrentPosition, setUpdateCurrentPosition] = useState(false)

	// if the video is playing
	const [playing, setPlaying] = useState(false);

	// Total duration of the video;
	const [duration, setDuration] = useState(0);

	// Tracking Language
	const [language, setLanguage] = useState("en");

	// Add Captions clicked
	const [addCaptionClicked, setAddCaptionClicked] = useState(false)
	// Array of previous Captions
	const prevCaptions = useSelector(
		(state) => state.captionList?.[videoId]?.[language]?.cues
	);


	// if addCaptionClicked is true and video has been paused
	useEffect(() => {
		if(addCaptionClicked&&!playing){
			toggleAddCaptionDetail();
			setAddCaptionClicked(false);
		}

	}, [addCaptionClicked,playing])
	

	// Adding new caption in redux
	const toggleAddCaptionDetail = () => {
		dispatch(
			addCaptionDetail({
				videoId,
				language,
				data: {
					meta: {
						Kind: "captions",
						Language: language,
					},
					cues: [
						...(prevCaptions ? prevCaptions : []),
						{
							start: currentPosition,
							end: currentPosition + 3,
							identifier: prevCaptions ? prevCaptions.length + 1 : 1,
							styles: "",
							text: "",
						},
					].sort((a,b)=>a.end-b.end).map((cue,idx)=>({...cue,identifier:idx})),
					valid: true,
				}
			})
		);
	};

	// Update Caption
	const toggleUpdateCaption = (data) => {
		dispatch(updateCaptionDetail(data));
	};
	return (
		<div>
			<Modal
				aria-labelledby="contained-modal-title-vcenter"
				show={show}
				centered
				onHide={handleClose}
				fullscreen
			>
				<Modal.Header>
					<Modal.Title
						id="contained-modal-title-vcenter"
						style={{
							display: "flex",
							gap: "1rem",
							alignItems: "center",
							width: "100%",
							
						}}
					>
						<i className="fa-solid fa-closed-captioning"></i>
						<Row>
							<Col sm={12}>
								<Form.Select onChange={(e) => setLanguage(e.target.value)}>
									<option value="en" default>
										English
									</option>
									<option value="hi">Hindi</option>
									<option value="mr">Marathi</option>
								</Form.Select>
							</Col>
						</Row>
						<Button style={{marginLeft:'auto'}}onClick={handleClose}>Publish</Button>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container fluid>
						<Row>
							<Col style={{ padding: "0.5rem" }} sm={12} md={12} lg={6}>
								<CaptionEditor
									videoId={videoId}
									language={language}
									toggleAddCaptionDetail={toggleAddCaptionDetail}
									setAddCaptionClicked={setAddCaptionClicked}
									toggleUpdateCaption={toggleUpdateCaption}
									setPlaying={setPlaying}
									duration={duration}
								/>{" "}
							</Col>
							<Col style={{ padding: "0.5rem" }} sm={12} md={12} lg={6}>
								<LiveVideo videoId={videoId} language={language} setUpdateCurrentPosition={setUpdateCurrentPosition}/>
							</Col>
							<Col style={{ margin: "0.5rem", padding: "0.5rem" }} sm={12} md={12}>
								<WaveSurfer
									setCurrentPosition={setCurrentPosition}
									playing={playing}
									setPlaying={setPlaying}
									toggleUpdateCaption={toggleUpdateCaption}
									videoId={videoId}
									language={language}
									setDuration={setDuration}
									addCaptionClicked={addCaptionClicked}
									updateCurrentPosition={updateCurrentPosition}
									setUpdateCurrentPosition={setUpdateCurrentPosition}
								/>
							</Col>
						</Row>
					</Container>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default EditVideoModal;
