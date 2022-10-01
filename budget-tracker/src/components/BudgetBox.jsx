import React, { useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import AddExpenseModal from "./AddExpenseModal";
import ViewExpensesModal from "./ViewExpensesModal";
import { useDispatch } from "react-redux";
import {deleteBudget} from '../service/budgetListSlice'
const BudgetBox = (props) => {

    const dispatch = useDispatch()
	const { name, maxBudget, expenses, budgetId,simplified } = props;
	
	// const currExpenses = expenses.reduce(
	// 	(total, currExpenses) => total + currExpenses.amount,
	// 	0
	// );
	const getCurrentExpenses=() =>{
		return simplified?expenses:expenses.reduce(
			(total, currExpenses) => total + currExpenses.amount,
			0
			);
		}
		const currExpenses = getCurrentExpenses();

	let [showAddExpense, setShowAddExpense] = useState(false);
	const handleShowAddExpenseModal = () => {
		setShowAddExpense((prevState) => !prevState);
	};

	let [showViewExpenses, setShowViewExpenses] = useState(false);
	const handleShowViewExpensesModal = () => {
		setShowViewExpenses((prevState) => !prevState);
	};

	const getVariant = (currPercent) => {
		if (currPercent < 0.5) return "primary";
		if (currPercent < 0.75) return "warning";
		return "danger";
	};
	return (
		<>
			{showAddExpense&&<AddExpenseModal
				show={showAddExpense}
				handleShowAddExpenseModal={handleShowAddExpenseModal}
				name={name}
				budgetId={budgetId}
			/>}

			{showViewExpenses&&<ViewExpensesModal
				show={showViewExpenses}
				handleShowViewExpensesModal={handleShowViewExpensesModal}
				name={name}
				budgetId={budgetId}
			/>}

			<div
				style={{
					flex: "45%",
					display: "flex",
					flexDirection: "column",
					gap: "1rem",
					padding: "1rem",
					backgroundColor: `${currExpenses > maxBudget ? "#f9d7db" : ""}`,
					borderRadius: "0.5rem",
					boxShadow:'rgba(149, 157, 165, 0.2) 0px 8px 24px'
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
                    {/* Budget Name */}
					<span
						style={{
							fontSize: "1.5rem",
						}}
					>
						{name.length<20?name:name.substring(0,20)+'...'}
					</span>
                    {/* Budget Expense */}
					<span>
						{currExpenses} /{" "}
						<span style={{ fontSize: "0.8rem", color: "gray" }}>{maxBudget}</span>
					</span>
				</div>
                {/* Progress Bar */}
				<ProgressBar
					className="rounded-pill"
					now={currExpenses}
					max={maxBudget}
					variant={getVariant(currExpenses / maxBudget)}
				/>

				<div
					style={{
						display: "flex",
						justifyContent: "flex-end",
						gap: "0.5rem",
					}}
				>
					{simplified||<><Button variant="outline-primary" onClick={handleShowAddExpenseModal}>
						Add Expense
					</Button>
					<Button variant="outline-secondary" onClick={handleShowViewExpensesModal}>View Expenses</Button>
					<Button variant="outline-danger" onClick={()=>dispatch(deleteBudget({budgetId}))}>Delete</Button></>}
				</div>
			</div>
		</>
	);
};

export default BudgetBox;
