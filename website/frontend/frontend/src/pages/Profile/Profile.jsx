import { MapPin, Phone, Mail, Settings, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import NavBar from "../../components/NavBar/NavBar";

const Profile = () => {
  const handleLogout = () => {
    alert("Logged out successfully!");
  };

  const menuItems = [
    { icon: Settings, label: "Settings", labelHi: "सेटिंग्स" },
    { icon: HelpCircle, label: "Help & Support", labelHi: "मदद और सहायता" },
    { icon: LogOut, label: "Logout", labelHi: "लॉग आउट", action: handleLogout },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div>
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pb-20">
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/90 backdrop-blur-md border-b border-green-200 p-4 sm:p-6 sticky top-0 z-10 shadow-sm"
      >
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Profile</h1>
      </motion.header>

      {/* Main Content */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6"
      >
        {/* Profile Card */}
        <motion.div 
          variants={item}
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl shadow-lg border border-green-100 p-4 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-lg ring-4 ring-green-100"
            >
              RS
            </motion.div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Rajesh Singh</h2>
              <p className="text-sm text-gray-600 mb-3">राजेश सिंह</p>
              <span className="inline-block bg-gradient-to-r from-green-50 to-emerald-100 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full border border-green-200">
                Farmer ID: FM-5842
              </span>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {[
              { icon: MapPin, color: "text-green-600", label: "Location", value: "Village Rampura, Punjab, India" },
              { icon: Phone, color: "text-emerald-600", label: "Phone", value: "+91 98765 43210" },
              { icon: Mail, color: "text-teal-600", label: "Email", value: "rajesh.singh@example.com" }
            ].map((contact, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-sm p-3 rounded-xl hover:bg-green-50 transition-colors cursor-pointer"
              >
                <contact.icon className={`w-5 h-5 ${contact.color} flex-shrink-0`} />
                <div className="min-w-0 flex-1">
                  <p className="text-gray-500 text-xs mb-0.5">{contact.label}</p>
                  <p className="font-medium text-gray-900 truncate sm:whitespace-normal">{contact.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          variants={item}
          className="grid grid-cols-3 gap-3 sm:gap-4"
        >
          {[
            { label: "Acres Land", value: "5", textColor: "text-green-700", borderColor: "border-green-200" },
            { label: "Diseases Treated", value: "18", textColor: "text-emerald-700", borderColor: "border-emerald-200" },
            { label: "Money Saved", value: "₹45K", textColor: "text-teal-700", borderColor: "border-teal-200" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`bg-white rounded-xl sm:rounded-2xl shadow-md border ${stat.borderColor} p-3 sm:p-5 text-center cursor-pointer`}
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1, type: "spring" }}
                className={`text-2xl sm:text-3xl font-bold ${stat.textColor} mb-1`}
              >
                {stat.value}
              </motion.div>
              <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Menu */}
        <motion.div variants={item} className="space-y-3">
          {menuItems.map((menuItem, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={menuItem.action}
              className="bg-white rounded-xl sm:rounded-2xl shadow-md border border-green-100 p-4 flex items-center justify-between cursor-pointer hover:border-green-200 transition-colors"
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0"
                >
                  <menuItem.icon className="w-5 h-5 text-green-700" />
                </motion.div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">{menuItem.label}</p>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">{menuItem.labelHi}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-green-600 flex-shrink-0" />
            </motion.div>
          ))}
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs sm:text-sm text-gray-400 pt-4 sm:pt-6 font-medium"
        >
          FarmVision AI v1.0.0
        </motion.p>
      </motion.div>
    </div>
    <NavBar/>
    </div>
  );
};

export default Profile;