import React, { useEffect, useState } from "react";
import reviewsData from "../data/reviews.json"; // Load reviews from JSON file

const ReviewList = ({ selectedPark }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const parkReviews = reviewsData.find((p) => p.park === selectedPark);
    if (parkReviews) {
      const sortedReviews = [...parkReviews.reviews].sort((a, b) => b.rating - a.rating);
      setReviews(sortedReviews);
    } else {
      setReviews([]);
    }
  }, [selectedPark]);
  

  return (
    <div className="mt-6">
      {reviews.length > 0 ? (
        <ul className="space-y-3">
          {reviews.map((review, index) => (
            <li key={index} className="border-b pb-2">
              <p className="font-semibold">{review.user}</p>
              <p className="text-gray-600">⭐ {review.rating}/5</p>
              <p className="text-gray-700">{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewList;
