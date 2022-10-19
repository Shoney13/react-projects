import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./QuoteBox.module.css";
import { ReactComponent as TwitterLogo } from "../assets/twitter.svg";
const QuoteBox = ({ generateNewGradient }) => {
	const [quote, setQuote] = useState({});
	const [loading, setLoading] = useState(true);

	const getQuote = async () => {
		setLoading(true);
		generateNewGradient();
		const res = await axios.get(
			"https://api.quotable.io/random?maxLength=106"
		);
		setQuote(res.data);
		setLoading(false);
	};

	useEffect(() => {
		getQuote();
	}, []);

	return (
		<div className={styles.quote_box_main} id="quote-box">
			{Boolean(quote?.content) && (
				<>
					<div
						className={`${styles.quote_box_quote} ${
							loading && styles.fade_out
						}`}
						id="text"
					>
						{quote?.content ?? ""}
					</div>
					<div
						className={`${styles.quote_box_author} ${
							loading && styles.fade_out
						}`}
						id="author"
					>
						-{quote?.author ?? ""}-
					</div>
					<div className={styles.quote_box_button_container}>
						<a
							id="tweet-quote"
							className={styles.quote_box_share}
							href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
								quote?.content
							)}%20-${encodeURIComponent(quote?.author)}`}
							target="_blank"
							rel="noreferrer"
						>
							<TwitterLogo style={{ width: "40px" }} />
						</a>
						<button
							id="new-quote"
							className={styles.quote_box_random}
							onClick={getQuote}
						>
							New Quote
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default QuoteBox;
