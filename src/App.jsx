import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
// import './Components/One';
// import Two from './Components/Two'
// import Three from './Components/Three'
import Glsl from './Components/Glsl'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      {/* <Three /> */}
      <Glsl />
    </div>
  )
}

export default App
