import React, { useEffect, useState } from "react";
import ReviewList from "./ReviewList";
import { fetchSentimentAnalysis } from "../utils/fetchSentiment";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useTheme } from "../utils/useTheme"; // Custom hook to access Tailwind theme colors

const Sidebar = ({ activePark, showPanel, setShowPanel }) => {
  const [sentimentData, setSentimentData] = useState(null);
  const theme = useTheme(); // Fetch Tailwind theme colors

  useEffect(() => {
    if (showPanel && activePark) {
      fetchSentimentAnalysis().then((data) => {
        if (data) {
          const parkData = data.find((p) => p.park === activePark.name);
          setSentimentData(parkData);
        }
      });
    }
  }, [showPanel, activePark]);

  const pieData = sentimentData
    ? [
        { name: "Positive", value: sentimentData.total_positive },
        { name: "Negative", value: sentimentData.total_negative }
      ]
    : [];

  return (
    <div
      className={`fixed top-0 right-0 h-full w-1/2 bg-lightbg shadow-lg p-4 transition-transform duration-300 z-50 ${
        showPanel ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {activePark && showPanel && (
        <>
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 text-textlight hover:text-neutral"
            onClick={() => setShowPanel(false)}
          >
            ✖ Close
          </button>

          {/* Sidebar Header */}
          <h2 className="text-xl font-bold text-neutral mb-4">{activePark.name} Reviews</h2>

          {/* Display Sentiment Summary */}
          {sentimentData ? (
            <>
              {/* Pie Chart Section */}
              <div className="flex justify-center p-6">
                <PieChart width={320} height={320} className="p-6">
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={120}
                    innerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? theme.soft : theme.danger} // Use Tailwind theme colors
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>

              <div className="mb-4 p-4 border border-border rounded-lg bg-white">
                <p className="text-neutral">
                  <strong>Total Reviews:</strong> {sentimentData.total_reviews}
                </p>
                <p className="text-secondary">
                  <strong>Positive Reviews:</strong> {sentimentData.total_positive}
                </p>
                <p className="text-danger">
                  <strong>Negative Reviews:</strong> {sentimentData.total_negative}
                </p>
                <p className="text-neutral">
                  <strong>Overall Sentiment:</strong> {sentimentData.overall_sentiment}
                </p>
              </div>
            </>
          ) : (
            <p className="text-neutral">Loading sentiment analysis...</p>
          )}

          {/* Scrollable Reviews Section */}
          <div className="max-h-[60vh] overflow-y-auto border-t pt-4 border-border">
            <ReviewList selectedPark={activePark.name} />
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
