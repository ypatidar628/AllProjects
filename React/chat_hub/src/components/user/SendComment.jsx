import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import WebService from "../service/WebService";
import WebAPI from "../service/WebAPI";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gsap from "gsap";

function SendComment() {
  const userData = useSelector((state) => state.userData.value);
  const [userPost, setUserPost] = useState([]);
  const com = useRef();
  const navigate = useNavigate();
  const formRef = useRef(null);

  // GSAP animation on page load
  useEffect(() => {
    gsap.from(formRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  // Send comment function
  const sendComment = async (event) => {
    event.preventDefault();
    const comm = com.current.value.trim();

    if (!comm) {
      toast.error("❌ Please enter a valid comment.");
      return;
    }

    console.log("Comment:", comm);

    const obj = { comment: comm, post: userData.sender };

    try {
      const resp = await WebService.postAPICallUsingUploadData(
        WebAPI.commentAPI,
        userData.token,
        obj
      );
      console.log("Response:", JSON.stringify(resp));

      if (resp.data.status) {
        setUserPost(resp.data.data);
        toast.success("🎉 Comment posted successfully!");

        // GSAP bounce animation on successful submit
        gsap.from(".comment-box", {
          scale: 0.9,
          duration: 0.3,
          ease: "back.out(1.7)",
        });

        // Clear the textarea after submission
        com.current.value = "";
      } else {
        toast.error("❌ Failed to post comment.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("❌ Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div
        ref={formRef}
        className="comment-box bg-white shadow-lg rounded-lg p-6 w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Send Comment
        </h1>
        <form onSubmit={sendComment} className="space-y-4">
          <textarea
            ref={com}
            className="w-full border border-gray-300 rounded-lg p-4 h-32 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your comment..."
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Submit Comment
          </button>
        </form>

        {/* Toast container for notifications */}
        <ToastContainer />
      </div>
    </div>
  );
}

export default SendComment;
