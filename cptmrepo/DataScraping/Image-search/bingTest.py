import requests
from PIL import Image
from io import BytesIO
import json
import requests
import pandas as pd

df = pd.read_csv(r'C:\Users\eridetje\Documents\CPTM\cptmrepo\DataScraping\Final_augmentation\merged-fixed-with-prices (1).csv')

subscription_key = "3dde1b74e42444f2bc873b41151699c7"
search_url = "https://api.bing.microsoft.com/v7.0/images/search"
search_term = "Isuzu & 4 & 2 DOOR GRILLE UPPER-LOWER BKG/CP MOULDING SPARK 4 PCS SET"

headers = {"Ocp-Apim-Subscription-Key" : subscription_key}

params  = {"q": search_term}

response = requests.get(search_url, headers=headers, params=params)
response.raise_for_status()
search_results = response.json()
thumbnail_urls = [img["thumbnailUrl"] for img in search_results["value"][:16]]

#print the payload

first_value = search_results['value'][0]['contentUrl']
print(first_value)