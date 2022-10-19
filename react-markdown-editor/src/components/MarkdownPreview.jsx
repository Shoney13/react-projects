import { marked } from "marked";
import React from "react";
import styles from "./MarkdownPreview.module.css";
const MarkdownPreview = (props) => {
  marked.setOptions({
    breaks:true
  })
	return (
		<div
      className={styles.preview_main}
    >
      <div className={styles.preview_title}>Preview</div>
      <div
        dangerouslySetInnerHTML={{
          __html: marked.parse(props.markdownText),
        }}
        id="preview"
      />
    </div>
	);
};

export default MarkdownPreview;
