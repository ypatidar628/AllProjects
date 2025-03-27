import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import WebService from "../service/WebService";
import WebAPI from "../service/WebAPI";
import { Link } from "react-router-dom";
import gsap from "gsap";

function Comment() {
  const userData = useSelector((state) => state.userData.value);
  const [UserPost, setUserPost] = useState([]);
  const [UserListData, setUserListData] = useState([]);
  const [UserCommData, setUserCommData] = useState([]);
  const [userList, setUserList] = useState([]);
  const com = useRef({});
  const containerRef = useRef(null);

  useEffect(() => {
    loadAllPost();
    loadCommentUser();
    loadAllUserData();

    // GSAP animation on load
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power3.out",
    });
  }, [userData.token]);

  const loadAllPost = async () => {
    const resp = await WebService.getAPICall(WebAPI.allUserPostAPI, userData.token);
    if (resp.data.status) {
      setUserPost(resp.data.data);
    }
  };

  const loadCommentUser = async () => {
    const resp = await WebService.getAPICall(WebAPI.allUserListAPI, userData.token);
    if (resp.data.status) {
      setUserListData(resp.data.data);
    }
  };

  const loadAllUserData = async () => {
    const resp = await WebService.getAPICall(WebAPI.allUserListAPI, userData.token);
    if (resp.data.status) {
      setUserList(resp.data.data);
    }
  };

  const sendComment = async (event, id) => {
    event.preventDefault();
    const comm = com.current[id].value;
    const obj = { comment: comm, post: id };
    const resp = await WebService.postAPICallUsingUploadData(WebAPI.commentAPI, userData.token, obj);

    if (resp.data.status) {
      setUserCommData(resp.data.data);
      loadAllPost();
      loadAllUserData();
      com.current[id].value = "";
    } else {
      console.error("Failed to post comment");
    }
  };

  return (
    <div ref={containerRef} className="container mx-auto px-4 py-8">
      <div className="page-inner">
        <div className="page-header mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Comments</h3>
        </div>

        {UserPost.map((post, index) => {
          const postdate = new Date(post.postdate);
          const formattedDate1 = `${String(postdate.getDate()).padStart(2, "0")}/${String(postdate.getMonth() + 1).padStart(2, "0")}/${postdate.getFullYear()}`;

          return (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden mb-6 transform transition hover:scale-105">
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700">{post.postBy.name}</h4>
                    <span className="text-sm text-gray-500">{post.postdate ? formattedDate1 : "Date not available"}</span>
                  </div>
                </div>

                <div className="w-full h-60">
                  <img
                    src={post.postfile}
                    alt="Post"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                <div className="mt-4">
                  <p className="text-gray-600">Description:</p>
                  <p className="text-gray-800">{post.message}</p>
                </div>

                <div className="mt-6">
                  <h5 className="text-lg font-semibold text-gray-700 mb-2">Comments:</h5>
                  {post.comments.map((p, idx) => {
                    const commenter = UserListData.find((user) => p.sender === user.id);
                    const createdAt = new Date(p.createdAt);
                    const formattedDate = `${String(createdAt.getDate()).padStart(2, "0")}/${String(createdAt.getMonth() + 1).padStart(2, "0")}/${createdAt.getFullYear()}`;

                    return (
                      <div
                        key={idx}
                        className="bg-gray-100 rounded-md p-3 mb-2 animate__animated animate__fadeInUp"
                      >
                        <h5 className="text-sm font-semibold">
                          User Name:{" "}
                          <span className="text-blue-500">
                            {commenter ? commenter.name : "User Not Found"}
                          </span>
                        </h5>
                        <p className="text-sm text-gray-700">
                          <b>Comment:</b> {p.comment}
                        </p>
                        <span className="text-xs text-gray-500">{formattedDate}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Add Comment Section */}
                <form
                  onSubmit={(event) => {
                    sendComment(event, post.id);
                  }}
                  className="mt-6 flex items-center"
                >
                  <input
                    type="text"
                    className="w-full border rounded-l-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Your Comment"
                    ref={(el) => {
                      com.current[post.id] = el;
                    }}
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-all"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Comment;
