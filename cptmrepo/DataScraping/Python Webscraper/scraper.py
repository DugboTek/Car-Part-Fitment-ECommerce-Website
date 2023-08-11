from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
import time
import json
import re


#import all selenium classes
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.actions.wheel_input import ScrollOrigin


chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--ignore-certificate-errors')
chrome_options.add_argument('--ignore-ssl-errors')
# Create a new instance of the Edge driver
chrome_path = r"c:\users\eridetje\python webscraper\chromedriver.exe"
service = Service(executable_path=chrome_path)
driver = webdriver.Chrome(service=service, options=chrome_options)


#count for the amount of pages
count = 0

#DATA 
data_list = []

#standardized wait
wait = WebDriverWait(driver, 10)

#initialize a dictionary
with open('links.txt', 'r') as file:
    vehicle_type_urls = file.read().split(', ')

try:
    with open('progress.json', 'r') as f:
        progress = json.load(f)
        print(f"Resuming from URL index {progress['url_index']} and part index {progress['part_index']}")

except (FileNotFoundError, json.JSONDecodeError):
     # If the progress file doesn't exist or is corrupted, start from the beginning
    print("Progress file not found or unreadable, starting from the beginning")
    progress = {'url_index': 0, 'url': vehicle_type_urls[0], 'part_index': -1, 'part_area_index': -1}



#loop through vehicle)_type_urls
for i, url in enumerate(vehicle_type_urls):

    #skip the urls that have already been processed
    if i < progress['url_index']:
        continue
    print(f"Processing URL index {i}, URL {url}")

    # Save the current progress before processing each URL
    with open('progress.json', 'w') as f:
        json.dump({'url_index': i, 'url': url, 'part_index': -1}, f)

    # Fetch the URL
    driver.get(url)


    # Wait for the page to load
    time.sleep(2)
    parts = wait.until(EC.presence_of_all_elements_located
                       ((By.CSS_SELECTOR, 
                         "ul.partsubselect.columnlist.columnlist_33 li a")))



    for j in range(len(parts)):
        #skip the parts that have already been processed
        if i == progress['url_index'] and j < progress['part_index']:
            continue

        # Save the current progress before processing each part
        with open('progress.json', 'w') as f:
            json.dump({'url_index': i, 'url': url, 'part_index': j}, f)

        #find the parts again
        parts = wait.until(EC.presence_of_all_elements_located
                       ((By.CSS_SELECTOR, 
                         "ul.partsubselect.columnlist.columnlist_33 li a")))

        # go inward
        parts[j].click()

        

        #find all the part areas
        part_areas = wait.until(EC.presence_of_all_elements_located(
            (By.CSS_SELECTOR, "#partassemthumblist .passemname a")))

        #loop through the part areas
        for k in range(len(part_areas)):
            #skip the part areas that have already been processed
            if i == progress['url_index'] and j == progress['part_index'] and k < progress['part_area_index']:
                continue
             # Save the current progress before processing each part area
            with open('progress.json', 'w') as f:
                json.dump({'url_index': i, 'url': url, 'part_index': j, 'part_area_index': k}, f)

            #find the part areas again
            part_areas = wait.until(EC.presence_of_all_elements_located(
                 (By.CSS_SELECTOR, "#partassemthumblist .passemname a")))
            
            #go inward
            part_areas[k].click()



            #---------START Parsing Here-------------#
            
            # Define a custom expected condition that checks for the presence of image URLs inside the diagram element
            class diagram_has_image_urls(object):
                def __call__(self, driver):
                    diagram_element = driver.find_element(By.ID, "diagram")
                    image_elements = diagram_element.find_elements(By.TAG_NAME, "img")
                    return len(image_elements) > 0
            
            wait.until(diagram_has_image_urls())
            time.sleep(.5)

                        #--------get image----------#

            diagram_element = driver.find_element(By.ID, "diagram")
            driver.execute_script("arguments[0].scrollIntoView();", diagram_element)

            safe_title = re.sub('[^A-Za-z0-9]+', '_', driver.title)
            diagram_element.screenshot(f"Images/{safe_title}.png")

            html = driver.page_source

            #parse the html

            soup = BeautifulSoup(html, 'html.parser')

          
            # get the h1 from the page
            h1 = soup.select_one('h1')

            partlistrows = soup.select('.partlistrow, .partlistrow.even')

            #loop through the partlistrows
            form_data = []

            for partlistrow in partlistrows:

                form = soup.select_one('.partlistrow form')
                ref_num = partlistrow.select_one('.c0 span').text if partlistrow.select_one('.c0 span') else None

                # Extract the required attributes
                data_brand = form.get('data-brand')
                data_name = form.get('data-name')
                data_qoh = form.get('data-qoh')
                data_retail = form.get('data-retail')
                data_sku = form.get('data-sku')
                form_id = form.get('id')
                

                form_data_point = {
                    'ref_num' : ref_num,
                    'data_brand': data_brand,
                    'data_name': data_name,
                    'data_qoh': data_qoh,
                    'data_retail': data_retail,
                    'data_sku': data_sku,
                    'form_id': form_id
                }
                form_data.append(form_data_point)
            
            data_point = {
                'title': h1.text if h1 else None,
                'image_file': f"{safe_title}.png",
                'form_data':form_data
                }

            #append the data to the data_list
            data_list.append(data_point)

            # save the data_list into a json file
            with open('data.jsonl', 'a') as f:
                f.write(json.dumps(data_point) + '\n')


            #---------END Parsing Here-------------#

            driver.back()

            
        driver.back()  

driver.close()  # Close the driver
