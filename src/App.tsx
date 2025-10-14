import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Index } from './Page/Index'

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Index />} ></Route>

      </Routes>

    </BrowserRouter>

  )
}

export default App
