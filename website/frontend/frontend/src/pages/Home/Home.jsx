import React, { useState, useEffect } from "react";
import { MapPin, UserCircle, AlertCircle, ScanLine, Image, Leaf, ChevronRight } from "lucide-react";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import grass from "../../assets/grass.jpg";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";

const Home = () => {
  const navigate=useNavigate();
  const [isHindi, setIsHindi] = useState(false);

  const toggleLanguage = () => {
    setIsHindi((prev) => !prev);
  };

  useEffect(() => {
    console.log("Home page refreshed");
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white z-100 border-b border-green-100 sticky top-0 z-10 shadow-sm backdrop-blur-sm bg-white/90">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div onClick={()=>{navigate("/ld")}} className="w-11 h-11 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-extrabold text-lg">FV</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {!isHindi ? "FarmVision AI" : "फार्मविज़न AI"}
            </h1>
          </div>
          
          <button
            onClick={toggleLanguage}
            className="border-2 border-green-600 rounded-xl px-3 sm:px-4 py-1.5 text-sm font-semibold text-green-600 hover:bg-green-600 hover:text-white transition-all"
          >
            {isHindi ? "English" : "हिन्दी"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="max-w-7xl mx-auto p-4 space-y-6">
          {/* Top Section - User Info & Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left Side - User Card & Stats */}
            <div className="space-y-13">
              {/* User Info Card */}
              <Card className="border-green-100 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <UserCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                        {isHindi ? "वापसी पर स्वागत है राजेश सिंह" : "Welcome back Rajesh Singh"}
                      </h2>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{isHindi ? "पंजाब, भारत" : "Punjab, India"}</span>
                      </div>
                      <Badge className="bg-green-600 text-white border-0 font-semibold">
                        {isHindi ? "5 एकड़" : "5 acres"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-3">
                <Card className="border-green-100 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">124</div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {isHindi ? "कुल स्कैन" : "Total Scans"}
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-green-100 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">18</div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {isHindi ? "उपचारित" : "Treated"}
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-green-100 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-amber-600 mb-1">₹45K</div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {isHindi ? "बचत" : "Saved"}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Weather Alert */}
              <Card className="border-amber-200 bg-amber-50/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-bold text-amber-800 mb-1">
                        {isHindi ? "मौसम चेतावनी" : "Weather Alert"}
                      </h3>
                      <p className="text-sm text-amber-700">
                        {isHindi
                          ? "अधिक नमी का पता चला! फसलों में फफूंद रोगों की जांच करें।"
                          : "High humidity detected! Check crops for fungal diseases."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Hero Image */}
            <Card className="border-green-100 bg-white/80 backdrop-blur-sm overflow-hidden group h-full min-h-[300px] lg:min-h-0">
              <div className="relative h-full">
                <img
                  src={grass}
                  alt="Crops"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                    {isHindi ? "अपनी फसलों की रक्षा करें" : "Protect Your Crops"}
                  </h2>
                  <p className="text-sm sm:text-base opacity-90">
                    {isHindi ? "समय पर पहचान से उपज बचती है" : "Early detection saves yields"}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Scan Options */}
          <Card className="bg-gradient-to-br from-green-600 to-emerald-600 border-0 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <CardContent className="p-5 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <ScanLine className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 text-center">
                    {isHindi ? "फसल स्कैन करें" : "Scan Crop"}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Image className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 text-center">
                    {isHindi ? "गैलरी से अपलोड" : "Upload Image"}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 text-center">
                    {isHindi ? "स्वास्थ्य इतिहास" : "Health History"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Access */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {isHindi ? "त्वरित जानकारी" : "Quick Access"}
            </h2>

            {/* Government Schemes */}
            <Card className="border-green-100 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-blue-600"
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
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900">
                        {isHindi ? "सरकारी योजनाएँ" : "Government Schemes"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isHindi ? "₹9 लाख+ लाभ प्राप्त करें" : "Access ₹9L+ benefits"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-600 text-white border-0">
                      {isHindi ? "6 पात्र" : "6 eligible"}
                    </Badge>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Expert Consultation */}
            <Card className="border-green-100 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-green-600"
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
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900">
                        {isHindi ? "विशेषज्ञ परामर्श" : "Expert Consultation"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isHindi ? "24/7 कृषि विशेषज्ञ" : "24/7 agricultural experts"}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                </div>
              </CardContent>
            </Card>

            {/* Community Forum */}
            <Card className="border-green-100 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-amber-600"
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
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900">
                        {isHindi ? "सामुदायिक मंच" : "Community Forum"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isHindi ? "किसानों से जुड़ें" : "Connect with farmers"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-600 text-white border-0">
                      {isHindi ? "248 ऑनलाइन" : "248 online"}
                    </Badge>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* NavBar Placeholder */}
      <NavBar/>
    </div>
  );
};

export default Home;