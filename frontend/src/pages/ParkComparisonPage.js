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
import { fetchSentimentAnalysis } from "../utils/fetchSentiment";
import { motion } from "framer-motion";
import { useTheme } from "../utils/useTheme"; // Custom hook to access Tailwind theme colors

const tabs = ["Review", "Ecology", "Demographic"];

const ParkComparisonPage = () => {
  const [selectedTab, setSelectedTab] = useState("Review");
  const [sentimentData, setSentimentData] = useState([]);
  const theme = useTheme(); // Fetch Tailwind theme colors

  useEffect(() => {
    if (selectedTab === "Review") {
      fetchSentimentAnalysis().then((data) => {
        if (data) {
          const formattedData = data.map((park) => ({
            name: park.park,
            Positive: park.total_positive,
            Negative: park.total_negative,
          }));
          setSentimentData(formattedData);
        }
      });
    }
  }, [selectedTab]);

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

        {/* Chart Section */}
        {selectedTab === "Review" && sentimentData.length > 0 && (
          <div className="bg-lightbg p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-neutral mb-4 text-center">
              Sentiment Analysis of Parks
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={sentimentData} barGap={8}>
                <XAxis dataKey="name" tick={{ fontSize: 14 }} />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="Positive"
                  fill={theme.soft} // Theme-based green
                  radius={[5, 5, 0, 0]}
                />
                <Bar
                  dataKey="Negative"
                  fill={theme.danger} // Theme-based red
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
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
