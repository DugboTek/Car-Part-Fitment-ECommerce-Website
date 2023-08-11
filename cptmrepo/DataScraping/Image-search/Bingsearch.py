import requests
from PIL import Image
from io import BytesIO
import json
import requests
import pandas as pd
from requests.exceptions import HTTPError
from PIL import Image
from io import BytesIO
import os


df = pd.read_csv(r'C:\Users\eridetje\Documents\CPTM\cptmrepo\DataScraping\Image-search\merged_fixed_with_years_accepted_and_reviews_with_ids.csv')
df.columns = df.columns.str.strip()

#end the script
subscription_key = "3dde1b74e42444f2bc873b41151699c7"
search_url = "https://api.bing.microsoft.com/v7.0/images/search"

headers = {"Ocp-Apim-Subscription-Key" : subscription_key}



# Function to fetch and save image
def fetch_image_json(search_term):
    try:
        params = {"q": search_term}
        response = requests.get(search_url, headers=headers, params=params)
        response.raise_for_status()
        search_results = response.json()
        # Check if the 'value' key exists in the json and it's not empty
        if 'value' in search_results and search_results['value']:
            return search_results['value'][0]  # Return the first item from 'value' list
        else:
            print(f"No results found for {search_term}")
            return None
    except HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}") # Debug Statement
        return None


try:
    # Loop through the rows of the DataFrame and generate the search term
    for idx, row in df.iterrows():
        search_term = row['Brand'] + " " + row['MODEL'] + " " + row['DESCRIPTION']
        print(f"Processing row {idx}: {search_term}") # Debug Statement
        image_json = fetch_image_json(search_term)
        df.at[idx, 'ImageJSON'] = json.dumps(image_json) if image_json else None
        if image_json is None:  # If quota exceeded or some other HTTP error occurred
            print("Stopping due to HTTP error... Saving DataFrame.")
            break
except Exception as e:
    print(f"An error occurred: {e}")  # Debug Statement
finally:
    # Save the DataFrame back to CSV file
    df.to_csv(r'C:\Users\eridetje\Documents\CPTM\cptmrepo\DataScraping\Image-search\images.csv', index=False)

 