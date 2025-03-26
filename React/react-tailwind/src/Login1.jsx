import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";

function Login1() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    var navigate = useNavigate();
    var reg = useRef(null)
    const validate = () => {
        let newErrors = {};
        if (!form.email) newErrors.email = "Email or Username is required.";
        if (!form.password) newErrors.password = "Password is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Login successful!", form);
        }
    };

    useEffect(() => {
        gsap.from("#animate", {
            x: "-200",
            duration: 2,
            delay: 0.5,
            opacity: 0,
            ease: "power4.out",
        });
        gsap.from("#animate2", {
            x: "-200",
            duration: 2,
            delay: 0.4,
            opacity: 0,
            ease: "power3.out",
            stagger: 0.2,
        })
    }, []);


    useEffect(() => {
        const handleLoginClick = () => {
            gsap.to("#animate", {
                x: 300,
                duration: 1,
                delay: 0.5,
                opacity: 0,
                ease: "power4.out"
            });

            setTimeout(() => {
                navigate("/register");
            }, 1000);
        };

        reg.current?.addEventListener("click", handleLoginClick);

        return () => {
            reg.current?.removeEventListener("click", handleLoginClick);
        };
    }, [navigate]);


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 px-4">
            <div className="bg-[#ffffff] p-8 rounded-2xl shadow-lg w-full max-w-sm " id="animate">
                <h2 className="text-3xl font-bold mb-8 text-center text-blue-400"><span className="text-blue-400">Login </span><span className="text-purple-300"><i className="ri-login-circle-line"></i></span> </h2>
                <form className="space-y-14" onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div>
                        <input
                            className="w-full p-3 border -mb-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            type="text"
                            placeholder="Email or Username"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            id="animate2" />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    {/* Password Input */}
                    <div>
                        <input
                            className="w-full p-3 border -mb-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            id="animate2" />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    {/* Submit Button */}
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition duration-300">
                        Login
                    </button>

                </form>
                {/* Sign up link */}
                <p className="text-sm text-gray-500 mt-4 text-center">
                    Don't have an account? <button className="text-blue-500 hover:underline text-xl" ref={reg}>Sign up</button>
                </p>
            </div>
        </div>
    );
}

export default Login1;
