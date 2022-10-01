import {configureStore} from "@reduxjs/toolkit";
import budgetListReducer from './budgetListSlice'
export const store =configureStore({
    reducer:{
        budgetList: budgetListReducer,
    }
})

// Handle Local Storage
store.subscribe(()=>{
    localStorage.setItem('budgetList', JSON.stringify(store.getState()));
})