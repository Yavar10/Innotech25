import { motion } from "framer-motion";
import React, { useState } from "react";
import "./Home.css";

import { MapPin, UserCircle, AlertCircle } from "lucide-react";
import grass from "../../assets/grass.jpg";

const Home = () => {
  const [isHindi, setIsHindi] = useState(false);

  const toggleLanguage = () => {
    setIsHindi((prev) => !prev);
  };

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
            className="text-green-600 m-5 border-2 rounded-2xl p-2"
            onClick={toggleLanguage}
          >
            {isHindi ? "English" : "हिन्दी"}
          </motion.button>
        </motion.div>
      </motion.nav>
      {/* NAV END */}

      {/* MAIN CONTENT START */}
      <div className="flex justify-center w-full">
        {/* LEFT CARD */}
        <motion.div
          className="flex flex-col justify-around h-[500px] w-[40%] rounded-3xl m-4"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="shadows-sm hover:shadow-lg flex justify-center border rounded-2xl items-center">
            <motion.div
              className="shrink-0 w-[20%] h-full flex items-center justify-center"
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <UserCircle className="w-full h-full text-green-600" />
            </motion.div>

            <div className="flex flex-col ml-15 p-5 gap-3 justify-around">
              <div className="text-2xl font-bold">
                {isHindi ? "वापसी पर स्वागत है राजेश सिंह" : "Welcome back Rajesh Singh"}
              </div>
              <div className="flex gap-3">
                <MapPin className="h-[25px] w-[15px]" alt="location" />
                <div className="text-gray-600">{isHindi ? "पंजाब, भारत" : "Punjab, India"}</div>
              </div>
              <div className="border rounded-full bg-green-600 text-white w-fit pr-4 pl-4 pd-2 pu-2">
                <p>{isHindi ? "5 एकड़" : "5 acres"}</p>
              </div>
            </div>
          </div>

          {/* stats */}
          <div className="flex items-center justify-between ">
            <div className="shadow-sm hover:shadow-lg p-4 border rounded-2xl flex flex-col justify-center items-center">
              <p className="text-green-600 text-[25px] font-bold">124</p>
              <p className="text-gray-600">
                {isHindi ? "कुल स्कैन" : "Total Scans"}
              </p>
            </div>
            <div className="shadow-sm hover:shadow-lg p-4 border rounded-2xl flex flex-col justify-center items-center">
              <p className="text-green-600 text-[25px] font-bold">18</p>
              <p className="text-gray-600">
                {isHindi ? "उपचारित बीमारियाँ" : "Diseases Treated"}
              </p>
            </div>
            <div className="shadow-sm hover:shadow-lg p-4 border rounded-2xl flex flex-col justify-center items-center">
              <p className="text-yellow-600 text-[25px] font-bold">₹45K</p>
              <p className="text-gray-600">
                {isHindi ? "बचाई गई राशि" : "Money Saved"}
              </p>
            </div>
          </div>

          {/* warning */}
          <div className="flex p-4 shadow-sm hover:shadow-lg border rounded-2xl bg-amber-50">
            <AlertCircle className="text-yellow-500 w-6 h-6" />
            <div className="flex-1 ml-2">
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
          className="h-[500px] w-[50%] m-4 flex flex-col"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative overflow-hidden border rounded-3xl">
            <motion.img
              className="w-full rounded-3xl"
              src={grass}
              alt=""
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
            />

            {/* bottom-left text with animation */}
            <motion.div
              className="absolute text-white bottom-10 left-10 gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="font-extrabold text-[25px]">
                {isHindi ? "अपनी फसलों की रक्षा करें" : "Protect Your Crops"}
              </p>
              <p>
                {isHindi
                  ? "समय पर पहचान से उपज बचती है"
                  : "Early detection saves yields"}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* QUICK STUFFFF */}
      <div className="flex flex-col gap-3 w-[60%]">
  <p className="font-extrabold text-[30px]">
    {isHindi ? "त्वरित जानकारी" : "Quick Access"}
  </p>

  <div className="flex flex-col gap-3 w-full">
    {/* Government Schemes */}
    <button className="flex justify-between items-center border rounded-xl p-3 w-[100%] hover:shadow-md hover:scale-[1.02] transition-all">
      <div className="flex items-center gap-3 text-left">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-600 bg-blue-100 rounded p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3h3V8zm0 8c1.657 0 3-1.343 3-3h-3v3zm0-7V4m0 16v-5m0 0H8m4 0h4"/>
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
    </button>

    {/* Expert Consultation */}
    <button className="flex justify-between items-center border rounded-xl p-3 w-[100%] hover:shadow-md hover:scale-[1.02] transition-all">
      <div className="flex items-center gap-3 text-left">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-600 bg-green-100 rounded p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-3 3v3m0-6V6m0 0L5 12m14 0l-6-6"/>
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
    </button>

    {/* Community Forum */}
    <button className="flex justify-between items-center border rounded-xl p-3 w-[100%] hover:shadow-md hover:scale-[1.02] transition-all">
      <div className="flex items-center gap-3 text-left">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-yellow-600 bg-amber-100 rounded p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5V4H2v16h5v4l5-4h5v-4z"/>
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
    </button>
  </div>
</div>

    </div>
  );
};

export default Home;
