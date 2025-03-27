import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import WebAPI from "../service/WebAPI.jsx";
import WebService from "../service/WebService.jsx";

function SendMessage() {
    const userData = useSelector((state) => state.userData.value);
    const [receiverId, setReceiverId] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(""); // Status for success/error messages

    // Send message API call
    // const sendMessage = async (e) => {
    //     e.preventDefault();
    //     setStatus(""); // Reset status before sending

    //     const data = {
    //         "receiverId": parseInt(receiverId.trim()),
    //         "msg": message,
    //     };

    //     // Basic validation
    //     if (!data.receiverId || !data.msg) {
    //         setStatus("❗ Please enter a valid Receiver ID and Message.");
    //         return;
    //     }

    //     try {
    //         const resp = await WebService.postAPICallUsingUploadData(WebAPI.sendMSG,userData.token, data);

    //         if (resp.data && resp.data.status) {
    //             setStatus("✅ Message sent successfully!");
    //             setReceiverId("");
    //             setMessage("");
    //         } else {
    //             setStatus("❌ Failed to send message. Try again.");
    //         }
    //     } catch (error) {
    //         console.error("Error sending message:", error);
    //         setStatus("⚠️ Error occurred. Check your connection.");
    //     }
    // };
    const sendMessage = async (e) => {
        e.preventDefault();
        setStatus(""); // Reset status before sending
    
        const data = {
            "receiverId": parseInt(receiverId.trim()),
            "msg": message,
        };
    
       
    
        try {
            console.log("Sending to URL:", WebAPI.sendMSG);
            console.log("User Token:", userData.token);
    
            const resp = await WebService.postAPICallUsingUploadData(
                WebAPI.sendMessage,
                userData.token,
                data
            );
    
            if (resp?.data?.status) {
                setStatus("✅ Message sent successfully!");
                setReceiverId("");
                setMessage("");
            } else {
                setStatus("❌ Failed to send message. Try again.");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setStatus("⚠️ Error occurred. Check your connection.");
        }
        
    };
    
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Send Message</h2>

                {/* Form */}
                <form onSubmit={sendMessage} className="flex flex-col space-y-4">
                    {/* Receiver ID */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Receiver ID
                        </label>
                        <input
                            type="number"
                            value={receiverId}
                            onChange={(e) => setReceiverId(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Message Input */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Message
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows="3"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
                    >
                        Send
                    </button>
                </form>

                {/* Status Message */}
                {status && (
                    <p
                        id="statusMsg"
                        className={`mt-4 text-center font-semibold ${
                            status.includes("success")
                                ? "text-green-500"
                                : "text-red-500"
                        }`}
                    >
                        {status}
                    </p>
                )}
            </div>
        </div>
    );
}

export default SendMessage;
