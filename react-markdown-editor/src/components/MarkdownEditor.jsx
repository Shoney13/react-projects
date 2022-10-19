import React from "react";
import styles from "./MarkdownEditor.module.css";

const MarkdownEditor = (props) => {
	return (
		<div
      className={styles.editor_main}
      >
        <div className={styles.editor_title}>Editor</div>
			<textarea
        className={styles.main_editor}
				value={props.markdownText}
				onChange={(e) => props.setMarkdownText(e.target.value)}
        id="editor"
			/>
		</div>
	);
};

export default MarkdownEditor;
