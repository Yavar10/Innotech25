import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, Leaf, TrendingUp, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import NavBar from "../../components/NavBar/NavBar";

const History = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalScans: 0,
    avgConfidence: 0,
  });

  // TODO: Get from authentication context
  const userId = "11db59c0-6f39-43b2-8bb5-a0a228283644"; // Replace with actual user ID

  // Fetch user's scan history
  const fetchScanHistory = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Fetching scan history for user:", userId);

      const response = await axios.get(
        `https://innotech25.onrender.com/api/scans/user/${userId}`,
        {
          timeout: 10000,
        }
      );

      console.log("Scan history response:", response.data);

      const scanData = response.data.scans || [];
      setScans(scanData);

      // Calculate stats
      if (scanData.length > 0) {
        const totalConfidence = scanData.reduce(
          (sum, scan) => sum + (scan.confidence || 0),
          0
        );
        const avgConfidence = (totalConfidence / scanData.length) * 100;

        setStats({
          totalScans: scanData.length,
          avgConfidence: avgConfidence.toFixed(0),
        });
      } else {
        setStats({
          totalScans: 0,
          avgConfidence: 0,
        });
      }
    } catch (err) {
      console.error("Error fetching scan history:", err);

      let errorMessage = "Failed to load scan history";

      if (err.response) {
        errorMessage = err.response.data.error || errorMessage;
      } else if (err.request) {
        errorMessage = "No response from server. Check if backend is running.";
      } else {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on component mount
  useEffect(() => {
    fetchScanHistory();
  }, [userId]);

  // Determine severity based on disease name and confidence
  const getSeverity = (disease, confidence) => {
    const diseaseLower = disease.toLowerCase();

    if (diseaseLower.includes("healthy")) {
      return "Low";
    } else if (
      diseaseLower.includes("blight") ||
      diseaseLower.includes("rot") ||
      diseaseLower.includes("wilt")
    ) {
      return confidence > 0.85 ? "High" : "Medium";
    } else {
      return confidence > 0.9 ? "High" : "Medium";
    }
  };

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

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get crop icon color based on crop type
  const getCropColor = (crop) => {
    const cropLower = crop.toLowerCase();
    if (cropLower.includes("tomato")) return "from-red-100 to-red-200";
    if (cropLower.includes("potato")) return "from-yellow-100 to-yellow-200";
    if (cropLower.includes("pepper")) return "from-green-100 to-green-200";
    return "from-green-100 to-emerald-100";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white border-b border-green-100 p-4 sticky top-0 z-10 shadow-sm backdrop-blur-sm bg-white/90">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Scan History
          </h1>
          <button
            onClick={fetchScanHistory}
            disabled={loading}
            className="p-2 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw className={`w-5 h-5 text-green-600 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
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
                  <div className="text-4xl font-bold">{stats.totalScans}</div>
                  <div className="text-sm opacity-90 font-medium">Total Scans</div>
                </div>
                <div className="w-px h-16 bg-white/30" />
                <div className="space-y-1">
                  <div className="text-4xl font-bold">{stats.avgConfidence}%</div>
                  <div className="text-sm opacity-90 font-medium">Avg Accuracy</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
              <p className="text-gray-600">Loading scan history...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-bold text-red-900 mb-1">Error Loading Scans</h3>
                    <p className="text-sm text-red-700">{error}</p>
                    <button
                      onClick={fetchScanHistory}
                      className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Empty State */}
          {!loading && !error && scans.length === 0 && (
            <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Scans Yet</h3>
                <p className="text-gray-600 mb-4">
                  Start scanning your crops to see your history here
                </p>
                <button
                  onClick={() => window.history.back()}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Scan Your First Crop
                </button>
              </CardContent>
            </Card>
          )}

          {/* Scan Cards Grid */}
          {!loading && !error && scans.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scans.map((scan, index) => {
                const severity = getSeverity(scan.disease, scan.confidence);
                const confidencePercent = (scan.confidence * 100).toFixed(0);

                return (
                  <Card
                    key={scan.scanId}
                    className="cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-green-100 bg-white/80 backdrop-blur-sm group"
                    style={{
                      animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-14 h-14 bg-gradient-to-br ${getCropColor(
                            scan.crop
                          )} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Leaf className="w-7 h-7 text-green-700" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 text-base truncate">
                                {scan.disease}
                              </h3>
                              <p className="text-xs text-gray-500 mt-0.5">{scan.crop}</p>
                            </div>
                            <Badge
                              className={`${getSeverityColor(severity)} border font-semibold text-xs px-2.5 py-1 flex-shrink-0`}
                            >
                              {severity}
                            </Badge>
                          </div>

                          {/* Confidence Bar */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-gray-600">Confidence</span>
                              <span className="font-bold text-green-600">{confidencePercent}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                                style={{ width: `${confidencePercent}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-100">
                            <div className="flex items-center gap-1.5 text-gray-600">
                              <Calendar className="w-3.5 h-3.5" />
                              <span className="font-medium">{formatDate(scan.scannedAt)}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-green-600">
                              <TrendingUp className="w-3.5 h-3.5" />
                              <span className="font-bold text-xs">
                                {scan.predictionClass.split("_")[0]}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
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
