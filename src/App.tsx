import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Index } from './Page/Index'
import { RegisterPage } from "./Page/RegisterPage"

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Index />} ></Route>
        <Route path="https://anihubtest.netlify.app/Register" element={<RegisterPage />} ></Route>

      </Routes>

    </BrowserRouter>

  )
}

export default App
