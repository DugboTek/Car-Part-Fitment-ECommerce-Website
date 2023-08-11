import requests
from io import BytesIO
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage
import io
import pdfplumber
import pandas as pd
import csv

pdf_path = r"C:\Users\eridetje\Python Webscraper\PDF scraper\FPI_1_Catalog-2023-2024_American.pdf"



all_tables = []

# Open the file
with pdfplumber.open(pdf_path) as pdf:
    for page in pdf.pages:
        # Extract tables in the page
        tables = page.extract_tables()
        for table in tables:
            # Remove empty rows
            table = [row for row in table if any(cell and cell.strip() != '' for cell in row)]
            all_tables.append(table)

# Combine all tables
combined_table = [row for table in all_tables for row in table]

# Define the output CSV file
output_csv = "output.csv"

# Write the combined_table to a CSV file
with open(output_csv, 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerows(combined_table)

print(f"Data written to {output_csv}")
