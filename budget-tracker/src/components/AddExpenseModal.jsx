import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { addNewExpenses } from "../service/budgetListSlice";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
const AddExpenseModal = (props) => {
	const dispatch = useDispatch();
	const { show, handleShowAddExpenseModal, name, budgetId } = props;
	const handleClose = () => {
		setNewExpense(getInitialState);
		handleShowAddExpenseModal();
	};
	const getInitialState = () => ({
		name: "",
		amount: "",
		expenseId: uuidv4(),
	});
	const [newExpense, setNewExpense] = useState(getInitialState());

	const handleChange = (e) => {
		if (e.target.id === "name")
			setNewExpense((prevExpense) => ({
				...prevExpense,
				name: e.target.value.trim(),
			}));
		if (e.target.id === "amount")
			setNewExpense((prevExpense) => ({
				...prevExpense,
				amount: Number(e.target.value),
			}));
		// setNewExpense(prevExpense=>({...prevExpense,[e.target.id]:e.target.value}));
	};
	const handleAddNewExpense = () => {
		if (newExpense.amount && newExpense.amount >= 0)
			dispatch(
				addNewExpenses({
					budgetId,
					newExpense: {
						...newExpense,
						name: `${
							newExpense.name.trim().length ? newExpense.name.trim() : "miscellaneous"
						}`,
					},
				})
			);
		handleClose();
	};

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Expense in {name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form noValidate>
						<Form.Group className="mb-3">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								id="name"
								value={newExpense.name}
								onChange={handleChange}
								autoFocus
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Amount</Form.Label>
							<Form.Control
								type="number"
								id="amount"
								value={newExpense.amount}
								onChange={handleChange}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleAddNewExpense}>
						Add Expense
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default AddExpenseModal;
