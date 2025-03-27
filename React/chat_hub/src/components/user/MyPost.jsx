import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import WebAPI from "../service/WebAPI";
import WebService from "../service/WebService";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';

 function MyPost(){
    
    
  const userData = useSelector(state=>state.userData.value);
  const [myPost,setMyPost] = useState([])
  const navigate = useNavigate();
  
    var msg = useRef();
    var fileData = useRef();

   useEffect(()=>{
      loadMyPostList();
   })

   var loadMyPostList = async ()=>{
      var resp = await WebService.getAPICall(WebAPI.loginUserPost ,userData.token);
    //  console.log("My Post Response is : "+resp);
    //  console.log("My Post Response is : "+JSON.stringify(resp));
    
    var response = resp.data.data.reverse();
    if(resp.data.status)
     {
       //  console.log("Hello.....");
       setMyPost(response);
     }
   }

   var uploadPost = async (event)=>{
       event.preventDefault();
       var resp = "";

       var message = msg.current.value;
       var upload_file_post = fileData.current.files[0];
       const f_data = new FormData();

       //If Media Upload
       if(upload_file_post != undefined)
       {
           f_data.append('image',upload_file_post);
           f_data.append('message',message);
           resp = await WebService.postAPICallUsingUploadData(WebAPI.uploadPost,userData.token,f_data);
       }
       else
      {
        //Media No Upload
        var obj = {message:message}
        resp = await WebService.postAPICallUsingUploadData(WebAPI.uploadPost,userData.token,obj);
      }
      console.log("Response is : "+resp);
      console.log("String Response is : "+JSON.stringify(resp));
      if(resp.data.status){
        toast.success("Successfully Post")
      }
      else if (resp.data.status){
        navigate("/myPost")
      }
      clearField();
    }
    var clearField = ()=>{
      
      var message = msg.current.value="";
      var upload_file_post = fileData.current.value="";

     }
     

    return<div className="container">
     <div className="page-inner">
      <div className="page-header">
        <div className="container"> 
          <h1 style={{textAlign:'center'}}>Upload Posts</h1> 
        <form onSubmit={uploadPost}>    
           <div className="row form-group">
             <textarea className="form-control" rows="8" ref={msg} placeholder="Write Any Content"></textarea>
            </div>
            <div className="row form-group">
              <input type="file" className="form-control" ref={fileData}/>
            </div>
            <div className="form-group">
                <button className="btn btn-success form-control" type="submit">
                    Upload Posts
                </button>
            </div>
            </form>  

            <hr/>
            <h1 style={{textAlign:'center'}}>
                My Previous Posts
            </h1>
            {myPost.map((post,index)=>{
               const date = post.postdate;
               const date_only = new Date(date).toISOString().split("T")[0];
               return (
                <div className="posts-container">
                <div className="post-card" key={index}>
                  <div className="post-header">
                    <div className="user-info">
                      {/* <h4 className="username">{post.postBy.name}</h4> */}
                      <span className="post-date">{date_only}</span>
                    </div>
                  </div>
                  
                  <div className="post-image">
                    <img src={post.postfile} alt="Post" />
                  </div>
                  <hr className="hr"/>
                  <div className="post-content">
                    <p className="description">Description : </p>
                    <p className="post-message">{post.message}</p>
                    {/* <Link to="/comment" className="comment-link">
                      View all comments
                    </Link> */}
                  </div>
                </div>
                </div>
              );
            })}
        </div>
      </div>
     </div>
     <ToastContainer/>
    </div>
}
export default MyPost;