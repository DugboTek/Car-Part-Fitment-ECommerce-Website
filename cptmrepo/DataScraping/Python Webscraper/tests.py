import json

# Load the data from the JSON file
with open('data.json') as f:
    data = json.load(f)

# Open the output HTML file
with open('test.html', 'w') as f:
    # Write HTML header
    f.write('<html><body>\n')

    # Check each dictionary for image URLs
    for i, dictionary in enumerate(data):
        if 'image_data' in dictionary:
            image_data = dictionary['image_data']
            url_exists = any('http' in item for item in image_data)
            
            # Write index
            f.write(f'<h1>Index: {i}</h1>\n')
            
            if url_exists:
                # Write image URLs
                for url in image_data:
                    if 'http' in url:
                        f.write(f'<img src="{url}" />\n')
            else:
                f.write('<p>No image URL found.</p>\n')
        else:
            f.write('<p>"image_data" field not found.</p>\n')

    # Write HTML footer
    f.write('</body></html>\n')
