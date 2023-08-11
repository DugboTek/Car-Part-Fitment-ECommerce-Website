import os
import csv
from fuzzywuzzy import fuzz

# Function to check if the brand is contained in the image name
def is_brand_contained(brand, image_name):
    return brand.lower() in image_name.lower()

# Path to the Images folder
images_folder = './Images'

matchFound = 0
# Read the Clean-Data.csv file
with open('Cleaned-Data.csv', 'r') as csvfile:
    reader = csv.DictReader(csvfile)
    rows = list(reader)
    fieldnames = reader.fieldnames + ['IMAGE_NAME']  # Add the new field to the header

    # Create a new CSV file for writing the updated data
    with open('Clean-Data-Named.csv', 'w', newline='') as outfile:
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()

        # Iterate through each row
        for row in rows:
            description = row['DESCRIPTION']
            brand = row['Brand']
            matched_image_name = None

            # Iterate through each file in the Images folder
            for filename in os.listdir(images_folder):
                if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):  # Consider only image files
                    # Compare the description with the image name using fuzzy matching
                    similarity = fuzz.ratio(description, os.path.splitext(filename)[0])
                    if similarity >= 50:  # Adjust the similarity threshold as needed
                        # Check if the brand is contained in the image name
                        if is_brand_contained(brand, filename):
                            matched_image_name = filename
                            matchFound+=1
                            break  # Exit the loop if a match is found

            # Add the matched image name to the row
            row['IMAGE_NAME'] = matched_image_name
            writer.writerow(row)

print(matchFound)