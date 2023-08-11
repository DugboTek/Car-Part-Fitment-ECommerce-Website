import pandas as pd
import numpy as np
import random
import json

# Load the data
data = pd.read_csv(r'C:\Users\eridetje\Documents\CPTM\cptmrepo\DataScraping\Pdata_table_scraper\merged-fixed.csv')

part_prices = {
    'Fender Flare': (50, 150),
    'Air Conditioning System': (200, 1000),
    'Air Condenser': (100, 300),
    'Hood': (200, 800),
    'Engine Parts': (10, 100),
    'Valance Panel': (50, 200),
    'Window Regulator': (50, 150),
    'Rear Bumper Lamp': (50, 150),
    'Spoiler': (100, 300),
    'Bed Liner': (100, 300),
    'Bumper Bracket': (50, 150),
    'Fog Lamp': (50, 150),
    'Brake Adjust Part': (10, 50),
    'Bumper Finisher': (50, 150),
    'Bumper Reinforcement': (100, 300),
    'Lower Arm Bushing': (20, 100),
    'Bumper': (100, 500),
    'Cooling System': (100, 500),
    'Clutch Cable': (50, 150),
    'Moulding Upper': (50, 200),
    'Inter Coller': (100, 500),
    'Tank Reserve': (50, 150),
    'Corner Lamp': (50, 150),
    'Corner Panel End': (50, 200),
    'Side Panel': (100, 300),
    'Fender Mirror': (50, 200),
    'Rear Tail Body': (100, 300),
    'Body Parts': (50, 500),
    'Room Lamp': (10, 50),
    'Truck Bed Parts': (100, 500),
    'Mirrors': (50, 300),
    'Tail Lamp': (50, 200),
    'Door': (200, 800),
    'Door Mouldings': (50, 150),
    'Door Parts': (10, 200),
    'Door Mirror': (50, 300),
    'Stabilizer Assembly': (50, 200),
    'Lighting System': (10, 200),
    'Engine Oil Cap': (10, 50),
    'Engine Fan Blade': (50, 200),
    'Fender': (100, 400),
    'Fog Lamp/ Front Lamp': (50, 200),
    'Mud Guard': (50, 150),
    'Radiator Fan Shroud': (50, 150),
    'Side Lamp': (20, 100),
    'Fender Granish': (50, 200),
    'Inner Fender': (50, 200),
    'Side Skirt': (100, 300),
    'Fog Lamp Base/ Cover': (20, 100),
    'Moulding Lower': (50, 150),
    'Fenders': (100, 400),
    'Bumper Panel Flare': (50, 200),
    'Front Spring Bumper': (50, 150),
    'Strut Bar': (50, 200),
    'Valence Panel': (50, 200),
    'Fuel System': (50, 300),
    'Grille': (50, 200),
    'Grille Moulding': (50, 150),
    'Head Lamp': (50, 300),
    'Hood Ledge': (50, 150),
    'Cabin Roof Panel': (200, 800),
    'Hoods': (200, 800),
    'Hood Insulator': (50, 150),
    'Hood Moulding': (50, 150),
    'Wiper Panel': (50, 150),
    'Inter Cooler': (100, 500),
    'Bug Shields': (50, 150),
    'Fender Garnish': (50, 200),
    'Lamp Housing': (20, 100),
    'License Plate Lamp': (10, 50),
    'License Plate': (10, 50),
    'Room Mirror': (10, 50),
    'Engine Mounting Support': (50, 200),
    'Windscreen Weather Strip': (20, 100),
    'Stabilizer Assembly': (50, 200),
    'Outer Door Handle': (20, 100),
    'Ornament': (20, 100),
    'Fender': (100, 400),
    'Wheel House': (50, 200),
    'Center Bearing Support': (50, 150),
    'Fender Flare ': (50, 150),
    'Side Bumper': (50, 150),
    'Steel Bumper': (100, 400),
    'Radiator Support': (100, 300),
    'Radiator': (100, 500),
    'Radiator Suppot': (100, 300),
    'Rear Gate': (200, 800),
    'Rear Side Panel': (100, 300),
    'Side Mirror': (50, 300),
    'SidePanel': (100, 300),
    'Weather Guards': (50, 150),
    'Front Panel': (100, 300),
    'Head Lmap': (50, 300),
    'Door Seal Weather Strip': (20, 100),
    'Wheels and Tires': (100, 500),
    'Windscreen': (100, 300),
}


# review data
reviews_data = """
{
  "reviews": [
    {
      "rating": 4.5,
      "review": "I'm extremely satisfied with this car part. It exceeded my expectations and significantly improved the performance of my vehicle. Highly recommended!"
    },
    {
      "rating": 4.8,
      "review": "This car part is a game-changer! It has enhanced my driving experience and provided noticeable improvements in fuel efficiency. Great value for the price!"
    },
    {
      "rating": 4.7,
      "review": "I can't say enough good things about this car part. It's a perfect fit for my vehicle and has boosted its power and responsiveness. Very happy with my purchase!"
    },
    {
      "rating": 4.6,
      "review": "This car part has made a noticeable difference in the overall performance of my car. It's durable, reliable, and has exceeded my expectations. Highly recommend it!"
    },
    {
      "rating": 4.4,
      "review": "I am impressed with the quality and functionality of this car part. It's easy to install and has improved the handling and stability of my vehicle. Great product!"
    },
    {
      "rating": 4.9,
      "review": "I couldn't be happier with this car part. It has enhanced the driving dynamics of my car and provided a significant power boost. Well worth the investment!"
    },
    {
      "rating": 4.3,
      "review": "This car part is fantastic! It has exceeded my expectations in terms of performance and reliability. I am extremely satisfied with its quality and durability."
    },
    {
      "rating": 4.8,
      "review": "I highly recommend this car part to anyone looking for an upgrade. It has greatly improved my vehicle's performance and delivered exceptional results. Five stars!"
    },
    {
      "rating": 4.5,
      "review": "I'm very pleased with this car part. It's a great addition to my vehicle, providing excellent performance and reliability. I would buy it again without hesitation!"
    },
    {
      "rating": 4.7,
      "review": "I've been using this car part for a while now, and it continues to impress me. It has enhanced my car's overall performance and made a noticeable difference. Highly satisfied!"
    }
  ]
}
"""
# Create a new column 'price' in the dataframe
data['price'] = data['part_type'].apply(lambda x: np.round(random.uniform(*part_prices[x]), 2) if x in part_prices else np.nan)



# Define a function to generate the list of reviews
def generate_reviews(sub_category):
    # Choose a random number of reviews (1-3)
    num_reviews = np.random.randint(1, 4)
    
    # Randomly select reviews
    selected_reviews = random.sample(reviews_data, num_reviews)
    
    # Replace "car part" with the sub-category
    for review in selected_reviews:
        review["review"] = review["review"].replace("car part", sub_category)
    
    # Return the reviews as a JSON string
    return json.dumps(selected_reviews)

# Apply the function to each row of the dataframe
data['REVIEWS'] = data['SUB_CATAGORY'].apply(generate_reviews)

# Save the dataframe to a new CSV file

# Display the first few rows of the dataframe
data.head()


# Save the dataframe to a new CSV file
data.to_csv(r'C:\Users\eridetje\Documents\CPTM\cptmrepo\DataScraping\Final_augmentation\merged-fixed-with-prices.csv', index=False)