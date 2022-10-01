import React from "react";

const Footer = () => {
	return (
		<footer
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div
				style={{
					fontSize: "1.5rem",
				}}
			>
				<i className="fa-regular fa-copyright" /> Shone Jogi
			</div>
			<div
				style={{
					display: "flex",
					gap: "0.5rem",
				}}
			>
				<a
					target="_blank"
					rel="noreferrer"
					href="https://www.linkedin.com/in/shone-jogi-80526a1b5/"
				>
					<i
						style={{
							color: "black",
						}}
						className="fa-brands fa-linkedin fa-2x"
					/>
				</a>
				<a target="_blank" rel="noreferrer" href="https://github.com/Shoney13">
					<i
						style={{
							color: "black",
						}}
						className="fa-brands fa-github fa-2x"
					/>
				</a>
				<a
					target="_blank"
					rel="noreferrer"
					href="https://shoney13.github.io/HTML-projects/"
				>
					<i
						style={{
							color: "black",
						}}
						className="fa-brands fa-html5 fa-2x"
					/>
				</a>
			</div>
		</footer>
	);
};

export default Footer;
