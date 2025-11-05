import { Calendar, Leaf, TrendingUp } from "lucide-react";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import NavBar from "../../components/NavBar/NavBar";

const History = () => {
  const scans = [
    {
      id: 1,
      disease: "Late Blight",
      diseaseHi: "पछेती अंगमारी",
      date: "2025-01-15",
      severity: "High",
      confidence: 94,
    },
    {
      id: 2,
      disease: "Early Blight",
      diseaseHi: "शीघ्र अंगमारी",
      date: "2025-01-10",
      severity: "Medium",
      confidence: 89,
    },
    {
      id: 3,
      disease: "Leaf Curl",
      diseaseHi: "पत्ती मोड़",
      date: "2025-01-05",
      severity: "Low",
      confidence: 92,
    },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High":
        return "bg-red-100 text-red-700 border-red-200";
      case "Medium":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Low":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white border-b border-green-100 p-4 sticky top-0 z-10 shadow-sm backdrop-blur-sm bg-white/90">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Scan History
        </h1>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="max-w-6xl mx-auto p-4 space-y-6">
          {/* Stats Card */}
          <Card className="bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-xl border-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-around text-center">
                <div className="space-y-1">
                  <div className="text-4xl font-bold">124</div>
                  <div className="text-sm opacity-90 font-medium">Total Scans</div>
                </div>
                <div className="w-px h-16 bg-white/30" />
                <div className="space-y-1">
                  <div className="text-4xl font-bold">94%</div>
                  <div className="text-sm opacity-90 font-medium">Avg Accuracy</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scan Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scans.map((scan, index) => (
              <Card
                key={scan.id}
                className="cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-green-100 bg-white/80 backdrop-blur-sm group"
                style={{ 
                  animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Leaf className="w-7 h-7 text-green-600" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-lg truncate">
                            {scan.disease}
                          </h3>
                          <p className="text-sm text-gray-600 mt-0.5">{scan.diseaseHi}</p>
                        </div>
                        <Badge
                          className={`${getSeverityColor(scan.severity)} border font-semibold text-xs px-2.5 py-1 flex-shrink-0`}
                        >
                          {scan.severity}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">{scan.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-green-600">
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-bold">{scan.confidence}%</span>
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

      {/* NavBar */}
      <NavBar />

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
      `}</style>
    </div>
  );
};

export default History;