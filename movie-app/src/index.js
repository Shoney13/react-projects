import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ShowDetails from "./components/ShowDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./service/store";
import "bootstrap/dist/css/bootstrap.min.css";
import Error from "./components/Error";
import NotFound from "./components/NotFound";
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/show/:id" element={<ShowDetails />} />
					<Route path="/error" element={<Error />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
