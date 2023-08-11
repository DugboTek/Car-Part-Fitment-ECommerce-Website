import pandas as pd
import numpy as np
import random
import string

# Load the data
df = pd.read_csv(r'C:\Users\eridetje\Documents\CPTM\cptmrepo\DataScraping\PDF_table_scraper\output.csv')

# Remove rows with missing values in 'CODE' column
df = df.dropna(subset=['CODE'])

# Leave 'NO' column as Null

# Fill missing values in 'MODEL' column with the value of the 'MODEL' column of the previous line
df['MODEL'].fillna(method='ffill', inplace=True)

# Fill missing values in 'YEAR' column with the exact same value of the 'YEAR' column of the previous line
df['YEAR'].fillna(method='ffill', inplace=True)

# Generate unique mock numbers for missing 'OEM' values
def generate_mock_OEM():
    while True:
        mock_OEM = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4)) + '-' + \
                    ''.join(random.choices(string.ascii_uppercase + string.digits, k=5)) + '-' + \
                    ''.join(random.choices(string.ascii_uppercase + string.digits, k=2))
        if mock_OEM not in df['OEM'].values:
            return mock_OEM

df.loc[df['OEM'].isna(), 'OEM'] = [generate_mock_OEM() for _ in range(df['OEM'].isna().sum())]

# Make empty 'PCS' values 1
df['PCS'].fillna(1, inplace=True)

# Adjust the generate_random_measurement function to ensure the generated values are always positive
def generate_random_measurement(previous_value):
    return abs(previous_value * (1 + random.uniform(-0.1, 0.1)))

# For the NW, GW, and M3 columns, replace them with what the value in above respective column is but slightly higher or slightly lower
for column in ['NW', 'GW', 'M3']:
    df[column] = df[column].mask(df[column].isna()).fillna(method='ffill').map(generate_random_measurement)

# Regenerate the mock OEM codes for entries containing newline characters
df.loc[df['OEM'].str.contains('\r\n', na=False), 'OEM'] = [generate_mock_OEM() for _ in range(df['OEM'].str.contains('\r\n', na=False).sum())]

# Save the cleaned dataframe to a CSV file
df.to_csv(r'C:\Users\eridetje\Documents\CPTM\cptmrepo\DataScraping\PDF_table_scraper\Cleaned-Data.csv', index=False)
