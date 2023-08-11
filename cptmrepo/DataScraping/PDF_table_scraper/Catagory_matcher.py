import re
import pandas as pd


# Define the decode_code function
def decode_code(code, dictionary):
    try:
        # Extract different parts of the code
        code = code[:-1]  # Ignore the last character
        manufacturer_code = code[0:2]
        part_code = re.search('(?<='+ manufacturer_code +')\D+(?=\d)', code).group(0)
        model_series = re.search('(?<='+ part_code +')\d+(?=\d)', code).group(0)
        numbering_guide = re.search('(?<='+ model_series +')\d', code).group(0)

        # Find the location code
        location = None
        for loc in dictionary['Location'].keys():
            if loc in code:
                location = loc
                break

        # Map codes to values
        manufacturer = dictionary['car manufacturer'].get(manufacturer_code, None)

        part_type = None
        for category in ['Plastic Parts', 'Metal Stamping Parts', 'Lamp and mirror parts', 'Coolant Parts']:
            if part_code in dictionary[category]:
                part_type = dictionary[category][part_code]
                break

        numbering_guide = dictionary['Numbering Guide']['ODD'] if int(numbering_guide) % 2 != 0 else dictionary['Numbering Guide']['EVEN']
        location = dictionary['Location'].get(location, 'Unknown')

        return {
            'manufacturer': manufacturer,
            'part_type': part_type,
            'model_series': model_series,
            'numbering_guide': numbering_guide,
            'location': location
        }
    except:
        # If any error occurs during decoding, return "None" for all fields
        return {
            'manufacturer': None,
            'part_type': None,
            'model_series': None,
            'numbering_guide': None,
            'location': None
        }



