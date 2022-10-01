import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
	// Getting Saved state from Local Storage
	const savedData = JSON.parse(localStorage.getItem("budgetList"))?.budgetList;
	if (savedData && savedData.length > 0) return savedData;

	// if No Local Storage is available
	return [
		{
			name: "Food",
			budgetId: "68655314-931a-4d70-9463-df00ed26aa11",
			maxBudget: 5000,
			expenses: [
				{
					name: "Pizza",
					amount: 800,
					expenseId: "f6361165-2b33-498a-bf97-d43d60de49ba",
				},
			],
		},
		{
			name: "Party",
			budgetId: "ed34e62d-8b71-47db-80fd-3c60b0d23f18",
			maxBudget: 8000,
			expenses: [
				{
					name: "Decoration",
					amount: 2000,
					expenseId: "2532c7d8-06a5-4913-9352-c0f431bcf8c9",
				},
				{
					name: "Cake",
					amount: 500,
					expenseId: "2b3bca29-80d1-4f8f-9196-3d10909542f3",
				},
				{
					name: "Hotel",
					amount: 5000,
					expenseId: "dd010cb5-61aa-4273-8b4d-a9d5ed1713b8",
				},
			],
		},
		{
			name: "Shopping",
			budgetId: "7547b60c-faa0-48c2-aa15-9729e25cba04",
			maxBudget: 12000,
			expenses: [
				{
					name: "Shoes",
					amount: 5000,
					expenseId: "b88bb9dd-6c36-4f78-952c-84418ad96ef8",
				},
				{
					name: "Clothes",
					amount: 3000,
					expenseId: "c230a413-10ff-44d0-84e5-f688b496bd19",
				},
			],
		},
	];
};

const budgetListSlice = createSlice({
	name: "budgetList",
	initialState: getInitialState(),
	reducers: {
		addNewBudget(state, action) {
			return [
				...state,
				{
					...action.payload,
				},
			];
		},
		addNewExpenses(state, action) {
			return state.map((budget) => {
				if (action.payload.budgetId === budget.budgetId)
					return {
						...budget,
						expenses: [...budget.expenses, action.payload.newExpense],
					};
				return budget;
			});
		},
		removeExpense(state, action) {
			return state.map((budget) => {
				if (action.payload.budgetId === budget.budgetId)
					return {
						...budget,
						expenses: budget.expenses.filter(
							(expense) => expense.expenseId !== action.payload.expenseId
						),
					};
				return budget;
			});
		},
		removeAllExpense(state, action) {
			return state.map((budget) => {
				if (action.payload.budgetId === budget.budgetId)
					return {
						...budget,
						expenses: [],
					};
				return budget;
			});
		},
		deleteBudget(state, action) {
			return state.filter((budget) => budget.budgetId !== action.payload.budgetId);
		},
	},
});

export const {
	addNewBudget,
	addNewExpenses,
	removeExpense,
	removeAllExpense,
	deleteBudget,
} = budgetListSlice.actions;
export default budgetListSlice.reducer;
