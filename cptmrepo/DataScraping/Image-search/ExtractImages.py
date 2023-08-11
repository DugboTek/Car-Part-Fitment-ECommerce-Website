import os
import json
import pandas as pd
import requests
from PIL import Image
from io import BytesIO
from shutil import copyfile
import ast

# Load CSV file
df = pd.read_csv(r"C:\Users\eridetje\Documents\CPTM\cptmrepo\DataScraping\updated_images_lowercase.csv")

image_folder = r'C:\Users\eridetje\Documents\CPTM\cptmrepo\DataScraping\Image-search\newImages'

if not os.path.exists(image_folder):
    os.makedirs(image_folder)

    
df['IMAGE_JSON'] = df['IMAGE_JSON'].astype(str)

# Loop through the dataframe
for index, row in df.iterrows():
    # Check if IMAGE_NAMES column is empty and IMAGE_JSON column is not empty
    if pd.isnull(row['IMAGE_NAMES']) and pd.notnull(row['IMAGE_JSON']):
        # Load JSON from IMAGE_JSON
        try:
            # Use literal_eval to parse the string as a Python literal
            image_json = ast.literal_eval(row['IMAGE_JSON'])
        except (ValueError, SyntaxError):
            print(f"Couldn't decode JSON for row {index}. Skipping...")
            continue

        # Get image from contentUrl in JSON
        try:
            # If you're having SSL problems, you can skip verification with verify=False
            # However, this can expose you to security risks.
            response = requests.get(image_json['contentUrl'], verify=False)
        except requests.exceptions.RequestException as e:
            print(f"Couldn't download image for row {index}. Error: {e}")
            continue

        # If the request is successful
        if response.status_code == 200:
            # Create image file name from url
            image_name = os.path.join(image_folder, image_json['contentUrl'].split('/')[-1])
            
            # Save the image
            with open(image_name, 'wb') as f:
                f.write(response.content)
                
            # Update IMAGE_NAMES column
            df.at[index, 'IMAGE_NAMES'] = image_name

# Save the dataframe to a new CSV
df.to_csv(r'C:\Users\eridetje\Documents\CPTM\cptmrepo\DataScraping\Image-search\newcsv', index=False)
