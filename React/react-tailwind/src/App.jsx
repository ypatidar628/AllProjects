import React from "react";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Register1 from "./Register1.jsx";
import Login1 from "./Login1.jsx";
import Home1 from "./Home1.jsx";

function App() {
  return (<div>
    <Routes>
      <Route path="/" element={<Login1 />} />
      <Route path="/register" element={<Register1 />} />
      <Route path="/home" element={<Home1 />} />
    </Routes>
    {/*<h1 className="text-teal-600">Hello</h1>*/}
  </div>
  );
}

export default App;


