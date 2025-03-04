export const fetchSentimentAnalysis = async () => {
    try {
        const response = await fetch("/data/processed_reviews.json");

        if (!response.ok) throw new Error("Failed to load sentiment data");

        const data = await response.json();

        console.log("✅ Successfully loaded sentiment data:", data);
        return data;
    } catch (error) {
        console.error("Error fetching sentiment analysis:", error);
        return [];
    }
};
