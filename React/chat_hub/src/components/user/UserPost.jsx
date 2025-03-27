import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import WebService from "../service/WebService";
import WebAPI from "../service/WebAPI";
import gsap from "gsap";

function UserPost() {
  const userData = useSelector((state) => state.userData.value);
  const [userPost, setUserPost] = useState([]);
  const postsRef = useRef([]);
  const headerRef = useRef(null);

  useEffect(() => {
    loadAllPost();

    // GSAP Animations
    gsap.from(headerRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    if (userPost.length > 0) {
      gsap.from(postsRef.current, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
      });
    }
  }, [userPost]);

  const loadAllPost = async () => {
    const resp = await WebService.getAPICall(WebAPI.allUserPostAPI, userData.token);
    if (resp.data.status) {
      setUserPost(resp.data.data.reverse());
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <div ref={headerRef} className="mb-6 text-center">
          <h3 className="text-3xl font-bold text-blue-600 mb-3">📝 User Posts</h3>
          <p className="text-gray-500">Explore all user posts with comments.</p>
        </div>

        <div className="space-y-6">
          {userPost.map((post, index) => {
            const date = post.postdate;
            const date_only = new Date(date).toISOString().split("T")[0];

            return (
              <div
                key={index}
                ref={(el) => (postsRef.current[index] = el)}
                className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-700">
                        {post.postBy.name}
                      </h4>
                      <span className="text-gray-500 text-sm">{date_only}</span>
                    </div>
                  </div>
                </div>

                {post.postfile && (
                  <div className="w-full h-64">
                    <img
                      src={post.postfile}
                      alt="Post"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-4 space-y-3">
                  <p className="text-gray-700">
                    <strong className="text-gray-800">Description:</strong>{" "}
                    {post.message}
                  </p>
                  <hr className="border-gray-300" />
                  <Link
                    to="/comment"
                    className="text-blue-500 hover:text-blue-700 font-medium transition duration-200"
                  >
                    💬 View all comments
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserPost;
