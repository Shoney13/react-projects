import React, { useRef, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const BookShowModal = (props) => {
	const { show, handleShowBookShowModal, name } = props;
	const handleClose = () => {
		setValidated(true);
		if (!firstNameInput.current.value || !lastNameInput.current.value) return;

		localStorage.setItem(
			"customerDetails",
			JSON.stringify({
				firstName: firstNameInput.current.value,
				lastName: lastNameInput.current.value,
			})
		);
		handleShowBookShowModal();
	};
	const firstNameInput = useRef(null);
	const lastNameInput = useRef(null);
	const form = useRef(null);

	const customerDetails = localStorage.getItem("customerDetails")
		? JSON.parse(localStorage.getItem("customerDetails"))
		: {};

	const [validated, setValidated] = useState(false);

	return (
		<>
			<Modal show={show} onHide={handleShowBookShowModal}>
				<Modal.Header closeButton>
					<Modal.Title>Book tickets for {name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form ref={form} noValidate validated={validated}>
						<Form.Group className="mb-3">
							<Form.Label>First Name</Form.Label>
							<Form.Control
								ref={firstNameInput}
								type="name"
								placeholder="Shone"
								defaultValue={customerDetails?.firstName}
								autoFocus
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								ref={lastNameInput}
								type="name"
								placeholder="Jogi"
								defaultValue={customerDetails?.lastName}
								required
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={handleClose}>
						Book
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default BookShowModal;
