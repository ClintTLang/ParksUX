import csv
import json
import random

# List of parks
parks = [
    "Mill Creek Greenway",
    "Smith Springs Park",
    "Seven Mile Creek Park",
    "Antioch Park",
    "Hamilton Creek Park"
]

# List of fake users
users = ["Alice", "John", "Emma", "Daniel", "Sophia", "Liam", "Olivia", "Noah", "Ava", "James",
         "Isabella", "Benjamin", "Mia", "Lucas", "Charlotte", "Henry", "Amelia", "Alexander",
         "Harper", "Elijah", "Evelyn", "William", "Abigail", "Michael", "Emily", "Ethan", "Ella"]

# List of diverse positive and negative review comments
reviews = [
    # Positive reviews
    "Beautiful and peaceful place!",
    "Great for a morning jog.",
    "Amazing trails and scenery!",
    "Perfect for picnics with family.",
    "Loved the walking paths!",
    "Lots of wildlife, great for bird watchers.",
    "The playground is fun for kids.",
    "Great place for biking and running!",
    "Nice open fields for playing sports.",
    "The park is huge, lots to explore!",
    "A peaceful getaway not too far from town.",
    "Fantastic running trails!",
    "Great spot for a weekend picnic with friends.",
    "The trees provide great shade on hot days.",
    "One of the best parks I’ve visited!",
    "Perfect for a date or casual walk.",
    "Very clean and safe environment.",
    "Friendly people and a relaxing atmosphere.",
    "Feels safe and well-lit at night.",
    "The sunset view here is stunning!",
    "Love coming here to read and relax.",
    "A wonderful hidden gem in the city!",
    "My kids love playing here!",
    "Great spot for yoga in the mornings.",
    "Lots of friendly people walking their dogs.",
    "Best place for an afternoon stroll.",
    "It’s a great place to meditate and reflect.",
    "The staff does a great job maintaining the park.",
    
    # Negative reviews
    "Nice place but could use better maintenance.",
    "A little crowded on weekends.",
    "Too many mosquitoes, hard to enjoy.",
    "Needs more shaded areas for hot days.",
    "The park can get muddy after rain.",
    "Not enough seating areas.",
    "The restrooms need more maintenance.",
    "More trash cans would help keep it cleaner.",
    "Nice place but parking is limited.",
    "Too noisy, not as peaceful as expected.",
    "Wish they had more food vendors.",
    "Could use better lighting at night.",
    "Some trails are overgrown and not well-maintained.",
    "Too many unleashed dogs running around.",
    "Signage could be improved, hard to navigate.",
    "Some areas feel unsafe, needs better security.",
    "Water fountains are broken or missing.",
    "The picnic tables are old and worn down.",
    "The lake water looks dirty, not well-maintained.",
    "Bugs everywhere, bring lots of repellent.",
    "Not a lot of activities for kids.",
    "Would be better if there were more trees for shade.",
    "The playground needs an upgrade, some equipment is broken.",
    "Not enough space for larger group gatherings.",
    "Hard to find parking during peak hours."
]

# Generate fake reviews grouped by park
fake_reviews = []
for park in parks:
    park_reviews = {
        "park": park,
        "reviews": []
    }
    for _ in range(50):  # Generate 50 reviews per park
        review = {
            "user": random.choice(users),
            "rating": random.randint(1, 5),  # Random rating between 1 and 5 for more diversity
            "comment": random.choice(reviews)
        }
        park_reviews["reviews"].append(review)
    fake_reviews.append(park_reviews)

# Save to JSON file in the correct format
json_filename = "reviews.json"
with open(json_filename, "w", encoding="utf-8") as file:
    json.dump(fake_reviews, file, indent=4)

# Save to CSV file
csv_filename = "reviews.csv"
with open(csv_filename, mode="w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerow(["Park", "User", "Rating", "Review"])
    for park_data in fake_reviews:
        for review in park_data["reviews"]:
            writer.writerow([park_data["park"], review["user"], review["rating"], review["comment"]])

# Return filenames
json_filename, csv_filename