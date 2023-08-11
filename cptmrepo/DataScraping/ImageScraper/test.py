text = "1\nFRONT BUMPER W/O HOLE\n2\nREAR SIDE BUMPER CORNER SMALL\n3\nINNER FENDER CANN'T SELL TO S.AFRIC\n"
segments = text.split('\n')  # Split the string into segments

count = 1  # The desired count

# Check if the count is within the valid range
if count < len(segments):
    selectedText = segments[count]  # Access the desired segment
    print(selectedText)  # Output the selected text
else:
    print("Invalid count")  # Handle the case when count