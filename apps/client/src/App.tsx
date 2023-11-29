import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [hello, setHello] = useState('');

  useEffect(() => {
    fetch('/api')
      .then(res => res.text())
      .then(setHello);
  }, []);

  return (
    <p>
      {hello}
    </p>
  )
}

export default App
