import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import companyLogo from "../assets/wallet.png"; // Adjust the path to your logo

const SplashScreen = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Redirect to the login page after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false); // Trigger fade-out animation
      setTimeout(() => navigate("/login"), 500); // Wait for fade-out to complete
    }, 3000);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center h-screen "
        >
          {/* Logo with animation */}
          <motion.img
            src={companyLogo}
            alt="Company Logo"
            className="w-48 h-48 mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />

          {/* Loading Spinner */}
          <motion.div
            className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />

          {/* Optional: Loading Text */}
          {/* <motion.p
            className="mt-4 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Loading...
          </motion.p> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;