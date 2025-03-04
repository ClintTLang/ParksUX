import React, { useEffect, useState } from "react";
import ReviewList from "./ReviewList";
import { fetchSentimentAnalysis } from "../utils/fetchSentiment";

const Sidebar = ({ activePark, showPanel, setShowPanel }) => {
  const [sentimentData, setSentimentData] = useState(null);

  useEffect(() => {
    if (showPanel && activePark) {
      fetchSentimentAnalysis().then((data) => {
        if (data && data.length > 0) {
          const foundSentiment = data.find((p) => p.park.toLowerCase() === activePark.name.toLowerCase());

          if (foundSentiment) {
            console.log("🎯 Found sentiment data:", foundSentiment);
            setSentimentData(foundSentiment);
          } else {
            console.warn("⚠️ No sentiment data found for:", activePark.name);
            setSentimentData(null);
          }
        }
      });
    }
  }, [showPanel, activePark]);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-1/2 bg-white shadow-lg p-4 transition-transform duration-300 z-50 ${
        showPanel ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {activePark && showPanel && (
        <>
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            onClick={() => setShowPanel(false)}
          >
            ✖ Close
          </button>
          <h2 className="text-xl font-bold mb-4">{activePark.name} Reviews</h2>

          {/* Display Sentiment Summary */}
          {sentimentData ? (
            <div className="mb-4 p-2 border rounded-lg bg-gray-100">
              <p><strong>Total Reviews:</strong> {sentimentData.total_reviews}</p>
              <p><strong>Positive Words:</strong> {sentimentData.total_positive}</p>
              <p><strong>Negative Words:</strong> {sentimentData.total_negative}</p>
              <p><strong>Overall Sentiment:</strong> {sentimentData.overall_sentiment}</p>
            </div>
          ) : (
            <p className="text-gray-500">Loading sentiment analysis...</p>
          )}

          {/* Render Review List */}
          <ReviewList selectedPark={activePark.name} />
        </>
      )}
    </div>
  );
};

export default Sidebar;
