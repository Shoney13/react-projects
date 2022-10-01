import React from "react";
import { Button, Modal } from "react-bootstrap";
import { removeExpense,removeAllExpense } from "../service/budgetListSlice";

import { useDispatch, useSelector } from "react-redux";

const ViewExpensesModal = (props) => {
	const dispatch = useDispatch();
	const {
		show,
		handleShowViewExpensesModal,
		name: budgetName,
		budgetId,
	} = props;
	const handleClose = () => handleShowViewExpensesModal();

	const handleClearAll = () => {
		dispatch(removeAllExpense({budgetId}));
	}

	const { expenses } = useSelector((prevState) =>
		prevState.budgetList.reduce((prevBudget, currBudget) => {
			if (currBudget.budgetId === budgetId) return currBudget;
			return prevBudget;
		}, {})
	);

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Expenses in {budgetName}</Modal.Title>
				</Modal.Header>
				<Modal.Body
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
					}}
				>
					{/* Expenses Details */}
					{expenses.length
						? expenses.map((expense) => (
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}
									key={expense.expenseId}
								>
									{/* Expense Name */}
									<span>{expense.name.length<20?expense.name:expense.name.substring(0,20)+'...'}</span>
									<span>
										{expense.amount}{" "}
										<Button
											variant="danger"
											onClick={() => {
												dispatch(removeExpense({ budgetId, expenseId: expense.expenseId }));
											}}
										>
											X
										</Button>
									</span>
								</div>
						  ))
						: "No Expenses Added"}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={handleClearAll}>
						Clear All
					</Button>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ViewExpensesModal;
