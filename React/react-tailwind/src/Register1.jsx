import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

function Register1() {
    const [form, setForm] = useState({
        name: "", email: "", mobile: "", password: "", confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const log = useRef(null);

    const validate = () => {
        let newErrors = {};

        Object.keys(form).forEach((field) => {
            if (!form[field]) newErrors[field] = "This field is required.";
        });

        if (form.password && form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Registration successful!", form);
        }
    };

    // Handle animations on page load
    useEffect(() => {
        gsap.from("#animate", {
            x: "-300",
            duration: 1,
            delay: 0.5,
            opacity: 0
        });

        gsap.from("#animate2", {
            x: "-200",
            duration: 1,
            delay: 0.3,
            opacity: 0,
            stagger: 0.2
        });
    }, []);

    // Handle login redirection
    useEffect(() => {
        const handleLoginClick = () => {
            gsap.to("#animate", {
                x: 300,
                duration: 1,
                opacity: 0,
                ease: "power4.easeInOut"
            });

            setTimeout(() => {
                navigate("/");
            }, 1000);
        };

        log.current?.addEventListener("click", handleLoginClick);

        return () => {
            log.current?.removeEventListener("click", handleLoginClick);
        };
    }, [navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm" id="animate">
                <h2 className="text-3xl font-bold mb-6 text-center "><span className="text-blue-300">Sign </span><span className="text-green-300">Up</span> </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {["name", "email", "mobile", "password", "confirmPassword"].map((field) => (
                        <div key={field} id="animate2">
                            <input
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                                type={field.includes("password") ? "password" : "text"}
                                placeholder={field.replace(/([A-Z])/g, " $1")}
                                name={field}
                                value={form[field]}
                                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                            />
                            {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                        </div>))}
                    <button
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition duration-300">
                        Register
                    </button>
                </form>
                <p className="text-sm text-gray-500 mt-4 text-center">
                    Already have an account? <button className="text-green-500 hover:underline text-xl"
                        ref={log}>Login</button>
                </p>
            </div>
        </div>);
}

export default Register1;
