import { motion } from "framer-motion";
import React from "react";
import "./Home.css";

import { MapPin, UserCircle } from "lucide-react";
import grass from "../../assets/grass.jpg";

const Home = () => {
  return (
    <div className="flex flex-col items-center w-full">

      {/* NAVVVVVBARRRRRRRRRR */}
      <motion.nav
        className="w-full flex place-content-between text-[25px] border-b"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          className="flex m-5 h-[100[px] items-center justify-center gap-3"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.div
            className="bg-green-600 border border-green-800 rounded-lg font-extrabold text-white w-[50px] h-[50px] flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <p>FV</p>
          </motion.div>

          <motion.div
            className="font-extrabold text-green-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            FarmVision AI
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.button
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(34, 197, 94)",
              color: "white",
            }}
            className="text-green-600 m-5 border-2 rounded-2xl p-2"
          >
            हिन्दी
          </motion.button>
        </motion.div>
      </motion.nav>
      {/* NAV END */}

      {/* MAIN CONTENT START */}
      <div className="flex justify-center min-h-screen w-full">

        {/* LEFT CARD */}
        <motion.div
          className="w-[40%] h-fit border rounded-3xl m-4"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center items-center">
            <motion.div
  className="flex-shrink-0 w-[20%] h-full flex items-center justify-center"
  initial={{ rotate: -10, opacity: 0 }}
  animate={{ rotate: 0, opacity: 1 }}
  transition={{ delay: 0.4 }}
>
  <UserCircle className="w-full h-full text-green-600" />
</motion.div>


            <div className="flex flex-col ml-15 p-5 gap-3 justify-around">
              <div className="text-2xl font-bold">
                Welcome back Rajesh Singh
              </div>
              <div className="flex gap-3">
                <MapPin className="h-[25px] w-[15px]" alt="location" />
                <div className="text-gray-600">Punjab, India</div>
              </div>
              <div className="border rounded-full bg-green-600 text-white w-fit pr-4 pl-4 pd-2 pu-2">
                <p>5 acres</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          className="w-[50%] m-4 flex flex-col"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            <motion.img
              className="w-full border rounded-3xl"
              src={grass}
              alt=""
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />

            <motion.div
              className="absolute text-white bottom-10 left-10 gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <p className="font-extrabold text-[25px]">Protect Your Crops</p>
              <p>Early detection saves yields</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
