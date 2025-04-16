import React, { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { franc } from "franc";
import { iso6393 } from "iso-639-3";

const supportedLangs = ["ur", "es", "fr", "hi", "ar", "de", "zh", "ru", "tr"];

const getSafeLang = (lang3) => {
  const match = iso6393.find((l) => l.iso6393 === lang3);
  const iso1 = match?.iso6391;
  return supportedLangs.includes(iso1) ? iso1 : null;
};

const ReviewList = ({ selectedPark }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!selectedPark) return;

    const q = query(
      collection(db, "reviews"),
      where("park", "==", selectedPark),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        translated: null,
        showTranslated: false,
      }));
      setReviews(fetched);
    });

    return () => unsubscribe();
  }, [selectedPark]);

  const handleTranslate = async (id, text) => {
    const detectedLang3 = franc(text);
    if (detectedLang3 === "und") {
      console.warn("❓ Could not detect language — skipping");
      return;
    }

    const sourceLang = getSafeLang(detectedLang3);
    const langpair = sourceLang ? `${sourceLang}|en` : "ur|en"; // fallback to Urdu if unknown

    console.log("🔍 Text:", text);
    console.log("🌐 Detected ISO639-3:", detectedLang3);
    console.log("🔤 Using sourceLang:", sourceLang || "(fallback: ur)");
    console.log("📡 Translation API URL:", `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langpair}`);

    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langpair}`
      );
      const data = await res.json();
      const translation = data?.responseData?.translatedText || "❌ Translation failed";

      console.log("💬 Translation result:", translation);

      setReviews((prev) =>
        prev.map((rev) =>
          rev.id === id
            ? { ...rev, translated: translation, showTranslated: true }
            : rev
        )
      );
    } catch (err) {
      console.error("🔥 Translation error:", err);
    }
  };

  return (
    <div className="mt-6">
      {reviews.length > 0 ? (
        <ul className="space-y-4">
          {reviews.map((review) => {
            const lang3 = franc(review.comment || "");
            const iso1 = getSafeLang(lang3);

            return (
              <li key={review.id} className="border-b pb-4">
                <p className="font-semibold">{review.user}</p>
                <p className="text-gray-600">⭐ {review.rating}/5</p>
                <p className="text-gray-700">{review.comment}</p>

                {/* Show Translate Button if not English */}
                {iso1 !== "en" && !review.showTranslated && (
                  <button
                    onClick={() => handleTranslate(review.id, review.comment)}
                    className="text-blue-600 hover:underline text-sm mt-1"
                  >
                    🌐 Translate to English
                  </button>
                )}

                {/* Show translated text if already fetched */}
                {review.showTranslated && (
                  <p className="text-sm text-gray-500 mt-1 italic">
                    💬 Translated: {review.translated}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-500">No reviews yet for {selectedPark}.</p>
      )}
    </div>
  );
};

export default ReviewList;
