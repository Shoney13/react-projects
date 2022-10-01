import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { addNewBudget } from "../service/budgetListSlice";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";


const AddBudgetModal = (props) => {
	const dispatch = useDispatch();
	const { show, handleShowAddBudgetModalModal } = props;
	const handleClose = () => {
		setNewBudget(getInitialState);
		handleShowAddBudgetModalModal();
	};
	const getInitialState = () => ({
		name: "",
		budgetId: uuidv4(),
		maxBudget: 5000,
		expenses: [],
	});
	const [newBudget, setNewBudget] = useState(getInitialState());

	const handleChange = (e) => {
		if (e.target.id === "name")
			setNewBudget((prevBudget) => ({
				...prevBudget,
				name: e.target.value.trim(),
			}));
		if (e.target.id === "amount")
			setNewBudget((prevBudget) => ({
				...prevBudget,
				maxBudget: Number(e.target.value),
			}));
	};
	
	const handleSubmit=() =>{
		if(newBudget.name.trim().length > 0 && newBudget.maxBudget>0){
			dispatch(addNewBudget(newBudget));
		}
		setNewBudget(getInitialState());
		handleClose();
	}

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Track New Budget</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form noValidate>
						<Form.Group className="mb-3">
							<Form.Label>Budget Name</Form.Label>
							<Form.Control
								type="text"
								id="name"
								value={newBudget.name}
								onChange={handleChange}
								autoFocus
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Max Amount</Form.Label>
							<Form.Control
								type="number"
								id="amount"
								value={newBudget.maxBudget}
								onChange={handleChange}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSubmit}>
						Add Budget
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default AddBudgetModal;
