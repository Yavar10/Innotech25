import React, { useState, useEffect } from "react";
import SchemeCard from "./SchemeCard";

const SchemePage = () => {
  const [type, setType] = useState("all");
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        title: "PM Kisan Yojana",
        subtitle: "प्रधानमंत्री किसान योजना",
        description: "Income support for small farmers",
        amount: "₹6,000",
        status: "Active",
        link: "https://pmkisan.gov.in/RegistrationFormupdated.aspx",
        type: "finance",
      },
      {
        id: 2,
        title: "Kisan Credit Card (KCC)",
        subtitle: "किसान क्रेडिट कार्ड योजना",
        description: "Short-term loans for crops",
        amount: "₹3,00,000",
        status: "Active",
        link: "https://myscheme.gov.in/schemes/kcc",
        type: "loan",
      },
      {
        id: 3,
        title: "Agri Infra Finance Facility",
        subtitle: "राष्ट्रीय कृषि अवसंरचना योजना",
        description: "Funds for agri infrastructure projects",
        amount: "As per project cost",
        status: "Active",
        link: "https://agriinfra.dac.gov.in/",
        type: "loan",
      },
      {
        id: 4,
        title: "PM Fasal Bima Yojana",
        subtitle: "प्रधानमंत्री फसल बीमा योजना",
        description: "Crop insurance for farmers",
        amount: "Varies (insurance cover)",
        status: "Active",
        link: "https://pmfby.gov.in",
        type: "insurance",
      },
      {
        id: 5,
        title: "Agri Infrastructure Fund (AIF)",
        subtitle: "कृषि अवसंरचना निधि",
        description: "Loans for post-harvest logistics",
        amount: "As per project size",
        status: "Active",
        link: "https://agriinfra.dac.gov.in/",
        type: "loan",
      },
      {
        id: 6,
        title: "PM Kisan Maandhan Yojana",
        subtitle: "प्रधानमंत्री किसान मानधन योजना",
        description: "Pension scheme for small farmers",
        amount: "₹3,000 monthly pension",
        status: "Active",
        link: "https://pmkmy.gov.in/",
        type: "finance",
      },
      {
        id: 7,
        title: "Agriculture Term Loans",
        subtitle: "कृषि निवेश ऋण",
        description: "Loans for farm equipment & land",
        amount: "As per investment size",
        status: "Active",
        link: "https://financialservices.gov.in/beta/en/agriculture-credit",
        type: "loan",
      },
      {
        id: 8,
        title: "NABARD Refinance Scheme",
        subtitle: "दीर्घ-कालीन पुनर्वित्त योजना",
        description: "Refinance for agri investments",
        amount: "Up to ₹2 crore+",
        status: "Active",
        link: "https://www.nabard.org/content1.aspx?catid=8&id=548",
        type: "loan",
      },
      {
        id: 9,
        title: "Agri Infra Credit Support",
        subtitle: "कृषि अवसंरचना ऋण सहायता",
        description: "Finance for warehouses & cold chains",
        amount: "Project-based funding",
        status: "Active",
        link: "https://agriinfra.dac.gov.in/",
        type: "loan",
      },
    ];

    setSchemes(mockData);
  }, []);

  // ✅ Filtered data logic
  const filteredSchemes =
    type === "all" ? schemes : schemes.filter((scheme) => scheme.type === type);

  return (
    <div className="p-8">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-4 items-start mb-6">
        {["all", "loan", "finance", "insurance"].map((btnType) => (
          <button
            key={btnType}
            onClick={() => setType(btnType)}
            className={`p-2 px-4 rounded border transition-all duration-200 ${
              type === btnType
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-green-600 border-green-600 hover:bg-green-50"
            }`}
          >
            {btnType.charAt(0).toUpperCase() + btnType.slice(1)}
          </button>
        ))}
      </div>

      {/* Scheme Cards */}
      <div className="min-h-screen bg-white flex flex-wrap gap-6 justify-center">
        {filteredSchemes.map((scheme) => (
          <SchemeCard
            key={scheme.id}
            title={scheme.title}
            subtitle={scheme.subtitle}
            description={scheme.description}
            amount={scheme.amount}
            status={scheme.status}
            link={scheme.link}
            type={scheme.type}
          />
        ))}
      </div>
    </div>
  );
};

export default SchemePage;
