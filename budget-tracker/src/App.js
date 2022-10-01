import { useState } from "react";
import { useSelector } from "react-redux";
import BudgetBox from "./components/BudgetBox";
import AddBudgetModal from "./components/AddBudgetModal";
import "./App.css";
import Button from "react-bootstrap/Button";
import Footer from "./components/Footer";
function App() {
	const budgetList = useSelector((state) => state.budgetList);

	let [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
	const handleShowAddBudgetModalModal = () => {
		setShowAddBudgetModal((prevState) => !prevState);
	};

	// Total amount of all the budget
	const totalMaxBudget = budgetList.reduce(
		(currTotal, budget) => currTotal + Number(budget.maxBudget),
		0
	);

  // Total amount of all Expenses of all the budget
	const totalCurrentExpenses = budgetList.reduce(
		(currTotal, budget) =>
			currTotal +
			budget.expenses.reduce(
				(expenseTotal, expense) => expenseTotal + expense.amount,
				0
			),
		0
	);
  
	return (
    <>
		<section
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<AddBudgetModal
				show={showAddBudgetModal}
				handleShowAddBudgetModalModal={handleShowAddBudgetModalModal}
			/>
			<h1
				style={{
					textAlign: "center",
					margin: "1rem",
				}}
			>
				Budget Tracker
			</h1>
			<Button variant="primary" onClick={handleShowAddBudgetModalModal}>
				Add Budget
			</Button>
			{budgetList.length ? (
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						maxWidth: "800px",
						gap: "1rem",
						margin: "1rem",
					}}
				>
					{budgetList.map((budget) => {
						const { name, maxBudget, expenses, budgetId } = budget;
						return (
							<BudgetBox
								key={budgetId}
								budgetId={budgetId}
								name={name}
								maxBudget={maxBudget}
								expenses={expenses}
							/>
						);
					})}
					<BudgetBox simplified expenses={totalCurrentExpenses} maxBudget={totalMaxBudget} name="Total" />
				</div>
			) : (
				<h3
					style={{
						margin: "1rem",
					}}
				>
					No Budgets Added
				</h3>
			)}
		</section>
    <Footer/>
    </>
	);
}

export default App;
