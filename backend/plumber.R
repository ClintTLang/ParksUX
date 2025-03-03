library(plumber)
library(dplyr)
library(tidytext)
library(readr)
library(stringr)
library(jsonlite)

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
  if (text == "") return(data.frame(sentiment = character(), count = integer()))

  sentiments <- get_sentiments("bing")

  df <- tibble(text = text) %>%
    unnest_tokens(word, text) %>%
    anti_join(tidytext::stop_words) %>%
    inner_join(sentiments, by = "word") %>%
    count(sentiment)

  return(df)
}

#* Analyze Sentiment
#* @param text The input text for sentiment analysis
#* @get /analyze
function(text = "") {
  result <- analyze_sentiment(text)
  return(toJSON(result, dataframe = "columns", pretty = TRUE))
}
