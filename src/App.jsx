import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return; // Sayaç durdurulduysa, interval başlatılmaz

    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]); // isRunning state'i değiştiğinde useEffect çalışır

  return (
    <>
    <div>
      <h1> Sayaç: {count} </h1>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Durdur" : "Başlat"}
      </button>
    </div>
    </>
  )
}

export default App
