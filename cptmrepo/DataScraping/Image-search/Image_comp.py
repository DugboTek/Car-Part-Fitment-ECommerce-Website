import requests
from PIL import Image
from io import BytesIO
import json
import requests
import pandas as pd

df = pd.read_csv(r'C:\Users\eridetje\Documents\CPTM\cptmrepo\DataScraping\Final_augmentation\merged-fixed-with-prices (1).csv')
df.columns = df.columns.str.strip()

#end the script
subscription_key = "7735a3f1ef034d70b81f7a9fbe30ba19"
search_url = "https://api.bing.microsoft.com/v7.0/images/search"

headers = {"Ocp-Apim-Subscription-Key" : subscription_key}

# Function to fetch first image URL
def fetch_image_url(search_term):
    params = {"q": search_term}
    response = requests.get(search_url, headers=headers, params=params)
    response.raise_for_status()
    search_results = response.json()
    try:
        first_value = search_results['value'][0]['contentUrl']
    except IndexError:
        first_value = None
    return first_value

# try:
#     # Loop through the rows of the DataFrame and generate the search term
#     for idx, row in df.iterrows():
#         search_term = row['Brand'] + " " + row['MODEL'] + " " + row['DESCRIPTION']
#         print(f"Processing row {idx}: {search_term}") # Debug Statement
#         first_value = fetch_image_url(search_term)
#         if first_value is None:
#             print(f"No results for search term: {search_term}") # Debug Statement
#         else:
#             print(f"First image URL for {search_term}: {first_value}") # Debug Statement
#         df.at[idx, 'ImageURL'] = first_value

# except KeyboardInterrupt:
#     print("\nInterrupted! Saving DataFrame...")
# # Save the DataFrame back to CSV file
# df.to_csv(r'C:\Users\eridetje\Documents\CPTM\cptmrepo\DataScraping\Image-search\images.csv', index=False)


# Import webbrowser module to open the html file
import webbrowser

html_string = "<html><body><table>"

try:
    # Loop through the rows of the DataFrame and generate the search term
    for idx, row in df.iterrows():
        #check if the brand row contains the word "d-max"
        if "d-max" in row['MODEL'].lower():
            print("contains DMAX")            
            search_term1 = row['Brand'] + " " + row['MODEL'] + " " + row['DESCRIPTION']
            search_term2 = row['part_type'] + " " + row['DESCRIPTION'] + " " + row['Brand'] + " " + row['MODEL']
            print(f"Processing row {idx}: {search_term1} and {search_term2}")  # Debug Statement

            first_value1 = fetch_image_url(search_term1)
            first_value2 = fetch_image_url(search_term2)

            html_string += "<tr>"

            # Add first image to the HTML string
            if first_value1 is None:
                print(f"No results for search term: {search_term1}")  # Debug Statement
                html_string += f"<td>No image for: {search_term1}</td>"
            else:
                print(f"First image URL for {search_term1}: {first_value1}")  # Debug Statement
                html_string += f"<td><p>{search_term1}</p><img src='{first_value1}' alt='{search_term1}' width='300'></td>"
                
            # Add second image to the HTML string
            if first_value2 is None:
                print(f"No results for search term: {search_term2}")  # Debug Statement
                html_string += f"<td>No image for: {search_term2}</td>"
            else:
                print(f"First image URL for {search_term2}: {first_value2}")  # Debug Statement
                html_string += f"<td><p>{search_term2}</p><img src='{first_value2}' alt='{search_term2}' width='300'></td>"

            html_string += "</tr>"

            df.at[idx, 'ImageURL1'] = first_value1
            df.at[idx, 'ImageURL2'] = first_value2

except KeyboardInterrupt:
    print("\nInterrupted! Saving DataFrame...")

# Finish the HTML string and write to file
html_string += "</table></body></html>"
html_file_path = r"C:\Users\eridetje\Documents\CPTM\cptmrepo\DataScraping\Image-search\image_review.html"
with open(html_file_path, 'w') as file:
    file.write(html_string)

# Save the DataFrame back to CSV file
df.to_csv(r'C:\Users\eridetje\Documents\CPTM\cptmrepo\DataScraping\Image-search\images.csv', index=False)

# Open the HTML file in web browser
webbrowser.open(html_file_path)