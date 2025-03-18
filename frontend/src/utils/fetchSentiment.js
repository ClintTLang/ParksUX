export const fetchSentimentAnalysis = async () => {
    try {
        // ✅ Ensure correct path for GitHub Pages and local development
        const API_URL = `${process.env.PUBLIC_URL}/processed_reviews.json`;

        console.log(`Fetching Sentiment Data from: ${API_URL}`); // Debugging

        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Failed to load sentiment data: ${response.status}`);

        const data = await response.json();

        console.log("✅ Successfully loaded sentiment data:", data);
        return data;
    } catch (error) {
        console.error("❌ Error fetching sentiment analysis:", error);
        return [];
    }
};