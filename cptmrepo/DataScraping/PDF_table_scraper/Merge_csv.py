import pandas as pd

# Load the CSV files into DataFrames
df1 = pd.read_csv(r'C:\Users\eridetje\Documents\CPTM\cptmrepo\DataScraping\PDF_table_scraper\Cleaned-Data-Decoded.csv')
df2 = pd.read_csv(r'C:\Users\eridetje\Documents\CPTM\cptmrepo\DataScraping\PDF_table_scraper\Car Parts with categories.csv')
# Get the column names for indices N, O, P, Q (13, 14, 15, 16 in 0-based Python indexing)

# Get the column names for indices N, O, P, Q (13, 14, 15, 16 in 0-based Python indexing)
columns = df1.columns[[13, 14, 15, 16]]

# Add together the strings in each of those columns for every value
for column in columns:
    # Convert to string, replace NaN with empty string
    df1[column] = df1[column].fillna('').astype(str) 
    df2[column] = df2[column].fillna('').astype(str)
    
    # concatenate the values
    df1[column] = df1[column] + df2[column]


# Save the result back to a CSV file
df1.to_csv(r'C:\Users\eridetje\Documents\CPTM\cptmrepo\DataScraping\PDF_table_scraper\merged.csv', index=False)
