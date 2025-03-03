library(shiny)
library(shinythemes)
library(dplyr)
library(tidyverse)
library(tidytext)
library(DT)
library(ggplot2)
library(wordcloud)
library(RColorBrewer)

parks <- data.frame(
  name = c("Ezell Road Park", "Whitsett Park", "Nolensville Park"),
  lat = c(36.0906628, 36.11, 35.95),
  lng = c(-86.6818915, -86.72, -86.67)
)

ui <- fluidPage(
  theme = shinythemes::shinytheme("darkly"),  
  titlePanel("Parks of Mill Creek"),
  tags$head(
    tags$style(HTML("
      .dataTable { color: white !important; }
      "))
  ),
  tags$div(class="header", checked=NA,
           tags$p("Upload the CSV file and choose a park below. What do people say about the parks of Mill Creek? Let's run some sentiment analysis to find out!")),
  hr(),
  
  sidebarLayout(
    sidebarPanel(
      fileInput("file", "Upload your CSV file:"),
      hr(),
      selectInput("park_selection", "Choose a park to explore and analyze:", 
                  choices = c("Whitsett Park", "Ezell Road Park", "Nolensville Park")),
      hr(),
      textInput("neg", "Change negative color:", "light pink"),
      hr(),
      textInput("pos", "Change positive color:", "light blue")
    ),
    
    mainPanel(
      tabsetPanel(
        tabPanel("Introduction",
                 tags$div(class="header", checked=NA,
                          tags$p("In this activity, you will explore three different parks of Mill Creek: Ezell Road Park, Whitsett Park, and Nolensville Park. You'll learn about the members of the Mill Creek community, and who is saying what about these parks of Mill Creek."),
                          tags$p("To do so, you'll read and analyze real Google reviews from real people, but with the help of machines. Did you know that people have taught computers to learn and process humans' natural language? This means computers can also try to classify sentiments, or people's opinions or attitudes towards a topic, through a process called SENTIMENT ANALYSIS. How can we use sentiment analysis to learn about the parks and communities of Mill Creek?")),
                 img(src = "sentiment_graphic.jpg", height = "auto", width = "100%")
        ),
        
        tabPanel("Exploring the Parks",
                 tags$div(class="header", checked=NA,
                          tags$p("Take a look at the Google Street View images below to explore what each park looks like. Can you find any features that might explain why people feel positively or negatively about them?")),
                 uiOutput("park_google_view")
        ),
        
        tabPanel("Who lives in Mill Creek?",
                 tags$div(class = "header", checked = NA,
                          tags$p("Let's learn about the communities living in the Mill Creek area. Click the button below to explore an interactive map with demographic information such as population density, household income, educational attainment, and race. Do you see similar or different demographic patterns at each park? What kinds of trends do you observe, and what caused them? What does this map tell you about who gets to visit, enjoy, or leave reviews about each local park?")
                 ),
                 tags$a(href = "https://vanderbilt.maps.arcgis.com/apps/mapviewer/index.html?webmap=c29464ec292340e4bf8aaee3a540d369", 
                        target = "_blank", 
                        tags$button("Open Interactive Map"))
        ),
        
        tabPanel("What do people say about the parks?", 
                 tags$div(class="header", checked=NA,
                          tags$p("Here you can see all the reviews for the selected park. Think about who might be writing these reviews. Are there groups of people whose voices might be missing (perhaps based on age, language, or access to a digital device)? Why might that be important to consider as we analyze Google Reviews?")),
                 DTOutput("tb")
        ),
        
        tabPanel("Most Positive Words", 
                 tags$div(class="header", checked=NA,
                          tags$p("This shows the words that are most often used in a positive way in reviews. Do you agree with how the machine classified these words? Do you see any words that you might classify differently?")),
                 DTOutput("tbpos")
        ),
        
        tabPanel("Most Negative Words", 
                 tags$div(class="header", checked=NA,
                          tags$p("Here are the words most often used in a negative way, according to machine-learned data. Think about how these words might show bias or a limited perspective. For example, 'busy' might mean 'exciting' to one person but 'crowded' to another. Are there words that could be interpreted differently based on who is reading the review?")),
                 DTOutput("tbneg")
        ),
        
        tabPanel("Comparing the Parks", 
                 tags$div(class="header", checked=NA,
                          tags$p("Here, you can see a comparison of three parks, showing the percentage of positive vs. negative words for each. Why do you think the sentiment might differ across parks of Mill Creek? Can you think of any factors that might play into it?")),
                 plotOutput("park_comparison_whitsett"),
                 plotOutput("park_comparison_ezell"),
                 plotOutput("park_comparison_nolensville")
        ),
        
        tabPanel("Sentiment Analysis", 
                 tags$div(class="header", checked=NA,
                          tags$p("This chart shows the most common positive and negative words from the reviews. What do you notice about the most commonly used words in people's reviews? Do you think sentiment analysis is a reliable way of rating the quality of each park? What does sentiment analysis tell us about the parks and people of Mill Creek?")),
                 plotOutput("p_sentT")
        )
      )
    )
  )
)

server <- function(input, output, session) {
  
  filedata <- reactive({
    infile <- input$file
    if (is.null(infile)){
      return(NULL)   
    }
    read.csv(infile$datapath, stringsAsFactors = FALSE)
  })
  
  observe({
    data <- filedata()
    if (!is.null(data)) {
      if("Park" %in% colnames(data)){
        updateSelectInput(session, "park_selection", choices = unique(data$Park))
      } else {
        showNotification("The uploaded file must have a 'Park' column.", type = "error")
      }
    }
  })
  
  filteredData <- reactive({
    data <- filedata()
    if (is.null(data)) return(NULL)
    if("Park" %in% colnames(data)){
      data %>% filter(Park == input$park_selection)
    } else {
      return(NULL)
    }
  })
  
  output$park_google_view <- renderUI({
    if (input$park_selection == "Whitsett Park") {
      HTML('<iframe src="https://www.google.com/maps/embed?pb=!4v1729716491771!6m8!1m7!1suq5EetLb7wofyA59wV2RHQ!2m2!1d36.11983886933438!2d-86.72427902128624!3f240.25613!4f0!5f0.7820865974627469" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>')
    } else if (input$park_selection == "Ezell Road Park") {
      HTML('<iframe src="https://www.google.com/maps/embed?pb=!4v1729716749822!6m8!1m7!1s4xs0RrX8dlzdBFp7n3urMQ!2m2!1d36.0906628!2d-86.6818915!3f178.07142864918745!4f-9.78464858379128!5f0.7820865974627469" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>')
    } else if (input$park_selection == "Nolensville Park") {
      HTML('<iframe src="https://www.google.com/maps/embed?pb=!4v1729716903454!6m8!1m7!1sCAoSLEFGMVFpcE5yVFcyYWxHeXhXYjFpdmdnZmtvZ2tURjlHZm41d2xkaDlwSDFk!2m2!1d35.95374188788405!2d-86.66757222487375!3f179.91871805091554!4f1.6004454255334224!5f0.7820865974627469" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>')
    }
  })
  
  output$tb <- DT::renderDataTable({
    data <- filteredData()
    if (is.null(data)) return(NULL)
    DT::datatable(data)
  })
  
  output$tbpos <- DT::renderDataTable({
    data <- filteredData()
    if (is.null(data)) return(NULL)
    sentiments <- get_sentiments("bing")
    
    tokenized <- data %>%
      unnest_tokens(word, Review) %>%
      anti_join(stop_words) %>%
      inner_join(sentiments, by = "word") %>%
      filter(sentiment == "positive") %>%
      count(word, sort = TRUE) %>%
      top_n(50)
    
    DT::datatable(tokenized)
  })
  
  output$tbneg <- DT::renderDataTable({
    data <- filteredData()
    if (is.null(data)) return(NULL)
    
    sentiments <- get_sentiments("bing")
    
    tokenized <- data %>%
      unnest_tokens(word, Review) %>%
      anti_join(stop_words) %>%
      inner_join(sentiments, by = "word") %>%
      filter(sentiment == "negative") %>%
      count(word, sort = TRUE) %>%
      top_n(50)
    
    DT::datatable(tokenized)
  })
  
  output$p_sentT <- renderPlot({
    data <- filteredData()
    if (is.null(data)) return(NULL)
    
    sentiments <- get_sentiments("bing")
    
    tokenized <- data %>%
      unnest_tokens(word, Review) %>%
      anti_join(stop_words) %>%
      inner_join(sentiments, by = "word") %>%
      count(word, sentiment, sort = TRUE) %>%
      ungroup()
    
    ggplot(tokenized, aes(reorder(word, n), n, fill = sentiment)) +
      geom_col(show.legend = FALSE) +
      coord_flip() +
      labs(y = "Frequency", x = "Word") +
      scale_fill_manual(values = c(positive = input$pos, negative = input$neg))
  })
  
  create_pie_chart <- function(data, park_name) {
    if (nrow(data) == 0) return(NULL)
    slices <- c(data$positive, data$negative)
    labels <- c("Positive", "Negative")
    pie_df <- data.frame(
      sentiment = labels,
      percentage = slices / sum(slices),
      label = paste(labels, paste0(round(slices / sum(slices) * 100, 1), "%"))
    )
    
    ggplot(pie_df, aes(x = "", y = percentage, fill = sentiment)) +
      geom_bar(stat = "identity", width = 1) +
      coord_polar("y") +
      geom_text(aes(label = label), position = position_stack(vjust = 0.5)) +
      labs(title = park_name) +
      theme_void() +
      scale_fill_manual(values = c("Positive" = input$pos, "Negative" = input$neg))
  }
  
  output$park_comparison_whitsett <- renderPlot({
    data <- filedata() %>% filter(Park == "Whitsett Park")
    sentiments <- get_sentiments("bing")
    pie_data <- data %>%
      unnest_tokens(word, Review) %>%
      anti_join(stop_words) %>%
      inner_join(sentiments, by = "word") %>%
      count(sentiment) %>%
      spread(sentiment, n, fill = 0)
    create_pie_chart(pie_data, "Whitsett Park")
  })
  
  output$park_comparison_ezell <- renderPlot({
    data <- filedata() %>% filter(Park == "Ezell Road Park")
    sentiments <- get_sentiments("bing")
    pie_data <- data %>%
      unnest_tokens(word, Review) %>%
      anti_join(stop_words) %>%
      inner_join(sentiments, by = "word") %>%
      count(sentiment) %>%
      spread(sentiment, n, fill = 0)
    create_pie_chart(pie_data, "Ezell Road Park")
  })
  
  output$park_comparison_nolensville <- renderPlot({
    data <- filedata() %>% filter(Park == "Nolensville Park")
    sentiments <- get_sentiments("bing")
    pie_data <- data %>%
      unnest_tokens(word, Review) %>%
      anti_join(stop_words) %>%
      inner_join(sentiments, by = "word") %>%
      count(sentiment) %>%
      spread(sentiment, n, fill = 0)
    create_pie_chart(pie_data, "Nolensville Park")
  })
}

shinyApp(ui = ui, server = server)