dictionary = {
    'car manufacturer': {
        'CR': 'CHRYSLER',
        'CV': 'CHEVROLET',
        'DH': 'DAIHATSU',
        'DW': 'DAEWOO',
        'DG': 'DODGE',
        'FD': 'FORD',
        'FT': 'FIAT',
        'GM': 'GMC',
        'HD': 'HONDA',
        'HN': 'HINO',
        'HY': 'HYUNDAI',
        'IZ': 'ISUZU',
        'KA': 'KIA',
        'MB': 'MITSUBISHI',
        'MC': 'MERCURY',
        'MH': 'MAHINDRA',
        'MZ': 'MAZDA',
        'NS': 'NISSAN',
        'OP': 'OPEL',
        'PG': 'PEUGEOT',
        'RN': 'RENAULT',
        'SC': 'SCANIA',
        'SD': 'SKODA',
        'SM': 'SMART',
        'SS': 'SAMSUNG',
        'SY': 'SSANGYONG',
        'SZ': 'SUZUKI',
        'TY': 'TOYOTA',
        'VV': 'VOLVO',
        'VW': 'VOLKSWAGEN'
    },
    'Lamp and mirror parts': {
        'BL': 'Rear Bumper Lamp',
        'CL': 'Corner Lamp',
        'Z': 'Corner Lamp Lens',
        'FL': 'Fog Lamp/ Front Lamp',
        'HL': 'Head Lamp',
        'L': 'Tail Lamp',
        'LZ': 'Tail Lamp Lens',
        'LP': 'License Plate Lamp',
        'RL': 'Room Lamp',
        'SL': 'Side Lamp',
        'SZ': 'Side Lamp Lens',
        'FM': 'Fender Mirror',
        'MR': 'Door Mirror',
        'RM': 'Room Mirror',
        'HC': 'Lighting System',
        'EC': 'Lighting System',
        'LC': 'Lighting System',
        'TC': 'Lighting System',
        'RC': 'Lighting System',
        'DH': 'Door Parts',
        'DI': 'Door Parts'
    },
    'Coolant Parts': {
        'RD': 'Radiator',
        'IC': 'Inter Coller',
        'AC': 'Air Condensor',
        'EV': 'Evaporator',
        'CD': 'Air Conditioning System',
        'WT': 'Cooling System'
    },
    'Metal Stamping Parts': {
        'BR': 'Bumper Reinforcement',
        'BS': 'Bumper Stay',
        'BT': "Boltster Tail Ass'y",
        'CM': 'Cross Member',
        'CP': 'Corner Panel',
        'CR': 'Cabin Roof Panel',
        'E': 'Corner Panel End',
        'F': 'Fender',
        'FD': 'Door',
        'FP': 'Front Panel',
        'FS': 'Floor Panel Set',
        'H': 'Hood',
        'HL': 'Hood Ledge',
        'IB': 'Steel Bumper',
        'K': 'Door Skin',
        'LH': 'Lamp Housing',
        'R': 'Radiator Support',
        'RF': 'Radiator Fan Shroud',
        'RP': 'Rear Rid Side Panel',
        'SO': 'Sill Body Side Outer',
        'SP': 'Side Panel',
        'ST': 'Strut Bar',
        'T': 'Rear Gate',
        'TB': 'Rear Tail Body',
        'WH': 'Wheel House',
        'IB': 'Bumper',
        'B': 'Bumper',
        'X': 'Bumper',
        'BM': 'Bumper',
        'FB': 'Fenders',
        'SB': 'Fenders',
        'AI': 'Engine Parts',
        'EU': 'Engine Parts',
        'AH': 'Engine Parts',
        'LM': 'Bumper'
    },
    'Plastic Parts': {
        'BF': 'Bumper Finisher',
        'B': 'Bumper',
        'BS': 'Bumper Bracket',
        'PF': 'Bumper Panel Flare',
        'EFB': 'Engine Fan Blade',
        'FF': 'Fender Flare',
        'FC': 'Fog Lamp Base/ Cover',
        'FG': 'Fender Granish',
        'G': 'Grille',
        'GM': 'Grille Moulding',
        'D': 'Headlight Door',
        'DT': 'Door Mouldings',
        'HM': 'Hood Moulding',
        'HI': 'Hood Insulator',
        'IF': 'Inner Fender',
        'LP': 'License Plate',
        'M': 'Ornament',
        'ML': 'Moulding Lower',
        'MU': 'Moulding Upper',
        'MG': 'Mud Guard',
        'S': 'Side Bumper',
        'SK': 'Side Skirt',
        'C': 'Side Corner',
        'BP': 'Spoiler',
        'TR': 'Tank Reserve',
        'P': 'Valance Panel',
        'WCC': 'Wheel Cap Cover',
        'W': 'Wiper Panel',
        'BC': 'Bed Liner',
        'WW': 'Windscreen',
        'GC': 'Fuel System',
        'HG': 'Hoods',
        'DC': 'Truck Bed Parts',
        'BG': 'Bug Shields',
        'DB': 'Body Parts',
        'WG': 'Weather Guards',
        'MC': 'Mirrors',
        'MD': 'Mirrors',
        'WC': 'Wheels and Tires'
    },
    'Numbering Guide': {
        'ODD': 'Front', 
        'EVEN': 'Rear'
    },
    'Location': {
        'N': 'Single Part',
        'R': 'Right Side',
        'C': 'Center',
        'L': 'Left',
        'S': 'Set',
        'U': 'Upper / L : Lower'
    }
}

# Load the data
df = pd.read_csv(r'C:\Users\eridetje\Documents\CPTM\cptmrepo\DataScraping\PDF_table_scraper\Cleaned-Data.csv')


# Apply the function to the 'CODE' column and assign the results to the respective columns
decoded_codes = df['CODE'].apply(lambda x: decode_code(x, dictionary))
df['manufacturer'] = [decoded['manufacturer'] for decoded in decoded_codes]
df['part_type'] = [decoded['part_type'] for decoded in decoded_codes]
df['model_series'] = [decoded['model_series'] for decoded in decoded_codes]
df['numbering_guide'] = [decoded['numbering_guide'] for decoded in decoded_codes]
df['location'] = [decoded['location'] for decoded in decoded_codes]

# Save the completed DataFrame to a CSV file
df.to_csv(r'C:\Users\eridetje\Documents\CPTM\cptmrepo\DataScraping\PDF_table_scraper\Cleaned-Data-Decoded.csv', index=False)