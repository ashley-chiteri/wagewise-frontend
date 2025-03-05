import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // Icons for hamburger menu
import logo from "../../assets/reverse-logo.png"

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Employee", path: "/employee" },
  { name: "Payment", path: "/payment" },
  { name: "Report", path: "/report" },
  { name: "Tax", path: "/tax" },
  { name: "Account", path: "/account" },
];

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false); // Ensure sidebar is closed when resizing to mobile
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Hamburger Button (only on mobile) */}
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 bg-[#7F5EFD] text-white p-2 rounded-md shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar - Visible only when open on mobile or always on desktop */}
      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.div
            initial={{ x: isMobile ? -230 : 0 }}
            animate={{ x: 0 }}
            exit={{ x: -230 }}
            transition={{ duration: 0.3 }}
            className="fixed md:relative top-0 left-0 h-full w-[230px] bg-[#7F5EFD] text-white p-5 flex flex-col shadow-lg"
          >
            {/* Close button for mobile */}
            {isMobile && (
              <button
                className="absolute top-4 right-4 text-white"
                onClick={() => setIsOpen(false)}
              >
                <X size={24} />
              </button>
            )}

            {/* Logo Image */}
            <div className="flex justify-center mb-6">
              <img src={logo} alt="WageWise Logo" className="w-[100px] h-[100px]" />
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`p-3 rounded-md transition ${
                    location.pathname === item.path
                      ? "bg-white text-[#7F5EFD]" // Active page styling
                      : "hover:bg-[#6A4BE8]" // Hover effect
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SideNav;
