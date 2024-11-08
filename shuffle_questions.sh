#!/bin/bash

# File to shuffle
FILE="questions.txt"

# Check if the file exists
if [ -f "$FILE" ]; then
    # Shuffle the lines in the file and overwrite the original file
    shuf "$FILE" -o "$FILE"
    echo "Questions in $FILE have been shuffled."
else
    echo "File $FILE does not exist."
fi