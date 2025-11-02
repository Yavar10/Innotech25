import { motion } from "framer-motion";
import React, { useState } from "react";
import "./Home.css";
import NavBar from '../../components/NavBar/NavBar'
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import { MapPin, UserCircle, AlertCircle, ScanLine, Image, Leaf } from "lucide-react";
import grass from "../../assets/grass.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [isHindi, setIsHindi] = useState(false);

  const toggleLanguage = () => {
    setIsHindi((prev) => !prev);
  };

  const location = useLocation();

  useEffect(() => {
    console.log("Home page refreshed");
  }, [location.pathname]);

  return (
    <div>
    <div className="flex flex-col items-center w-full">
      {/* NAVBAR */}
      <motion.nav
        className=" bg-linear-to-br z-200 from-green-50 h-[100px] to-green-100 w-full sticky top-0 flex place-content-between items-center text-[25px] border-grey-600-b"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div onClick={()=>{navigate('/')}}
          className="flex m-5 h-[100px] items-center justify-center gap-3"
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
            className="font-extrabold text-green-600 text-[20px] sm:text-[25px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {!isHindi ? "FarmVision" : "फार्मविज़न"} AI
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
            className="text-green-600 m-5 border-grey-600-2 rounded-2xl p-2 text-[16px] sm:text-[18px]"
            onClick={toggleLanguage}
          >
            {isHindi ? "English" : "हिन्दी"}
          </motion.button>
        </motion.div>
      </motion.nav>

      {/* MAIN CONTENT */}
      <div className="flex flex-col md:flex-row justify-center mt-[2px] w-full">
        {/* LEFT CARD */}
        <motion.div
          className="flex flex-col justify-around h-auto md:h-[500px] w-[90%] md:w-[40%] rounded-3xl m-4"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="shadow-sm hover:shadow-lg flex justify-center border-grey-600 rounded-2xl items-center">
            <motion.div
              className="shrink-0 w-[20%] h-full flex items-center justify-center"
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <UserCircle className="w-full h-full text-green-600" />
            </motion.div>

            <div className="flex flex-col ml-4 p-5 gap-3 justify-around">
              <div className="text-xl sm:text-2xl font-bold">
                {isHindi ? "वापसी पर स्वागत है राजेश सिंह" : "Welcome back Rajesh Singh"}
              </div>
              <div className="flex gap-3">
                <MapPin className="h-[25px] w-[15px]" alt="location" />
                <div className="text-gray-600 text-[14px] sm:text-[16px]">
                  {isHindi ? "पंजाब, भारत" : "Punjab, India"}
                </div>
              </div>
              <div className="border-grey-600 rounded-full bg-green-600 text-white w-fit px-4 py-1 text-[14px] sm:text-[16px]">
                <p>{isHindi ? "5 एकड़" : "5 acres"}</p>
              </div>
            </div>
          </div>
          {/* stats */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="shadow-sm hover:shadow-lg p-4 border-grey-600 rounded-2xl flex flex-col mt-[10px] justify-center items-center w-full sm:w-auto">
              <p className="text-green-600 text-[25px] font-bold">124</p>
              <p className="text-gray-600">{isHindi ? "कुल स्कैन" : "Total Scans"}</p>
            </div>
            <div className="shadow-sm hover:shadow-lg p-4 border-grey-600 rounded-2xl flex flex-col justify-center items-center w-full sm:w-auto">
              <p className="text-green-600 text-[25px] font-bold">18</p>
              <p className="text-gray-600">
                {isHindi ? "उपचारित बीमारियाँ" : "Diseases Treated"}
              </p>
            </div>
            <div className="shadow-sm hover:shadow-lg p-4 border-grey-600 rounded-2xl flex flex-col justify-center items-center w-full sm:w-auto">
              <p className="text-yellow-600 text-[25px] font-bold">₹45K</p>
              <p className="text-gray-600">{isHindi ? "बचाई गई राशि" : "Money Saved"}</p>
            </div>
          </div>

          {/* warning */}
          <div className="flex p-4 shadow-sm hover:shadow-lg border-grey-600 rounded-2xl bg-amber-50 mt-4">
            <AlertCircle className="text-yellow-500 w-6 h-6" />
            <div className="flex-1 ml-2 text-[14px] sm:text-[16px]">
              <p className="text-yellow-500 font-extrabold">
                {isHindi ? "मौसम चेतावनी" : "Weather Alert"}
              </p>
              <p>
                {isHindi
                  ? "अधिक नमी का पता चला! फसलों में फफूंद रोगों की जांच करें।"
                  : "High humidity detected! Check crops for fungal diseases."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          className="h-auto md:h-[500px] w-[90%] md:w-[50%] m-4 flex flex-col"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative overflow-hidden border-grey-600 rounded-3xl">
            <motion.img
              className="w-full rounded-3xl"
              src={grass}
              alt=""
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
            />

            {/* bottom-left text */}
            <motion.div
              className="absolute text-white bottom-10 left-5 sm:left-10 gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="font-extrabold text-[20px] sm:text-[25px]">
                {isHindi ? "अपनी फसलों की रक्षा करें" : "Protect Your Crops"}
              </p>
              <p className="text-[14px] sm:text-[16px]">
                {isHindi ? "समय पर पहचान से उपज बचती है" : "Early detection saves yields"}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* SCAN OPTIONS */}
      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-[80px] flex flex-col sm:flex-row w-[93%] justify-center gap-6 p-6 bg-linear-to-br from-green-50 to-green-100 rounded-2xl shadow-md"
      >
        <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow hover:shadow-lg transition-transform hover:scale-105 w-full sm:w-[33%] cursor-pointer">
          <ScanLine className="w-8 h-8 text-green-600" />
          <p className="text-lg font-medium text-gray-700">Scan Crop For Disease</p>
        </div>

        <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow hover:shadow-lg transition-transform hover:scale-105 w-full sm:w-[33%] cursor-pointer">
          <Image className="w-8 h-8 text-green-600" />
          <p className="text-lg font-medium text-gray-700">Upload From Gallery</p>
        </div>

        <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow hover:shadow-lg transition-transform hover:scale-105 w-full sm:w-[33%] cursor-pointer">
          <Leaf className="w-8 h-8 text-green-600" />
          <p className="text-lg font-medium text-gray-700">Crop Health History</p>
        </div>
      </motion.div>

      {/* QUICK ACCESS */}
      <br />
      <div className="flex flex-col gap-3 w-[90%] md:w-[60%]">
        <p className="font-extrabold text-[25px] sm:text-[30px]">
          {isHindi ? "त्वरित जानकारी" : "Quick Access"}
        </p>

        <div className="flex flex-col gap-3 w-full">
          {/* GOVT */}
          <motion.button
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
            className="flex justify-between items-center border-grey-600 rounded-xl p-3 w-full hover:shadow-md hover:scale-[1.02] transition-all text-[14px] sm:text-[16px]"
          >
            <div className="flex items-center gap-3 text-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-blue-600 bg-blue-100 rounded p-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 1.343-3 3h3V8zm0 8c1.657 0 3-1.343 3-3h-3v3zm0-7V4m0 16v-5m0 0H8m4 0h4"
                />
              </svg>
              <div>
                <p className="font-semibold text-gray-800">
                  {isHindi ? "सरकारी योजनाएँ" : "Government Schemes"}
                </p>
                <p className="text-sm text-gray-500">
                  {isHindi ? "₹9 लाख+ लाभ प्राप्त करें" : "Access ₹9L+ benefits"}
                </p>
              </div>
            </div>
            <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
              {isHindi ? "6 पात्र" : "6 eligible"}
            </span>
          </motion.button>

          {/* EXPERT */}
          <motion.button
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-between items-center border-grey-600 rounded-xl p-3 w-full hover:shadow-md hover:scale-[1.02] transition-all text-[14px] sm:text-[16px]"
          >
            <div className="flex items-center gap-3 text-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-green-600 bg-green-100 rounded p-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-3 3v3m0-6V6m0 0L5 12m14 0l-6-6"
                />
              </svg>
              <div>
                <p className="font-semibold text-gray-800">
                  {isHindi ? "विशेषज्ञ परामर्श" : "Expert Consultation"}
                </p>
                <p className="text-sm text-gray-500">
                  {isHindi ? "24/7 कृषि विशेषज्ञ" : "24/7 agricultural experts"}
                </p>
              </div>
            </div>
          </motion.button>

          {/* COMMUNITY */}
          <motion.button
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-between items-center border-grey-600 rounded-xl p-3 w-full hover:shadow-md hover:scale-[1.02] transition-all text-[14px] sm:text-[16px]"
          >
            <div className="flex items-center gap-3 text-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-yellow-600 bg-amber-100 rounded p-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5V4H2v16h5v4l5-4h5v-4z"
                />
              </svg>
              <div>
                <p className="font-semibold text-gray-800">
                  {isHindi ? "सामुदायिक मंच" : "Community Forum"}
                </p>
                <p className="text-sm text-gray-500">
                  {isHindi ? "किसानों से जुड़ें" : "Connect with farmers"}
                </p>
              </div>
            </div>
            <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
              {isHindi ? "248 ऑनलाइन" : "248 online"}
            </span>
          </motion.button>
        </div>
      </div>
    </div>
    <NavBar/>
    </div>
  );
};

export default Home;
