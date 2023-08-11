import fitz  # PyMuPDF
import io
from PIL import Image
from fuzzywuzzy import fuzz

import re
import os

pdf_path = "./CarList.pdf"
output_folder = "Images"

brands = ["dodge","ford","GMC","ISUZU","Chevrolet","Toyota"]

def replace_whitespace(string):
    pattern = r'\s+|<'
    cleaned = re.sub(pattern, '_', string.split('<', 1)[0].replace('\n', ''))
    pattern = r'[<>:"/\\|?*\x00-\x1F]'
    return re.sub(pattern, '', cleaned)

def find_make(pageNum):
    page = doc[pageNum]
    blocks = page.get_text("blocks")
    brands = ["dodge", "ford", "GMC", "ISUZU", "Chevrolet", "Toyota"]
    for block in blocks:
        if block[4].startswith('<') or not block[4].startswith(('NO', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9')):
            for brand in brands:
                if block[4].lower().startswith(brand.lower()):
                    make = block[4]
                    print("make found")
                    print(make)
                    return replace_whitespace(make)

    return None



# Create the output folder if it doesn't exist
os.makedirs(output_folder, exist_ok=True)

# Load the PDF file
doc = fitz.open(pdf_path)

# Iterate over the pages
for page_num in range(len(doc)):
    page = doc[page_num]
    make = find_make(page_num)

    # Get all the images on the page
    image_list = page.get_image_info(xrefs=True)
    prev_image = None
    prev_bbox = None
    combined_last = False
    for image_counter, img in enumerate(image_list):
        if combined_last:
            combined_last = False
            print("SKIPPED")
            continue

        image_count = image_counter
        if(image_count>3):
            image_count = image_counter % 3
        # Get the bounding box of the image
        image_bbox = fitz.Rect(img["bbox"])
        image_y = image_bbox.y0
        image_x = image_bbox.x0
        image_x1 = image_bbox.x1

        print("------------------------------NEW IMAGE: "+str(image_count)+"------------CORDS: topleft : y0: "+str(image_y) +" top-left x0:"+str(image_x)+"---topright x1:"+str(image_x1)+"-----------------------")

        # Get the xref of the image
        xref = img["xref"] 

        # Extract the image bytes
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image = Image.open(io.BytesIO(image_bytes))



        # Get the image extension
        image_ext = "jpeg"

        # Construct the image name with the page number and image counter
        text_above = ""
        text_make = ""
        blocks = page.get_text("blocks")
        for block in blocks:
            dist_y = image_y - block[1]
            dist_x = image_x - block[0]

            if block[4].startswith('<'):
                continue
           
            print("text:")
            print(block[4])
            print("block ful")
            print(block)
            print("distance-x")
            print(dist_x)
            print("distance-y")
            print(dist_y)
            distCheck = ((dist_y) > 0 and dist_y < 25)
            print("distCheck")
            print(distCheck)
            segments = block[4].split('\n')  # Split the string into segments
            print("segments")
            print(segments)
            print("segments length")
            print(len(segments))
            # Check if the count is within the valid range
            if (len(segments) == 2):
                selectedText = segments[0]
            elif(len(segments)== 3):
                selectedText = segments[1]
            else:
                selectedText = segments[image_count]
            if image_count+2<len(segments):
               if(len(segments)<=3):
                    print("segments small")
                    selectedText = segments[0]+segments[1]
                    print(selectedText)
               else:
                    selectedText= segments[image_count+2]
                    print("selected text")
                    print(selectedText)
            if distCheck:
                text_above += selectedText
                # print("breaking")
                break

        if image_count + 1 < len(image_list):
            next_img = image_list[image_count + 1]
            next_image_bbox = fitz.Rect(next_img["bbox"])

            if (abs(next_image_bbox.x0 - image_bbox.x1) < 15) and (abs(next_image_bbox.y0 - image_bbox.y0) < 120):
                # Extract the next image bytes
                next_base_image = doc.extract_image(next_img["xref"])
                next_image_bytes = next_base_image["image"]
                next_image = Image.open(io.BytesIO(next_image_bytes))

                # Combine the two images
                combined = Image.new('RGB', (image.width + next_image.width, max(image.height, next_image.height)))
                combined.paste(image, (0, 0))
                combined.paste(next_image, (image.width, 0))

                # Save the combined image
                sanitized_text = replace_whitespace(text_above)
                if(make == sanitized_text):
                    image_name = f"{sanitized_text}_VEHICLE.{image_ext}"
                else:
                    image_name = f"{make}_{sanitized_text}.{image_ext}"
                image_path = os.path.join("Images", image_name)
                combined.save(open(image_path, "wb"))
                print(f"Combined image {image_path} saved.")
                combined_last=True

                # Skip the next image
                continue

        sanitized_text = replace_whitespace(text_above)
        image_name = f"{make}_{sanitized_text}.{image_ext}"
        image_path = os.path.join("Images", image_name)

        # Save the image to local disk with the sanitized name
        image.save(open(image_path, "wb"))
        print(f"Image {image_path} extracted.")

        


# import fitz  # PyMuPDF
# import io
# from PIL import Image
# import re
# import os

# pdf_path = "./first_cars.pdf"
# output_folder = "Images"

# # Create the output folder if it doesn't exist
# os.makedirs(output_folder, exist_ok=True)

# # Load the PDF file
# doc = fitz.open(pdf_path)

# # Iterate over the pages
# for page_num in range(len(doc)):
#     page = doc[page_num]

#     # Get all the images on the page
#     image_list = page.get_images()

#     for image_counter, img in enumerate(image_list):
#         # Get the bounding box of the image
#         image_bbox = fitz.Rect(*img[1:5])
#         image_y = image_bbox.y0

#         # Look for text above the image
#         text_above = ""
#         blocks = page.get_text_blocks()
#         for block in blocks:
#             if block[3] < image_y:
#                 text_above += block[4]

#         # Sanitize the text
#         sanitized_text = re.sub(r"[\/:*?\"<>|]", "", text_above)
#         sanitized_text = re.sub(r"(\r|\n|\s)+", "_", sanitized_text)

#         # Construct the image name with the sanitized text and image counter
#         image_name = f"{sanitized_text}_image{image_counter}.jpeg"
#         image_path = os.path.join(output_folder, image_name)

#         # Save the image to local disk with the sanitized name
#         pixmap = page.get_pixmap()
#         image = Image.frombytes("RGB", [pixmap.width, pixmap.height], pixmap.samples)
#         image.save(image_path, "JPEG")

#         print(f"Image {image_path} extracted.")
#         print("Text above the image:", text_above)


# import fitz  # PyMuPDF
# import io
# from PIL import Image
# import re
# import os

# pdf_path = "./first_cars.pdf"
# output_folder = "Images"

# def replace_whitespace(string):
#     pattern = r'\s+|<'
#     cleaned = re.sub(pattern, '_', string.split('<', 1)[0].replace('\n', ''))
#     pattern = r'[<>:"/\\|?*\x00-\x1F]'
#     return re.sub(pattern, '', cleaned)
     

# # Create the output folder if it doesn't exist
# os.makedirs(output_folder, exist_ok=True)

# # Load the PDF file
# doc = fitz.open(pdf_path)

# # Iterate over the pages
# for page_num in range(len(doc)):
#     page = doc[page_num]

#     # Get all the images on the page
#     image_list = page.get_image_info(xrefs=True)

#     for image_counter, img in enumerate(image_list):
#         # Get the bounding box of the image
#         image_bbox = fitz.Rect(img["bbox"])
#         image_y = image_bbox.y0
#         image_x = image_bbox.x0

#         print("------------------------------NEW IMAGE: "+str(image_counter)+"------------CORDS: y "+str(image_y) +" x "+str(image_x)+"--------------------------")

#         # Get the xref of the image
#         xref = img["xref"]

#         # Extract the image bytes
#         base_image = doc.extract_image(xref)
#         image_bytes = base_image["image"]
#         image = Image.open(io.BytesIO(image_bytes))

#         # Get the image extension
#         image_ext = "jpeg"

#         # Construct the image name with the page number and image counter
#         text_above = ""
#         blocks = page.get_text("blocks")
#         for block in blocks:
#             dist_y = image_y - block[1]
#             dist_x = image_x - block[0]
#             if block[4].startswith('<'):
#                 continue
#             print("text:")
#             print(block[4])
#             print("block ful")
#             print(block)
#             print("distance-x")
#             print(dist_x)
#             print("distance-y")
#             print(dist_y)
#             distCheck = ((dist_y) > 0 and dist_y < 20)
#             print("distCheck")
#             print(distCheck)
#             if distCheck:
                
#                 text_above += block[4]
#                 print("breaking")
#                 break

#         sanitized_text = replace_whitespace(text_above)

#         image_name = f"{sanitized_text}_image{image_counter}.{image_ext}"
#         image_path = os.path.join("Images", image_name)

#         # Save the image to local disk with the sanitized name
#         image.save(open(image_path, "wb"))
#         print(f"Image {image_path} extracted.")




# import fitz  # PyMuPDF
# import io
# from PIL import Image
# import re
# import os

# # File path you want to extract images from
# file = "./first_cars.pdf"

# # Create the "Images" folder if it doesn't exist
# os.makedirs("Images", exist_ok=True)

# # Open the file
# pdf_file = fitz.open(file)

# # Iterate over PDF pages
# for page_index in range(len(pdf_file)):
#     # Get the page itself
#     page = pdf_file[page_index]
#     image_list = page.get_images()

#     # Printing the number of images found on this page
#     if image_list:
#         print(f"[+] Found a total of {len(image_list)} images on page {page_index}")
#     else:
#         print("[!] No images found on page", page_index)

#     # Extract the text blocks on the page
#     text_blocks = page.get_text("blocks")
#     # Initialize image counter for the current page
#     image_counter = 1

#     for image_index, img in enumerate(page.get_images(), start=1):
#         # Get the XREF of the image
#         xref = img[0]
#         # Extract the image bytes
#         base_image = pdf_file.extract_image(xref)
#         image_bytes = base_image["image"]
#         # Get the image extension
#         image_ext = base_image["ext"]
#         # Load it into PIL
#         image_bbox = fitz.Rect(*img[1:5])  # Image bounding box                

#         image = Image.open(io.BytesIO(image_bytes))


#         # Find the text with the number and all-caps part name above the image
#         text_above = ""
#         if isinstance(img[1], fitz.Rect):
#             image_bbox = img[1]  # Image bounding box
#         elif len(img) >= 3 and isinstance(img[2], fitz.Rect):
#             image_bbox = img[2]  # Image bounding box
            
#         print("block")
#         # Top y-coordinate of the image
#        # print(image_bbox)
#         for block in text_blocks:
#             # Check if the block is above the image
#             print("block4")
#             print(block[4])  

#             text_above=block[4]

#             print("blockcords y")
#             print(block[3])
#             print("images cords y")
#             print(image_bbox.y0)

#             if block[3] < image_bbox.y0:
#                 # Check if the block has a number followed by all-caps part name
#                 match = re.search(r"\b\d+\s[A-Z\s-]+\b", block[4])
#                 if match:
#                     text_above = match.group().strip()
#                     break

#         # Sanitize the image name by removing invalid characters
#         sanitized_text = re.sub(r"[\/:*?\"<>|]", "", text_above)
#         sanitized_text = re.sub(r"(\r|\n|\s)+", "_", sanitized_text)  # Replace whitespace and newlines with underscores

#         # Construct the image name with the sanitized text and image counter
#         image_name = f"{sanitized_text}_image{image_counter}.{image_ext}"
#         image_path = os.path.join("Images", image_name)
#         print("image path:")
#         print(image_path)
#         # Save the image to local disk with the sanitized name
#         image.save(open(image_path, "wb"))
#         print(f"Image {image_path} extracted.")
#         print("Text above the image:", text_above)

#         # Increment the image counter for the next image on the page
#         image_counter += 1
