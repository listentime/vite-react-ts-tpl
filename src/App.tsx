import React, { useState } from 'react'
import Router from './route/router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Router />
    </div>
  )
}

export default App
