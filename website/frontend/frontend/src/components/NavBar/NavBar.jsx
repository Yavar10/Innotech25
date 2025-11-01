import React, { useState } from "react";
import { House, User, Clock, ScrollText } from "lucide-react";

const NavBar = () => {
  const [active, setActive] = useState("Home");

  const tabs = [
    { name: "Home", icon: <House className="w-5 h-5" /> },
    { name: "Schemes", icon: <ScrollText className="w-5 h-5" /> },
    { name: "History", icon: <Clock className="w-5 h-5" /> },
    { name: "Profile", icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-[12vh] border-t bottom-0 sticky bg-white z-50">
      <div className="flex justify-center items-center w-full text-green-600 font-semibold">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            onClick={() => setActive(tab.name)}
            className={`flex flex-col justify-center items-center rounded-xl p-3 m-3 w-[80px] cursor-pointer transition-all duration-200 ${
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
    </div>
  );
};

export default NavBar;
