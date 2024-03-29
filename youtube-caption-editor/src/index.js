import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";

import App from "./App";
import {store} from "./service/store";
// bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
