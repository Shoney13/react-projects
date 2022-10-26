import { evaluate } from "mathjs";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import Keys from "./Keys";

const keysObj = {
	clear: "AC",
	divide: "/",
	multiply: "*",
	seven: 7,
	eight: 8,
	nine: 9,
	subtract: "-",
	four: 4,
	five: 5,
	six: 6,
	add: "+",
	one: 1,
	two: 2,
	three: 3,
	zero: "0",
	decimal: ".",
	equals: "=",
};

function App() {
	const [expressions, setExpressions] = useState([]);
	const [isMax, setIsMax] = useState(false);

	useEffect(() => {
		if (expressions.length >= 11) setIsMax(true);
		else setIsMax(false);

		if (isMax) {
			setExpressions(["Max Reached"]);

			setTimeout(() => {
				setExpressions([...expressions]);
			}, 1000);
		}
	}, [expressions]);

	return (
		<div id="App">
			<div className="main_calculator">
				<div id="display">
					{expressions.map((elem) => (
						<>{elem}</>
					))}
				</div>
				<div className="buttons">
					{Object.keys(keysObj).map((elem, idx) => (
						<Keys
							id={elem}
							value={keysObj[elem]}
							addExpression={() => {
								setExpressions((prev) =>
									isMax ? [...prev] : [...prev, keysObj[elem]]
								);
							}}
							clear={() => setExpressions([])}
							evaluate={() => {
								console.log(expressions);
								console.log(expressions.join(""));
								setExpressions((prev) => [evaluate(prev.join(""))]);
							}}
							key={idx}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
