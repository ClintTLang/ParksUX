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

# List of generic review comments
reviews = [
    "Beautiful and peaceful place!",
    "Great for a morning jog.",
    "Nice place but could use better maintenance.",
    "Amazing trails and scenery!",
    "A little crowded on weekends.",
    "Perfect for picnics with family.",
    "Loved the walking paths!",
    "Lots of wildlife, great for bird watchers.",
    "The playground is fun for kids.",
    "Would love to see more benches along the trails.",
    "Great place for biking and running!",
    "Good spot for fishing, but bring bug spray.",
    "Nice place but too many mosquitoes.",
    "The park is well-maintained and clean.",
    "Needs more shaded areas for hot days.",
    "Awesome for dog walks!",
    "Beautiful lake views.",
    "Friendly people and a relaxing atmosphere.",
    "The park can get muddy after rain.",
    "Great picnic areas with lots of space.",
    "The trails are easy to follow and well-marked.",
    "Lots of open space for activities.",
    "Perfect place to unwind and enjoy nature.",
    "The sunset view here is stunning!",
    "Love coming here to read and relax.",
    "The restrooms need more maintenance.",
    "Good for a quick escape from the city.",
    "Feels safe and well-lit at night.",
    "More trash cans would help keep it cleaner.",
    "A wonderful hidden gem in the city!",
    "My kids love playing here!",
    "Nice place but parking is limited.",
    "Great spot for yoga in the mornings.",
    "Lots of friendly people walking their dogs.",
    "Best place for an afternoon stroll.",
    "The park is huge, lots to explore!",
    "A peaceful getaway not too far from town.",
    "Fantastic running trails!",
    "Would be better if there were more food vendors.",
    "Great spot for a weekend picnic with friends.",
    "I love bringing my bike here!",
    "It’s a great place to meditate and reflect.",
    "Nice open fields for playing sports.",
    "Wish they had more seating areas.",
    "The staff does a great job maintaining the park.",
    "The trees provide great shade on hot days.",
    "One of the best parks I’ve visited!",
    "Perfect for a date or casual walk.",
    "Very clean and safe environment.",
    "Wish it was bigger, but still a great spot!"
]

# Generate fake reviews
fake_reviews = []
for park in parks:
    for _ in range(50):  # Generate 50 reviews per park
        review = {
            "Park": park,
            "User": random.choice(users),
            "Rating": random.randint(2, 5),  # Random rating between 2 and 5
            "Review": random.choice(reviews)
        }
        fake_reviews.append(review)

# Save to CSV file
csv_filename = "fake_reviews.csv"
with open(csv_filename, mode="w", newline="", encoding="utf-8") as file:
    writer = csv.DictWriter(file, fieldnames=["Park", "User", "Rating", "Review"])
    writer.writeheader()
    writer.writerows(fake_reviews)

# Save to JSON file
json_filename = "fake_reviews.json"
with open(json_filename, "w", encoding="utf-8") as file:
    json.dump(fake_reviews, file, indent=4)

# Return filenames
csv_filename, json_filename
