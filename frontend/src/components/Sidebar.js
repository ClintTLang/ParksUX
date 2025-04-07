import React, { useEffect, useState } from "react";
import ReviewList from "./ReviewList";
import reviewsData from "../data/processed_reviews.json";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useTheme } from "../utils/useTheme";

const Sidebar = ({ activePark, showPanel, setShowPanel }) => {
  const [sentimentData, setSentimentData] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (showPanel && activePark) {
      const parkData = reviewsData.find((p) => p.park === activePark.name);
      if (!parkData) {
        console.warn(`⚠️ No data found for park: ${activePark.name}`);
      }
      setSentimentData(parkData || null);
    }
  }, [showPanel, activePark]);

  const pieData = sentimentData
    ? [
        { name: "Positive", value: sentimentData.total_positive },
        { name: "Negative", value: sentimentData.total_negative },
      ]
    : [];

  return (
    <div
      className={`fixed top-0 right-0 ${
        isExpanded ? "w-full h-screen" : "w-1/2 h-full"
      } bg-lightbg shadow-lg p-4 transition-transform duration-300 z-50 ${
        showPanel ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {activePark && showPanel && (
        <>
          {/* Expand/Close Buttons */}
          <div className="absolute top-2 right-2 flex gap-2 z-10">
            <button
              className="text-textlight hover:text-neutral"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "🗗 Collapse" : "🗖 Expand"}
            </button>
            <button
              className="text-textlight hover:text-neutral"
              onClick={() => {
                setShowPanel(false);
                 setIsExpanded(false)}}
            >
              ✖ Close
            </button>
          </div>

          {/* Sidebar Header */}
          <h2 className="text-xl font-bold text-neutral mb-4">{activePark.name}</h2>

          {sentimentData ? (
            <div
              className={`flex ${
                isExpanded ? "flex-col lg:flex-row gap-6" : "flex-col"
              }`}
            >
              {/* Chart & Stats */}
              <div
                className={`${
                  isExpanded ? "lg:w-1/2" : "w-full"
                } flex flex-col items-center`}
              >
                {/* Pie Chart */}
                <div className="p-2">
                  <PieChart width={320} height={320}>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      innerRadius={40}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === 0 ? theme.soft : theme.danger}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>

                {/* Stats box */}
                <div className="mb-4 p-4 border border-border rounded-lg bg-white w-full max-w-sm">
                  <p className="text-neutral">
                    <strong>Total Reviews:</strong>{" "}
                    {sentimentData.total_reviews}
                  </p>
                  <p className="text-secondary">
                    <strong>Positive Reviews:</strong>{" "}
                    {sentimentData.total_positive}
                  </p>
                  <p className="text-danger">
                    <strong>Negative Reviews:</strong>{" "}
                    {sentimentData.total_negative}
                  </p>
                  <p className="text-neutral">
                    <strong>Overall Sentiment:</strong>{" "}
                    {sentimentData.overall_sentiment}
                  </p>
                </div>
              </div>

              {/* Review List */}
              <div
                className={`${
                  isExpanded
                    ? "lg:w-1/2 max-h-[calc(100vh-100px)]"
                    : "max-h-[60vh]"
                } overflow-y-auto border-t pt-4 border-border`}
              >
                <ReviewList selectedPark={activePark.name} />
              </div>
            </div>
          ) : (
            <p className="text-neutral">Loading sentiment analysis...</p>
          )}
        </>
      )}
    </div>
  );
};

export default Sidebar;
