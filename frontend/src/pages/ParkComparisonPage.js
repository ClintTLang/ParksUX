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
    <div className="relative w-full min-h-screen bg-background mt-10">
      <Navbar />
      <div className="container mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-neutral mb-6 text-center">
          Park Comparison
        </h1>

        {/* Tab Navigation */}
        <div className="flex justify-center space-x-4 mb-8">
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

        {selectedTab === "Review" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* Chart Section */}
            <div className="lg:col-span-2 bg-lightbg shadow-lg rounded-lg flex flex-col p-6 min-h-[520px]">

              <h2 className="text-2xl font-bold text-neutral mb-4 text-center">
                Sentiment Analysis of Parks
              </h2>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart
                      data={sentimentData}
                      barGap={8}
                      margin={{ top: 20, right: 20, left: 20, bottom: 50 }} // 👈 this is key
                    >

                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12, angle: -30, dx: -10, dy: 30 }} // ⬅️ bump dy from 10 → 20
                      interval={0}
                    />

                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="Positive"
                      fill={theme.soft}
                      radius={[5, 5, 0, 0]}
                      onClick={(data) => setSelectedPark(data.name)}
                    />
                    <Bar
                      dataKey="Negative"
                      fill={theme.danger}
                      radius={[5, 5, 0, 0]}
                      onClick={(data) => setSelectedPark(data.name)}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Review Panel */}
            {selectedPark && (
              <div className="bg-lightbg rounded-lg shadow-md h-[520px] overflow-y-auto flex flex-col">
                {/* Review Panel Header */}
                <div className="sticky top-0 bg-lightbg z-10 pt-4 pb-2">
                  <h3 className="text-xl font-bold text-center mb-2">{selectedPark}</h3>
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

              
                {reviewTab === "Positive" ? (
                  <>
                    {positiveReviews.length > 0 ? (
                      positiveReviews.map((r, i) => (
                        <div key={i} className="mb-3 text-sm px-4">
                          <p className="font-medium">{r.user}</p>
                          <p className="text-gray-600">⭐ {r.rating}</p>
                          <p className="text-gray-800">{r.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No positive reviews.</p>
                    )}
                  </>
                ) : (
                  <>
                    {negativeReviews.length > 0 ? (
                      negativeReviews.map((r, i) => (
                        <div key={i} className="mb-3 text-sm px-4">
                          <p className="font-medium">{r.user}</p>
                          <p className="text-gray-600">⭐ {r.rating}</p>
                          <p className="text-gray-800">{r.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No negative reviews.</p>
                    )}
                  </>
                )}

              </div>          
            )}
          </div>
        )}

        {/* Placeholder for Future Sections */}
        {selectedTab === "Ecology" && (
          <div className="bg-lightbg p-6 shadow-lg rounded-lg text-center">
            <h2 className="text-2xl font-bold text-neutral mb-4">
              Ecology Data Coming Soon...
            </h2>
          </div>
        )}
        {selectedTab === "Demographic" && (
          <div className="bg-lightbg p-6 shadow-lg rounded-lg text-center">
            <h2 className="text-2xl font-bold text-neutral mb-4">
              Demographic Data Coming Soon...
            </h2>
          </div>
        )}

        {/* Explore Button */}
        <div className="flex justify-center mt-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-secondary text-white rounded-lg shadow-md hover:bg-primary transition"
          >
            Explore More
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ParkComparisonPage;
