import { useEffect, useState } from 'react';
import './App.css';
import MarkdownEditor from './components/MarkdownEditor';
import MarkdownPreview from './components/MarkdownPreview';
import markdownTemplate from './markdownTemplate.txt';
function App() {
  const [markdownText, setMarkdownText] = useState("# Welcome to my React Markdown Previewer!");

  useEffect(() => {
    fetch(markdownTemplate)
    .then((res)=>res.text())
    .then(text=>setMarkdownText(text))
  }, [])
  


  return (
    <div className='app'>
      <MarkdownEditor {...{markdownText,setMarkdownText}}/>
      <MarkdownPreview {...{markdownText}}/>
    </div>
  );
}

export default App;
