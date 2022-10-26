import React from "react";

const Keys = (props) => {
	const handleClick = (e) => {
    console.log(e.target.id)
		if (e.target.id === "clear") {
			props.clear();
		} else if(e.target.id === "equals"){
      props.evaluate()
    } else {
			props.addExpression();
		}
	};
	return (
		<span id={props.id} className="button" onClick={handleClick}>
			{props.value}
		</span>
	);
};

export default Keys;
