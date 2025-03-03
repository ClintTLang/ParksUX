library(plumber)

# Load the API from plumber.R
pr <- plumber::plumb("./plumber.R")

# Start the API server
pr$run(port = 8000, host = "0.0.0.0")
