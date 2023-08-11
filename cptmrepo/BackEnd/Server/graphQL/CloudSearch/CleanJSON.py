#Sola Dugbo
# *! This program adds the required fields for AWS CloudSearch 
# * [
# *  {
#*    'type': 'add',
#*    'id': 'random number',
#*     'fields': {  
#*          all elements
#*      }
#*  ]

import json
import random
import re

# Function to generate a unique 5 digit number
def generate_id():
    return ''.join(random.choice('0123456789') for i in range(5))


def load_data():   
    # Load the data with UTF-8 encoding
    with open('./partshalf2Updated.json', 'r', encoding='utf-8') as f:
        return json.load(f)



def addReqFields(data):    
    # Create a new list to hold the updated data
    updated_data = []

    # Add the required fields
    for item in data:
        new_item = {}
        new_item['type'] = 'add'
        new_item['id'] = generate_id()
        new_item['fields'] = item
        updated_data.append(new_item)

    return updated_data
    # Save the updated data
    # with open('csPartsUpdated.json', 'w') as f:
    #     json.dump(updated_data, f, indent=4)

def setRegExPattern(data):
        # Field name mapping for pattern transformation
    field_name_mapping = {
        'NO': 'no',
        'PCS': 'pcs',
        "CODE": 'code',
        "DESCRIPTION": 'description',
        'IMAGE_NAME': 'image_name',
        'END_YEAR': 'end_year',
        'M3': 'm3',
        'NW': 'nw',
        'MODEL': 'model',
        'Brand': 'brand',
        'GW': 'gw',
        'START_YEAR': 'start_year',
        'OEM': 'oem',
    }

    # Update the index fields
    for item in data:
        fields = item['fields']

        # Transform the field names based on the mapping
        transformed_fields = {field_name_mapping.get(k, k): v for k, v in fields.items()}

        # Convert empty string to -1 for the 'no' field
        transformed_fields['no'] = int(transformed_fields['no']) if transformed_fields['no'] != '' else -1

        item['fields'] = transformed_fields

    # Save the updated data
    with open('updatedParts.json', 'w') as f:
        json.dump(data, f, indent=4)

    print("JSON file updated successfully.")


def convert_fields_to_lowercase(data):
    if isinstance(data, dict):
        new_data = {}
        for key, value in data.items():
            new_key = key.lower()
            new_value = convert_fields_to_lowercase(value)
            new_data[new_key] = new_value
        return new_data
    elif isinstance(data, list):
        return [convert_fields_to_lowercase(item) for item in data]
    else:
        return data
    
def remove_reviews(data):
    for item in data:
        if "reviews" in item["fields"]:
            del item["fields"]["reviews"]
    return data

def add_copy_fields(data):
    copy_fields = {
        "make": ["make_text", "make_literal"],
        "model": ["model_text", "model_literal"],
        "category": ["category_text", "category_literal"],
        "sub_category": ["sub_category_text", "sub_category_literal"]
    }

    for item in data:
        fields = item["fields"]
        for field, copy_field_names in copy_fields.items():
            field_value = fields.get(field)
            if field_value:
                for copy_field_name in copy_field_names:
                    fields[copy_field_name] = field_value
                del fields[field]  # Remove the original field

    return data

def change_type_to_delete(data):
    for item in data:
        item["type"] = "delete"
    return data

def set_id_to_unique_id(data):
    if "unique_id" in data:
        data["id"] = str(data["unique_id"])
    return data

def replace_id_with_oid(data_list):
    for data in data_list:
        if "fields" in data and "_id" in data["fields"]:
            oid_value = data["fields"]["_id"]["$oid"]
            data["fields"]["$oid"] = oid_value
            del data["fields"]["_id"]
    return data_list

def replace_oid_with_oid(data_list):
    #replace $oid with oid
    for data in data_list:
        if "fields" in data and "$oid" in data["fields"]:
            oid_value = data["fields"]["$oid"]
            data["fields"]["oid"] = oid_value
            del data["fields"]["$oid"]
    return data_list



def main():
    data = load_data()
    modified_data = replace_oid_with_oid(data)
    #modified_data = add_copy_fields(modified_data)
    # Replace 'half1Updated.json' with the desired output file path
    output_file_path = 'partshalf2Updated.json'

    with open(output_file_path, 'w') as file:
        json.dump(modified_data, file, indent=4)
        
main()

