import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/header/Header.jsx";
import SideBar from "./components/sidebar/SideBar.jsx";
import Logout from "./components/user/Logout.jsx";
import MyPost from "./components/user/MyPost.jsx";
import MyProfile from "./components/user/MyProfile.jsx";
import UserList from "./components/user/UserList.jsx";
import UserPost from "./components/user/UserPost.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserHome01 from "./components/user/UserHome01.jsx";
import ChangePassword from "./components/user/ChangePassword.jsx";
import Comment from "./components/user/Comment.jsx";
import SendComment from "./components/user/SendComment.jsx";
import './App.css'
import SendMessage from "./components/user/SendMessage.jsx";

function App(){
  var navigate = useNavigate();

  const mainStatus = useSelector(state=>state.userData.value);
  // console.log(mainStatus);
  
  
  useEffect(()=>{
      console.log("main status2"+mainStatus.isLoginStatus);
      if(mainStatus == false){ 
        navigate("/")
    }
    
   },[])

  return <div className="wrapper">
   {(mainStatus.isLoginStatus == true) ?    
      <div className="main-panel">
      <SideBar/>
        <Header/>
        <Routes>
          <Route path="/userHome01" element={<UserHome01/>}></Route>
          <Route path="/userList" element={<UserList/>}></Route>
          <Route path="/userPost" element={<UserPost/>}></Route>
          <Route path="/myPost" element={<MyPost/>}></Route>
          <Route path="/myProfile" element={<MyProfile/>}></Route>
          <Route path="/logout" element={<Logout/>}></Route>
          <Route path="/changePassword" element={<ChangePassword/>}></Route>
          <Route path="/comment" element={<Comment/>}></Route>
          <Route path="/sendComment" element={<SendComment/>}></Route>
          <Route path="/sendMessage" element={<SendMessage/>}></Route>
        </Routes>
      </div>
      :
    <Routes>
      <Route  path="/" element={<Login/>}></Route>
      <Route  path="/register" element={<Register/>}></Route>

    </Routes>
 }
  </div>
}
export default App;