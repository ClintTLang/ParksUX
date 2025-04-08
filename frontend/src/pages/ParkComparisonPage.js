import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { useTheme } from "../utils/useTheme"; // Custom hook to access Tailwind theme colors
import processedData from "../data/processed_reviews.json";

const tabs = ["Review", "Ecology", "Demographic"];

const ParkComparisonPage = () => {
  const [selectedTab, setSelectedTab] = useState("Review");
  const [sentimentData, setSentimentData] = useState([]);
  const [selectedPark, setSelectedPark] = useState(null);
  const [reviewTab, setReviewTab] = useState("Positive");
  const theme = useTheme();

  useEffect(() => {
    if (selectedTab === "Review") {
      const formattedData = processedData.map((entry) => ({
        name: entry.park,
        Positive: entry.total_positive,
        Negative: entry.total_negative,
        Reviews: entry.total_reviews,
        Rating: entry.avg_rating,
        Sentiment: entry.overall_sentiment,
      }));

      if (formattedData.length > 0) {
        setSelectedPark(formattedData[0].name);
      }

      setSentimentData(formattedData);
    }
  }, [selectedTab]);

  const selectedParkData = processedData.find((p) => p.park === selectedPark);
  const positiveReviews =
    selectedParkData?.reviews.filter(
      (r) => r.sentiment?.[0]?.positive > 0
    ) || [];
  const negativeReviews =
    selectedParkData?.reviews.filter(
      (r) => r.sentiment?.[0]?.negative > 0
    ) || [];

    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="flex-1 flex flex-col container mx-auto px-8 py-8 overflow-auto">
          <h1 className="text-4xl font-bold text-neutral mb-6 text-center">
            Park Comparison
          </h1>
    
          {/* Tab Navigation */}
          <div className="flex justify-center space-x-4 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-6 py-2 font-medium text-lg rounded-md transition ${
                  selectedTab === tab
                    ? "bg-neutral text-white shadow-md"
                    : "bg-border text-textlight hover:bg-muted"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
    
          {/* Tab Content */}
          <div className="flex-1 overflow-auto">
            {selectedTab === "Review" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-260px)]">
                {/* Chart Section */}
                <div className="lg:col-span-2 bg-lightbg shadow-lg rounded-lg flex flex-col p-6">
                  <h2 className="text-2xl font-bold text-neutral mb-4 text-center">
                    Sentiment Analysis of Parks
                  </h2>
                  <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={sentimentData}
                        barGap={8}
                        margin={{ top: 20, right: 20, left: 20, bottom: 50 }}
                      >
                        <XAxis
                          dataKey="name"
                          tick={{ fontSize: 12, angle: -30, dx: -10, dy: 30 }}
                          interval={0}
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar
                          dataKey="Positive"
                          fill={theme.soft}
                          radius={[5, 5, 0, 0]}
                          onClick={(data) => setSelectedPark(data.name)}
                          cursor="pointer"
                        />
                        <Bar
                          dataKey="Negative"
                          fill={theme.danger}
                          radius={[5, 5, 0, 0]}
                          onClick={(data) => setSelectedPark(data.name)}
                          cursor="pointer"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
    
                {/* Review Panel */}
                {selectedPark && (
                  <div className="bg-lightbg rounded-lg shadow-md flex flex-col h-full overflow-hidden">
                    <div className="sticky top-0 bg-lightbg z-10 pt-4 pb-2">
                      <h3 className="text-xl font-bold text-center mb-2">
                        {selectedPark}
                      </h3>
                      <div className="flex justify-center gap-4">
                        {["Positive", "Negative"].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setReviewTab(tab)}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                              reviewTab === tab
                                ? "bg-neutral text-white"
                                : "bg-border text-textlight hover:bg-muted"
                            }`}
                          >
                            {tab} Reviews
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto px-4 pb-4">
                      {reviewTab === "Positive"
                        ? positiveReviews.length > 0
                          ? positiveReviews.sort((a, b) => b.rating - a.rating).map((r, i) => (
                              <div key={i} className="mb-3 text-sm">
                                <p className="font-medium">{r.user}</p>
                                <p className="text-gray-600">⭐ {r.rating}</p>
                                <p className="text-gray-800">{r.comment}</p>
                              </div>
                            ))
                          : <p className="text-sm text-gray-500">No positive reviews.</p>
                        : negativeReviews.length > 0
                          ? negativeReviews.sort((a, b) => b.rating - a.rating).map((r, i) => (
                              <div key={i} className="mb-3 text-sm">
                                <p className="font-medium">{r.user}</p>
                                <p className="text-gray-600">⭐ {r.rating}</p>
                                <p className="text-gray-800">{r.comment}</p>
                              </div>
                            ))
                          : <p className="text-sm text-gray-500">No negative reviews.</p>
                      }
                    </div>
                  </div>
                )}
              </div>
            )}
    
            {/* Placeholder Tabs */}
            {selectedTab !== "Review" && (
              <div className="bg-lightbg p-6 shadow-lg rounded-lg text-center">
                <h2 className="text-2xl font-bold text-neutral mb-4">
                  {selectedTab} Data Coming Soon...
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };    

export default ParkComparisonPage;
