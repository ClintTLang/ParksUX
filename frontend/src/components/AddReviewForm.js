// src/components/AddReviewForm.jsx
import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const AddReviewForm = ({ park, onClose }) => {
  const [user, setUser] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await addDoc(collection(db, "reviews"), {
        park,
        user,
        rating,
        comment,
        timestamp: serverTimestamp(),
      });
      onClose(); // Close the form
    } catch (err) {
      console.error("❌ Error adding review:", err);
      alert("Something went wrong while submitting the review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">Review {park}</h2>

      <input
        type="text"
        placeholder="Your name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        required
        className="w-full border p-2 mb-2 rounded"
      />

      <input
        type="number"
        placeholder="Rating (1–5)"
        value={rating}
        min="1"
        max="5"
        onChange={(e) => setRating(Number(e.target.value))}
        required
        className="w-full border p-2 mb-2 rounded"
      />

      <textarea
        placeholder="Your review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        className="w-full border p-2 mb-4 rounded"
      />

      <div className="flex justify-between">
        <button
          type="submit"
          disabled={submitting}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddReviewForm;
