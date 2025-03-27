import { useEffect, useRef } from "react";
import gsap from "gsap";

function UserHome01() {
  const headerRef = useRef(null);
  const containerRef = useRef(null);

  // GSAP animations on load
  useEffect(() => {
    // Fade-in animation for the container
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
    });

    // Bounce effect for the header
    gsap.from(headerRef.current, {
      scale: 0.8,
      duration: 0.5,
      delay: 0.2,
      ease: "back.out(1.7)",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gray-100 flex items-center justify-center p-6"
    >
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl text-center">
        <div className="mb-6">
          <h3
            ref={headerRef}
            className="text-3xl font-bold text-blue-600 mb-4"
          >
            🚀 Welcome to User Home!
          </h3>
          <p className="text-lg text-gray-700">
            Explore your personalized space and manage your activities with ease.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserHome01;
