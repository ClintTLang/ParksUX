// uploadReviews.js
const admin = require("firebase-admin");
const fs = require("fs");

// Replace this with the path to your Firebase Admin SDK key
const serviceAccount = require("./parks-of-mill-firebase-adminsdk-fbsvc-e46fd94391.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const rawData = fs.readFileSync("./src/data/reviews.json");
const parks = JSON.parse(rawData);

async function uploadReviews() {
  const batch = db.batch();

  parks.forEach((parkBlock) => {
    const parkName = parkBlock.park;
    parkBlock.reviews.forEach((review) => {
      const docRef = db.collection("reviews").doc();
      batch.set(docRef, {
        park: parkName,
        user: review.user,
        rating: review.rating,
        comment: review.comment,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
    });
  });

  await batch.commit();
  console.log("✅ All reviews uploaded successfully!");
}

uploadReviews().catch(console.error);
