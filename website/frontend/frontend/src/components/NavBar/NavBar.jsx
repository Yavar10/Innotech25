import React, { useState, useEffect } from "react";
import { House, User, Clock, ScrollText } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("Home");

  const tabs = [
    { name: "Home", path: "/", icon: <House className="w-5 h-5" /> },
    { name: "Schemes", path: "/scheme", icon: <ScrollText className="w-5 h-5" /> },
    { name: "History", path: "/history", icon: <Clock className="w-5 h-5" /> },
    { name: "Profile", path: "/profile", icon: <User className="w-5 h-5" /> },
  ];

  // Update active tab based on current route
  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.path === location.pathname);
    if (currentTab) setActive(currentTab.name);
  }, [location.pathname]);

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex h-[12vh] border-t bottom-0 sticky bg-white z-50"
    >
      <div className="flex justify-center items-center w-full text-green-600 font-semibold">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            onClick={() => {
              setActive(tab.name);
              navigate(tab.path);
            }}
            className={`flex flex-col justify-center items-center rounded-xl p-3 m-3 w-20 cursor-pointer transition-all duration-200 ${
              active === tab.name
                ? "bg-green-600 text-white scale-105"
                : "hover:bg-green-100"
            }`}
          >
            {tab.icon}
            <p className="text-sm mt-1">{tab.name}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default NavBar;
