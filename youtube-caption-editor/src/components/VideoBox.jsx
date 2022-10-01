import React, { useState } from "react";
import EditVideoModal from "./EditVideoModal";
const VideoBox = (props) => {
	const { thumbnails, title, videoId } = props.details;

	const [showModal, setShowModal] = useState(false);
	const handleShowEditVideoModal = () => {
		setShowModal((prevState) => !prevState);
	};
	
	return (
		<>
			<div
				style={{
					display: "flex",
					flex: "20%",
					minWidth: "15rem",
					minHeight: "11rem",
					flexDirection: "column",
					justifyContent: "space-between",
					boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
					// padding: '0.5rem',
					// margin: '0.5rem',
					alignSelf: "stretch",
				}}
				onClick={handleShowEditVideoModal}
			>
				<img src={thumbnails[0].url} alt={title} />
				<div>{title}</div>
			</div>
			{showModal&&<EditVideoModal
				show={showModal}
				handleShowEditVideoModal={handleShowEditVideoModal}
				videoId={videoId}
			/>}
		</>
	);
};

export default VideoBox;
