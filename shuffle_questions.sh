#!/bin/bash

# Input and output files
INPUT_FILE="questions.txt"
OUTPUT_FILE="shuffled_questions.txt"

# Check if the input file exists
if [ -f "$INPUT_FILE" ]; then
    # Filter out empty lines and lines that start with '#', then shuffle the rest
    grep -vE '^\s*$|^#' "$INPUT_FILE" | shuf > "$OUTPUT_FILE"
    echo "Shuffled questions written to $OUTPUT_FILE."
else
    echo "File $INPUT_FILE does not exist."
fi