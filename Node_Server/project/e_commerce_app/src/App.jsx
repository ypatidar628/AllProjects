import React from 'react'
import Navbar from './component/comman/Navbar'
import { Route, Routes } from 'react-router-dom'
import Footer from './component/comman/Footer'
import Home from './component/comman/Home'
import Login from './component/index/Login'
import Register from './component/index/Register'
import About from './component/comman/About'
import Otp from './component/index/Otp'
import Contact from './component/comman/Contact'
import './App.css'
import UserController1 from './component/admin/UserController1'
import ProductCantroller from './component/admin/ProductController'
import Products from './component/user/Products'
import CategoryController from './component/admin/CategoriesController'
import BrandController from './component/admin/BrandController'
import CartPage from './component/user/CartPage'

function App() {
  return<div>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/product' element={<Products/>}></Route>
      <Route path='/login' element={<Login/>}></Route> 
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/otpMatch' element={<Otp/>}></Route>
      <Route path='/admin/allUser' element={<UserController1/>}></Route>
      <Route path='/admin/product' element={<ProductCantroller/>}></Route>
      <Route path='/admin/category' element={<CategoryController/>}></Route>
      <Route path='/admin/brand' element={<BrandController/>}></Route>
      <Route path='/cart' element={<CartPage/>}></Route>

    </Routes>
    <Footer/>
    </div>
}

export default App