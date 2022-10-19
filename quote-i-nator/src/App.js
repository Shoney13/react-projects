import QuoteBox from "./components/QuoteBox";
import styles from './App.module.css'
import { useEffect, useState } from "react";
function App() {
  const [background, setBackground] = useState(true)

useEffect(() => {
  generateNewGradient()
}, [])


  function generateNewGradient() {
    setBackground(Math.floor(Math.random() * 100));
  }
  

  return (
    <div className={styles.app_main} style={{backgroundPosition:`${background}% 50%`}}>
      <QuoteBox {...{generateNewGradient}}/>
    </div>
  );
}

export default App;
