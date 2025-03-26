import { Route, Routes } from "react-router-dom"
import "../src/App.css"
import Menu from "./component/Menu"
import Home from "./component/Home"
import Cart from "./component/Cart"

function App() {
  
  return (
    <div>
        <Menu/>
        <Routes>
              <Route path="/" element={<Home/>}>Home</Route>
              <Route path="/cart" element={<Cart/>}>Cart</Route>
        </Routes>       
   </div>
  )
}

export default App
