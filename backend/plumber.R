library(plumber)
library(dplyr)
library(tidytext)
library(readr)
library(stringr)
library(jsonlite)
library(tidyr)
library(purrr)  # ✅ Ensure purrr is loaded

#* @apiTitle Sentiment Analysis API
#* @apiDescription API for analyzing sentiment of text using Bing lexicon.

# Enable CORS for frontend requests
#* @filter cors
function(res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  plumber::forward()
}

# Function to analyze sentiment
analyze_sentiment <- function(text) {
  sentiments <- get_sentiments("bing")  # Use Bing lexicon
  
  # Tokenize, remove stopwords, and classify sentiment
  df <- tibble(text = text) %>%
    unnest_tokens(word, text) %>%
    anti_join(tidytext::stop_words, by = "word") %>%
    inner_join(sentiments, by = "word") %>%
    count(sentiment)
  
  # Ensure dataframe includes both positive and negative values
  summary <- df %>%
    summarise(
      positive = sum(sentiment == "positive", na.rm = TRUE),
      negative = sum(sentiment == "negative", na.rm = TRUE)
    ) %>%
    replace_na(list(positive = 0, negative = 0))
  
  return(summary)
}

# Read reviews from JSON file
read_reviews <- function() {
  file_path <- "../frontend/src/data/reviews.json"  # Adjust path if needed
  
  if (!file.exists(file_path)) {
    stop("❌ ERROR: reviews.json not found!")
  }
  
  reviews_data <- fromJSON(file_path)
  
  print("✅ Successfully loaded reviews.json")  # Debugging
  print(str(reviews_data))  # Check structure
  
  return(reviews_data)
}

# Process sentiment for each review
process_reviews <- function(reviews) {
  print("✅ process_reviews() is being called")  # Debugging

  reviews <- reviews %>%
    mutate(
      sentiment = map(comment, ~ analyze_sentiment(.x))
    )

  return(reviews)
}

summarize_sentiment_by_park <- function(reviews_data) {
  reviews <- reviews_data %>%
    unnest(reviews) %>%
    process_reviews()

  summary <- reviews %>%
    group_by(park) %>%
    summarise(
      total_reviews = n(),
      avg_rating = mean(rating, na.rm = TRUE),
      total_positive = sum(map_int(sentiment, ~ .x$positive), na.rm = TRUE),
      total_negative = sum(map_int(sentiment, ~ .x$negative), na.rm = TRUE),
      overall_sentiment = if_else(total_positive >= total_negative, "Positive", "Negative"),
      reviews = list(reviews[reviews$park == park,])  # ✅ Only keep relevant reviews
    )

  return(summary)
}


# Run precomputation on startup
reviews_data <- read_reviews()
processed_data <- summarize_sentiment_by_park(reviews_data)

# Save processed results for frontend
write_json(processed_data, "../frontend/src/data/processed_reviews.json", pretty = TRUE)

#* Get sentiment results
#* @get /get_sentiment_results
function() {
  # Ensure JSON is properly formatted
  response <- list(
    park_summary = as_tibble(processed_data)
  )

  return(toJSON(response, dataframe = "rows", pretty = TRUE, auto_unbox = TRUE))
}

