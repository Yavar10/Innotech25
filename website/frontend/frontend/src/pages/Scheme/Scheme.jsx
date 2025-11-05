import React, { useState, useEffect } from "react";
import { CreditCard, Wallet, Shield, TrendingUp, ChevronRight, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";

const Scheme = () => {
  const [type, setType] = useState("all");
  const [schemes, setSchemes] = useState([]);
  const [isHindi, setIsHindi] = useState(false);

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        title: "PM Kisan Yojana",
        subtitle: "प्रधानमंत्री किसान योजना",
        description: "Income support for small farmers",
        amount: "6,000",
        status: "Active",
        link: "https://pmkisan.gov.in/RegistrationFormupdated.aspx",
        type: "finance",
      },
      {
        id: 2,
        title: "Kisan Credit Card (KCC)",
        subtitle: "किसान क्रेडिट कार्ड योजना",
        description: "Short-term loans for crops",
        amount: "3,00,000",
        status: "Active",
        link: "https://myscheme.gov.in/schemes/kcc",
        type: "loan",
      },
      {
        id: 3,
        title: "Agri Infra Finance Facility",
        subtitle: "राष्ट्रीय कृषि अवसंरचना योजना",
        description: "Funds for agri infrastructure projects",
        amount: "Variable",
        status: "Active",
        link: "https://agriinfra.dac.gov.in/",
        type: "loan",
      },
      {
        id: 4,
        title: "PM Fasal Bima Yojana",
        subtitle: "प्रधानमंत्री फसल बीमा योजना",
        description: "Crop insurance for farmers",
        amount: "Variable",
        status: "Active",
        link: "https://pmfby.gov.in",
        type: "insurance",
      },
      {
        id: 5,
        title: "Agri Infrastructure Fund (AIF)",
        subtitle: "कृषि अवसंरचना निधि",
        description: "Loans for post-harvest logistics",
        amount: "Variable",
        status: "Active",
        link: "https://agriinfra.dac.gov.in/",
        type: "loan",
      },
      {
        id: 6,
        title: "PM Kisan Maandhan Yojana",
        subtitle: "प्रधानमंत्री किसान मानधन योजना",
        description: "Pension scheme for small farmers",
        amount: "3,000",
        status: "Active",
        link: "https://pmkmy.gov.in/",
        type: "finance",
      },
      {
        id: 7,
        title: "Agriculture Term Loans",
        subtitle: "कृषि निवेश ऋण",
        description: "Loans for farm equipment & land",
        amount: "Variable",
        status: "Active",
        link: "https://financialservices.gov.in/beta/en/agriculture-credit",
        type: "loan",
      },
      {
        id: 8,
        title: "NABARD Refinance Scheme",
        subtitle: "दीर्घ-कालीन पुनर्वित्त योजना",
        description: "Refinance for agri investments",
        amount: "2,00,000+",
        status: "Active",
        link: "https://www.nabard.org/content1.aspx?catid=8&id=548",
        type: "loan",
      },
      {
        id: 9,
        title: "Agri Infra Credit Support",
        subtitle: "कृषि अवसंरचना ऋण सहायता",
        description: "Finance for warehouses & cold chains",
        amount: "Variable",
        status: "Active",
        link: "https://agriinfra.dac.gov.in/",
        type: "loan",
      },
    ];

    setSchemes(mockData);
  }, []);

  const filteredSchemes =
    type === "all" ? schemes : schemes.filter((scheme) => scheme.type === type);

  const getTypeIcon = (schemeType) => {
    switch (schemeType) {
      case "loan":
        return <CreditCard className="w-6 h-6 text-green-600" />;
      case "finance":
        return <Wallet className="w-6 h-6 text-green-600" />;
      case "insurance":
        return <Shield className="w-6 h-6 text-green-600" />;
      default:
        return <TrendingUp className="w-6 h-6 text-green-600" />;
    }
  };

  const toggleLanguage = () => setIsHindi((prev) => !prev);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white border-b border-green-100 sticky top-0 z-10 shadow-sm backdrop-blur-sm bg-white/90">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
              <ArrowLeft onClick={()=>{navigate("/")}} className="w-5 h-5" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {isHindi ? "सरकारी योजनाएँ" : "Government Schemes"}
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
        <div className="max-w-6xl mx-auto p-4 space-y-6">
          {/* Benefits Summary Card */}
          <Card className="bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-xl border-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
            <CardContent className="p-6 sm:p-8 relative z-10 text-center">
              <div className="text-5xl sm:text-6xl font-bold mb-2">₹9L</div>
              <div className="text-base sm:text-lg opacity-90 font-medium">
                {isHindi ? "कुल उपलब्ध लाभ" : "Total Available Benefits"}
              </div>
            </CardContent>
          </Card>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {[
              { value: "all", label: isHindi ? "सभी" : "All" },
              { value: "loan", label: isHindi ? "ऋण" : "Loan" },
              { value: "finance", label: isHindi ? "वित्त" : "Finance" },
              { value: "insurance", label: isHindi ? "बीमा" : "Insurance" },
            ].map((btn) => (
              <button
                key={btn.value}
                onClick={() => setType(btn.value)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  type === btn.value
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105"
                    : "bg-white text-green-600 border-2 border-green-200 hover:border-green-400 hover:bg-green-50"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Scheme Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSchemes.map((scheme, index) => (
              <Card
                key={scheme.id}
                onClick={() => window.open(scheme.link, "_blank")}
                className="cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-green-100 bg-white/80 backdrop-blur-sm group"
                style={{
                  animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {getTypeIcon(scheme.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-tight">
                            {scheme.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 mt-0.5 truncate">
                            {scheme.subtitle}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {scheme.description}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="text-lg sm:text-xl font-bold text-green-600">
                          ₹{scheme.amount}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 border font-semibold text-xs px-2.5 py-0.5">
                            {scheme.status}
                          </Badge>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

    
      <NavBar/>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Scheme;